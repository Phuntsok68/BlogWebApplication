import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const store = [];
app.get("/", (req, res) => {
  res.render("app.ejs", { myTweet: "", myStore: store });
});

app.post("/post", (req, res) => {
  console.log(req.body.tweet);
  const data = req.body.tweet;
  // const store=[]
  // The reason you can't keep all the tweets in the store array with the code you've provided is because the store array is re-initialized as an empty array every time a new request is made to the /post route.
  if (data) {
    store.push({ id: store.length, text: data });
    console.log(store);
  }

  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const { id, text } = req.body;
  const tweet = store.find((tweet) => tweet.id == id);
  if (tweet) {
    tweet.text = text;
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const { id } = req.body;
  const index = store.findIndex((tweet) => tweet.id == id);
  if (index !== -1) {
    store.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
