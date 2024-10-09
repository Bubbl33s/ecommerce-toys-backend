import { Request, Response } from "express";
import { AdminService } from "../services/adminService";

export class AdminController {
  static async getAdmins(_: Request, res: Response) {
    const admins = await AdminService.getAdmins();

    res.json(admins);
  }

  static async getAdminById(req: Request, res: Response) {
    const { id } = req.params;
    const admin = await AdminService.getAdminById(id);

    res.json(admin);
  }

  static async getAdminByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const admin = await AdminService.getAdminByEmail(email);

    res.json(admin);
  }

  static async getAdminByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const admin = await AdminService.getAdminByUsername(username);

    res.json(admin);
  }

  static async createAdmin(req: Request, res: Response) {
    const data = req.body;

    try {
      const admin = await AdminService.createAdmin(data);
      res.json(admin);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  static async updateAdmin(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      const admin = await AdminService.updateAdmin(id, data);
      res.json(admin);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  static async updatePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { password } = req.body;

    try {
      const admin = await AdminService.updatePassword(id, password);
      res.json(admin);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  static async activateAdmin(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const admin = await AdminService.activateAdmin(id);
      res.json(admin);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  static async deactivateAdmin(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const admin = await AdminService.deactivateAdmin(id);
      res.json(admin);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }

  static async deleteAdmin(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await AdminService.deleteAdmin(id);
      res.json({ message: "Admin eliminado correctamente" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
}
