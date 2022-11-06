import React from "react";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
const ProfileFieldsForm = ({
  username,
  showEmail,
  emailField,
  handleChange,
  handleProceed,
  email,
  password,
  confirmPassword,
  updateBtn,
  toggleEmailView
}) => {
  return (
    <>
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
          disabled={emailField}
        />
        <span className="toggle-email" onClick={toggleEmailView}>
          {showEmail === email ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </FormGroup>{" "}
      <FormGroup className="my-2">
        <FormLabel>New Password</FormLabel>
        <FormControl
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
      </FormGroup>{" "}
      <FormGroup className="my-2">
        <FormLabel>Confirm New Password</FormLabel>
        <FormControl
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
      </FormGroup>
      <button
        onClick={handleProceed}
        className="btn btn-dark w-full"
        disabled={updateBtn}
      >
        Proceed
      </button>
    </>
  );
};

export default ProfileFieldsForm;
