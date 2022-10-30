import jwt
from functools import wraps
from flask import Flask,request,jsonify
app = Flask(__name__)

# decorator for verifying the JWT
def token_required(func):
    @wraps(func)
    def decorated(*args,**kwargs):
		#get the token from the query string
        token = request.args.get('token')
        if not token :
            return jsonify({'message':'Token is missing!'}),403
        try:
            # decoding the payload to fetch the stored details
            payload = jwt.decode(token,app.config['SECRET_KEY'])
            print(payload)
			#if decode token is wrong / tampered (does not match with secret key)
        except:
            return jsonify({'message':'Invalid token!'}),403
    return decorated