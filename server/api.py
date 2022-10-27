from multiprocessing import connection
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
app.config['MYSQL_HOST'] = '159.223.91.38'
app.config['MYSQL_USER'] = 'yujing'
app.config['MYSQL_PASSWORD'] = 'AVNS_tsp5nuC_MhlRP0_cIVV'
app.config['MYSQL_DB'] = 'ICT3x03'
app.config['MYSQL_PORT'] = '25060'
mysql = MySQL(app)

#insert,update,delete queries (no data retrival)
def db_query(sql):
	cursor = mysql.connection.cursor()
	cursor.execute(sql)
	mysql.connection.commit()
	cursor.close()

#fetch all
def db_query_fetchall(sql):
	cursor = mysql.connection.cursor()
	cursor.execute(sql)
	data = cursor.fetchall()
	mysql.connection.commit()
	cursor.close()
	return data

#fetch one
def db_query_fetchone(sql):
	cursor = mysql.connection.cursor()
	cursor.execute(sql)
	data = cursor.fetchone()
	mysql.connection.commit()
	cursor.close()
	return data

#-------------------------------------------------------------------------------------------
# MYSQL query statements
#-------------------------------------------------------------------------------------------

def get_all_laptop():
    return "SELECT * FROM LaptopInfo"

def get_cartItemsInfo(userId):
	return f"SELECT l.laptopName, l.imageUrl, l.price, c.cartItemId, c.quantity, c.cartId FROM laptopinfo as l join cartitems as c on c.laptopId = l.laptopId where c.cartId = '{userId}'"

def get_account(email):
    return f"SELECT * FROM UserInfo WHERE email = '{email}'"

def insert_new_user(input_name,input_email,hashed_password):
    return f"INSERT INTO UserInfo (username, email, password) VALUES('{input_name}', '{input_email}', '{hashed_password}')"

def insert_cartItem(userId, laptopId, quantity):
	return f"INSERT INTO cartItems (cartId, laptopId, quantity) VALUES('{userId}', '{laptopId}', '{quantity}')"

def update_verification_status(email):
    return f"UPDATE UserInfo SET verification_status = 1 WHERE email = '{email}'"

def update_password(newPwd,email):
    return f'UPDATE UserInfo SET password = "{newPwd}" WHERE email = "{email}"'

def update_cartItem_quantity(newQuantity, cartItemId):
	return f'UPDATE cartItems SET quantity = "{newQuantity}" WHERE cartItemId = "{cartItemId}"'

def delete_cartItem(cartItemId):
	return f"DELETE from cartItems where cartItemId = '{cartItemId}'"
