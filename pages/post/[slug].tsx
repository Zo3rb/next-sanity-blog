import { client, urlFor } from "../../sanity";

import { Post } from "../../typings";

interface Props {
  post: Post;
}

export default function Slug({ post }: Props) {
  console.log(post);
  return <h1>Ali</h1>;
}

export async function getStaticPaths() {
  const query = `
    *[_type == "post"] {
    id,
    slug {
      current
    }
  }
  `;

  const paths = await client.fetch(query);

  return {
    paths: paths.map((post: Post) => ({
      params: { slug: post.slug.current },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    body,
    slug
  }
  `;

  const post = await client.fetch(query, { slug: context.params.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 1500,
  };
}
