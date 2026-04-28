const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        console.log("Signup request body:", req.body);
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password_hash: hashed,
            role
        });

        res.json({ msg: "User created", user: { id: user.id, name: user.name, email: user.email, role: user.role }   });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email required" });
        }
        
        if (!password) {
            return res.status(400).json({ msg: "Password required" });
        }
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }


        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ msg: "Login successful", token });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
};
