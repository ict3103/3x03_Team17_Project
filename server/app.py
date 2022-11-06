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
import os

load_dotenv()
import api
import utils            
import security
import sendmail
import geocoder, time 
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


app = Flask(__name__)
app.config['MYSQL_HOST'] = os.getenv("HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DATABASE")
app.config['MYSQL_PORT'] = 25060
limiter = Limiter(app,key_func=get_remote_address,default_limits=["100 per day", "50 per hour"]) 
mysql = MySQL(app)
cors = CORS(app)
mail = Mail(app)

app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
app.config['JWT_SECRET_KEY'] = 'super-secret' #as of now
#create jwt manager
jwt = JWTManager(app)

#-------------------------------------------------------------------------------------------
# collection route (retrive all laptop info)
#-------------------------------------------------------------------------------------------

@app.route('/collection')
@limiter.exempt
def get_collection():
    sql_get_all_laptop = api.get_all_laptop()
    collection = api.db_query_fetchall(sql_get_all_laptop,"")
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
            sql_getaccount = api.check_account() 
            tupple_sql_getaccount = (input_email,)
            account = api.db_query_fetchone(sql_getaccount, tupple_sql_getaccount)

            #if there there is such an account in db, user cannot register
            if account: 
                return 'Registered Email Address'

            else:
                #new hashing function using argon2id 
                hashed_password = security.hashpassword(input_password) 
                email_type = 1 
                sendmail.sendmail(input_email, "confirm_email", 1)
                
                #prepared mySQL statement 
                sql_insertnewuser = api.insert_new_user() 
                tupple_sql_insertnewuser = (input_username, input_email, hashed_password,)
                api.db_query(sql_insertnewuser,tupple_sql_insertnewuser)

                #create a link between userID and cartID 
                sql_getaccountid = api.get_account_id() 
                tupple_sql_getaccountid = (input_email,) 
                get_userid = api.db_query_fetchone(sql_getaccountid,tupple_sql_getaccountid)
                get_userid = get_userid[0]

                sql_insertcartid_userid = api.insert_cartid_userid()
                tupple_sql_insertcartid_userid = (get_userid, get_userid,)
                api.db_query(sql_insertcartid_userid, tupple_sql_insertcartid_userid)
                
                #DB logging 
                registered_date = datetime.now()
                registered_timestamp = registered_date.strftime("%d-%b-%Y (%H:%M:%S.%f)")
                user_ip = get('https://api.ipify.org').text
                user_location = geocoder.ip(user_ip)
                user_country = user_location.city
                sql_register_logging = api.register_logging()
                tupple_sql_register_logging = (get_userid, input_username, input_email, "0", registered_timestamp, "0", user_ip, user_country, "0", "0", "0")
                api.db_query(sql_register_logging,tupple_sql_register_logging)

                return redirect('http://localhost:3000/verification')

