from flask import Flask
from flask_mysqldb import MySQL
from dotenv import load_dotenv
load_dotenv()
import os
from flask_cors import CORS

#-------------------------------------------------------------------------------------------
# MYSQL queries
#-------------------------------------------------------------------------------------------

app = Flask(__name__)
cors = CORS(app)
app.config['MYSQL_HOST'] = os.getenv("HOST")
app.config['MYSQL_USER'] = os.getenv("DB_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("DB_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("DATABASE")
mysql = MySQL(app)

#insert,update,delete queries (no data retrival)
def db_query(sql):
	cursor = mysql.connection.cursor()
	cursor.execute(sql)
	mysql.connection.commit()
	cursor.close()

#retrival of all data
def db_query_fetchall(sql):
	cursor = mysql.connection.cursor()
	cursor.execute(sql)
	data = cursor.fetchall()
	mysql.connection.commit()
	cursor.close()
	return data

#retrival of one data only
def db_query_fetchone(sql):
	cursor = mysql.connection.cursor()
	cursor.execute(sql)
	data = cursor.fetchone()
	mysql.connection.commit()
	cursor.close()
	return data

def get_laptop():
    return "SELECT * FROM LaptopInfo"

def get_account(email):
    return f"SELECT * FROM UserInfo WHERE email = '{email}'"

def insert_user(input_name,input_email,hashed_password):
    return f"INSERT INTO UserInfo (username, email, password) VALUES('{input_name}', '{input_email}', '{hashed_password}')"

def update_verification_status(email):
    return f'UPDATE UserInfo SET verification_status = 1 WHERE email = "{email}"'

def update_password(newPwd,email):
    return f'UPDATE UserInfo SET password = "{newPwd}" WHERE email = "{email}"'
