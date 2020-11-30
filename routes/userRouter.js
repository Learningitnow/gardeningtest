const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// router.get("/test",function(req,res){
//     res.send("hello,it is working")
// });

router.post("/register", async function (req, res) {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    //validateion

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "not all fileds have been entered." });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "the password needs to be at least 5 characters long." });
    }

    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "entire same password twice for verificaiton." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "account with this email already exists." });
    }

    if (!displayName) {
        displayName = email;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // console.log(passwordHash);

    const newUser = new User({
        email,
        password: passwordHash,
        displayName,        
    });

    const savedUser = await newUser.save();
     res.json(savedUser);




  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post("/login",async function(req,res){
    try {
        const {email,password} = req.body;
        
        //validate
        if (!email || !password ) {
            return res.status(400).json({ msg: "not all fileds have been entered." });
        }
        
        const user = await User.findOne({email : email});
            if (!user){
                return res.status(400).json({ msg: "no account with this email has been registered." });
            }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({ msg: "invalide credential." });
        }

        const token = jwt.sign(
            {id: user._id}, process.env.JWT_SECRET
        );

        res.json({
            token,
            user:{
                id: user._id,
                displayName: user.displayName,
                email: user.email,
            },


        })
        

    }catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.delete("/delete", auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});




module.exports = router;
