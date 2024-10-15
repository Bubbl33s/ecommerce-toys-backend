import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService.userLogin(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static async adminLogin(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const { admin, token } = await AuthService.adminLogin(username, password);
      res.json({ admin, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    try {
      const decodedToken = AuthService.verifyToken(token);
      res.json(decodedToken);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
