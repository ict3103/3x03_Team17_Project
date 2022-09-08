# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from threading import activeCount
from credentials import constants
from flask import Flask,render_template, request,redirect,url_for
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from passlib.hash import sha512_crypt
import MySQLdb.cursors


# Flask constructor takes the name of
# current module (__name__) as argument.
app = Flask(__name__)
cors = CORS(app)
bcrypt = Bcrypt(app)
app.config['MYSQL_HOST'] = constants.HOST
app.config['MYSQL_USER'] = constants.USER
app.config['MYSQL_PASSWORD'] = constants.PASSWORD
app.config['MYSQL_DB'] = constants.DATABASE
mysql = MySQL(app)


@app.route('/time')
def get_current_time():
    return {'time': 123}


@app.route('/collection')
def get_collection():
	#Creating a connection cursor
	cursor = mysql.connection.cursor()
	cursor.execute("SELECT * FROM LaptopInfo")
	#Saving the Actions performed on the DB
	collection = cursor.fetchall()
	# print(collection)
	mysql.connection.commit()
	#Closing the cursor
	cursor.close()
	return {'collection':collection}

#-------------------------------------------------------------------------------------------
# Register 
#-------------------------------------------------------------------------------------------

@app.route('/register',methods=['POST'])
def register_user():
	if request.method == 'POST':
		
		input_name = request.form['name']
		input_email = request.form['email']
		input_password = request.form['password']

		hashed_password = sha512_crypt.hash(input_password)
		sql = "INSERT INTO UserInfo (name, email, password) VALUES(%s, %s, %s)"
		data = (input_name,input_email,hashed_password)

		conn = mysql.connection
		cursor = conn.cursor()
		cursor.execute(sql, data)

		mysql.connection.commit()
		cursor.close()
		return redirect('/')
	else:
		return 'Error while adding user'

#-------------------------------------------------------------------------------------------
# login 
#-------------------------------------------------------------------------------------------

@app.route('/login',methods=['POST'])
def user_login():
	if request.method == 'POST':

		input_email = request.form['inputName']
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
			print(result)

			if result == True: 
				return redirect('/adminDashboard')
			else: 
				return 'Incorrect username/password. Please Try Again.'
		
		mysql.connection.commit()
		cursor.close()
	return redirect ("/")

#-------------------------------------------------------------------------------------------
# login 
#-------------------------------------------------------------------------------------------

# main driver function
if __name__ == '__main__':
	# run() method of Flask class runs the application
	# on the local development server.
	app.run(debug=True)

	
	