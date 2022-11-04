
import unittest
import chromedriver_autoinstaller
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC

class TestRegistrationAndLogin(unittest.TestCase):

        def test_registration_emptyform(self):
            # Setup
            options = Options()
            options.add_experimental_option("detach", True)
            chromedriver_autoinstaller.install()
            driver = webdriver.Chrome(options=options)

            # Get the registration page
            driver.get("http://localhost:3000/register")

            # Finds button using its xpath
            registerBtn = driver.find_element(By.XPATH, "//input[@value='Register']")
            registerBtn.submit()

            # Get error message
            messages=driver.find_elements(By.CLASS_NAME, "invalid-feedback")
            overallMessage=""
            for message in messages:
                overallMessage= overallMessage+" "+message.text

            # Test
            self.assertTrue(overallMessage==' Please enter a username! Please enter an email! Please enter a password! Please enter a password! You must agree before submitting.')

        def test_registration_incorrectinput(self):
            # Setup
            options = Options()
            options.add_experimental_option("detach", True)
            chromedriver_autoinstaller.install()
            driver = webdriver.Chrome(options=options)

            # Get the registration page
            driver.get("http://localhost:3000/register")

            # Get the form element inputs
            username = driver.find_element(By.XPATH, "//input[@id='username']")
            email = driver.find_element(By.XPATH, "//input[@id='email']")
            password = driver.find_element(By.XPATH, "//input[@id='password']")
            checkpassword = driver.find_element(By.XPATH, "//input[@id='checkpassword']")
            username.send_keys('hihihi')
            email.send_keys('hi@hi')
            password.send_keys('hihihi')
            checkpassword.send_keys('hihihi')

            # Finds button using its xpath
            registerBtn = driver.find_element(By.XPATH, "//input[@value='Register']")
            registerBtn.submit()

            # Get error message
            messages = driver.find_elements(By.CLASS_NAME, "invalid-feedback")
            overallMessage = ""
            for message in messages:
                overallMessage = overallMessage + " " + message.text

            # Test
            self.assertTrue(
                overallMessage == ' Username should not contain numbers & Minimum of 8 characters Email is not in a valid format Password should be 8 to 20 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character Password should be 8 to 20 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character You must agree before submitting.')

        def test_login_emptyform(self):
            # Setup
            options = Options()
            options.add_experimental_option("detach", True)
            chromedriver_autoinstaller.install()
            driver = webdriver.Chrome(options=options)

            # Get the registration page
            driver.get("http://localhost:3000/login")

            # Finds button using its xpath
            loginBtn = driver.find_element(By.XPATH, "//input[@type='submit']")
            loginBtn.click()

            # Get alert Text
            alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert_text = alert.text

            # Test
            self.assertTrue(alert_text == 'Error: AxiosError: Network Error' or alert_text == 'no such account')

        def test_login_incorrectinput(self):
            # Setup
            # chrome_options = Options()
            options = Options()
            options.add_experimental_option("detach", True)
            chromedriver_autoinstaller.install()
            driver = webdriver.Chrome(options=options)

            # Get the registration page
            driver.get("http://localhost:3000/login")

            email = driver.find_element(By.XPATH, "//input[@id='email']")
            password = driver.find_element(By.XPATH, "//input[@id='inputPwd']")
            email.send_keys('hihihi@hi.com')
            password.send_keys('hihihi')

            # Finds button using its id
            loginBtn = driver.find_element(By.XPATH, "//input[@type='submit']")
            loginBtn.click()

            # Get alert Text
            alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert_text = alert.text

            # Test
            self.assertTrue(alert_text == 'no such account')


if __name__ == '__main__':
    unittest.main()


