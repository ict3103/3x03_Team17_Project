import html, re 
from passlib.hash import sha512_crypt

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

def hashpassword(password):
    return sha512_crypt.hash(password)

def verify_password(input_password,gethashedpassword_fromdb):
    return sha512_crypt.verify(input_password,gethashedpassword_fromdb)

def username_pattern():
    return re.compile("^(?![-._])(?!.*[_.-]{2})[\w.-]{6,30}(?<![-._])$")

def email_pattern():
    return re.compile("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$")

def password_pattern():
    re.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$")