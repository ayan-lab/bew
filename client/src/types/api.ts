export type Project = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  client: string;
  location: string;
  category: string;
  image: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: number;
  userId: number;
  projectId: number;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Client = {
  id: number;
  uuid: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
