import express from "express";
import redirects from "./config";

const app = express();

Object.entries(redirects).forEach(([path, url]) => {
  app.get(path, (_req, res) => {
    res.redirect(302, url);
  });
});

app.get("/", (_req, res) => {
  const availableRoutes = Object.keys(redirects);
  res.send(`Available redirects:\n${availableRoutes.join("\n")}`);
});

app.use((_req, res) => {
  const availableRoutes = Object.keys(redirects);
  res
    .status(404)
    .send(
      `Route not found.\n\nAvailable redirects:\n${availableRoutes.join("\n")}`
    );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Available redirects:", Object.keys(redirects));
});
