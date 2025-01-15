import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import handleFetchFromYt from "./youtube.js";
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.get("/link", handleFetchFromYt);
app.get("*", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "No URL provided" });
    }
    const response = await fetch(url);
    console.log(response.headers);
    if (!response.ok) {
      return res.status(404).json({ error: "Failed to fetch file" });
    }
    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    response.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port: ", 3000);
});
