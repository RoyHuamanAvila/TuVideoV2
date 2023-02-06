import { AsyncThunkAction } from "@reduxjs/toolkit";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Icon {
  color?: string;
}

export interface ThunkDataTransfer {
  data: any;
  token: string;
}

export interface CreateChannel {
  name: string;
  logo: string;
}

export interface Channel {
  _id: string;
  name: string;
  logo: string | File;
  banner: string | File;
  owner: string;
  videos: Video[];
  subscribers: string[];
  subscribes: Channel[];
}

export interface UserData {
  created_at: Date;
  email: string;
  identities: Identity[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: Date;
  user_id: string;
  user_metadata: UserMetadata;
  last_ip: string;
  last_login: Date;
  logins_count: number;
}

export interface Identity {
  connection: string;
  provider: string;
  user_id: string;
  isSocial: boolean;
}

export interface UserMetadata {
  channel: string;
}

export interface CreateVideo {
  title: string;
  description: string;
  video: string | File;
  thumbnail: string | File;
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  owner: Channel;
}

export interface AsyncButtonInterface {
  actionName: string;
  thunkAction: AsyncThunkAction<any, any, any>;
  succesMessage: string;
  errorMessage: string;
  styles?: string;
  setState?: React.Dispatch<React.SetStateAction<any>>;
}

export interface Comment {
  _id: string;
  owner: Channel;
  videoID: string;
  content: string;
}

export interface ManageComment {
  comment: Comment;
  updateComment: (newContent: string, _id: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

export interface AddComment {
  videoID: string;
  addComment: (content: string, videoID: string) => Promise<void>;
}
