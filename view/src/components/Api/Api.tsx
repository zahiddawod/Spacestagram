import { Posts, PostProp } from "../Post/Post";

const fetchData = async (query: string): Promise<Response> => {
  return await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  });
};

export const fetchMostPopular = async (start: number, end: number): Promise<Posts> => {
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

export const fetchOriginalImageFromPopular = async (id: string): Promise<string> => {
  const response = await fetchData(`
    query getOriginalImageFromPopular {
      getOriginalImageFromPopular(id: "${id}")
    }
  `);
  const data = await response.json();
  return data.data.getOriginalImageFromPopular;
};

export const fetchOriginalImage = async (collectionUrl: string): Promise<string> => {
  const response = await fetchData(`
    query getOriginalImage {
      getOriginalImage(collectionUrl: "${collectionUrl}")
    }
  `);
  const data = await response.json();
  return data.data.getOriginalImage;
};

export const fetchRandomPosts = async (): Promise<Posts> => {
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
  let posts: Posts = [];
  for (let i = 0; i < data?.data?.getRandomPosts?.length; i++) {
    let currentPost: PostProp = {
      id: data?.data?.getRandomPosts[i]?.postInfo?.id,
      title: data?.data?.getRandomPosts[i]?.postInfo?.title,
      description: data?.data?.getRandomPosts[i]?.postInfo?.description,
      url: data?.data?.getRandomPosts[i]?.postInfo?.url,
      collectionUrl: data?.data?.getRandomPosts[i]?.collectionUrl
    };
    posts.push(currentPost);
  }
  return posts;
};
