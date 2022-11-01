# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request,redirect,jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_mysqldb import MySQL
from flask_mail import Mail
from flask import Flask 
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from datetime import timedelta, datetime
from requests import get

load_dotenv()
import api
import security
import sendmail
import geocoder, time 

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

# for cookies and fresh cookies
# from flask_jwt_extended import get_jwt
# from flask_jwt_extended import set_access_cookies
# from flask_jwt_extended import set_refresh_cookies
# from flask_jwt_extended import unset_jwt_cookies
# from flask_jwt_extended import create_refresh_token


app = Flask(__name__)
app.config['MYSQL_HOST'] = '159.223.91.38'
app.config['MYSQL_USER'] = 'yujing'
app.config['MYSQL_PASSWORD'] = 'AVNS_FVskSUDS3lwJodYP7Ty'
app.config['MYSQL_DB'] = 'ICT3x03'
app.config['MYSQL_PORT'] = 25060
limiter = Limiter(app,key_func=get_remote_address,default_limits=["100 per day", "50 per hour"]) 
mysql = MySQL(app)
cors = CORS(app)
mail = Mail(app)

# If cookie_secure = true,only allow JWTs to be sent over https. 
# In production, this should always be set to True
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
#jwt expiry
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
app.config['JWT_SECRET_KEY'] = 'super-secret' #as of now

# Disable CSRF protection for this example. In almost every case,
# this is a bad idea. See examples/csrf_protection_with_cookies.py
# for how safely store JWTs in cookies
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
#create jwt manager
jwt = JWTManager(app)

#fresh JWT token in case user still needs to access the website during login
# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             set_access_cookies(response, access_token)
#         return response
#     except (RuntimeError, KeyError):
#         # Case where there is not a valid JWT. Just return the original response
#         return response

#-------------------------------------------------------------------------------------------
# collection route (retrive all laptop info)
#-------------------------------------------------------------------------------------------

@app.route('/collection')
@limiter.exempt
def get_collection():
    collection = api.db_query_fetchall(api.get_all_laptop())
    return {'collection':collection}

#-------------------------------------------------------------------------------------------
# Register route
#-------------------------------------------------------------------------------------------

@app.route('/register',methods=['POST'])
@limiter.limit("20 per day")
def register_user():
    if request.method == 'POST':

        input_username = security.sanitization(request.form['username'])
        input_email = security.sanitization(request.form['email'])
        input_password = request.form['password']
        input_confirm_password = request.form['checkpassword']

        if not(security.username_pattern().match(input_username) and security.email_pattern().match(input_email) and security.password_pattern().match(input_password) and security.password_pattern().match(input_confirm_password)) :
            return 'Error while adding user'

        #case when password does not match
        if input_password != input_confirm_password:
            return 'Password not match'

        else: #once all server validation is ok; proceed 
            account = api.db_query_fetchone(api.get_account(input_email))

            #if there there is such an account in db, user cannot register
            if account: 
                return 'Registered Email Address'

            else:
                #new hashing function using argon2id 
                hashed_password = security.hashpassword(input_password) 
                email_type = 1 
                sendmail.sendmail(input_email, "confirm_email", 1)
                api.db_query(api.insert_new_user(input_username,input_email,hashed_password))

                #create a link between userID and cartID 
                get_userid = api.db_query_fetchone(api.get_account_id(input_email))
                get_userid = get_userid[0] 
                api.db_query(api.insert_cartid_userid(get_userid))

                #DB logging 
                registered_date = datetime.now()
                registered_timestamp = registered_date.strftime("%d-%b-%Y (%H:%M:%S.%f)")
                user_ip = get('https://api.ipify.org').text
                user_location = geocoder.ip(user_ip)
                user_country = user_location.city
                api.db_query(api.register_logging(get_userid, input_username, input_email, "0", registered_timestamp, "0", user_ip, user_country, "0", "0", "0"))

                return redirect('http://localhost:3000/verification')

@app.route('/confirm_email/<token>')
@limiter.limit("20 per day")
def confirm_email(token):
    try:
        email = sendmail.confirm_token(token)
        api.db_query(api.update_verification_status(email))

        #DB logging 
        api.db_query(api.register_updatestatus_logging(email))

        return redirect('http://localhost:3000/verifiedPage')
    except:
        return "Invalid/Expired token. Please Try Again."

#-------------------------------------------------------------------------------------------
# login route
#-------------------------------------------------------------------------------------------

# login with header
@app.route('/login',methods=['POST'])
# @jwt_required(optional=True)
def user_login():
    if request.method == 'POST':
        input_email = security.sanitization(request.json['inputEmail'])
        input_password = request.json['inputPassword']
        account = api.db_query_fetchone(api.get_account(input_email))

        if account is not None: 
            user_id = account[0]
            verification_status = account[4]
            gethashedpassword_fromdb = account[3]
            result = security.verify_password(input_password,gethashedpassword_fromdb)

            if result == True and verification_status==1: 

                #send notification 
                sendmail.sendnotif(input_email,1)

                # Create the tokens we will be sending back to the client
                access_token = create_access_token(identity=user_id)
                print(access_token)

                # DB logging - update last login 
                registered_date = datetime.now()
                registered_timestamp = registered_date.strftime("%d-%b-%Y (%H:%M:%S.%f)")
                api.db_query(api.login_updatestatus_logging(input_email,registered_timestamp))
                return jsonify(access_token=access_token)

            elif result == True and verification_status ==0:
                return jsonify({"error":"verification error"})

            else: 
                # DB logging - if there is an account BUT wrong password 
                api.db_query(api.failed_logging(input_email))

                return jsonify({"error":"something went wrong"})
        return {"error":"no such account"}