@app.route('/confirm_email/<token>')
@limiter.limit("20 per day")
def confirm_email(token):
    try:
        email = sendmail.confirm_token(token)
        sql_updateverificationstatus = api.update_verification_status()
        tupple_sql_updateverificationstatus = (email,)
        api.db_query(sql_updateverificationstatus, tupple_sql_updateverificationstatus) 

        #DB logging 
        sql_registerupdatestatuslogging = api.register_updatestatus_logging() 
        tupple_sql_registerupdatestatuslogging = (email,)
        api.db_query(sql_registerupdatestatuslogging, tupple_sql_registerupdatestatuslogging)

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

        #account = api.db_query_fetchone(api.get_account(input_email))
        sql_checkaccount = api.check_account() 
        tupple_sql_checkaccount = (input_email,)
        account = api.db_query_fetchone(sql_checkaccount, tupple_sql_checkaccount)

        if account is not None: 
            user_id = account[0]
            verification_status = account[4]
            gethashedpassword_fromdb = account[3]
            result = security.verify_password(input_password,gethashedpassword_fromdb)

            if result == True and verification_status==1: 

                #send notification 
                sendmail.sendnotif(input_email,1)

                #Create the tokens we will be sending back to the client
                access_token = create_access_token(identity=user_id)
                #print(access_token)

                #DB logging - update last login 
                registered_date = datetime.now()
                registered_timestamp = registered_date.strftime("%d-%b-%Y (%H:%M:%S.%f)")
                
                sql_login_updatestatus_logging = api.login_updatestatus_logging() 
                tupple_sql_login_updatestatus_logging = (registered_timestamp,input_email,)
                api.db_query(sql_login_updatestatus_logging,tupple_sql_login_updatestatus_logging)

                #passing user info for functioning of profile
                user = {"id":account[0], "email":input_email, "username":account[1]}

                #set_refresh_cookies(response, refresh_token)
                return jsonify(access_token=access_token, user=user)

            elif result == True and verification_status ==0:
                return jsonify({"error":"Email/Password is incorrect"})

            else: 
                #DB logging - if there is an account BUT wrong password 
                sql_failed_logging = api.failed_logging() 
                tupple_sql_failed_logging = (input_email,)
                api.db_query(sql_failed_logging,tupple_sql_failed_logging)
                return jsonify({"error":"Email/Password is incorrect"})

        return {"error":"Email/Password is incorrect"}

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
        sql_getaccount = api.check_account()
        tupple_sql_getaccount = (email,) 
        api.db_query_fetchone(sql_getaccount, tupple_sql_getaccount)

        email_type = 2
        sendmail.sendmail(email,'reset_password',2)

        # DB logging - update attempt to password reset 
        sql_attempt_passwordreset_logging = api.attempt_passwordreset_logging()
        tupple_sql_attempt_passwordreset_logging = (email,)
        api.db_query(sql_attempt_passwordreset_logging, tupple_sql_attempt_passwordreset_logging)
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
            sql_update_password = api.update_password()
            tupple_sql_update_password = (newPwd,email,)
            api.db_query(sql_update_password,tupple_sql_update_password)
            sendmail.sendnotif(email,2)

            # DB logging - update successful password reset 
            sql_successful_passwordreset_logging = api.successful_passwordreset_logging() 
            tupple_sql_successful_passwordreset_logging = (email,)
            api.db_query(sql_successful_passwordreset_logging,tupple_sql_successful_passwordreset_logging)
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
    sql_get_cartItemsInfo = api.get_cartItemsInfo()
    tupple_sql_get_cartItemsInfo = (current_user,)
    collection = api.db_query_fetchall(sql_get_cartItemsInfo,tupple_sql_get_cartItemsInfo)
    return {'collection':collection}

@app.route('/add_cartItem', methods = ['POST'])
@jwt_required()
def add_cartItem():
    if request.method == 'POST':
        # Access the identity of the current user with get_jwt_identity
        laptopId = request.json['laptopId']
        current_user = get_jwt_identity()

        try:
            sql_insert_cartItem = api.insert_cartItem() 
            tupple_sql_insert_cartItem = (current_user, laptopId, 1,)
            api.db_query(sql_insert_cartItem,tupple_sql_insert_cartItem)
            return {'redirect':'/cart'}

        except:
            return {'error':"An error has occured. Please try again."}

@app.route('/delete_cartItem', methods = ['POST'])
@limiter.exempt
def delete_cartItem():
    if request.method == 'POST':
        try:
            cartItemId = request.form['cartItemId']
            sql_delete_cartItem = api.delete_cartItem() 
            tupple_sql_delete_cartItem = (cartItemId,)
            api.db_query(sql_delete_cartItem, tupple_sql_delete_cartItem)
            return redirect('/cart')
        
        except Exception as e:
            return "An error has occured. Please try again."

@app.route('/update_cartItem', methods = ['POST'])
@limiter.exempt
def update_cartItem():
    if request.method == 'POST':
        try:
            new_quantity= request.json['value']
            cartItemId = request.json['id']
            print("new quantity: "+new_quantity+", cartItemId: "+cartItemId)
            
            sql_update_cartItem_quantity = api.update_cartItem_quantity() 
            tupple_sql_update_cartItem_quantity = (new_quantity, cartItemId,)
            api.db_query(sql_update_cartItem_quantity, tupple_sql_update_cartItem_quantity)

            return {'result':1}
        except Exception as e:
            return "An error has occured. Please try again."

