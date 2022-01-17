import { useState, useEffect, forwardRef, useRef } from "react";
import "./Content.css";
import "./LoadingSpinner.css";
import { Post, PostProp, Posts } from "../Post/Post";
import { fetchMostPopular, fetchRandomPosts } from "../Api/Api";

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
  showToast: (message: string) => void;
}

let nextN = 5;

function Content(props: Props) {
  const { selected } = props;
  const [randomPosts, setRandomPosts] = useState<Posts>([]);
  const [posts, setPosts] = useState<Posts>([]);
  const [likedPosts, setLikedPosts] = useState<Posts>([]);

  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // load liked posts
    let likedPosts = JSON.parse(localStorage.getItem("Liked Posts") || "[]");
    for (let i = 0; i < likedPosts?.length; i++) likePost(likedPosts[i]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 1
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (entry: IntersectionObserverEntry) => {
        const { isIntersecting } = entry;
        if (selected < 0 || selected > 1) return;
        if (isIntersecting) {
          const data = selected === 0 ? await fetchRandomPosts() : await fetchMostPopular(nextN - 5, nextN);
          if (!!data.length && selected === 1) nextN += 5;
          let newPosts: Posts = data;
          // insert newly fetched posts
          for (let i = 0; i < newPosts.length; i++) {
            let newPost = newPosts[i];

            getLikedPostsFromStorage((post: PostProp) => {
              if (post.id === newPost.id) newPost.heartColor = { fill: "red !important" };
            }); // if it's a post we've liked update its heart color to red

            if (selected === 0) setRandomPosts((randomPosts) => [...randomPosts, newPost]);
            else setPosts((posts) => [...posts, newPost]);
          }
        }
      });
    }, options);

    const node = loadingRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [selected]);

  const getLikedPostsFromStorage = (cb: Function): void => {
    let likedPosts: Posts = JSON.parse(localStorage.getItem("Liked Posts") || "[]");
    if (!!likedPosts.length) for (let i = 0; i < likedPosts.length; i++) cb(likedPosts[i]);
  };

  const likePost = (likedPost: PostProp): void => {
    const { id } = likedPost;
    if (selected === 0)
      setRandomPosts(randomPosts.map((p) => (p.id === id ? { ...p, heartColor: { fill: "red !important" } } : p)));
    else if (selected === 1)
      setPosts(posts.map((p) => (p.id === id ? { ...p, heartColor: { fill: "red !important" } } : p)));
    setLikedPosts((likedPosts) => [...likedPosts, likedPost]);
  };

  const unlikePost = (unlikedPost: PostProp): void => {
    const { id } = unlikedPost;
    setRandomPosts(
      randomPosts.map((p) => (p.id === id ? { ...p, heartColor: { fill: "var(--p-icon) !important" } } : p))
    );
    setPosts(posts.map((p) => (p.id === id ? { ...p, heartColor: { fill: "var(--p-icon) !important" } } : p)));
    setLikedPosts(likedPosts.filter((item) => item.id !== id));
  };

  return (
    <div className="Content">
      <div className="Grid">
        <div className="GridCol">
          {selected === 0 ? (
            <>
              {randomPosts.map((post: PostProp, index: number) => {
                return (
                  <Post
                    key={"RandomPost" + index}
                    post={{
                      id: post.id,
                      title: post.title,
                      url: post.url,
                      description: post.description,
                      collectionUrl: post.collectionUrl,
                      heartColor: post.heartColor
                    }}
                    onLikePost={likePost}
                    onUnlikePost={unlikePost}
                    showToast={props.showToast}
                  />
                );
              })}
            </>
          ) : selected === 1 ? (
            <>
              {posts.map((post: PostProp, index: number) => {
                return (
                  <Post
                    key={"Post" + index}
                    post={{
                      id: post.id,
                      title: post.title,
                      url: post.url,
                      description: post.description,
                      heartColor: post.heartColor
                    }}
                    onLikePost={likePost}
                    onUnlikePost={unlikePost}
                    showToast={props.showToast}
                  />
                );
              })}
            </>
          ) : selected === 2 ? (
            <>
              {likedPosts.length === 0 ? (
                <div style={{ textAlign: "center" }}>You have no likes :(</div>
              ) : (
                <>
                  {likedPosts.map((post: PostProp, index: number) => {
                    return (
                      <Post
                        key={"LikedPost" + index}
                        post={{
                          id: post.id,
                          title: post.title,
                          url: post.url,
                          description: post.description,
                          heartColor: { fill: "red !important" }
                        }}
                        onLikePost={likePost}
                        onUnlikePost={unlikePost}
                        showToast={props.showToast}
                      />
                    );
                  })}
                </>
              )}
            </>
          ) : (
            "[ERROR] Value of 'selected' exceeds expected scope"
          )}
          {selected !== 2 && <LoadingSpinner ref={loadingRef} />}
        </div>
      </div>
    </div>
  );
}

export default Content;
