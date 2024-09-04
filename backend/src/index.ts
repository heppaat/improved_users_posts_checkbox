import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const readFile = async () => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../backend/data.json`,
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

app.listen(4002);
