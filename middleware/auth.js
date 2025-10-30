import dotenv from "dotenv";
dotenv.config();

export default function adminAuth(req, res, next) {
  const { password } = req.headers;
  if (password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
