import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const passwordHash = await bcryptjs.hash(password, 12);

  try {
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken(userSaved.id);
    res.cookie("token", token);

    res.status(201).json(userSaved);
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken(userFound.id);
    res.cookie("token", token);

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
