import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Store for cars
const carStore = [];

app.get("/", (req, res) => {
  res.render("app.ejs", { carStore });
});

// Route to add a car
app.post("/addCar", upload.single("carImage"), (req, res) => {
  const carName = req.body.carName;
  const carImage = req.file ? `/images/${req.file.filename}` : "";
  if (carName && carImage) {
    carStore.push({ id: carStore.length, name: carName, image: carImage });
  }
  res.redirect("/");
});

// Route to search cars
app.get("/search", (req, res) => {
  const searchQuery = req.query.q.toLowerCase();
  const searchResults = carStore.filter((car) =>
    car.name.toLowerCase().includes(searchQuery)
  );
  console.log("Search results:", searchResults); // For debugging
  res.render("app.ejs", { carStore: searchResults });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
