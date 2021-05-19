//require an express top level for our server
const express = require("express");

//require mongo for our database
const mongoose = require("mongoose");

//establish our required port
const PORT = process.env.PORT || 3000;

//create the express application
const app = express();

// use our middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// connect to our mongo database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/WorkoutTracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

//api routes
app.use(require("./routes/api.js"));
app.use(require("./routes/views.js"));

//listener callback
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
