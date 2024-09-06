import { IncomingMessage, ServerResponse } from "http";
import { postForm, getMainPage } from "./routes";

export const router = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/submit" && req.method === "POST") {
    postForm(req, res);
  }

  if (req.url === "/" && req.method === "GET") {
    getMainPage(req, res);
  }
};
