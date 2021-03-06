import Head from "next/head";
import { useRouter } from "next/router";

import { client, urlFor } from "../sanity";
import Jumbotron from "../components/Jumbotron";
import { Post } from "../typings";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

interface Props {
  posts: [Post];
}

const Home = ({ posts }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Snippets | Code-Blog</title>
        <meta
          name="description"
          content="Generated by create next app and might be a great something later"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Jumbotron />

      {/* Posts. */}
      <Container fluid>
        <Row className="py-3 bg-dark">
          {posts.map((post, index) => (
            <Col
              key={index}
              xs={12}
              sm={10}
              md={4}
              lg={4}
              className="my-2 mx-sm-auto mx-md-0"
            >
              <Card className="h-100">
                <Card.Img variant="top" src={urlFor(post.mainImage).url()!} />
                <Card.Body>
                  <Card.Title>{post.description}</Card.Title>
                  <Card.Title>Posted By: {post.author.name}</Card.Title>
                  <Card.Text>{post.title}</Card.Text>
                  <Button
                    onClick={() => router.push(`/post/${post.slug.current}`)}
                    variant="primary"
                  >
                    Read More.
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  } `;

  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
    revalidate: 1500,
  };
}

export default Home;
