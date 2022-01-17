import { httpRequest, generateRandomId, getRandomKeyword } from "../util/helper";
import { NASA_API_KEY } from "../util/secrets"; // doesn't seem like an api key is needed for the endpoints that I'm using

let cachedPosts = [];

const populateCache = async (): Promise<Boolean> => {
  let { statusCode, data } = await httpRequest("https://images-assets.nasa.gov/popular.json");
  let result = statusCode === 200;
  if (result) {
    let parsedData = JSON.parse(data);
    for (let i = 0; i < parsedData?.collection?.items?.length; i++) {
      let currentPost = {
        id: parsedData?.collection?.items[i]?.data[0]?.nasa_id || generateRandomId(11),
        title: parsedData?.collection?.items[i]?.data[0]?.title,
        url: parsedData?.collection?.items[i]?.links[0]?.href,
        description:
          parsedData.collection?.items[i]?.data[0]?.description_508 ||
          parsedData?.collection?.items[i]?.data[0]?.description,
        originalImageHref: parsedData?.collection?.items[i]?.href
      };
      cachedPosts.push(currentPost);
    }
  }
  return result;
};

const fetchImage = async (url: string, quality: Quality): Promise<string> => {
  let originalImageInformation = await httpRequest(url);
  if (originalImageInformation.statusCode === 200) return JSON.parse(originalImageInformation.data)[quality];
  return "";
};

enum Quality {
  Original = 0,
  Large = 1,
  Medium = 2,
  Small = 3,
  Thumbnail = 4,
  Metadeta = 5
}

interface Post {
  id: String;
  title: String;
  url: String;
  description: String;
}

export const resolvers = {
  Query: {
    getMostPopular: async (_, args: { start: number; end: number }): Promise<Post[]> => {
      const { start, end } = args;
      if (
        end < start || // end value must be greater than start value
        (!cachedPosts.length && !(await populateCache())) || // if cache is empty then populate cache (returns [] if populateCache() fails)
        end > cachedPosts.length || // end value can't exceed the # of posts that exist
        end - start > 5 // maximum 5 posts per request
      )
        return []; // if any of the conditions above fail to be satisfied then we return empty array
      return cachedPosts.slice(start, end);
    },
    getOriginalImageFromPopular: async (_, args: { id: string }): Promise<string> => {
      const { id } = args;
      if (id === "" || (!cachedPosts.length && !(await populateCache()))) return "";
      for (let i = 0; i < cachedPosts.length; i++)
        if (cachedPosts[i].id === id) return await fetchImage(cachedPosts[i].originalImageHref, Quality.Original);
      return "";
    },
    getOriginalImage: async (_, args: { collectionUrl: string }): Promise<string> => {
      const { collectionUrl } = args;
      if (collectionUrl === "") return "";
      return await fetchImage(collectionUrl, Quality.Original);
    },
    getRandomPosts: async (): Promise<Post[]> => {
      let { statusCode, data } = await httpRequest(`https://images-api.nasa.gov/search?q=${getRandomKeyword()}`);
      let result = statusCode === 200;

      let posts = [];
      if (result) {
        let parsedData = JSON.parse(data);
        let randomStart = Math.floor(Math.random() * parsedData?.collection?.items?.length);
        let i = randomStart;
        while (parsedData?.collection?.items[i]) {
          let currentPost = {
            postInfo: {
              id: parsedData?.collection?.items[i]?.data[0]?.nasa_id,
              title: parsedData?.collection?.items[i]?.data[0]?.title,
              url: parsedData.collection?.items[i]?.links[0]?.href,
              description:
                parsedData?.collection?.items[i]?.data[0]?.description_508 ||
                parsedData?.collection?.items[i]?.data[0]?.description
            },
            collectionUrl: parsedData?.collection.items[i]?.href
          };
          posts.push(currentPost);
          i++;
          if (i === randomStart + 5) break;
        }
      }

      return posts;
    }
  }
};
