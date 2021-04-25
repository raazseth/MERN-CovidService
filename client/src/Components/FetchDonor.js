import React from "react";
import "./FetchDonor.css";
import {
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
  FaTransgender,
} from "react-icons/fa";
import moment from "moment";
import { Button, Tooltip } from "@material-ui/core";

function FetchDonor({ donor }) {
  const checkGender = () => {
    if (donor.gender === "Male") {
      return (
        <div className="genderList">
          <FaMale className="genderListIcon" />
          <h4>M</h4>
        </div>
      );
    } else if (donor.gender === "Female") {
      return (
        <div className="genderList">
          <FaFemale className="genderListIcon" />
          <h4>F</h4>
        </div>
      );
    } else if (donor.gender === "Other") {
      return (
        <div className="genderList">
          <FaTransgender className="genderListIcon" />
          <h4>O</h4>
        </div>
      );
    }
  };
  return (
    <div className="mainDonorCard">
      <div className="donorCardHead">
        <h2 className="donorCardName">{donor.name}</h2>
        <p className="donorCardTime">
          Posted On {moment(donor.createdAt).fromNow(true)} ago
        </p>
        <div className="donorCardRight">
          <div className="donorCardCntr">
            <h4 className="donorAge">{donor.age} Years</h4>
            {checkGender()}
            <h4
              className={
                donor.bloodgrp.name === "AB-" && "AB+"
                  ? "donorUseBloodName"
                  : "donorBloodName"
              }
            >
              {donor.bloodgrp.name}
            </h4>{" "}
          </div>
          <div className="donorCardSecond">
            <p className="donorCardnoteTxt">
              <span className="donorCardNote">Note : </span>
              {donor.note.length > 90
                ? donor.note.substring(0, 90)
                : donor.note}
            </p>
            <p className="donorCardStateCity">
              <FaMapMarkerAlt className="donorCardStateCityIcon" />
              {donor.state},{donor.city}
            </p>
            <p className="donorCardAdrs">{donor.address}</p>
          </div>
          <div className="callBtn">
            <Tooltip title="Call Now" placement="top">
              <Button variant="contained" color="secondary">
                <a
                  href={`tel:${+donor.contactnumber}`}
                  style={{ color: "white" }}
                >
                  Contact
                </a>
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default FetchDonor;
