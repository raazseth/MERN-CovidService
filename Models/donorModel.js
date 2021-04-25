const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodgrp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blood",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donor", donorSchema);
