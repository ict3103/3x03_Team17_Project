import "../../styles/login.css";
import { useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import {
  Alert,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import axios from "axios";
import Countdown, { zeroPad } from "react-countdown";
import "../../styles/profile.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Profile = ({ user, logoutUser }) => {
  const history = useHistory();

  const [disabled, setDisabled] = useState({
    otpInput: true,
    verificationButton: false,
    verificationSpinner: false,
    timer: false,
  });

  const [updatingProfile, setUpdatingProfile] = useState(false);

  const [tokenVerified, setTokenVerified] = useState(false);

  const [credentials, setCredentials] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [alert, setAlert] = useState({
    variant: "",
    showAlert: false,
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setCredentials({ ...credentials, [name]: value });
      setShowEmail(value);
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      setAlert({
        showAlert: true,
        variant: "warning",
        text: "Password doesn't match",
      });
    } else {
      // disabling confirm button till previous request is handled
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
                text: "Profile Updated",
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
    }
  };

  const sendOTP = () => {
    setDisabled({
      ...disabled,
      verificationSpinner: true,
      verificationButton: true,
    });
    axios.post("/getOTP").then((response) => {
      if (response.data?.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setDisabled({
          ...disabled,
          otpInput: false,
          verificationSpinner: false,
          verificationButton: true,
          timer: true,
        });
        setAlert({
          showAlert: true,
          variant: "success",
          text: "OTP Sent",
        });

        // For 1 minute the button will be disabled to get OTP
        setTimeout(() => {
          setDisabled({
            ...disabled,
            otpInput: true,
            verificationButton: false,
          });
        }, 60000);
      }
    });
  };

  const verifyOTP = () => {
    const { otp } = credentials;
    const token = JSON.parse(localStorage.getItem("token"));
    setDisabled({ ...disabled, otpInput: true });
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
            text: "OTP Verified",
          });
          setTokenVerified(true);
        } else {
          setAlert({
            showAlert: true,
            variant: "danger",
            text: response.data.result,
          });
          setDisabled({ ...disabled, otpInput: false });
        }
      });
  };

  const maskEmail = (email) => {
    let emailLength = email.slice(0, email.indexOf("@")).length;
    return "*".repeat(emailLength) + email.slice(emailLength, email.length);
  };

  const [showEmail, setShowEmail] = useState(maskEmail(credentials.email));

  useEffect(() => {
    !user && history.push("/login");
  }, [history, user]);

  const { otpInput, verificationSpinner, verificationButton, timer } = disabled;
  const { username, email, password, confirmPassword, otp } = credentials;

  const renderer = ({ minutes, seconds }) => (
    <span>
      {zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );

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
        <Form onSubmit={handleSubmit} className="border rounded">
          <FormGroup className="my-2">
            <FormLabel>Username</FormLabel>
            <FormControl
              type="username"
              onChange={handleChange}
              name="username"
              value={username}
            />
          </FormGroup>{" "}
          <FormGroup className="my-2 email-form">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              onChange={handleChange}
              name="email"
              value={showEmail}
            />
            <span
              className="toggle-email"
              onClick={() => {
                showEmail === email
                  ? setShowEmail(maskEmail(email))
                  : setShowEmail(email);
              }}
            >
              {showEmail === email ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </FormGroup>{" "}
          <FormGroup className="my-2">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              onChange={handleChange}
              name="password"
              value={password}
            />
          </FormGroup>{" "}
          <FormGroup className="my-2">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
            />
          </FormGroup>
          <FormGroup className="my-2">
            <FormLabel>OTP</FormLabel>
            <FormControl
              onKeyUp={() => {
                if (otp.length === 6) {
                  setDisabled({ ...disabled, otpInput: true });
                  verifyOTP();
                }
              }}
              disabled={otpInput}
              name="otp"
              onChange={handleChange}
            />
          </FormGroup>
          {timer && (
            <div className="flex justify-content-center">
              <Countdown date={Date.now() + 60000} renderer={renderer} />
            </div>
          )}
          <div className=" flex flex-column">
            <button
              className="btn btn-dark w-auto my-2 p-2"
              type="button"
              onClick={() => sendOTP()}
              disabled={verificationButton}
            >
              {!verificationSpinner
                ? "Send Verification Code"
                : "Generating OTP..."}
            </button>
            <button
              className="btn btn-dark w-auto"
              type="submit"
              disabled={!tokenVerified}
            >
              {updatingProfile ? "Updating Profile..." : "Confirm"}
            </button>
          </div>
        </Form>
      </div>

      {/* <div id="profile-form">
      </div> */}
    </>
  );
};

export default Profile;
