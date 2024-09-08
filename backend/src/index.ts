import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { error } from "console";

const app = express();

app.use(cors());
app.use(express.json());

const readFile = async () => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../database/data.json`,
      "utf-8"
    );
    const data = JSON.parse(rawData);
    return data;
  } catch (error) {
    console.error("Error reading file", error);
    return null;
  }
};

app.get("/posts", async (req, res) => {
  const posts = await readFile();
  if (!posts) return res.sendStatus(500);

  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const result = req.body;
  if (!result || !result.userId || !result.title || !result.body) {
    return res.status(400).json({ error: "Invalid post data" });
  }

  const posts = await readFile();
  if (!posts) return res.sendStatus(500);

  const newId = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

  const newPost = {
    userId: result.userId,
    id: newId,
    title: result.title,
    body: result.body,
  };

  try {
    await fs.writeFile(
      `${__dirname}/../database/data.json`,
      JSON.stringify([...posts, newPost], null, 2)
    );
    res.json(newPost);
  } catch (error) {
    console.error("Failed to save new post", error);
    res.sendStatus(500);
  }
});

app.listen(4002);
