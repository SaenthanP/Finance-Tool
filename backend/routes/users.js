const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/isAuthenticated', passport.authenticate('jwt', { session: false }), (req, res) => {

    return res.status(200).json(true);
});
router.get('/test', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json(true);

    }
    else {
        return res.status(200).json(false);

    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ Error: "Not all fields have been entered" });
        }
        User.findOne({ username: username }).then(user => {
            if (!user) {
                return res.status(400).json({ Error: "Invalid Login" });
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        username: user.username,
                        id: user._id
                    };
                    const token = "Bearer " + jwt.sign(payload, process.env.SECRET, { expiresIn: 43200 });

                    return res.status(200).json({ token, payload });
                } else {
                    return res.status(400).json({ Error: "Invalid Login" });

                }

            });

        });
    } catch (err) {
        return res.status(500).json({ Error: err });

    }
});

router.post('/register', async (req, res) => {

    try {
        let { username, password, confirmPassword } = req.body;
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ Error: "Not all fields entered" });
        }
        if (username.length < 3) {
            return res.status(400).json({ Error: "Username is not atleast 3 characters long" });
        }
        if (password.length < 8) {
            return res.status(400).json({ Error: "Password is not atleast 8 characters long" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ Error: "Passwords do not match" });
        }
        const isTaken = await User.findOne({ username: username });
        if (isTaken) {
            return res.status(400).json({ Error: "Username is taken" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        newUser.save()
            .then((user) => res.json({ user: user }))
            .catch(err => res.status(400).json({ Error: err }));
    } catch (err) {
        return res.status(500).json({ Error: err });
    }
});
module.exports = router;