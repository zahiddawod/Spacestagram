import { httpRequest } from "../util/helper";

let cachedPosts = [];

export default {
  Query: {
    getMostPopular: async (root, args: { start: number; end: number }, ctx) => {
      const { start, end } = args;
      if (end < start) return [];

      if (!cachedPosts.length) {
        let { statusCode, data } = await httpRequest("https://images-assets.nasa.gov/popular.json");
        if (statusCode === 200) {
          let parsedData = JSON.parse(data);
          for (let i = 0; i < parsedData.collection.items.length; i++) {
            let currentPost = {
              title: parsedData.collection.items[i].data[0].title,
              url: parsedData.collection.items[i].links[0].href,
              description: parsedData.collection.items[i].data[0].description_508
            };
            cachedPosts.push(currentPost);
          }
        } else {
          return [];
        }
      } else if (end > cachedPosts.length) {
        return [];
      }

      return cachedPosts.slice(start, end);
    }
  }
};
