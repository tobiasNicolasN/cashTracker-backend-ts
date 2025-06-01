import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { createAccessToken } from "../libs/jwt.lib";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, exchange } = req.body;

    // Verifica que el correo no tenga ninguna cuenta asociada
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.error(
        "[auth.register] Se ha producido un error: Correo electrónico no disponible."
      );
      return res
        .status(400)
        .json({ error: "Correo electrónico no disponible." });
    }

    const passwordHash = await bcryptjs.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      exchange,
    });

    const savedUser = await newUser.save();

    // Crea y guarda el token en una cookie con el id del usuario
    const token = await createAccessToken(savedUser.id);
    res.cookie("token", token);

    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      exchange: savedUser.exchange,
    });
    console.log(
      "[auth.register] Usuario registrado correctamente:",
      savedUser.id
    );
  } catch (error) {
    res.status(500).json({ error: error });
    console.error("[auth.register] Se ha producido un error:", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
      console.error(
        "[auth.login] Se ha producido un error: Correo electrónico no registrado."
      );
      return res
        .status(400)
        .json({ error: "Correo electrónico no registrado." });
    }

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      ("[auth.login] Se ha producido un error: Contraseña incorrecta.");
      return res.status(400).json({ error: "Contraseña incorrecta." });
    }

    const token = await createAccessToken(userFound.id);
    res.cookie("token", token);

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      exchange: userFound.exchange,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    console.log("[auth.login] Sesion iniciada correctamente:", userFound.id);
  } catch (error) {
    res.status(500).json({ message: error });
    console.error("[auth.login] Se ha producido un error:", error);
  }
};

export const logout = (_req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.status(200).json({ message: "Sesion cerrada correctamente." });
    console.log("[auth.logout] Sesion cerrada correctamente.");
  } catch (error) {
    console.error("[auth.logout] Se ha producido un error:", error);
    res.status(400).json({ error: error });
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findById(req.body.userId);

    if (!userFound) {
      console.error(
        "[auth.profile] Se ha producido un error: Usuario no encontrado."
      );
      return res.status(400).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      exchange: userFound.exchange,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
    console.log(
      "[auth.profile] Perfil cargado correctamente. Usuario:",
      userFound.id
    );
  } catch (error) {
    res.status(400).json({ error: error });
    console.error("[auth.profile] Se ha producido un error:", error);
  }
};
