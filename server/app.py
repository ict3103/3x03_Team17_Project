# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from threading import activeCount
from credentials import constants
from flask import Flask,render_template, request,redirect,url_for, session
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from passlib.hash import sha512_crypt
import MySQLdb.cursors, html, re 


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
	# print(collection)
	mysql.connection.commit()
	#Closing the cursor
	cursor.close()
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
		input_name = sanitization(request.form['name'])
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
		if validation_failure == 0: 
		
			#Creating a connection cursor
			cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            #Creating a parameterized query & Executing SQL Statements
			cursor.execute("SELECT * FROM UserInfo WHERE email = %s", (input_email,))
			account = cursor.fetchone()

			if account: 
				return 'Registered Email Address'
			else: 
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

#-------------------------------------------------------------------------------------------
# main driver  
#-------------------------------------------------------------------------------------------

# main driver function
if __name__ == '__main__':
	# run() method of Flask class runs the application
	# on the local development server.
	app.run(debug=True)

	
	