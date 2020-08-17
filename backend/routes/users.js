const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ Error: "Not all fields entered" })
        }
       await User.findOne({ username: username }).then(user => {
            if (!user) {
                return res.status(400).json({ Error: "Invalid Login" });
            }
            bcrypt.compare(password,user.password).then(isMatch=>{
                if(isMatch){
                    const payload={
                        username:user.username,
                        id:user._id
                    };
                    const token="Bearer "+jwt.sign(payload,process.env.SECRET,{expiresIn: 43200 });
                    return res.status(200).json({token:token});

                }else{
                    return res.status(200).json({token:token});

                }
            });
        });
    } catch (err) {
        return res.status(500).json({ Error: err });
    }
});

router.post('/register', async (req, res) => {
    try {
        let { username, password,comfirmPassword } = req.body;
        if (!username || !password||!confirmPassword) {
            return res.status(400).json({ Error: "Not all fields entered" })
        }
        const isTaken=await User.findOne({username:username});
        if(isTaken){
            return res.status(400).json({ Error: "Username is Taken" })
        }
        if(password<8){
            return res.status(400).json({ Error: "Password must atleast 8 characters" })
        }
        if(password!==confirmPassword){
            return res.status(400).json({ Error: "Passwords do not match" })
        }
        const salt=await bcrypt.genSalt(12);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            username,
            password:hashedPassword,
        });

        newUser.save()
        .then((user)=>res.json({user:user}))
        .catch(err=>res.status(400).json({Error:err}));
    } catch (err) {
        return res.status(500).json({ Error: err });
    }
});
module.exports = router;