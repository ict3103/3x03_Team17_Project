# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from operator import imod
from threading import activeCount
from flask import Flask, request,redirect,session,url_for,jsonify,Response,json
from flask_cors import CORS,cross_origin
from dotenv import load_dotenv
from flask_mysqldb import MySQL
from flask_mail import Mail,Message
#argon2 hashing algorithm - pip install argon2-cffi
from passlib.hash import argon2 
#rate limitation protection - pip install Flask-Limiter
from flask import Flask 
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import jwt
from functools import wraps
from datetime import datetime, timedelta
load_dotenv()
import api
import security
import sendmail
import os

app = Flask(__name__)
app.config['MYSQL_HOST'] = '159.223.91.38'
app.config['MYSQL_USER'] = 'yujing'
app.config['MYSQL_PASSWORD'] = 'AVNS_tsp5nuC_MhlRP0_cIVV'
app.config['MYSQL_DB'] = 'ICT3x03'
app.config['MYSQL_PORT'] = 25060
limiter = Limiter(app,key_func=get_remote_address,default_limits=["100 per day", "50 per hour"]) 

mysql = MySQL(app)
cors = CORS(app)
mail = Mail(app)

def jsonResponseFactory(data):
    '''Return a callable in top of Response'''
    def callable(response=None, *args, **kwargs):
        '''Return a response with JSON data from factory context'''
        return Response(json.dumps(data), *args, **kwargs)
    return callable

# decorator for verifying the JWT
def token_required(func):
    @wraps(func)
    def decorated(*args,**kwargs):
		#get the token from the query string
        token = request.args.get('token')
        if not token :
            return jsonify({'message':'Token is missing!'}),403
        try:
            # decoding the payload to fetch the stored details
            payload = jwt.decode(token,app.config['SECRET_KEY'])
			#if decode token is wrong / tampered (does not match with secret key)
        except:
            return jsonify({'message':'Invalid token!'}),403
    return decorated

#-------------------------------------------------------------------------------------------
# collection route (retrive all laptop info)
#-------------------------------------------------------------------------------------------

@app.route('/collection')
@limiter.exempt
@token_required
def get_collection():
	return "you can only view this with token"
	# collection = api.db_query_fetchall(api.get_all_laptop())
	# return {'collection':collection}

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

				return redirect('http://localhost:3000/verification')

@app.route('/confirm_email/<token>')
@limiter.limit("20 per day")
def confirm_email(token):
	try:
		email = sendmail.confirm_token(token)
		api.db_query(api.update_verification_status(email))
		return redirect('http://localhost:3000/verifiedPage')
	except:
		return "Invalid/Expired token. Please Try Again."

#-------------------------------------------------------------------------------------------
# login route
#-------------------------------------------------------------------------------------------

@app.route('/login',methods=['POST'])
def user_login():
	if request.method == 'POST':
		input_email = security.sanitization(request.json['inputEmail'])
		input_password = request.json['inputPassword']
		
		account = api.db_query_fetchone(api.get_account(input_email))

		if account is not None: 
			gethashedpassword_fromdb = account[3]
			result = security.verify_password(input_password,gethashedpassword_fromdb)

			if result == True: 
				#sessions code starts here 
				session['loggedin'] = True
				#session['id'] = tuple(map(str, account['email'].split(', ')))
				#session['name'] = account['name']

				#encode session credentials with JWT (include user id and session expiration timing)
				jwt_token = jwt.encode(
					{
					"uid":account[0], #0-user id, 1-username, 2-email
					"expiration" : str(datetime.utcnow()+timedelta(minutes=50))
					}, 
					app.config['SECRET_KEY'])
				print(jwt_token)
				return {"jwt_token":jwt_token,"redirect":"/collectionLogin"}
			else: 
				return {"redirect":"/","error_message":'Incorrect username/password. Please Try Again.'}

		return 'Incorrect username/password. Please Try Again.'

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
			return redirect(f'http://localhost:3000/resetPasswordSuccess')

		else:
			return "Password has to be between 8 to 20 characters long."

#-------------------------------------------------------------------------------------------
# cart route (retrive all cart items info)
#-------------------------------------------------------------------------------------------

@app.route('/cart')
@limiter.exempt
@token_required
def get_cartItems():
	collection = api.db_query_fetchall(api.get_cartItemsInfo(1))
	return {'collection':collection}

@app.route('/add_cartItem', methods = ['POST'])
@limiter.exempt
def add_cartItem():
	if request.method == 'POST':
		try:
			laptopId = request.form['productId']
			api.db_query(api.insert_cartItem(1,laptopId,1))
			return redirect('/cart')
		except Exception as e:
			return "item already in cart"

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

	
	