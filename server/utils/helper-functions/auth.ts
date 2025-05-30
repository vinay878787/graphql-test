import jwt, { JwtPayload } from "jsonwebtoken";

function getJwtSecret(): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in environment variables.");
  return JWT_SECRET;
}

export function signJwt(payload: object): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyJwt(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, getJwtSecret());
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