# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from threading import activeCount
from flask import Flask, request,redirect,session
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
app.config['MYSQL_HOST'] = os.getenv("HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DATABASE")
mysql = MySQL(app)
cors = CORS(app)
app.secret_key = os.getenv("SECRET_KEY")
app.config['MAIL_SERVER']=os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = os.getenv("MAIL_PORT")
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
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
		#initial sanitization 
		input_name = security.sanitization(request.form['username'])
		input_email = security.sanitization(request.form['email'])
		input_password = security.sanitization(request.form['password'])

		# name,email,password input validation 
		#password Minimum 8 and maximum 20 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
		if not(security.username_pattern().match(input_name) or security.email_pattern().match(input_email) or security.password_pattern().match(input_password)):
			return 'Error while adding user'
		else: #once all server validation is ok; proceed 
			account = api.db_query_fetchone(api.get_account(input_email))
			#if there there is such an account in db, user cannot register
			if account: 
				return 'Registered Email Address'
			else: 
				hashed_password = security.hashpassword(input_password)
				sendmail.sendmail(input_email,"confirm_email")
				api.db_query(api.insert_new_user(input_name,input_email,hashed_password))
				return redirect('http://localhost:3000/verification')

@app.route('/confirm_email/<token>')
def confirm_email(token):
	try:
		email = sendmail.decrypt_token(token)
		api.db_query(api.update_verification_status(email))
		return redirect('http://localhost:3000/verifiedPage')
	except:
		return "the token is either invalid or expired"

#-------------------------------------------------------------------------------------------
# login route
#-------------------------------------------------------------------------------------------
@app.route('/login',methods=['POST'])
def user_login():
	if request.method == 'POST':
		input_email = security.sanitization(request.form['email'])
		input_password = request.form['inputPwd']
		account = api.db_query_fetchone(api.get_account(input_email))
		print(account)
		print(account)
		if account is not None: 
			gethashedpassword_fromdb = account[3]
			#passlib starts here
			result = security.verify_password(input_password,gethashedpassword_fromdb)
			if result == True: 
				#sessions code starts here 
				session['loggedin'] = True
				session['id'] = account['email']
				session['name'] = account['name']
				return redirect('/Payment')
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
		data = api.db_query_fetchall(api.get_account(email))
		if(data==()):
			return "Email does not exist"
		else:
			sendmail.sendmail(email,'reset_password')
			return redirect('http://localhost:3000/verification')

@app.route('/reset_password/<token>')
def reset_password(token):
	return redirect(f'http://localhost:3000/resetPassword/{token}')


@app.route('/resetSuccess/<token>',methods=['POST'])
def reset_success(token):
	newPwd = request.form['newPwd']
	try:email = sendmail.decrypt_token(token)
	except:return"Invalid token key"
	if(request.form['newPwd']==request.form['newPwd2']):
		if(len(request.form['newPwd'])>=8 and len(request.form['newPwd'])<=20):
			api.db_query(api.update_password(newPwd,email))
			return redirect(f'http://localhost:3000/resetPasswordSuccess')
		else:
			return "password length too short"

#-------------------------------------------------------------------------------------------
# main driver  
#-------------------------------------------------------------------------------------------

# main driver function
if __name__ == '__main__':
	# run() method of Flask class runs the application
	# on the local development server.
	# app.run(host=constants.HOST, port=constants.PORT)
	app.run(debug=True)

	
	