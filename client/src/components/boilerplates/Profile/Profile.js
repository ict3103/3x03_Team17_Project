import "../../../styles/login.css";
import { useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import {
  Alert,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Countdown, { zeroPad } from "react-countdown";
import "../../../styles/profile.css";
import ProfileFieldsForm from "./ProfileFieldsForm";

const Profile = ({ user, logoutUser }) => {
  const history = useHistory();

  const [disbaledFields, setDisabledFields] = useState({
    updateBtn: true,
    emailField: true,
    otpInput: false,
  });

  const [step, setStep] = useState(1);

  const [otpInfo, setOtpInfo] = useState({
    sendingOTP: true,
    otpSent: false,
    startTimer: false,
    timerValue: 0,
  });

  const [formSubmission, setFormSubmission] = useState({
    startFormSubmission: false,
  });

  const [updatingProfile, setUpdatingProfile] = useState(false);

  const [credentials, setCredentials] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  // State for handling email and username changes
  const [prevCredentials, setPrevCredentials] = useState({
    email: null,
    username: null,
  });

  const [alert, setAlert] = useState({
    variant: "",
    showAlert: false,
    text: "",
  });

  // function to control the proceed button disabled
  // attribute depending upon password value
  const handlePasswordChange = (value) => {
    const { password } = credentials;
    setDisabledFields({ ...disbaledFields, updateBtn: !(password === value) });
  };

  // function to accomodate state changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setCredentials({ ...credentials, [name]: value });
      return;
    } else if (name === "confirmPassword") {
      setCredentials({ ...credentials, [name]: value });
      handlePasswordChange(value);
    } else if (name === "username") {
      setCredentials({ ...credentials, [name]: value });
      setDisabledFields({
        ...disbaledFields,
        updateBtn: prevCredentials.username === value,
      });
    } else if (name === "email") {
      setCredentials({ ...credentials, [name]: value });
      setShowEmail(value);
      setDisabledFields({
        ...disbaledFields,
        updateBtn: prevCredentials.email === value,
      });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  // function to handle form submission when otp is verfied
  const handleSubmit = () => {
    // e.preventDefault();
    const { username, email, password } = credentials;

    // diabling confirm button till previous request is handled
    setUpdatingProfile(true);
    // Restricting requests till previous one is handled
    !updatingProfile &&
      axios
        .put(`http://127.0.0.1:5000/updateProfile/${user.id}`, {
          username,
          email,
          password,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setAlert({
              showAlert: true,
              variant: "primary",
              text: "Profile updated",
            });
            setUpdatingProfile(false);
            logoutUser();
            history.push("/");
          } else if (response.data.status === 400) {
            setAlert({
              showAlert: true,
              variant: "danger",
              text: response.data.result,
            });
            setUpdatingProfile(false);
          }
        });
  };

  // function to send OTP
  const sendOTP = () => {
    setOtpInfo({ sendingOTP: true, otpSent: false });
    axios
      .post("/getOTP", {
        email: prevCredentials.email,
      })
      .then((response) => {
        if (response.data?.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          setAlert({
            showAlert: true,
            variant: "success",
            text: "OTP sent, please check your email.",
          });
          setOtpInfo({
            sendingOTP: false,
            otpSent: true,
            startTimer: true,
            timerValue: Date.now() + 60000,
          });
        }
      });
  };

  // function to verify otp and submitting form if otp is verified
  const verifyOTP = () => {
    const { otp } = credentials;
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post(`/verifyOTP`, {
        token,
        otp,
      })
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.removeItem("token");
          setAlert({
            showAlert: true,
            variant: "success",
            text: "OTP verified! Logging you out..",
          });
          setOtpInfo({ ...otpInfo, startTimer: false });
          setDisabledFields({ ...disbaledFields, otpInput: true });
          setFormSubmission({ startFormSubmission: true });
          handleSubmit();
        } else {
          setAlert({
            showAlert: true,
            variant: "danger",
            text: response.data.result,
          });
        }
      });
  };

  // function to mask email
  const maskEmail = (email) => {
    let emailLength = email.slice(0, email.indexOf("@")).length;
    return "*".repeat(emailLength) + email.slice(emailLength, email.length);
  };

  const [showEmail, setShowEmail] = useState(maskEmail(credentials.email));

  useEffect(() => {
    !user && history.push("/login");
    // Setting previous email and username on mounting if user is not null i.e logged in
    if (localStorage.getItem("user")) {
      let { email, username } = JSON.parse(localStorage.getItem("user"));
      setPrevCredentials({ email: email, username: username });
    }
  }, [history, user]);

  const { username, email, password, confirmPassword, otp } = credentials;

  // function to handle timer rendering
  const renderer = ({ minutes, seconds }) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );

  // function to handle disable attribute on email input
  const toggleEmailView = () => {
    if (showEmail === email) {
      setShowEmail(maskEmail(email));
      setDisabledFields({
        ...disbaledFields,
        emailField: true,
      });
    } else {
      setShowEmail(email);
      setDisabledFields({
        ...disbaledFields,
        emailField: false,
      });
    }
  };

  // function to proceed to otp verification form
  const handleProceed = () => {
    const { password, confirmPassword } = credentials;
    if (password !== confirmPassword) {
      setAlert({
        showAlert: true,
        variant: "warning",
        text: "Password does not match, please try again.",
      });
      return;
    }
    setStep(step + 1);
    sendOTP();
  };

  const { updateBtn, emailField, otpInput } = disbaledFields;
  const { sendingOTP, otpSent, startTimer, timerValue } = otpInfo;
  const { startFormSubmission } = formSubmission;
  return (
    <>
      {alert.showAlert && (
        <Alert
          style={{
            width: "100vw",
          }}
          variant={alert.variant}
        >
          {alert.text}
        </Alert>
      )}
      <div className="profile-form">
        <h1 className="fw-bold fs-3 px-2 py-1">Update Profile</h1>
        {step === 1 ? (
          <ProfileFieldsForm
            confirmPassword={confirmPassword}
            email={email}
            emailField={emailField}
            handleChange={handleChange}
            handleProceed={handleProceed}
            password={password}
            showEmail={showEmail}
            toggleEmailView={toggleEmailView}
            updateBtn={updateBtn}
            username={username}
          />
        ) : step === 2 && sendingOTP ? (
          <div className="flex flex-column align-items-center justify-content-center my-4">
            <Spinner animation="grow" />
            <div>Sending OTP to Registered Email..</div>
          </div>
        ) : otpSent && startFormSubmission ? (
          <div className="flex flex-column align-items-center justify-content-center my-4">
            <Spinner animation="grow" />
            <div>Updating Profile..</div>
          </div>
        ) : (
          <Form className="border rounded p-2">
            <FormGroup className="my-2">
              <FormLabel>OTP</FormLabel>
              <FormControl
                onKeyUp={() => {
                  otp.length === 6 && verifyOTP();
                }}
                name="otp"
                disabled={otpInput}
                onChange={handleChange}
              />
            </FormGroup>
            {startTimer && (
              <div className="flex justify-content-center">
                <Countdown date={timerValue} renderer={renderer} />
              </div>
            )}
          </Form>
        )}
      </div>
    </>
  );
};

export default Profile;
