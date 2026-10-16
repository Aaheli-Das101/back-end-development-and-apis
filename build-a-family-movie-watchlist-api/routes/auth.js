import express from "express";
import { findByUsername } from "../utils/db.js";
import bcrypt from "bcryptjs"
import { signToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!username || !password) {
        return res.status(400).send("Username and password are required")
    }
    const user = findByUsername(username)
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken({ id: user.id, username: user.username, role: user.role })
    return res.status(200).json({ message: "Login successful", token })
})
export default router