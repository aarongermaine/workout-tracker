// require mongoose for our database
const mongoose = require("mongoose");

// use the mongo schema
const Schema = mongoose.Schema;

//create our schema
const workoutTrackerSchema = new Schema({
  //storing our date in time
  time: {
    type: Date,
    default: () => new Date(),
  },
  //exercise details we will store
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Pleas enter a TYPE of exercise",
      },

      name: {
        type: String,
        trim: true,
        required: "Please enter a exercise NAME",
      },

      duration: {
        type: Number,
        required: "Please enter how many MINUTES your exercise will last",
      },

      distance: {
        type: Number,
      },

      sets: {
        type: Number,
      },

      reps: {
        type: Number,
      },

      weight: {
        type: Number,
      },
    },
  ],
});

const Tracker = mongoose.model("Workout", workoutTrackerSchema);

module.exports = Tracker;
