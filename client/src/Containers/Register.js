import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import donorImg from "../Assets/donor.svg";
import patientImg from "../Assets/patient.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { signup } from "../Action/userActions";

function Register(props) {
  const auth = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const [visiblePass, setvisiblePass] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [Greeting, setGreeting] = useState({ Fail: "", Success: "" });
  const [Error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
    roleError: "",
  });

  const registerNow = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      role,
    };

    if (role === "") {
      setError({ ...Error, roleError: "Role is required" });
    } else if (email === "") {
      setError({ ...Error, emailError: "Email is required" });
    } else if (name === "") {
      setError({ ...Error, nameError: "Name is required" });
    } else if (password === "") {
      setError({ ...Error, passwordError: "Password is required" });
    } else if (password.length < 6) {
      setError({
        ...Error,
        passwordLengthError: "Password must be longer than 6 characters",
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch(signup(user))
          .then((res) =>
            setGreeting({ ...Greeting, Success: "Logged In Sucessfully" })
          )
          .catch((error) =>
            setGreeting({
              ...Greeting,
              Fail: "Something Went Wrong",
            })
          );
        setLoading(false);
      }, 2000);
    }
  };

  const CheckingUser = () => {
    if (auth.authenticate && role === "donor") {
      props.history.push("/postasdonor");
    } else if (auth.authenticate && role === "patient") {
      props.history.push("/postaspatient");
    } else if (auth.authenticate) {
      props.history.push("/");
    }
  };
  CheckingUser();

  return (
    <div>
      <form noValidate autoComplete="off" className="regForm">
      <h1 style={{textAlign:"center",marginBottom:".5em"}}>Create Account</h1>

        <div className="mainRegisterImg">
          <div
            onClick={() => setrole("donor")}
            className={role === "donor" ? "roleImgActiveDiv" : " roleImgDiv"}
          >
            <img
              src={donorImg}
              alt="donorImg"
              className={" roleImg"}
              onClick={() => setrole("donor")}
            />
            <label>I am a donor and want to donate</label>
          </div>
          <div
            onClick={() => setrole("patient")}
            className={role === "patient" ? "roleImgActiveDiv" : " roleImgDiv"}
          >
            <img
              src={patientImg}
              alt="patientImg"
              onClick={() => setrole("patient")}
              className={" roleImg"}
            />
            <label>I am a patient and looking for help</label>
          </div>
        </div>
        <div className="registerField">
          {Error.roleError ? (
            <span className="ErrorStyle">{Error.roleError}</span>
          ) : null}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            margin="dense"
            type="email"
            error={Error.emailError ? true : false}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            margin="dense"
            error={Error.nameError ? true : false}
            onChange={(e) => setname(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            margin="dense"
            error={Error.nameError ? true : false}
            type={visiblePass ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                onClick={() => setvisiblePass(!visiblePass)}
              />
            }
            label="Show Password"
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={registerNow}
          >
            Register
          </Button>
          <span style={{ marginTop: ".5em" }}>
            Already A User?{" "}
            <a style={{ color: "blue" }} href="/login">
              Login Now
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
