from flask_cors import CORS
import os
from multiprocessing import connection
from flask import Flask
from flask_mysqldb import MySQL
from dotenv import load_dotenv
load_dotenv()

# -------------------------------------------------------------------------------------------
# MYSQL queries
# -------------------------------------------------------------------------------------------

app = Flask(__name__)
cors = CORS(app)
app.config['MYSQL_HOST'] = '159.223.91.38'
app.config['MYSQL_USER'] = 'yujing'
app.config['MYSQL_PASSWORD'] = 'AVNS_tsp5nuC_MhlRP0_cIVV'
app.config['MYSQL_DB'] = 'ICT3x03'
app.config['MYSQL_PORT'] = 25060
mysql = MySQL(app)

# insert,update,delete queries (no data retrival)


def db_query(sql):
    cursor = mysql.connection.cursor()
    cursor.execute(sql)
    mysql.connection.commit()
    cursor.close()

# fetch all


def db_query_fetchall(sql):
    cursor = mysql.connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return data

# fetch one


def db_query_fetchone(sql):
    cursor = mysql.connection.cursor()
    cursor.execute(sql)
    data = cursor.fetchone()
    mysql.connection.commit()
    cursor.close()
    return data

# -------------------------------------------------------------------------------------------
# MYSQL query statements
# -------------------------------------------------------------------------------------------


def get_all_laptop():
    return "SELECT * FROM LaptopInfo"


def get_cartItemsInfo(userId):
    return f"SELECT l.laptopName, l.imageUrl, l.price, c.cartItemId, c.quantity, c.cartId FROM LaptopInfo as l join CartItems as c on c.laptopId = l.laptopId where c.cartId = '{userId}'"


def get_account(email=None, pk=None):
    get_account_parameter = pk if pk else email
    return f"SELECT * FROM UserInfo WHERE {'userId' if pk else 'email'} = '{get_account_parameter}'"


def insert_new_user(input_name, input_email, hashed_password):
    return f"INSERT INTO UserInfo (username, email, password) VALUES('{input_name}', '{input_email}', '{hashed_password}')"


def insert_cartItem(userId, laptopId, quantity):
    return f"INSERT INTO CartItems (cartId, laptopId, quantity) VALUES('{userId}', '{laptopId}', '{quantity}')"


def update_verification_status(email):
    return f"UPDATE UserInfo SET verification_status = 1 WHERE email = '{email}'"


def update_password(newPwd, email):
    return f'UPDATE UserInfo SET password = "{newPwd}" WHERE email = "{email}"'


def update_cartItem_quantity(newQuantity, cartItemId):
    return f"UPDATE CartItems SET quantity = '{newQuantity}' WHERE cartItemId = '{cartItemId}'"


def delete_cartItem(cartItemId):
    return f"DELETE from CartItems where cartItemId = '{cartItemId}'"


def get_account_id(email):
    return f"SELECT userId FROM ICT3x03.UserInfo WHERE email = '{email}'"


def insert_cartid_userid(userId):
    return f"INSERT INTO Cart (cartId, userId) VALUES('{userId}','{userId}')"


def update_username(newUsername, email):
    return f'UPDATE UserInfo SET username = "{newUsername}" WHERE email = "{email}"'
