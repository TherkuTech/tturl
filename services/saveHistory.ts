// services/saveHistory.service.ts
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export const saveHistory = (
  req: NextApiRequest,
  res: NextApiResponse,
  longUrl: String,
  shortUrl: String
) => {
  const cookieHeader = req.headers.cookie;
  let history = [];

  if (cookieHeader) {
    const cookies = cookie.parse(cookieHeader);
    if (cookies.history) {
      history = JSON.parse(cookies.history);
    }
  }

  history.push({ longUrl, shortUrl });
  console.log(history);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("history", JSON.stringify(history), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
  );
};
