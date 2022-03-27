import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../sanity";

interface Data {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, name, email, comment } = JSON.parse(req.body);
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      email,
      name,
      comment,
    });
    console.log("submitted");
    res.status(200).json("Comment Submitted");
  } catch (error: any) {
    console.log(error);
  }
}
