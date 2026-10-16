import { verifyToken } from "../utils/jwt.js"
import { isBlacklisted } from "../utils/token-blacklist.js";

export function authenticate(req, res, next) {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided." });
    }
    const token = bearer.split(" ")[1];
    if (isBlacklisted(token)) {
        return res.status(401).json({
            error: "Token has been invalidated. Log in again."
        })
    }
    const payload = verifyToken(token)
    if (!payload) {
        return res.status(401).json({ error: "Invalid or expired token." })
    }
    req.user = payload
    next();
}