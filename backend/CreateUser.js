const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('./User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecret = "Mynameiskillkalaiselvan"

router.post("/createUser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })

            res.json({ succcess: true })
        } catch (error) {
            console.log(error);
            res.json({ succcess: false })

        }
    });




// Define your JWT secret here

router.post("/loginUser",
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
    ],
    async (req, res) => {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;

            // Retrieve user data by email
            const userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: [{ msg: 'User not found' }] });
            }

            // Compare the provided password with the hashed password stored in the database
            const pwdCompare = await bcrypt.compare(password, userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: [{ msg: 'Incorrect password' }] });
            }

            // Create JWT payload
            const data = {
                user: {
                    id: userData._id
                }
            };

            // Sign the JWT token
            const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });

            // Send response with token
            return res.json({ success: true, authToken });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ success: false, error: 'Server error' });
        }
    }
);

module.exports = router;
