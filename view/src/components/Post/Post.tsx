import React, { useEffect, useState } from "react";
import { MediaCard } from "@shopify/polaris";
import { ShareOutlined, FavoriteOutlined } from "@mui/icons-material";
import { fetchOriginalImageFromPopular, fetchOriginalImage } from "../Api/Api";

export interface PostProp {
  id: string;
  title: string;
  url: string;
  description: string;
  collectionUrl?: string | null;
  heartColor?: { fill: string } | null;
}

export type Posts = PostProp[];

const containsObject = (obj: PostProp, list: Posts) => {
  for (let i = 0; i < list.length; i++) if (list[i].id === obj.id) return true;
  return false;
};

interface Props {
  post: PostProp;
  onLikePost: (post: PostProp) => void;
  onUnlikePost: (post: PostProp) => void;
  showToast: (message: string) => void;
}

export const Post: React.FC<Props> = ({ post, onLikePost, onUnlikePost, showToast }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {}, [post.heartColor]);

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
      post.heartColor = { fill: "red !important" };
      localStorage.setItem("Liked Posts", JSON.stringify(likedPosts));
    } else {
      // if it is then remove it
      localStorage.setItem("Liked Posts", JSON.stringify(likedPosts.filter((item) => item.id !== post.id)));
      post.heartColor = { fill: "var(--p-icon) !important" };
      onUnlikePost(obj);
    }
  };

  // click to open post
  const onClickPost = (): void => {};

  const copyToClipboard = async (): Promise<void> => {
    let imageUrl = post.collectionUrl
      ? await fetchOriginalImage(post.collectionUrl)
      : await fetchOriginalImageFromPopular(post.id);
    navigator.clipboard.writeText(imageUrl).then(
      () => {
        showToast("Link copied to clipboard!");
      },
      () => {
        showToast("Something went wrong.");
      }
    );
  };

  return (
    <>
      {isRemoved ? null : (
        <div className="GridItem">
          <MediaCard
            title={post.title}
            primaryAction={{
              content: "",
              icon: () => {
                return <FavoriteOutlined sx={post.heartColor} fontSize="large" />;
              },
              onAction: () => favouritePost()
            }}
            secondaryAction={{
              content: "",
              icon: () => {
                return <ShareOutlined fontSize="large" />;
              },
              onAction: () => copyToClipboard(),
              plain: false
            }}
            description={post.description}
            popoverActions={[
              { content: "Hide", onAction: () => setIsRemoved(true) },
              { content: "Report", onAction: () => setIsRemoved(true) }
            ]}
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
      )}
    </>
  );
};
