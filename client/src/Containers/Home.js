import React, { useEffect } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDonorProfile, getAllPatientDonorProfile } from "../Action";
import Header from "../Components/Header";
import FetchDonor from "../Components/FetchDonor";
import FetchPatient from "../Components/FetchPatient";
import { Link } from "react-router-dom";
import BloodDonation from "../Assets/BloodDonation.svg";
import Footer from "../Components/Footer";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const donor = useSelector((state) => state.donor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDonorProfile());
    dispatch(getAllPatientDonorProfile());
  }, []);

  return (
    <div>
      <div className="homeUpperHead">
        <Header />
        <div className="mainHome">
          <div className="homeHead">
            <h1>SAVE LIVES WITH PLASMA</h1>
            <div className="innerHomeHead">
              <p>Plasma from recovered COVID-19 patients can help save lives</p>
              <p style={{ fontSize: "12px", marginTop: "4px" }}>
                *Plasma therapy is an experimental COVID therapy. Before you
                register, please consult your doctor if this is required. Only
                patients with a case sheet from the doctor on duty will be
                matched.
              </p>
            </div>

            <img src={BloodDonation} alt="Doctor" className="mainHomeImg" />
          </div>{" "}
        </div>{" "}
      </div>
      <div className="homeSectionTwo">
        <div className="homeSectionTwoCntnt">
          <h1>PLEASE LET US KNOW</h1>
          <div className="homeSectionTwoCntntMain">
            <div className="homeSectionTwoC1">
              <h2>WANT TO DONATE PLASMA</h2>
              <p>
                Recovered or quarantined patients of COVID-19 who are willing to
                donate
              </p>

              <Link to={auth.authenticate ? "postasdonor" : "/register"}>
                <button className="homeReg">Register Here</button>
              </Link>
            </div>
            <div className="homeSectionTwoC2">
              <h2>LOOKING FOR PLASMA</h2>
              <p>If you are looking out for a donor, register here</p>
              <Link to={auth.authenticate ? "/postaspatient" : "/register"}>
                <button className="homeReg">Register Here</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="homeSectionThree">
        <h1 className="donorTxt">Donors</h1>
        <div className="donorList">
          {donor.donor.length > 0
            ? donor.donor
                .slice(0)
                .reverse()
                .map((donor) => <FetchDonor donor={donor} />)
            : null}
        </div>
        <h1 className="donorTxt">Patient Requests</h1>
        <div className="donorList">
          {donor.patient.length > 0
            ? donor.patient
                .slice(0)
                .reverse()
                .map((donor) => <FetchPatient donor={donor} />)
            : null}
        </div>
      </div>
      {/* <div className="homeImgSection">
        <div>
          <h1>13Vi Se Bachna Hai Toh Ghar Pe Raho</h1>
          <h2>#Use Mask, #Stay Home</h2>
        </div>
      </div> */}
      <div className="homeSectionLast">
        <Footer />
      </div>
    </div>
  );
}
