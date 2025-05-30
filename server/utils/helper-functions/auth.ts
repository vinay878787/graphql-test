import jwt from "jsonwebtoken";

export function signJwt(payload: object) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in environment variables.");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwt(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in environment variables.");
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export function requireAuth(resolver: Function) {
  return (parent: any, args: any, context: any, info: any) => {
    if (!context.user) throw new Error("Unauthorized");
    return resolver(parent, args, context, info);
  };
}