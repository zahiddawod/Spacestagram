import { IncomingMessage } from "http";
import https from "https";
let cachedPosts = [];

export default {
  Query: {
    hello() {
      return "world";
    },
    getMostPopular(root, args: { start: number; end: number }, ctx) {
      const { start, end } = args;
      if (end < start) return [];

      let posts = [];

      if (!!!cachedPosts.length) {
        https.get("https://images-assets.nasa.gov/popular.json", (res: IncomingMessage) => {
          let data = "";
          res.on("data", (chunk: string) => {
            data += chunk;
          });
          res.on("end", () => {
            for (let i = 0; i < JSON.parse(data).collection.items.length; i++) {
              let currentPost = {
                title: JSON.parse(data).collection.items[i].data[0].title,
                url: JSON.parse(data).collection.items[i].links[0].href,
                description: JSON.parse(data).collection.items[i].data[0].description_508
              };
              cachedPosts.push(currentPost);
            }
          });
        });
      }

      if (end > cachedPosts.length) return [];

      for (let i = start; i < end; i++) posts.push(cachedPosts[i]);

      return posts;
    }
  }
};
