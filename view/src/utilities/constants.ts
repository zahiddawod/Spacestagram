export const enum Page {
  Discover = 0,
  Popular = 1,
  Favourites = 2,
}

export interface PostProp {
  id: string;
  title: string;
  url: string;
  description: string;
  collectionUrl?: string | null;
  heartColor?: {fill: string} | null;
}

export const enum PostAction {
  Like = 0,
  Unlike = 1,
}
