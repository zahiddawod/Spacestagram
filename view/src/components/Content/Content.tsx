import React, { useState, useEffect, forwardRef, useCallback } from "react";
import "./Content.css";
import "./LoadingSpinner.css";
import { Post, PostProp, Posts } from "../Post/Post";
import { fetchMostPopular } from "../Api/Api";

const LoadingSpinner = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="Center">
    <div className="Spinner">
      {[...Array(12)].map((e: any, i: number) => (
        <div key={"dash" + i}></div>
      ))}
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
  const [likedPosts, setLikedPosts] = useState<Posts>([]);

  const loadingRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (entry: IntersectionObserverEntry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          const data = await fetchMostPopular(nextN - 5, nextN);
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

  useEffect(() => {
    // load liked posts
    let likedPosts = JSON.parse(localStorage.getItem("Liked Posts") || "[]");
    if (!!likedPosts.length) for (let i = 0; i < likedPosts.length; i++) likePost(likedPosts[i]);
  }, []);

  const insertPosts = async (newPosts: Posts): Promise<void> => {
    for (let i = 0; i < newPosts.length; i++) {
      let newPost = newPosts[i];
      setPosts((posts) => [...posts, newPost]);
    }
  };

  const likePost = (likedPost: PostProp): void => {
    setLikedPosts((likedPosts) => [...likedPosts, likedPost]);
  };

  const unlikePost = (unlikedPost: PostProp): void => {
    const { id } = unlikedPost;
    setLikedPosts(likedPosts.filter((item) => item.id !== id));
  };

  return (
    <div className="Content">
      {selected === 0 ? (
        <div className="Grid">
          <div className="GridCol">
            {posts.map((post: PostProp, index: number) => {
              return (
                <Post
                  key={"post" + index}
                  post={{ id: post.id, title: post.title, url: post.url, description: post.description }}
                  onLikePost={likePost}
                  onUnlikePost={unlikePost}
                />
              );
            })}
            <LoadingSpinner ref={loadingRef} />
          </div>
        </div>
      ) : selected === 1 ? (
        <div className="Grid">
          <div className="GridCol">
            {likedPosts.length === 0 ? (
              <div style={{ textAlign: "center" }}>You have no likes :(</div>
            ) : (
              <>
                {likedPosts.map((post: PostProp, index: number) => {
                  return (
                    <Post
                      key={"LikedPost" + index}
                      post={{ id: post.id, title: post.title, url: post.url, description: post.description }}
                      onLikePost={likePost}
                      onUnlikePost={unlikePost}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
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
