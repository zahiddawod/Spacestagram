import { Posts } from "../Post/Post";

export const fetchData = async (query: string): Promise<Posts> => {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: query
    })
  });
  const data = await response.json();
  return data.data.getMostPopular;
};
