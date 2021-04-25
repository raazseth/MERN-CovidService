import React, { useEffect, useState } from "react";
import "./PostDonor.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { getBloods } from "../Action/categoryAction";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { addDonorProfile } from "../Action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "46ch",
  },
}));

function PostDonor(props) {
  const category = useSelector((state) => state.category);
  const [name, setname] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [bloodgrp, setbloodgrp] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [landmark, setlandmark] = useState("");
  const [address, setaddress] = useState("");
  const [note, setnote] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState({
    nameError: "",
    contactnumberError: "",
    ageError: "",
    genderError: "",
    bloodgrpError: "",
    cityError: "",
    stateError: "",
    landmarkError: "",
    addressError: "",
    noteError: "",
    mainError: "",
  });
  const handleGenderChange = (event) => {
    setgender(event.target.value);
  };

  const handleBloodChange = (event) => {
    setbloodgrp(event.target.value);
  };

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getBloods());
  }, []);
  const Rqrd = "is required";

  const donorCreated = (e) => {
    e.preventDefault();

    // const donorform = new FormData();
    // donorform.append("name", name);
    // donorform.append("contactnumber", contactnumber);
    // donorform.append("age", age);
    // donorform.append("gender", gender);
    // donorform.append("bloodgrp", bloodgrp);
    // donorform.append("city", city);
    // donorform.append("state", state);
    // donorform.append("landmark", landmark);
    // donorform.append("address", address);
    // donorform.append("note", note);

    const donorform = {
      name,
      contactnumber,
      age,
      gender,
      bloodgrp,
      city,
      state,
      landmark,
      address,
      note,
    };

    if (name === "") {
      setError({ ...Error, nameError: `Name ${Rqrd}` });
    } else if (contactnumber === "") {
      setError({ ...Error, contactnumberError: `Contact Number ${Rqrd}` });
    } else if (age === "") {
      setError({ ...Error, ageError: `Age ${Rqrd}` });
    } else if (gender === "") {
      setError({ ...Error, genderError: `Gender ${Rqrd}` });
    } else if (bloodgrp === "") {
      setError({ ...Error, bloodgrpError: `Blood ${Rqrd}` });
    } else if (city === "") {
      setError({ ...Error, cityError: `City ${Rqrd}` });
    } else if (state === "") {
      setError({ ...Error, stateError: `State ${Rqrd}` });
    } else if (landmark === "") {
      setError({
        ...Error,
        landmarkError: `Enter Nearby Famous Places`,
      });
    } else if (address === "") {
      setError({ ...Error, addressError: `Address ${Rqrd}` });
    } else if (note === "") {
      setError({ ...Error, noteError: `Your Description ${Rqrd}` });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(addDonorProfile(donorform))
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
        props.history.push(`/`);
        setname("");
        setcontactnumber("");
        setage("");
        setbloodgrp("");
        setgender("");
        setcity("");
        setstate("");
        setlandmark("");
        setaddress("");
        setnote("");
      }, 2000);
    }
  };

  return (
    <div className="mainDonorForm">
      <div className="PostDonorForm">
        <h1 style={{ textAlign: "center", marginBottom: ".5em" }}>
          Donate Plasma
        </h1>
        <TextField
          label="Name"
          id="outlined-margin-dense"
          placeholder="Enter Your Name"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={name}
          error={Error.nameError ? true : false}
          onChange={(e) => setname(e.target.value)}
        />
        <TextField
          label="Contact Number"
          id="outlined-margin-dense"
          placeholder="Your Contact Number"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={contactnumber}
          error={Error.contactnumberError ? true : false}
          onChange={(e) => setcontactnumber(e.target.value)}
        />
        <TextField
          label="Age"
          id="outlined-margin-dense"
          placeholder="Age"
          className={classes.textField}
          // helperText="Some important text"
          error={Error.ageError ? true : false}
          margin="dense"
          variant="outlined"
          value={age}
          onChange={(e) => setage(e.target.value)}
        />
        <div>
          <div className="bloodOpt">
            <FormControl
              component="fieldset"
              error={Error.genderError ? true : false}
            >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="bloodOpt">
          <FormControl
            component="fieldset"
            className={classes.formControl}
            error={Error.bloodgrpError ? true : false}
          >
            <TextField
              id="standard-select-bloodgrp"
              select
              label="Select"
              value={bloodgrp}
              onChange={handleBloodChange}
              helperText="Select Your Blood Group"
            >
              {category.blood.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </div>
        <TextField
          label="City"
          id="outlined-margin-dense"
          placeholder="City"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          error={Error.cityError ? true : false}
        />
        <TextField
          label="State"
          id="outlined-margin-dense"
          placeholder="State"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={state}
          onChange={(e) => setstate(e.target.value)}
          error={Error.stateError ? true : false}
        />
        <TextField
          label="LandMark"
          id="outlined-margin-dense"
          placeholder="Nearby Famous Place..."
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={landmark}
          onChange={(e) => setlandmark(e.target.value)}
          error={Error.landmarkError ? true : false}
        />{" "}
        <TextField
          label="Address"
          id="outlined-margin-dense"
          placeholder="Detail Your Address"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          error={Error.addressError ? true : false}
        />{" "}
        <TextField
          label="Note"
          id="outlined-margin-dense"
          placeholder="Note"
          className={classes.textField}
          helperText="Did you have any disease like diabetes or blood pressure or Did you get infected with covid in past few weeks?"
          margin="dense"
          variant="outlined"
          multiline
          rows={5}
          value={note}
          onChange={(e) => setnote(e.target.value)}
          error={Error.noteError ? true : false}
          inputProps={{ maxLength: 90 }}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={donorCreated}
          style={{ marginTop: "1em", marginBottom: "1em" }}
        >
          {Loading ? (
            <CircularProgress
              color="secondary"
              style={{ marginRight: "1em", color: "white" }}
              size={20}
            />
          ) : null}
          Post Donor Profile
        </Button>
      </div>
    </div>
  );
}

export default PostDonor;
