# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from threading import activeCount
from flask import Flask,render_template, request,redirect,url_for, session
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from passlib.hash import sha512_crypt
import MySQLdb.cursors, html, re 
from flask_mail import Mail,Message
from itsdangerous import URLSafeTimedSerializer
from dotenv import load_dotenv
load_dotenv()
import os

s = URLSafeTimedSerializer("secret")

# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.config['MAIL_SERVER']=os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = os.getenv("MAIL_PORT")
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)
cors = CORS(app)
bcrypt = Bcrypt(app)

app.config['MYSQL_HOST'] = os.getenv("HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DATABASE")
mysql = MySQL(app)





#-------------------------------------------------------------------------------------------
# Homepage fetching of data 
#-------------------------------------------------------------------------------------------

@app.route('/collection')
def get_collection():
	#Creating a connection cursor
	cursor = mysql.connection.cursor()
	cursor.execute("SELECT * FROM LaptopInfo")
	#Saving the Actions performed on the DB
	collection = cursor.fetchall()
	mysql.connection.commit()
	#Closing the cursor
	cursor.close()
	print(collection)
	return {'collection':collection}

#-------------------------------------------------------------------------------------------
# Default Initial Sanitization 
#-------------------------------------------------------------------------------------------

def sanitization(input_string):
    process_round0 =  html.escape(input_string)
    process_round1 = process_round0.replace("&lt;","")   #<
    process_round2 = process_round1.replace("&gt;","")   #>
    process_round3 = process_round2.replace("&amp;","")  #&
    process_round4 = process_round3.replace("&quot;","") #"
    process_round5 = process_round4.replace("&apos;","") #'
    final_processed = process_round5.replace("/","")     #/  
    return final_processed

#-------------------------------------------------------------------------------------------
# Register 
#-------------------------------------------------------------------------------------------

@app.route('/register',methods=['POST'])
def register_user():
	validation_success = 0
	validation_failure = 0 

	if request.method == 'POST':
		#initial sanitization 
		input_name = sanitization(request.form['username'])
		input_email = sanitization(request.form['email'])
		input_password = sanitization(request.form['password'])

		# name input validation 
		username_pattern = re.compile("^(?![-._])(?!.*[_.-]{2})[\w.-]{6,30}(?<![-._])$")
		if username_pattern.match(input_name): 
			validation_success += 1 
		else: 
            #"Max of 30 characters, Uppercase & lowercase, 0-9 and special characters"
			validation_failure += 1

		# email input validation
		email_pattern = re.compile("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")
		if email_pattern.match(input_email): 
			validation_success += 1
		else: 
			validation_failure += 1 

		# password input validation
		password_pattern = re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$")
		if password_pattern.match(input_password): 
			validation_success += 1
		else: 
            #"Minimum 8 and maximum 20 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
			validation_failure += 1 

		#once all server validation is ok; proceed 
		if validation_failure >= 0: 
		
			#Creating a connection cursor
			cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            #Creating a parameterized query & Executing SQL Statements
			cursor.execute("SELECT * FROM UserInfo WHERE email = %s", (input_email,))
			account = cursor.fetchone()
			print(account)
			if account: 
				return 'Registered Email Address'
			else: 
				hashed_password = sha512_crypt.hash(input_password)
				token = s.dumps(input_email, salt='email-confirm')
				msg = Message('Confirmation email',sender="noreply@demo.com",recipients = [f'{os.getenv("MAIL_USERNAME")}@mailtrap.io'])
				link = url_for('confirm_email',token=token,_external=True)
				msg.body = 'your link is {}'.format(link)
				mail.send(msg)
				sql = "INSERT INTO UserInfo (username, email, password) VALUES(%s, %s, %s)"
				data = (input_name,input_email,hashed_password)

				conn = mysql.connection
				cursor = conn.cursor()
				cursor.execute(sql, data)

				mysql.connection.commit()
				cursor.close()
				return redirect('http://localhost:3000/verification')
		else:
			return 'Error while adding user'
	

#-------------------------------------------------------------------------------------------
# login 
#-------------------------------------------------------------------------------------------

@app.route('/login',methods=['POST'])
def user_login():
	if request.method == 'POST':

		input_email = sanitization(request.form['inputName'])
		input_password = request.form['inputPwd']

		#Creating a connection cursor
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

		#Creating a parameterized query & Executing SQL Statements
		cursor.execute("SELECT * from UserInfo WHERE email = %s",(input_email,))
		account = cursor.fetchone() 

		if account is not None: 
			gethashedpassword_fromdb = account.get("password")

			#passlib starts here
			result = sha512_crypt.verify(input_password,gethashedpassword_fromdb)

			if result == True: 
				#sessions code starts here 
				session['loggedin'] = True
				session['id'] = account['email']
				session['name'] = account['name']

				return redirect('/adminDashboard')
			else: 
				return 'Incorrect username/password. Please Try Again.'
		
		mysql.connection.commit()
		cursor.close()
	return redirect ("/")
  
 
@app.route('/forgotPassword',methods=['POST'])
def forgotPassword():
	if request.method == 'POST':
		email = request.form['email']
		sql = f"SELECT * FROM UserInfo WHERE email='{email}'"
		conn = mysql.connection
		cursor = conn.cursor()
		cursor.execute(sql)
		mysql.connection.commit()
		data = cursor.fetchall()
		cursor.close()
		if(data==()):
			return "Email does not exist"
		else:
			token = s.dumps(email, salt='email-confirm')
			msg = Message('Confirmation email',sender="noreply@demo.com",recipients = ['820848ebf58907@mailtrap.io'])
			link = url_for('reset_password',token=token,_external=True)
			msg.body = 'your link is {}'.format(link)
			mail.send(msg)
			return redirect('http://localhost:3000/verification')

@app.route('/confirm_email/<token>')
def confirm_email(token):
	try:
		email = s.loads(token,salt="email-confirm",max_age=3600)
		print(email)
		sql = f'UPDATE UserInfo SET verification_status = 1 WHERE email = "{email}"'
		conn = mysql.connection
		cursor = conn.cursor()
		cursor.execute(sql)
		mysql.connection.commit()
		cursor.close()
		return redirect('http://localhost:3000/verifiedPage')
	except:
		return "the token is either invalid or expired"

@app.route('/reset_password/<token>')
def reset_password(token):
	return redirect(f'http://localhost:3000/resetPassword/{token}')

@app.route('/resetSuccess/<token>',methods=['POST'])
def reset_success(token):
	newPwd = request.form['newPwd']
	try:email = s.loads(token,salt="email-confirm",max_age=3600)
	except:return"Invalid token key"
	if(request.form['newPwd']==request.form['newPwd2']):
		if(len(request.form['newPwd'])>=6):
			#need hash password here
			sql = f'UPDATE UserInfo SET password = "{newPwd}" WHERE email = "{email}"'
			conn = mysql.connection
			cursor = conn.cursor()
			cursor.execute(sql)
			mysql.connection.commit()
			cursor.close()
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

	
	