export const validate = (
  name: string,
  dob: string,
  email: string,
  password: string
): string => {
  if (!name.trim() || !dob || !email.trim() || !password)
    return "Please complete all required fields.";

  if (name.trim().length < 2)
    return "Please enter your full name.";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Please enter a valid email address.";

  if (password.length < 8)
    return "Password must be at least 8 characters.";

  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";

  if (!/[0-9]/.test(password))
    return "Password must contain at least one number.";

  // Must be at least 18 years old
  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ? age - 1
      : age;

  if (actualAge < 18)
    return "You must be at least 18 years old to create an account.";

  if (dobDate > today)
    return "Please enter a valid date of birth.";

  return ""; 
};