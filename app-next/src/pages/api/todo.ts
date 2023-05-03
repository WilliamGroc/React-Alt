import { METHODS } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "next/dist/server/web/http";

export default function handler(req: NextApiRequest, res: NextApiResponse){
  switch(req.method){
    case "Post":
      res.redirect('/');
      break;
  }
}