import { Fragment, useState } from "react";
import { client, urlFor } from "../../sanity";
import PortableText from "react-portable-text";
import { useForm } from "react-hook-form";

import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

interface FormData {
  _id?: string;
  name?: string;
  email?: string;
  comment?: string;
}

const hrStyle = {
  height: "3px",
  backgroundColor: "rgb(255,193,7)",
  border: "none",
};

export default function Slug({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmitHandler = async (data: FormData) => {
    try {
      await fetch("/api/create-comment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Article Body Component. */}
      <Container>
        <Row className="p-3">
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            <h1>
              <strong>Article: </strong>{" "}
              <span className="text-success">{post.title}</span>
            </h1>

            <hr />

            <img
              src={urlFor(post.mainImage).url()!}
              alt={post.title}
              className="img-fluid"
            />

            <div className="my-3 d-flex justify-content-between align-items-center">
              <h4>
                <strong>Posted By: </strong> {post.author.name}
              </h4>
              <img
                src={urlFor(post.author.image).url()!}
                alt={post.author.name}
                className="img-thumbnail rounded-circle"
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            <p className="text-muted">
              Posted On: {post._createdAt.toLocaleString()}
            </p>

            <div>
              <PortableText
                projectId={process.env.NEXT_PUBLIC_SANITY_ID}
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                content={post.body}
              />
            </div>
          </Col>
        </Row>

        <hr style={hrStyle} />

        <Row className="py-3">
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            {submitted ? (
              <div className="text-center p-3 text-warning">
                <h5>Congrats, and Thank You for Your Message.</h5>
                <p className="text-muted">
                  Your Message Will Appear Below once it Approved.
                </p>
              </div>
            ) : (
              <Form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
                <h5 className="text-success my-2">
                  Enjoyed The Article?{" "}
                  <span className="text-muted fs-6">
                    Please Leave a comment or Enjoy Read its Below
                  </span>
                </h5>
                <input
                  {...register("_id")}
                  type="text"
                  hidden
                  value={post._id}
                />

                <Form.Group className="my-3" controlId="formBasicName">
                  <Form.Label className="text-warning fw-bold">
                    Your Name:
                  </Form.Label>
                  <Form.Control
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="eg: John Smith"
                    className="shadow-sm text-muted"
                  />
                </Form.Group>
                {errors.name && (
                  <p className="text-danger">- Name is Required.</p>
                )}

                <hr style={hrStyle} />

                <Form.Group className="my-3" controlId="formBasicEmail">
                  <Form.Label className="text-warning  fw-bold">
                    Email address:
                  </Form.Label>
                  <Form.Control
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="eg: Example@email.net"
                    className="shadow-sm text-muted"
                  />
                </Form.Group>
                {errors.email && (
                  <p className="text-danger">- Email is Required.</p>
                )}

                <hr style={hrStyle} />

                <Form.Group className="my-3" controlId="formBasicEmail">
                  <Form.Label className="text-warning fw-bold">
                    Your Comment:
                  </Form.Label>
                  <br />
                  <textarea
                    {...register("comment", { required: true })}
                    className="shadow-sm rounded p-3"
                    placeholder="Your Message ..."
                    style={{ width: "100%", height: "200px", resize: "none" }}
                  />
                </Form.Group>
                {errors.comment && (
                  <p className="text-danger">- Message is Required.</p>
                )}

                <hr style={hrStyle} />

                <Button
                  variant="warning fw-bold"
                  type="submit"
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  Send
                </Button>
              </Form>
            )}
          </Col>
        </Row>

        <Row className="py-3">
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            {post.comments && (
              <Fragment>
                <h5 className="text-warning">Checkout The Comments Below: </h5>
                <hr style={hrStyle} />
              </Fragment>
            )}
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index} className="w-100 p-3 border rounded shadow-sm">
                  <figure>
                    <blockquote className="blockquote">
                      <p>{comment.comment}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                      by: {comment.name}{" "}
                      <cite title="Source Title">
                        at: {comment._createdAt.toLocaleString()}
                      </cite>
                    </figcaption>
                  </figure>
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
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
    slug,
    "comments": *[_type == "comment" && post._ref == ^._id && approved == true]
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
