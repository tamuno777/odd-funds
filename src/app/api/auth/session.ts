import { NextApiRequest, NextApiResponse } from "next";

// Function to set a session cookie
export async function setSession(res: NextApiResponse, session: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1 hour expiration
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `session=${encodeURIComponent(session)}; Path=/; HttpOnly; Expires=${expires}${secureFlag}`
  );
}

// Function to get a session cookie
export async function getSession(req: NextApiRequest, res: NextApiResponse) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("=").map(decodeURIComponent))
  );
  const session = cookies["session"];
  if (session) {
    return session;
  }
  res.status(401).json({ message: "No session found" });
}
