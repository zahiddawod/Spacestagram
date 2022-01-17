import axios from "axios";

const PORT: number = parseInt(process.env.PORT || "8080");

let URL = `http://localhost:${PORT}/graphql`;

describe("Test All Queries", () => {
  it("Should give back 5 popular posts", async () => {
    const response = await axios.post(URL, {
      query: `
            query getMostPopular {
              getMostPopular(start: ${5}, end: ${10}) {
                id,
                title,
                url,
                description
              }
            }
          `
    });
    expect(response.status).toBe(200);
  });

  it("Should give 5 random posts", async () => {
    const response = await axios.post(URL, {
      query: `
            query getRandomPosts {
              getRandomPosts {
                postInfo {
                  id
                  title
                  url
                  description
                },
                collectionUrl
              }
            }
          `
    });
    expect(response.status).toBe(200);
  });

  it("Should give back url to original image from id", async () => {
    const response = await axios.post(URL, {
      query: `
            query getOriginalImageFromPopular {
              getOriginalImageFromPopular(id: "PIA09113")
            }
          `
    });
    expect(response.status).toBe(200);
  });

  it("Should give back url to original image from collectionUrl", async () => {
    const response = await axios.post(URL, {
      query: `
            query getOriginalImage {
              getOriginalImage(collectionUrl: "https://images-assets.nasa.gov/image/GRC-2019-C-09228/collection.json")
            }
          `
    });
    expect(response.status).toBe(200);
  });
});
