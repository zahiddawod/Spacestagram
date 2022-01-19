import React, {useEffect, useState} from 'react';
import {MediaCard} from '@shopify/polaris';
import {ShareOutlined, FavoriteOutlined} from '@mui/icons-material';
import {
  fetchOriginalImageFromPopular,
  fetchOriginalImage,
} from '../../utilities/api';
import {useToast} from '../../contexts/Notification/ToastContext';
import {PostProp, PostAction} from '../../utilities/constants';

const containsObject = (obj: PostProp, list: PostProp[]) => {
  for (let i = 0; i < list.length; i++) if (list[i].id === obj.id) return true;
  return false;
};

interface IPostProps {
  post: PostProp;
  performAction: (post: PostProp, action: PostAction) => void;
}

export const Post: React.FC<IPostProps> = ({post, performAction}) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const Toast = useToast();

  useEffect(() => {}, [post.heartColor]);

  const favouritePost = () => {
    let allLikedPosts: PostProp[] = JSON.parse(
      localStorage.getItem('Liked Posts') || '[]',
    );
    let postInfo: PostProp = {
      id: post.id,
      title: post.title,
      url: post.url,
      description: post.description,
    };
    // check if post is not already liked
    if (!allLikedPosts.length || !containsObject(postInfo, allLikedPosts)) {
      post.heartColor = {fill: 'red !important'};
      performAction(postInfo, PostAction.Like);
    } else {
      // otherwise if it is then remove it
      post.heartColor = {fill: 'var(--p-icon) !important'};
      performAction(postInfo, PostAction.Unlike);
    }
  };

  // copy original image url to clipboard
  const copyToClipboard = async () => {
    let imageUrl = post.collectionUrl
      ? await fetchOriginalImage(post.collectionUrl)
      : await fetchOriginalImageFromPopular(post.id);
    navigator.clipboard.writeText(imageUrl).then(
      () => {
        Toast.showToast('Link copied to clipboard!');
      },
      () => {
        Toast.showToast('Something went wrong.');
      },
    );
  };

  return (
    <>
      {isRemoved ? null : (
        <div className="GridItem">
          <MediaCard
            title={post.title}
            primaryAction={{
              content: '',
              icon: () => {
                return (
                  <FavoriteOutlined sx={post.heartColor} fontSize="large" />
                );
              },
              onAction: () => favouritePost(),
            }}
            secondaryAction={{
              content: '',
              icon: () => {
                return <ShareOutlined fontSize="large" />;
              },
              onAction: () => copyToClipboard(),
              plain: false,
            }}
            description={post.description}
            popoverActions={[
              {content: 'Hide', onAction: () => setIsRemoved(true)},
              {content: 'Report', onAction: () => setIsRemoved(true)},
            ]}
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                cursor: 'pointer',
              }}
              src={post.url}
            />
          </MediaCard>
        </div>
      )}
    </>
  );
};
