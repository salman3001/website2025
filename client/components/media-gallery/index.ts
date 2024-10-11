export enum MediaWindow {
  MEDIA_LIST = "MEDIA_LIST",
  ADD_MEDIA = "ADD_MEDIA",
  CONFIRM_DELETE = "CONFIRM_DELETE",
}

export enum MediaType {
  Image = "Image",
  Audio = "Audio",
  Video = "Video",
  document = "document",
}

export interface Media {
  id: number;
  name: string;
  type: MediaType;
  url: string;
  mediaCategoryId: number;
}

export interface MediaCategory {
  id: number;
  name: string;
}
