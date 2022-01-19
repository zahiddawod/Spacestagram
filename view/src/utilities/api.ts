import {PostProp} from './constants';

// helper function that accepts a specific graphql query
const fetchData = async (query: string) => {
  return await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  });
};

// gets the most popular posts from range: start to end
export const fetchMostPopular = async (
  start: number,
  end: number,
): Promise<PostProp[]> => {
  const response = await fetchData(`
    query getMostPopular {
      getMostPopular(start: ${start}, end: ${end}) {
        id,
        title,
        url,
        description
      }
    }
  `);
  const data = await response.json();
  return data.data.getMostPopular;
};

// gets the original image link from the most popular table
export const fetchOriginalImageFromPopular = async (
  id: string,
): Promise<string> => {
  const response = await fetchData(`
    query getOriginalImageFromPopular {
      getOriginalImageFromPopular(id: "${id}")
    }
  `);
  const data = await response.json();
  return data.data.getOriginalImageFromPopular;
};

// gets the original image link by json link provided by nasa api
// note: this is done because the nasa api doesn't give that information unless requested
export const fetchOriginalImage = async (
  collectionUrl: string,
): Promise<string> => {
  const response = await fetchData(`
    query getOriginalImage {
      getOriginalImage(collectionUrl: "${collectionUrl}")
    }
  `);
  const data = await response.json();
  return data.data.getOriginalImage;
};

// gets a set of random posts from server
export const fetchRandomPosts = async () => {
  const response = await fetchData(`
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
  `);
  const data = await response.json();
  let posts: PostProp[] = [];
  for (let i = 0; i < data?.data?.getRandomPosts?.length; i++) {
    let currentPost: PostProp = {
      id: data?.data?.getRandomPosts[i]?.postInfo?.id,
      title: data?.data?.getRandomPosts[i]?.postInfo?.title,
      description: data?.data?.getRandomPosts[i]?.postInfo?.description,
      url: data?.data?.getRandomPosts[i]?.postInfo?.url,
      collectionUrl: data?.data?.getRandomPosts[i]?.collectionUrl,
    };
    posts.push(currentPost);
  }
  return posts;
};
