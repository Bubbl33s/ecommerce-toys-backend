import prisma from "./prisma";
import { hashPassword } from "../utilities";
import path from "path";
import { promises as fs } from "fs";

type UpdateAdminData = {
  fullName: string;
  email: string;
  username: string;
};

type CreateAdminData = UpdateAdminData & {
  password: string;
};

export class AdminService {
  static async getAdmins() {
    return prisma.admin.findMany();
  }

  static async getAdminById(id: string) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  static async getAdminByEmail(email: string) {
    return prisma.admin.findUnique({
      where: { email },
    });
  }

  static async getAdminByUsername(username: string) {
    return prisma.admin.findUnique({
      where: { username },
    });
  }

  static async createAdmin({
    fullName,
    email,
    username,
    password,
  }: CreateAdminData) {
    const emailExists = await this.getAdminByEmail(email);

    if (emailExists) {
      throw new Error("Ya existe un administrador con ese correo electrónico");
    }

    const usernameExists = await this.getAdminByUsername(username);

    if (usernameExists) {
      throw new Error("Ya existe un administrador con ese nombre de usuario");
    }

    const hashedPassword = await hashPassword(password);

    return prisma.admin.create({
      data: {
        fullName,
        email,
        username,
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateAdmin(
    id: string,
    { fullName, email, username }: UpdateAdminData,
  ) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error("No existe un administrador con ese ID");
    }

    const adminWithSameEmail = await this.getAdminByEmail(email);

    if (adminWithSameEmail && adminWithSameEmail.id !== id) {
      throw new Error("Ya existe un administrador con ese correo electrónico");
    }

    const adminWithSameUsername = await this.getAdminByUsername(username);

    if (adminWithSameUsername && adminWithSameUsername.id !== id) {
      throw new Error("Ya existe un administrador con ese nombre de usuario");
    }

    return prisma.admin.update({
      where: { id },
      data: {
        fullName,
        email,
        username,
      },
    });
  }

  static async updatePassword(id: string, password: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error("No existe un administrador con ese ID");
    }

    const hashedPassword = await hashPassword(password);

    return prisma.admin.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateAdminImage(id: string, profileImage: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    // Si el administrador ya tiene una imagen de perfil, eliminarla del servidor
    await this.deleteAdminImage(id);

    return prisma.admin.update({
      where: { id },
      data: {
        profileImage,
      },
    });
  }

  static async deleteAdminImage(id: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error("No existe un administrador con ese ID");
    }

    if (adminExists.profileImage) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads/adminImages",
        adminExists.profileImage,
      );

      try {
        // Verificar si el archivo existe
        await fs.access(oldImagePath);
        // Eliminar el archivo
        await fs.unlink(oldImagePath);

        return prisma.admin.update({
          where: { id },
          data: {
            profileImage: null,
          },
        });
      } catch (err) {
        throw new Error("No se pudo eliminar la imagen anterior");
      }
    }

    return adminExists;
  }

  static async activateAdmin(id: string) {
    return prisma.admin.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });
  }

  static async deactivateAdmin(id: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error("No existe un administrador con ese ID");
    }

    return prisma.admin.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  static async deleteAdmin(id: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error("No existe un administrador con ese ID");
    }

    return prisma.user.delete({
      where: { id },
    });
  }
}
