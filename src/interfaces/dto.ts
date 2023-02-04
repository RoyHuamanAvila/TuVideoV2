export interface CreateComment {
  videoID: string;
  content: string;
  token: string;
}

export interface EditComment {
  content: string;
  token: string;
  commentID: string;
}

export interface DeleteComment {
  commentID: string;
  token: string;
}

export interface Subscribe {
  channelID: string;
  token: string;
}

export interface CreateVideo {
  data: VideoInitialData;
  token: string;
}

export interface GetMyChannel {
  token: string;
  channelID: string;
}

export interface VideoInitialData {
  title: string;
  description: string;
  video: string | File;
  thumbnail: string | File;
}
