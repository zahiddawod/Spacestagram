import React, { useState } from "react";
import { MediaCard } from "@shopify/polaris";
import { ShareOutlined, FavoriteOutlined } from "@mui/icons-material";
import "./Post.css";

export interface PostProp {
  title: string;
  url: string;
  description: string;
}

export const Post: React.FC<PostProp> = ({ title, url, description }) => {
  const favouritePost = (): void => {
    console.log("Favourited");
  };

  // click to open post
  const onClickPost = (): void => {};

  return (
    <div className="GridItem">
      <MediaCard
        title={title}
        primaryAction={{
          content: "",
          icon: () => {
            return <FavoriteOutlined fontSize="large" color="error" />;
          },
          onAction: () => {}
        }}
        secondaryAction={{
          content: "",
          icon: () => {
            return <ShareOutlined fontSize="large" color="error" />;
          },
          onAction: () => {},
          plain: false
        }}
        description={description}
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
          src={url}
          onClick={onClickPost}
        />
      </MediaCard>
    </div>
  );
};
