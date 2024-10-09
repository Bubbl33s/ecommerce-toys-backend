import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async getUsers(_: Request, res: Response) {
    const users = await UserService.getUsers();

    res.json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    res.json(user);
  }

  static async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await UserService.getUserByEmail(email);

    res.json(user);
  }

  static async createUser(req: Request, res: Response) {
    const data = req.body;

    try {
      const user = await UserService.createUser(data);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      const user = await UserService.updateUser(id, data);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async updatePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;

    try {
      const user = await UserService.updatePassword(id, password);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async activateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await UserService.activateUser(id);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deactivateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await UserService.deactivateUser(id);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);

    res.json(user);
  }
}
