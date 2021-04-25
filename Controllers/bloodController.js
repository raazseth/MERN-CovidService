const slugify = require("slugify");
const Blood = require("../Models/bloodModel");

exports.addBlood = (req, res) => {
  const bldobj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  const cat = new Blood(bldobj);
  cat.save((error, blood) => {
    if (error) return res.status(400).json({ error });
    if (blood) {
      return res.status(200).json({ blood });
    }
  });
};

exports.getBlood = (req, res) => {
  Blood.find({}).exec((error, blood) => {
    if (error) return res.status(400).json({ error });
    if (blood) {
      return res.status(200).json({ blood });
    }
  });
};
