import React from "react";
import { MediaCard } from "@shopify/polaris";
import { ShareOutlined, FavoriteOutlined } from "@mui/icons-material";
import "./Post.css";

export interface PostProp {
  id: string;
  title: string;
  url: string;
  description: string;
}

export type Posts = PostProp[];

const containsObject = (obj: PostProp, list: Posts) => {
  for (let i = 0; i < list.length; i++)
    if (list[i].title === obj.title && list[i].url === obj.url && list[i].description === obj.description) return true;
  return false;
};

interface Props {
  post: PostProp;
  onLikePost: (post: PostProp) => void;
  onUnlikePost: (post: PostProp) => void;
}

export const Post: React.FC<Props> = ({ post, onLikePost, onUnlikePost }) => {
  const favouritePost = (): void => {
    let likedPosts: Posts = JSON.parse(localStorage.getItem("Liked Posts") || "[]");
    let obj: PostProp = {
      id: post.id,
      title: post.title,
      url: post.url,
      description: post.description
    };

    // check if post is not already liked
    if (!likedPosts?.length || !containsObject(obj, likedPosts)) {
      likedPosts.push(obj);
      onLikePost(obj);
      localStorage.setItem("Liked Posts", JSON.stringify(likedPosts));
      console.log("Favourited");
    } else {
      // if it is remove it
      console.log("Removed");
      //const index = likedPosts.indexOf(obj, 0);
      //if (index > -1) likedPosts.splice(index, 1);
      likedPosts = likedPosts.filter((item) => item.id !== post.id);
      console.log(likedPosts);
      localStorage.setItem("Liked Posts", JSON.stringify(likedPosts));
      onUnlikePost(obj);
    }
  };

  // click to open post
  const onClickPost = (): void => {};

  return (
    <div className="GridItem">
      <MediaCard
        title={post.title}
        primaryAction={{
          content: "",
          icon: () => {
            return <FavoriteOutlined fontSize="large" color="error" />;
          },
          onAction: () => favouritePost()
        }}
        secondaryAction={{
          content: "",
          icon: () => {
            return <ShareOutlined fontSize="large" color="error" />;
          },
          onAction: () => {},
          plain: false
        }}
        description={post.description}
        popoverActions={[{ content: "Hide", onAction: () => {} }]}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer"
          }}
          src={post.url}
          onClick={onClickPost}
        />
      </MediaCard>
    </div>
  );
};
