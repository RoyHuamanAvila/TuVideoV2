import { AxiosRequestConfig } from "axios";

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
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  owner: Channel;
}

export interface AsyncButtonInterface {
  actionName: string;
  request: AxiosRequestConfig;
  succesMessage: string;
  errorMessage: string;
  styles?: string;
  setState?: React.Dispatch<React.SetStateAction<any>>;
}
