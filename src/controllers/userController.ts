import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async getUsers(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params;

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      const user = await UserService.createUser(data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;

    try {
      const user = await UserService.updateUser(id, data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { password } = req.body;

    try {
      const user = await UserService.updatePassword(id, password);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: "No se ha enviado un archivo" });
        return;
      }

      const user = await UserService.updateUserImage(id, file.path);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const user = await UserService.deleteUserImage(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async activateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await UserService.activateUser(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await UserService.deactivateUser(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await UserService.deleteUser(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
