import html, re 
from passlib.hash import argon2

#-------------------------------------------------------------------------------------------
# Default Initial Sanitization 
#-------------------------------------------------------------------------------------------

def sanitization(input_string):
    process_round0 = html.escape(input_string)
    process_round1 = process_round0.replace("&lt;","")   #<
    process_round2 = process_round1.replace("&gt;","")   #>
    process_round3 = process_round2.replace("&amp;","")  #&
    process_round4 = process_round3.replace("&quot;","") #"
    process_round5 = process_round4.replace("&apos;","") #'
    final_processed = process_round5.replace("/","")     #/  
    return final_processed

#-------------------------------------------------------------------------------------------
# Hashing Password 
#-------------------------------------------------------------------------------------------

def hashpassword(password):
    return argon2.using(rounds=5).hash(password)

#-------------------------------------------------------------------------------------------
# User Input Sanitization 
#-------------------------------------------------------------------------------------------

def verify_password(input_password,gethashedpassword_fromdb):
    print(input_password)
    print(gethashedpassword_fromdb)
    return argon2.verify(input_password,gethashedpassword_fromdb)

def username_pattern():
    return re.compile("^[a-z]*[ a-z]{8,20}$")

def email_pattern():
    return re.compile("^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$")

def password_pattern():
    #password Minimum 8 and maximum 20 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
    return re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$")