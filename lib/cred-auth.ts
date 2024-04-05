import { jwtVerify, SignJWT } from "jose";

export async function encrypt(payload: any) {
  const key = new TextEncoder().encode(process.env.CREDAUTH_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

export async function decrypt(token: string) {
  const key = new TextEncoder().encode(process.env.CREDAUTH_SECRET);
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
