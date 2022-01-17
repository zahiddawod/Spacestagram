import React, { useState, forwardRef, useCallback } from "react";
import "./Content.css";
import "./LoadingSpinner.css";
import { Post, PostProp, Posts } from "../Post/Post";
import { fetchData } from "../Api/Api";

const LoadingSpinner = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="Center">
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
));

interface Props {
  selected: number;
}

let nextN = 5;

function Content(props: Props) {
  const { selected } = props;
  const [posts, setPosts] = useState<Posts>([]);

  const loadingRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (entry: IntersectionObserverEntry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          const data = await fetchData(`
            query getMostPopular {
              getMostPopular(start: ${nextN - 5}, end: ${nextN}) {
                title,
                url,
                description
              }
            }
          `);
          if (!!data.length) nextN += 5;
          insertPosts(data);
        }
      });
    }, options);

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  /*const fetchData2 = async (): Promise<void> => {
    const response = await fetch("https://images-assets.nasa.gov/popular.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    if (response.status === 200 || response.status === 304) {
      for (let i = 0; i < data.collection.items.length; i++) {
        let currentPost = {
          title: data.collection.items[i].data[0].title,
          url: data.collection.items[i].links[0].href,
          description: data.collection.items[i].data[0].description_508
        };
        setApiPosts((apiPosts) => [...apiPosts, currentPost]);
      } 
    }
  };*/

  const insertPosts = async (newPosts: Posts): Promise<void> => {
    for (let i = 0; i < newPosts.length; i++) {
      let newPost = newPosts[i];
      setPosts((posts) => [...posts, newPost]);
    }
  };

  return (
    <div className="Content">
      {selected === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div className="GridRow">
            {posts.map((post: PostProp, index: number) => {
              return <Post key={"post" + index} title={post.title} url={post.url} description={post.description} />;
            })}
            <LoadingSpinner ref={loadingRef} />
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
  );
}

export default Content;
