const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://salihayilmz:saliha@cluster0.ligqipx.mongodb.net/notesDB", { useNewUrlParser: true, useUnifiedTopology: true });

const notesSchema = {
  content_1: String,
  content_2: String,
  content_3: String,
  content_4: String,
  content_5: String,
  time: String,
  birlestirilmisContent: String
};



const Note = mongoose.model("Note", notesSchema);

app.use(express.static("public")); // statik dosyaların tutulduğu dizini belirtin

app.get("/", async function(req, res) {
  try {
    const notes = await Note.find({});
    res.render("index", {notes: notes});
  } catch (err) {
    // Handle error
  }
});

app.post("/", function (req, res) {
  const contentCount = req.body.numberOfBoxes;
  const contents = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= contentCount) {
      contents.push(req.body[`content_${i}`]);
    } else {
      contents.push(null);
    }
  }

  let newNote = new Note({
    content_1: contents[0],
    content_2: contents[1],
    content_3: contents[2],
    content_4: contents[3],
    content_5: contents[4]
  });

  newNote.save();
  res.redirect('/');
});


app.post("/", function(req, res) {
  const note = new Note({
    content_1: req.body.content_1,
    content_2: req.body.content_2,
    content_3: req.body.content_3,
    content_4: req.body.content_4,
    content_5: req.body.content_5,
    birlestirilmisContent: req.body.birlestirilmisContent,
    time: req.body.time
  });
  
  note.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
});



app.listen(3000, function () {
  console.log("Server is running on 3000.");
});