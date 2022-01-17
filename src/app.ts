import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";

import path from "path";
import fs from "fs";
import { __prod__, ENVIRONMENT } from "./util/secrets";
import { resolvers } from "./schema/resolvers";

const PORT: number = parseInt(process.env.PORT || "8080");

(async () => {
  const app = express();
  // Express configuration
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from the React app
  if (__prod__) app.use(express.static(path.join(__dirname, "..", "view", "build")));

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "../src/schema/schema.graphql")).toString("utf-8"),
    resolvers
  });

  await server.start();

  server.applyMiddleware({ app });

  /**
   * The 'catchall' handler; for any request that doesn't
   * match the ones above then send back React's index.html
   */
  app.get("/*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "..", "view", "build", "index.html"))
  );

  app.listen(PORT, () => {
    console.log("[NODE] Running on http://localhost:%d in %s mode", PORT, ENVIRONMENT);
    console.log("[NODE] Press CTRL-C to shutdown the server\n");
  });

  process.on("SIGINT", () => {
    console.log(`[NODE] Gracefully shutting down with SIGINT signal.`);
    process.exit(0);
  });
})();
