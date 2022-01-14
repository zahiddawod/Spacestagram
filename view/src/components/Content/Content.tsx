import React, { useState, useEffect } from "react";
import "./Content.css";
import { Post, PostProp } from "../Post/Post";

interface Props {
  selected: number;
}

type Posts = PostProp[];

function Content(props: Props) {
  const { selected } = props;
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://images-assets.nasa.gov/popular.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const data = await response.json();
      if (response.status === 200 || response.status === 304) {
        setLoading(false);
        console.log(data);
        for (let i = 0; i < 5 /* data.collection.items.length */; i++) {
          let currentPost = {
            title: data.collection.items[i].data[0].title,
            url: data.collection.items[i].links[0].href,
            description: data.collection.items[i].data[0].description_508
          };
          setPosts((posts) => [...posts, currentPost]);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="Center">
          <div className="Spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="Content">
          {selected === 0 ? (
            <div>
              <div className="GridRow">
                {/* <Post title="fuck" />
                <Post title="shit" />
                <Post title="fuck" /> */}
                {posts.map((post, index) => {
                  return <Post key={"post" + index} title={post.title} url={post.url} description={post.description} />;
                })}
              </div>
            </div>
          ) : selected === 1 ? (
            <div className="Grid">Likes</div>
          ) : selected === 2 ? (
            /* additional content */
            <></>
          ) : (
            "[ERROR] Value of 'selected' exceeds expected scope"
          )}
        </div>
      )}
    </>
  );
}

export default Content;
