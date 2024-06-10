import React, { useState } from "react";
import styles from "./form.module.css";

const UserForm = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "male",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [submitBtn, setSubmitBtn] = useState(false);

  const handleChange = (name, value) => {

    validateFormData(name, value);
  };

  const validateFormData = (data, value) => {
    let nameRegex = /^[a-zA-Z ]{2,15}$/;
    let emailRegex = /[a-zA-Z0-9_]{3,}@[A-Za-z]{3,}\.[A-Za-z]{2,}/gm;

    switch (data) {
      case "firstName":
        if (!(value.length > 3 && nameRegex.test(value))) {
          setErrorMessage("Invalid first name");
        } else {
          setErrorMessage("");
          setInputs((prev) => ({ ...prev, [data]: value }));
        }
        break;
      case "lastName":
        if (!(value.length > 3 && nameRegex.test(value))) {
          setErrorMessage("Invalid last name");
        } else {
          setErrorMessage("");
          setInputs((prev) => ({ ...prev, [data]: value }));
        }
        break;
      case "email":
        if (!(value.length > 3 && emailRegex.test(value))) {
          setErrorMessage("Invalid email id");
        } else {
          setErrorMessage("");
          setInputs((prev) => ({ ...prev, [data]: value }));
        }
        break;
      case "password":
        if (!(value.length > 8)) {
          setErrorMessage("Your password must be at least 8 characters");
        } else if (value.search(/[a-z]/i) < 0) {
          setErrorMessage("Your password must contain at least one letter.");
        } else if (value.search(/[0-9]/) < 0) {
          setErrorMessage("Your password must contain at least one digit.");
        } else {
          setErrorMessage("");
          setInputs((prev) => ({ ...prev, [data]: value }));
        }
        break;
      case "dob":
        let g1 = new Date(value);
        let minDob = new Date("01-01-2010");
        if (g1.getTime() < minDob.getTime()){
          setInputs((prev) => ({ ...prev, [data]: value }));
          setErrorMessage("");
        }
        else{
          setErrorMessage("Age limit issue");
          }
          break;
      case "gender":
        setInputs((prev) => ({ ...prev, [data]: value }));
        break;
      default:
        setErrorMessage("");
        break;
      }
      setSubmitBtn('true')
  };

  const submitForm = () => {
    const { firstName, lastName, email, password, dob, gender } = inputs;

    if (firstName && lastName && email && password && dob && gender) {
      console.log(firstName, lastName, email, password, dob, gender);
    } else {
      setErrorMessage("please enter all the details.");
    }
  };

  return (
    <div>
      <h3 className={styles.formTitle}>Signup Form</h3>

      {/* <form className={styles.userForm}> */}
      <div className={styles.userForm}>
        <h5 className={styles.errorMsg}>{errorMessage}</h5>
        <div className={styles.userName}>
          <div className={styles.firstName}>
            <label className={styles.formLabel}>
              First Name<span className={styles.impField}>*</span> :
            </label>
            <input
              type="text"
              name="firstName"
              autoFocus
              onKeyUp={(e) => handleChange(e.target.name, e.target.value)}
              className={styles.inputField}
              defaultValue={inputs.firstName || ""}
            />
          </div>
          <div className={styles.lastName}>
            <label className={styles.formLabel}>
              Last Name<span className={styles.impField}>*</span> :
            </label>
            <input
              type="text"
              name="lastName"
              onKeyUp={(e) => handleChange(e.target.name, e.target.value)}
              className={styles.inputField}
              defaultValue={inputs.lastName || ""}
            />
          </div>
        </div>

        <div className={styles.container}>
          <label className={styles.formLabel}>
            Email<span className={styles.impField}>*</span> :
          </label>
          <input
            type="email"
            name="email"
            onKeyUp={(e) => handleChange(e.target.name, e.target.value)}
            className={styles.inputField}
            defaultValue={inputs.email || ""}
          />
        </div>

        <div className={styles.container}>
          <label className={styles.formLabel}>
            Password<span className={styles.impField}>*</span> :
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={styles.inputField}
            defaultValue={inputs.password || ""}
          />
        </div>

        <div className={styles.container}>
          <label className={styles.formLabel}>
            DOB<span className={styles.impField}>*</span> :
          </label>
          <input
            type="date"
            name="dob"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={styles.inputField}
            defaultValue={inputs.dob || ""}
          />
        </div>

        <div className={styles.container}>
          <label className={styles.formLabel}>
            Gender<span className={styles.impField}>*</span> :
          </label>
          <select name="gender" className={styles.genderDropdown}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.submitBtnContainer}>
          {submitBtn ? (
            <button className={styles.submitBtn} onClick={submitForm}>
              Submit
            </button>
          ) : (
            <button className={styles.submitBtn} onClick={submitForm} disabled>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
