import prisma from "./prisma";
import {
  hashPassword,
  validateFullName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utilities";

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

    validateFullName(fullName);
    validateEmail(email);
    validateUsername(username);
    validatePassword(password);

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

    validateFullName(fullName);
    validateEmail(email);
    validateUsername(username);

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

    validatePassword(password);

    const hashedPassword = await hashPassword(password);

    return prisma.admin.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
      },
    });
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
