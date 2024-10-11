import { NextFunction, Request, Response } from "express";
import { AdminService } from "../services/adminService";

export class AdminController {
  static async getAdmins(_: Request, res: Response, next: NextFunction) {
    try {
      const admins = await AdminService.getAdmins();
      res.json(admins);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const admin = await AdminService.getAdminById(id);

      if (!admin) {
        res.status(404).json({ error: "Admin no encontrado" });
        return;
      }
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminByEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email } = req.params;

    try {
      const admin = await AdminService.getAdminByEmail(email);

      if (!admin) {
        res.status(404).json({ error: "Admin no encontrado" });
        return;
      }
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminByUsername(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { username } = req.params;

    try {
      const admin = await AdminService.getAdminByUsername(username);

      if (!admin) {
        res.status(404).json({ error: "Admin no encontrado" });
        return;
      }
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      const admin = await AdminService.createAdmin(data);
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async updateAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;

    try {
      const admin = await AdminService.updateAdmin(id, data);
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { password } = req.body;

    try {
      const admin = await AdminService.updatePassword(id, password);
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async updateAdminImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const file = req.file;

      if (!file) {
        throw new Error("No se ha enviado un archivo");
      }
      const admin = await AdminService.updateAdminImage(id, file?.path);
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdminImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      await AdminService.deleteAdminImage(id);
      res.json({ message: "Imagen eliminada" });
    } catch (error) {
      next(error);
    }
  }

  static async activateAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const admin = await AdminService.activateAdmin(id);
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const admin = await AdminService.deactivateAdmin(id);
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await AdminService.deleteAdmin(id);
      res.json({ message: "Admin eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
