from flask import Flask,url_for
import os
from dotenv import load_dotenv
load_dotenv()
from flask_mail import Mail,Message
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
app.config['MAIL_SERVER']=os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = os.getenv("MAIL_PORT")
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

s = URLSafeTimedSerializer("secret")

def sendmail(input_email,route):
	token = generate_token(input_email)
	msg = Message('Confirmation email',sender="noreply@demo.com",recipients = [f'{os.getenv("MAIL_USERNAME")}@mailtrap.io'])
	link = url_for(route,token=token,_external=True)
	msg.body = 'your link is {}'.format(link)
	mail.send(msg)

def generate_token(input_email):
	return s.dumps(input_email, salt='email-confirm')

def decrypt_token(token):
	return s.loads(token,salt="email-confirm",max_age=3600)