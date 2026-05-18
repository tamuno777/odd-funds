export const getErrorMessage = (error: string | null): string => {
  if (!error) return "";

  const errorMap: Record<string, string> = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    OAuthSignin: "Could not start the sign-in process. Please try again.",
    OAuthCallback: "Something went wrong during sign-in. Please try again.",
    OAuthCreateAccount: "Could not create your account. Please try again.",
    EmailCreateAccount: "Could not create your account. Please try again.",
    Callback: "Something went wrong. Please try again.",
    OAuthAccountNotLinked:
      "This email is already registered with a different sign-in method.",
    EmailSignin: "Could not send the sign-in email. Please try again.",
    SessionRequired: "Please sign in to access this page.",
    Default: "Something went wrong. Please try again.",
  };

  return errorMap[error] ?? errorMap.Default;
};

export const getErrorMessageSignUp = (error: string): string => {
  const errorMap: Record<string, string> = {
    "Email and password are required": "Please fill in your email and password.",
    "Email already registered":
      "An account with this email already exists. Try signing in instead.",
    "Something went wrong": "Something went wrong on our end. Please try again.",
  };

  return errorMap[error] ?? "Unable to create account. Please try again.";
};