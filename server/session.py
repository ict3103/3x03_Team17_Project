from functools import wraps
from flask import Flask,request,jsonify
import jwt

app = Flask(__name__)

# decorator for verifying the JWT
def token_required(func):
    @wraps(func)
    def decorated(*args,**kwargs):
        jwt_token = request.args.get('jwt_token')
        if not jwt_token:
            return jsonify({'alert!':'Token is missing!'})
        try:
            # decoding the payload to fetch the stored details
            payload = jwt.decode(jwt_token,app.config['SECRET_KEY'])
        except:
            return jsonify({'alert':'Invalid token!'})
    return decorated