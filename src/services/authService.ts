import type { RegisterForm, LoginForm, UserModel } from "@/types/authTypes";
import bcrypt from "bcryptjs";

export const registerUser = async (
  data: RegisterForm
): Promise<{ success: boolean; message: string }> => {
  const user: UserModel = {
    id: crypto.randomUUID(),
    username: data.username,
    password: data.password,
  };

  const users: UserModel[] = JSON.parse(localStorage.getItem("users") || "[]");

  const isExist: UserModel | undefined = users.find((u: UserModel) => u.username === user.username);
  if (isExist) {
    throw new Error("Username already exsist!");
  }

  const hashedPassword: string = await bcrypt.hash(user.password, 10);
  const newUser: UserModel = { ...user, password: hashedPassword };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "Registration successful" };
};

export const loginUser = async (
  data: LoginForm
): Promise<{ success: boolean; message: string }> => {
  const users: UserModel[] = JSON.parse(localStorage.getItem("users") || "[]");

  const isExist: UserModel | undefined = users.find((u: UserModel) => u.username === data.username);
  if (isExist) {
    const isMatch: boolean = await bcrypt.compare(data.password, isExist.password);
    if (isMatch) {
      localStorage.setItem("user", JSON.stringify(isExist.username));

      return { success: true, message: "Login successful" };
    } else {
      throw new Error("Invalid credentials!");
    }
  } else {
    throw new Error("Invalid credentials!");
  }
};
