# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from threading import activeCount
from flask import Flask, request,redirect,session,url_for
from flask_cors import CORS,cross_origin
from dotenv import load_dotenv
from flask_mysqldb import MySQL
from flask_mail import Mail,Message
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
mysql = MySQL(app)

cors = CORS(app)
mail = Mail(app)

#-------------------------------------------------------------------------------------------
# collection route (retrive all laptop info)
#-------------------------------------------------------------------------------------------

@app.route('/collection')
def get_collection():
	collection = api.db_query_fetchall(api.get_all_laptop())
	return {'collection':collection}


#-------------------------------------------------------------------------------------------
# Register route
#-------------------------------------------------------------------------------------------

@app.route('/register',methods=['POST'])
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
			print("Value of account: " + str(account))

			#if there there is such an account in db, user cannot register
			if account: 
				return 'Registered Email Address'

			else: 
				hashed_password = security.hashpassword(input_password)
				email_type = 1 
				sendmail.sendmail(input_email, "confirm_email", 1)
				api.db_query(api.insert_new_user(input_username,input_email,hashed_password))
				return redirect('http://localhost:3000/verification')

@app.route('/confirm_email/<token>')
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
		input_email = security.sanitization(request.form['email'])
		input_password = request.form['inputPwd']
		
		account = api.db_query_fetchone(api.get_account(input_email))

		if account is not None: 
			gethashedpassword_fromdb = account[3]
			result = security.verify_password(input_password,gethashedpassword_fromdb)

			if result == True: 
				#sessions code starts here 
				session['loggedin'] = True
				#session['id'] = tuple(map(str, account['email'].split(', ')))
				#session['name'] = account['name']
				sendmail.sendnotif(input_email,1)
				return redirect('/collectionlogin')

			else: 
				return 'Incorrect username/password. Please Try Again.'

		return 'Incorrect username/password. Please Try Again.'

#-------------------------------------------------------------------------------------------
# forgot password verification 
#-------------------------------------------------------------------------------------------

@app.route('/forgotPassword',methods=['POST'])
def forgotPassword():
	if request.method == 'POST':
		email = request.form['email']
		api.db_query_fetchall(api.get_account(email))
		email_type = 2
		sendmail.sendmail(email,'reset_password',2)
		return redirect('/verification')


# This will return the reset password page with the new password 
@app.route('/reset_password/<token>')
def reset_password(token):
	return redirect(f'http://localhost:3000/resetPassword/{token}')


@app.route('/resetSuccess/<token>',methods=['POST'])
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
def get_cartItems():
	collection = api.db_query_fetchall(api.get_cartItemsInfo(1))
	return {'collection':collection}

@app.route('/add_cartItem', methods = ['POST'])
def add_cartItem():
	if request.method == 'POST':
		try:
			laptopId = request.form['productId']
			api.db_query(api.insert_cartItem(1,laptopId,1))
			return redirect('/cart')
		except Exception as e:
			return "item already in cart"

@app.route('/delete_cartItem', methods = ['POST'])
def delete_cartItem():
	if request.method == 'POST':
		try:
			cartItemId = request.form['cartItemId']
			api.db_query(api.delete_cartItem(cartItemId))
			return redirect('/cart')
		except Exception as e:
			return "error occur, pls try again"

@app.route('/update_cartItem', methods = ['POST'])
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

	
	