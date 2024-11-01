import { CookieOptions, Response } from "express";

export default function setRefreshCookie(
  res: Response,
  refreshToken: string,
  expires: "now" | "default"
) {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    path: "/api/users/refresh-token",
    maxAge: expires === "now" ? 0 : 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
}
