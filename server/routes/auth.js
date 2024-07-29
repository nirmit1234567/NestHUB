const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User.js");

//configuration multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // store the uploaded file in the  upload folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});

const upload = multer({ storage });

//user register
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    //take all information of the form
    const { firstName, lastName, email, password } = req.body;

    //upload file will be available as req.file
    const profileImage = req.file;
    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    //path to the uploaded profile photo
    const profileImagePath = profileImage.path;

    //create if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exist" });
    }

    //hass the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    //save the new user
    await newUser.save();

    //send a successful message
    res.status(200).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed!" });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    //take all information of the form
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "user doesn't exist" });
    }
    //compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(409).json({ message: "Invalid Credentials!" });
    }

    //generate jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
