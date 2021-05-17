// use our express router
const router = require("express").Router();

// link our tracker model
const Tracker = require("../models/tracker.js");

//POST our workouts to the api
router.post("/api/workouts", (req, res) => {
  //create our document to save to database
  Tracker.create({})
    .then((dbWorkout) => {
      // return with json
      res.json(dbWorkout);
    })
    .catch((err) => {
      //if err then err
      res.json(err);
    });
});

//PUT our workouts with the user
router.put("/api/workouts/:id", ({ body, params }, res) => {
  //update tracker with id
  Tracker.findByIdAndUpdate(
    params.id,
    // push exercises to the body of users schema
    { $push: { exercises: body } },
    // ensure all requirements our met with new exercsie
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      // return with json
      res.json(dbWorkout);
    })
    .catch((err) => {
      //if err then err
      res.json(err);
    });
});

//GET our workouts
router.get("/api/workouts", (req, res) => {
  // pipeline operator to return computed results
  Tracker.aggregate([
    {
      // append the new field to the existing schema
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((dbWorkouts) => {
      // return with json
      res.json(dbWorkouts);
    })
    .catch((err) => {
      //if err then err
      res.json(err);
    });
});

//GET our workouts for our stats
router.get("/api/workouts/range", (req, res) => {
  // pipeline operator to return computed results for the range
  Tracker.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    // sort what is passed so it descends
    .sort({ _id: -1 })
    .then((dbWorkouts) => {
      // return with json
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      //if err then err
      res.json(err);
    });
});

//DELETE selected workouts
router.delete("/api/workouts", ({ body }, res) => {
  Tracker.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
