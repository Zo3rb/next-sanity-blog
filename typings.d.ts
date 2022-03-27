export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
  comments: [
    {
      _id: string;
      _createdAt: string;
      comment: string;
      email: string;
      name: string;
    }
  ];
}

export interface CommentForm {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
