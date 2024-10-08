import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await AuthService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization as string;

    try {
      const decodedToken = AuthService.verifyToken(token);
      res.json(decodedToken);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
