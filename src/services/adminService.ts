import prisma from "./prisma";
import {
  hashPassword,
  validateFullName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utilities";

interface CreateAdminData {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

interface UpdateAdminData {
  fullName: string;
  email: string;
  username: string;
}

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

  static async createAdmin(data: CreateAdminData) {
    const emailExists = await this.getAdminByEmail(data.email);

    if (emailExists) {
      throw new Error("Ya existe un administrador con ese correo electrónico");
    }

    const usernameExists = await this.getAdminByUsername(data.username);

    if (usernameExists) {
      throw new Error("Ya existe un administrador con ese nombre de usuario");
    }

    validateFullName(data.fullName);
    validateEmail(data.email);
    validateUsername(data.username);
    validatePassword(data.password);

    const hashedPassword = await hashPassword(data.password);

    return prisma.admin.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateAdmin(id: string, data: UpdateAdminData) {
    validateFullName(data.fullName);
    validateEmail(data.email);
    validateUsername(data.username);

    return prisma.admin.update({
      where: { id },
      data,
    });
  }

  static async updatePassword(id: string, password: string) {
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
    return prisma.admin.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  static async deleteAdmin(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
