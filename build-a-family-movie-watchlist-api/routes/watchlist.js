import express from "express";
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js";

const router = express.Router();
router.get("/:userId", (req, res) => {
    const list = getWatchlist(Number(req.params.userId))
    return res.status(200).json(list)
})
router.post("/:userId/movies", (req, res) => {
    if (req.user.role === "child" && Number(req.params.userId) !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
    }
    const movie = { title: req.body.title, genre: req.body.genre }
    addMovie(Number(req.params.userId), movie)
    res.status(201).json(movie);
})
router.put("/:userId/movies/:movieId", (req, res) => {
    if (req.user.role === "child" && Number(req.params.userId) !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
    }
    const update = { updates: req.body.updates }
    updateMovie(Number(req.params.userId), req.params.movieId, update)
    res.status(200).json(update)

})
router.delete("/:userId/movies/:movieId", (req, res) => {
    if (req.user.role === "child" && Number(req.params.userId) !== req.user.id) {
        return res.status(403).json({ error: "Forbidden" });
    }
    const movieDelete = deleteMovie(Number(req.params.userId), Number(req.params.movieId))
    console.log("params:", req.params, "requester:", req.user.id, req.user.role);
    console.log("result:", movieDelete);
    res.status(200).json(movieDelete)
})
export default router;