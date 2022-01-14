import express, { Request, Response } from "express";
import path from "path";
import { __prod__, ENVIRONMENT, NASA_API } from "./util/secrets";

// Create Express server
const app = express();
const port = process.env.PORT || 8080;

// Express configuration
app.set("port", port);
app.set("env", ENVIRONMENT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
if (__prod__) app.use(express.static(path.join(__dirname, "..", "view", "build")));

/**
 * Primary app routes.
 */
app.get("/api/", (req: Request, res: Response) => {
  res.json({ status: 200 });
});

/**
 * The 'catchall' handler; for any request that doesn't
 * match the ones above then send back React's index.html
 */
app.get("/*", (req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, "..", "view", "build", "index.html"))
);

app.listen(app.get("port"), () => {
  console.log("[NODE] Running on http://localhost:%d in %s mode", app.get("port"), app.get("env"));
  console.log("[NODE] Press CTRL-C to shutdown the server\n");
});

process.on("SIGINT", () => {
  //db.close(() => {
  console.log("\nMongoDB: Successfully closed connection to the database.");
  console.log(`[NODE] Gracefully shutting down with SIGINT signal.`);
  process.exit(0);
  //});
});

export default app;