@app.route('/payment', methods = ['POST'])
def payment():
    if request.method == "POST" :
            totalAmount = request.form['totalAmount']
            if(float(totalAmount)>0):
                return redirect('/payment')
            else:
                return redirect('/cart')
    else:
        return redirect('/cart')

@app.route('/paymentComplete', methods = ['POST'])
def paymentComplete():
    if request.method == "POST" :
        return redirect('/paymentComplete')
    else:
        return redirect('/cart')

#-------------------------------------------------------------------------------------------
# Update profile route (retrive all profile info)
#-------------------------------------------------------------------------------------------

@app.route('/getOTP', methods=["post"])
def get_otp():
    """when the verification button will be clicked, request will be forwarded to this route
    1- generateOTP will genrate a 6 digit random number
    2- generate token method is same being used for email to encrypt the otp and wil return the token
    3- if everythng goes as expected, a json response with token will be sent
    Note: token is generated because it's not secure to send otp directly
    """
    # Geting the email address to which mail is to be sent
    reciver_email = request.json['email']

    # Getting the generated OTP
    otp = utils.generateOTP()

    # Sending the OTP to user's email
    sendmail.sendOTPmail(reciver_email, otp)

    # Genrating a token for the otp which is sent
    token = sendmail.generate_confirmation_token(otp)

    # Returning the JSON response with success status and the token
    return {"status": 200, "result": "OTP send successfully", "token": token}

@app.route('/verifyOTP', methods=["POST"])
def verifyOTP():
    """Request will be forwarded to this route when the 6 digit otp will be entered by user in otp input field in profile update form
    1- As this is post request, token and otp entered by user will be sent through POST request as json data
    2- In the try block, if the token gets expired, an exception will be thrown due to token expiration, time is 60 second after which token will be expired
    3- if token is not expired, then it will be decrypted and will be compared with the otp enetered by user according to which response will be generated
    """
    token = request.json["token"]
    otp = request.json["otp"]
    try:
        decrypted_otp = sendmail.confirm_token(token, 60)
    except:
        return {"status": 500, "result": "OTP Expired"}
    return {"status": 500, "result": "OTP Invalid"} if otp != decrypted_otp else {"status": 200, "result": "OTP Verified"}

@app.route('/updateProfile/<pk>', methods=["PUT"])
def updateProfile(pk):
    # initial sanitization
    input_name = input_email = input_password = account = None
    if request.json.get("username", None):
        input_name = security.sanitization(request.json['username'])

    if request.json.get("email", None):
        input_email = security.sanitization(request.json['email'])

    if request.json.get("password", None):
        input_password = request.json['password']
    
    print("input_name: " + str(input_name))
    print("input_email: " + str(input_email))
    print("input_password: " + str(input_password))

    if not(security.username_pattern().match(str(input_name)) and security.email_pattern().match(str(input_email))) :
            return {"status": 400, "result": "Error while adding user"}

    if not(security.password_pattern().match(str(input_password)) or input_password == None) :
            return {"status": 400, "result": "Error while adding user"}

    # if email is not None, check whether this email already taken
    if input_email is not None:
        account = api.db_query_fetchone_profile(api.get_account(input_email))
        
        # if account with this email alredy exists then check whether it's different from new email or not
        if account is not None and account[2].lower() != input_email.lower():
            return {"status": 400, "result": "Email already taken"}

    # getting previous account for updation
    account = api.db_query_fetchone_profile(api.get_account(pk=pk))
    triggeredUpdates = utils.handleUpdates(account=account, **{"email": input_email,"username": input_name,"password": input_password})
    updatedValues = utils.getUpdatedValues(triggeredUpdates)

    if len(updatedValues) > 0:
        sendmail.sendUpdationConfirmationMail(account[2], utils.getUpdatedValues(triggeredUpdates))
    return {"status": 200, "result": "Profile Updated"}

#-------------------------------------------------------------------------------------------
# main driver  
#-------------------------------------------------------------------------------------------

# main driver function
if __name__ == '__main__':
    app.config['SECRET_KEY'] = 'G$upli2St8RZxMtNeJU90'
    app.run(debug=True)

    
    
