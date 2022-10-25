from lib2to3.pgen2 import token
import os
from flask import Flask,url_for
from flask_mail import Mail,Message
from itsdangerous import URLSafeTimedSerializer
from email.message import EmailMessage
from dotenv import load_dotenv
from datetime import datetime
import smtplib
import ssl
load_dotenv()


app = Flask(__name__)
app.config['emailsender'] = os.getenv("email_sender")
app.config['emailpass'] = os.getenv("email_password")
app.config['register_secretkey'] = os.getenv("register_secretkey")
app.config['register_securitypasswordsalt'] = os.getenv("register_securitypasswordsalt")

app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

#-------------------------------------------------------------------------------------------
# Sending Email + successful login & reset password  
#-------------------------------------------------------------------------------------------
 
def sendnotif(input_email,email_type):

	if (email_type == 1): 
		subject = 'YourFirstComputer - New sign-in '
		body = """
		Dear Customer, 

		We noticed a new sign-in with your YourFirstComputer account: """ + input_email + """

		Details: 
		- Date & Time: """ + datetime.now().strftime('%#d %b %Y %H:%M') + """
		"""
	
	if (email_type == 2): 
		subject = 'YourFirstComputer - Successful password reset '
		body = """
		Dear Customer, 

		You have successfully reset your YourFirstComputer account: """ + input_email + """

		Details: 
		- Date & Time: """ + datetime.now().strftime('%#d %b %Y %H:%M') + """
		"""

	em = EmailMessage()
	em['From'] = app.config['emailsender']
	em['To'] = input_email
	em['Subject'] = subject
	em.set_content(body)

	context = ssl.create_default_context()
	with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
		smtp.login(app.config['emailsender'], app.config['emailpass'])
		smtp.sendmail(app.config['emailsender'], input_email, em.as_string())

#-------------------------------------------------------------------------------------------
# Sending Email + With Tokens 
#-------------------------------------------------------------------------------------------

def sendmail(input_email,route,email_type):
	generate_user_token = generate_confirmation_token(input_email)
	generate_link = url_for(route, token=generate_user_token, _external=True)

	if (email_type == 1): 
		subject = 'YourFirstComputer - Verify Email Address - Requested on ' + datetime.now().strftime('%#d %b %Y %H:%M')
		body = """
		Dear Customer, 

		Thank you for creating your account with YourFirstComputer. 
		Here is your registration code: """ + generate_link + """

		Note: 
		- Link will only be valid for 3 minutes.
		"""

	if (email_type == 2): 
		subject = 'YourFirstComputer - Reset Password - Requested on ' + datetime.now().strftime('%#d %b %Y %H:%M')
		body = """
		Dear Customer, 

		You have request to reset your password for YourFirstComputer account. 
		Here is your reset code: """ + generate_link + """

		Note: 
		- Link will only be valid for 3 minutes.
		"""
		
	em = EmailMessage()
	em['From'] = app.config['emailsender']
	em['To'] = input_email
	em['Subject'] = subject
	em.set_content(body)

	context = ssl.create_default_context()
	with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
		smtp.login(app.config['emailsender'], app.config['emailpass'])
		smtp.sendmail(app.config['emailsender'], input_email, em.as_string())

#-------------------------------------------------------------------------------------------
# Generating & Confirming Tokens 
#-------------------------------------------------------------------------------------------

# generate token based on email address obtained during registration process   
def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['register_secretkey'])
    return serializer.dumps(email, salt=app.config['register_securitypasswordsalt'])

# this token will vaild for 3 minutes only 
def confirm_token(token):
	serializer = URLSafeTimedSerializer(app.config['register_secretkey'])
	return serializer.loads(token, salt=app.config['register_securitypasswordsalt'],max_age=180)
