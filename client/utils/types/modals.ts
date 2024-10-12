export enum UserType {
  Admin = "Admin",
  User = "User",
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string | undefined;
  userType: UserType;
  isActive: Boolean;
  emailVerified: Boolean;
  createdAt: string;
  updatedAt: string;
  profile: Profile | undefined;
  blogs: Blog[];
  Discussion: Discussion[];
  subscription: EmailSubscription | undefined;
}

export interface Profile {
  id: number;
  avatar: string | undefined;
  user: User;
  userId: number;
}

export interface Blog {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string | undefined;
  isPublished: Boolean;
  views: number | undefined;
  createdAt: string;
  updatedAt: string;
  blogCategory: BlogCategory | undefined;
  blogCategorySlug: string | undefined;
  image: Media | undefined;
  mediaId: number | undefined;
  tags: Tag[];
  seo: Seo | undefined;
  author: User;
  userId: number;
  Comment: BlogComment[];
}

export interface Seo {
  id: number;
  title: string | undefined;
  keyword: string | undefined;
  desc: string | undefined;
  Blog: Blog | undefined;
  blogSlug: string | undefined;
  Discussion: Discussion | undefined;
  discussionSlug: string | undefined;
}

export interface Tag {
  slug: string;
  name: string;
  desc: string | undefined;
  blogs: Blog[];
  discussions: Discussion[];
  subscribers: EmailSubscription[];
  proejct: Project[];
}

export interface BlogComment {
  id: number;
  message: string;
  isApproved: Boolean;
  createdAt: string;
  blog: Blog;
  blogSlug: string;
  parentId: number | undefined;
  parent: BlogComment | undefined;
  replies: BlogComment[];
}

export interface BlogCategory {
  slug: string;
  title: string;
  desc: string | undefined;
  blogs: Blog[];
  subscribers: EmailSubscription[];
}

export interface Discussion {
  slug: string;
  title: string;
  desc: string | undefined;
  isPublished: Boolean;
  views: number;
  createdAt: string;
  user: User;
  userId: number;
  comment: DiscussionComment[];
  seo: Seo | undefined;
  tags: Tag[];
}

export interface DiscussionComment {
  id: number;
  message: string;
  isApproved: Boolean;
  createdAt: string;
  discussion: Discussion;
  discussionlug: string;
  parent: DiscussionComment | undefined;
  replies: DiscussionComment[];
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
  MediaCategory: MediaCategory;
  mediaCategoryId: number | undefined;
  Blog: Blog | undefined;
}

export interface MediaCategory {
  id: number;
  name: string;
  medias: Media[];
}

export interface ContactMessage {
  id: number;
  email: string;
  phone: string | undefined;
  message: string;
  createdAt: string;
}

export interface EmailSubscription {
  id: number;
  email: string;
  categories: BlogCategory[];
  tags: Tag[];
  user: User | undefined;
  userId: number | undefined;
}

export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  desc: string | undefined;
  isPublished: Boolean;
  images: string[];
  video: string | undefined;
  tags: Tag[];
}
