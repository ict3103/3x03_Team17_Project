import random
import api
import security


def generateOTP():
    """function to generate OTP"""
    number = ""
    for _ in range(6):
        number += str(random.randint(1, 9))
    return number


def handleUsername(prevUsername, currUsername, email):
    if prevUsername != currUsername:
        api.db_query(api.update_username(
            currUsername, email))
        return True
    return False


def handleEmail(prevEmail, currEmail, email):
    if prevEmail != currEmail:
        api.db_query(api.update_email(
            currEmail, email))
        return True
    return False


def handlePassword(prevPass, currPass, email):
    if not security.verify_password(currPass, prevPass):
        api.db_query(api.update_password(
            currPass, email))
        return True
    return False


def handleUpdates(account: tuple = None, **updatedValues: dict) -> dict:
    """function to check updates in fields and update respective fields
    1-password updation will be different from other values updation as it will be hashed value. So, it will be handled separately
    2- updatedValues will be option kwargs argument
    3- if we want to update password, then account(previous info) is not required. That's why it will be None
    """
    print(account)
    if account is not None:
        emailUpdated = usernameUpdated = passwordUpdated = False
        if updatedValues["username"] is not None:
            usernameUpdated = handleUsername(
                account[1], updatedValues["username"], account[2])
        if updatedValues["email"] is not None:
            emailUpdated = handleEmail(
                account[2].lower(), updatedValues["email"].lower(), account[2])
        if updatedValues["password"] is not None:
            passwordUpdated = handlePassword(
                account[3], security.hashpassword(updatedValues["password"]), account[2])
        return {"email": emailUpdated, "username": usernameUpdated, "password": passwordUpdated}


def getUpdatedValues(triggeredUpdates: dict) -> list:
    """This function will return the values in a list which are changed"""
    result = []
    for key, value in triggeredUpdates.items():
        if value == True:
            result.append(key)
    return result
