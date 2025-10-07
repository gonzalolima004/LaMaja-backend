import jwt from "jsonwebtoken";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secreto123", {
    expiresIn: "7d",
  });
};
