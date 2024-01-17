import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const passwordHash = await bcryptjs.hash(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};


const login = async (req: Request, res: Response) => {
  const {email, password} = req.body
  try {
      const userFound = await User.findOne({email})
      if (!userFound) return res.status(400).json({message: "User not found"})
  } catch (error) {
    
  }

}