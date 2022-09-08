# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from credentials import constants
from flask import Flask,render_template, request,redirect,url_for
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt


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

@app.route('/register',methods=['POST'])
def register_user():
	if request.method == 'POST':
		# print(request.form['name'])
		# print(request.form['email'])
		pw_hash = bcrypt.generate_password_hash(request.form['password'])
		sql = "INSERT INTO UserInfo (name, email,password) VALUES(%s, %s, %s)"
		data = (request.form['name'], request.form['email'], pw_hash)
		conn = mysql.connection
		cursor = conn.cursor()
		cursor.execute(sql, data)
		mysql.connection.commit()
		cursor.close()
		return redirect('/')
	else:
		return 'Error while adding user'

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

	
	