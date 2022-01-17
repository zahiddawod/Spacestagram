import { Posts } from "../Post/Post";

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
          title,
          url,
          description
        }
      }
    `);
  const data = await response.json();
  return data.data.getMostPopular;
};
