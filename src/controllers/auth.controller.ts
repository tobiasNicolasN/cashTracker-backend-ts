import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  const existingUsername = await User.findOne({ username });
  if (existingUsername) return res.status(400).json({ error: ["Nombre de usuario no disponible."] });
  
  const existingEmail = await User.findOne({ email });
  if (existingEmail) return res.status(400).json({ error: ["Correo electrónico no disponible."] });
  
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
    if (!userFound) return res.status(400).json({ error: ["Correo electrónico no registrado."] });
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ error: ["Contraseña incorrecta."] });
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

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req: Request, res: Response) => {
  const userFound = await User.findById(req.body.userId);
  if (!userFound) return res.status(400).json({error : ["Usuario no encontrado."] });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
