import {useState, useEffect, useRef} from 'react';
import {Post} from '../Post/Post';
import {fetchMostPopular, fetchRandomPosts} from '../../utilities/api';
import LoadingSpinner from './subcomponents/LoadingSpinner';
import {Page, PostProp, PostAction} from '../../utilities/constants';
import './Content.css';

// how many popular posts it should fetch next (backend limit: 5 per request)
const incrementPostCount = 5;
// keeps track of the index of popular posts its at (5 = starts at top 5 posts)
let popularPostIndexEnd = 5;

// our liked posts that is stored in our storage
let allLikedPosts: PostProp[] = JSON.parse(
  localStorage.getItem('Liked Posts') || '[]',
);

interface IContentProps {
  currentPage: Page;
  posts?: PostProp[]; // for testing
}

function Content(props: IContentProps) {
  const {currentPage} = props;
  const [postsList, setPostsList] = useState<PostProp[]>([]);

  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPostsList([]);
    if (currentPage === Page.Favourites) {
      // populate list with liked posts from storage
      forEachLikedPostInStorage((post: PostProp) => {
        post.heartColor = {fill: 'red !important'};
        setPostsList((postsList) => [...postsList, post]);
      });
      return;
    } else if (currentPage === Page.Popular) {
      popularPostIndexEnd = 5; // reset where popular posts start
    }

    const populatePosts = async () => {
      const data =
        currentPage === Page.Discover
          ? await fetchRandomPosts()
          : await fetchMostPopular(
              popularPostIndexEnd - 5,
              popularPostIndexEnd,
            );

      // increment index so next time it fetches new popular posts
      if (!!data.length && currentPage === Page.Popular)
        popularPostIndexEnd += incrementPostCount;

      let newPosts: PostProp[] = data;
      // insert newly fetched posts
      for (let i = 0; i < newPosts.length; i++) {
        let newPost = newPosts[i];

        // if it's a post we've already liked then update its heart color to red
        forEachLikedPostInStorage((post: PostProp) => {
          if (post.id === newPost.id)
            newPost.heartColor = {fill: 'red !important'};
        });

        setPostsList((postsList) => [...postsList, newPost]);
      }
    };

    // initiates 200px above the loading spinner
    const options = {
      root: null,
      rootMargin: '0px 0px 200px 0px',
      threshold: 1,
    };

    // used for infinite loading
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(async (entry: IntersectionObserverEntry) => {
          const {isIntersecting} = entry;
          // if we see the loading spinner then populate the list with more posts
          if (isIntersecting) await populatePosts();
        });
      },
      options,
    );

    const node = loadingRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [currentPage]);

  const forEachLikedPostInStorage = (callback: (p: PostProp) => void) => {
    let likedPosts: PostProp[] = JSON.parse(
      localStorage.getItem('Liked Posts') || '[]',
    );
    for (let i = 0; i < likedPosts.length; i++) callback(likedPosts[i]);
  };

  const performAction = (postInfo: PostProp, action: PostAction) => {
    const {id} = postInfo;
    let newHeartColor: string;

    // update our cache variable and set color information
    if (action === PostAction.Like) {
      allLikedPosts.push(postInfo);
      newHeartColor = 'red';
    } else {
      allLikedPosts = allLikedPosts.filter((item) => item.id !== id);
      newHeartColor = 'var(--p-icon)';
    }

    // update heart color
    setPostsList((posts) => {
      return posts.map((p) =>
        p.id === id
          ? {...p, heartColor: {fill: `${newHeartColor} !important`}}
          : p,
      );
    });

    // push changes to local storage
    localStorage.setItem('Liked Posts', JSON.stringify(allLikedPosts));
  };

  return (
    <div className="Content">
      <div className="Grid">
        <div className="GridCol">
          {currentPage === Page.Favourites && postsList.length === 0 ? (
            <div style={{textAlign: 'center'}}>You have no likes :(</div>
          ) : (
            postsList.map((post: PostProp, index: number) => {
              return (
                <Post
                  key={'LikedPost' + index}
                  post={{
                    id: post.id,
                    title: post.title,
                    url: post.url,
                    description: post.description,
                    heartColor: post.heartColor,
                  }}
                  performAction={performAction}
                />
              );
            })
          )}
          {currentPage !== Page.Favourites && (
            <LoadingSpinner ref={loadingRef} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Content;