# #login with cookie (not yet done)
# @app.route('/login',methods=['POST'])
# # @jwt_required(optional=True)
# def user_login():
#     if request.method == 'POST':
#         input_email = security.sanitization(request.json['inputEmail'])
#         input_password = request.json['inputPassword']
#         account = api.db_query_fetchone(api.get_account(input_email))
#         print(account)
#         if account is not None: 
#             user_id = account[0]
#             gethashedpassword_fromdb = account[3]
#             result = security.verify_password(input_password,gethashedpassword_fromdb)
#             if result == True: 
#                 #encode session credentials with JWT (include user id and session expiration timing)
#                 resp = jsonify({"isValidUser": "true"})
#                 resp.headers.add('Access-Control-Allow-Origin', '*')
#                 resp.headers.add('Access-Control-Allow-Header', '*')
#                 resp.headers.add('Access-Control-Allow-Credentials', '*')
#                 # Create the tokens we will be sending back to the user
#                 access_token = create_access_token(identity=user_id)
#                 refresh_token = create_refresh_token(identity=user_id)
#                 print(access_token)
#                 # Set the JWT cookies in the response
#                 set_access_cookies(resp, access_token)
#                 set_refresh_cookies(resp, refresh_token)
#                 return resp,200
#             else: 
#                 return {"redirect":'false'}
#         return {"err":"error"}

# Because the JWTs are stored in an httponly cookie, 
# we cannot log the user out by simply deleting the cookie in the frontend.
# We need the backend to send us a response to delete the cookies in order to logout.
# @app.route('/logout', methods=['GET'])
# @limiter.limit("2000 per day")
# def logout():
#     response = jsonify({'isValidUser': False})
#     unset_jwt_cookies(response)
#     return response, 200

#-------------------------------------------------------------------------------------------
# forgot password verification 
#-------------------------------------------------------------------------------------------

@app.route('/forgotPassword',methods=['POST'])
@limiter.limit("20 per day")
def forgotPassword():
    if request.method == 'POST':
        email = request.form['email']
        api.db_query_fetchall(api.get_account(email))
        email_type = 2
        sendmail.sendmail(email,'reset_password',2)

        # DB logging - update attempt to password reset 
        api.db_query(api.attempt_passwordreset_logging(email))
        return redirect('/verification')


# This will return the reset password page with the new password 
@app.route('/reset_password/<token>')
@limiter.limit("20 per day")
def reset_password(token):
    return redirect(f'http://localhost:3000/resetPassword/{token}')


@app.route('/resetSuccess/<token>',methods=['POST'])
@limiter.limit("20 per day")
def reset_success(token):
    newPwd = request.form['newPwd']
    try:email = sendmail.confirm_token(token)
    except:return "Invalid/Expired token. Please Try Again."

    if(request.form['newPwd'] == request.form['newPwd2']):
        if(len(request.form['newPwd'])>=8 and len(request.form['newPwd'])<=20):
            newPwd = security.hashpassword(newPwd)
            api.db_query(api.update_password(newPwd,email))
            sendmail.sendnotif(email,2)

            # DB logging - update successful password reset 
            api.db_query(api.successful_passwordreset_logging(email))
            return redirect(f'http://localhost:3000/resetPasswordSuccess')

        else:
            return "Password has to be between 8 to 20 characters long."

#-------------------------------------------------------------------------------------------
# cart route (retrive all cart items info)
#-------------------------------------------------------------------------------------------

@app.route('/cart')
@jwt_required()
def get_cartItems():
    current_user = get_jwt_identity()
    collection = api.db_query_fetchall(api.get_cartItemsInfo(current_user))
    return {'collection':collection}

@app.route('/add_cartItem', methods = ['POST'])
@jwt_required()
def add_cartItem():
    if request.method == 'POST':
        # Access the identity of the current user with get_jwt_identity
        laptopId = request.json['laptopId']
        current_user = get_jwt_identity()
        try:
            api.db_query(api.insert_cartItem(current_user,laptopId,1))
            return {'redirect':'/cart'}
        except:
            return {'error':"error"}

@app.route('/delete_cartItem', methods = ['POST'])
@limiter.exempt
def delete_cartItem():
    if request.method == 'POST':
        try:
            cartItemId = request.form['cartItemId']
            api.db_query(api.delete_cartItem(cartItemId))
            return redirect('/cart')
        except Exception as e:
            return "error occur, pls try again"

@app.route('/update_cartItem', methods = ['POST'])
@limiter.exempt
def update_cartItem():
    if request.method == 'POST':
        try:
            new_quantity= request.json['value']
            cartItemId = request.json['id']
            print("new quantity: "+new_quantity+", cartItemId: "+cartItemId)
            api.db_query(api.update_cartItem_quantity(new_quantity, cartItemId))
            #api.db_query(api.delete_cartItem(cartItemId))
            return {'result':1}
        except Exception as e:
            return "error occur, pls try again"
#-------------------------------------------------------------------------------------------
# main driver  
#-------------------------------------------------------------------------------------------

# main driver function
if __name__ == '__main__':
    app.config['SECRET_KEY'] = 'G$upli2St8RZxMtNeJU90'
    app.run(debug=True)

    
    