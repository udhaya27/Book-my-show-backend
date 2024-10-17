const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config()
const URL = process.env.DB;

const DB_NAME = "movie_db";

const COLLECTION_NAME = "movies";
app.use(
  cors({
    origin: "*",
  })
);

app.get("/movie/get-movies", async (req, res) => {
  try {
    // Step 1. Connect the Database
    const client = new MongoClient(URL, {}).connect();

    // Step 2. Select the DB
    let db = (await client).db(DB_NAME);

    // Step 3. Select the Collection
    let collection = await db.collection(COLLECTION_NAME);

    // Step 4. Do the operation
    let movies = await collection.find({}).toArray();

    // Step 5. Close the connection
    (await client).close();

    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/movie/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Step 1. Connect the Database
    const client = new MongoClient(URL, {}).connect();

    // Step 2. Select the DB
    let db = (await client).db(DB_NAME);

    // Step 3. Select the Collection
    let dbcollection = await db.collection(COLLECTION_NAME);

    let movie = await dbcollection.findOne({ _id: new ObjectId(id) });

    (await client).close();

    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/book-ticket", (req, res) => {});

app.listen(8000);

