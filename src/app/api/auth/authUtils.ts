import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { auth } from "../../../../firbase.config";

const secretKey = process.env.SECRET_KEY || "fallbackSecret"; // Use environment variable
const key = new TextEncoder().encode(secretKey);

// Define the payload type for the JWT, extending JWTPayload
interface JwtPayload extends JWTPayload {
  user: {
    email: string;
  };
}

// Function to encrypt data using JWT
async function encrypt(payload: JwtPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
}

// Function to verify and decrypt JWT
export async function decrypt(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, key);
  return payload as JwtPayload;
}

// User signup
export async function signUp(email: string, password: string): Promise<{ session: string; user: UserCredential["user"] }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const session = await encrypt({ user: { email: user.email! } }); // Use non-null assertion since email is guaranteed for Firebase users
    return { session, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`SignUp Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred during sign-up.");
  }
}

// User signin
export async function signIn(email: string, password: string): Promise<{ session: string; user: UserCredential["user"] }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.email) {
      throw new Error("Email is undefined for the signed-in user.");
    }

    const session = await encrypt({ user: { email: user.email } });
    return { session, user };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Firebase sign-in error:", error.message);
      throw new Error(`SignIn Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred during sign-in.");
  }
}
