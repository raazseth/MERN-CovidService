const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../Config/keys");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already exist",
      });

    const { name, email, password, role } = req.body;

    const hash_password = await bcrypt.hash(password, 8);

    const _user = new User({
      name,
      email,
      role,
      hash_password,
    });

    _user.save((error, user) => {
      if (user) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        const { _id, name, email, hash_password, role } = user;

        return res.status(200).json({
          token,
          user: {
            _id,
            name,
            email,
            role,
            hash_password,
          },
        });
      }
      if (error) {
        return res.status(400).json(console.log(error));
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        req.header("Authorization", token);

        const { _id, name, email, role } = user;

        res.cookie("token", token, { expiresIn: "7d" });
        res.status(200).json({
          token,
          user: {
            _id,
            name,
            email,
            role,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
