const Donor = require("../Models/donorModel");
const Patient = require("../Models/patientModel");

exports.addDonor = (req, res) => {
  const {
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
  } = req.body;

  const donor = new Donor({
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
    createdBy: req.user._id,
  });

  donor.save((error, donor) => {
    if (error) return res.status(400).json({ error });
    if (donor) {
      res.status(200).json({ donor });
    }
  });
};

exports.getDonor = async (req, res) => {
  const donor = await Donor.find()
    .populate("createdBy bloodgrp", "name email")
    .exec();
  res.status(200).json({ donor });
};

exports.addPatient = (req, res) => {
  const {
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
    hospital,
    disease,
    casesheet,
  } = req.body;

  const patient = new Patient({
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
    hospital,
    disease,
    casesheet,
    createdBy: req.user._id,
  });

  patient.save((error, patient) => {
    if (error) return res.status(400).json({ error });
    if (patient) {
      res.status(200).json({ patient });
    }
  });
};

exports.getPatient = async (req, res) => {
  const patient = await Patient.find()
    .populate("createdBy bloodgrp", "name email")
    .exec();
  res.status(200).json({ patient });
};
