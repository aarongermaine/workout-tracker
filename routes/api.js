// use our express router
const router = require("express").Router();

// link our tracker model
const Tracker = require("../models/tracker.js");

//POST our workouts to the api
router.post("/api/workouts", (req, res) => {});

//PUT our workouts with the user
router.put("/api/workouts/:id", ({ body, params }, res) => {});

//GET our workouts
router.get("/api/workouts", (req, res) => {});

//GET our workouts for our stats
router.get("/api/workouts/range", (req, res) => {});

//DELETE selected workouts
router.delete("/api/workouts", ({ body }, res) => {});

module.exports = router;
