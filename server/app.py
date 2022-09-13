# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask,request,redirect,url_for
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
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
	return {'collection':collection}

@app.route('/register',methods=['POST'])
def register_user():
	if request.method == 'POST':
		email = request.form['email']
		token = s.dumps(email, salt='email-confirm')
		msg = Message('Confirmation email',sender="noreply@demo.com",recipients = ['820848ebf58907@mailtrap.io'])
		link = url_for('confirm_email',token=token,_external=True)
		msg.body = 'your link is {}'.format(link)
		mail.send(msg)
		pw_hash = bcrypt.generate_password_hash(request.form['password'])
		sql = "INSERT INTO UserInfo (name, email,password) VALUES(%s, %s, %s)"
		data = (request.form['name'], request.form['email'], pw_hash)
		conn = mysql.connection
		cursor = conn.cursor()
		cursor.execute(sql, data)
		mysql.connection.commit()
		cursor.close()
		return redirect('http://localhost:3000/verification')

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
	else:
		return "Please ensure your password match"
	

@app.route('/login',methods=['POST'])
def user_login():
	# conn = mysql.connection
	# cursor = conn.cursor()
	# cursor.execute("SELECT name,password FROM UserInfo WHERE name=%s",request.form['name'])
	# data = cursor.fetchall()
	# print(data)
	return redirect('/adminDashboard')
	try:
		#do smth
		pass
	except: 
		#do smth
		pass
	return 


# main driver function
if __name__ == '__main__':
	# run() method of Flask class runs the application
	# on the local development server.
	app.run(debug=True)

	
	