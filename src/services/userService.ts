import prisma from "./prisma";
import {
  hashPassword,
  validateFullName,
  validateEmail,
  validatePassword,
} from "../utilities";

interface CreateUserData {
  fullName: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  fullName: string;
  email: string;
}

export class UserService {
  static async getUsers() {
    return prisma.user.findMany({
      include: {
        orders: true,
      },
    });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async createUser(data: CreateUserData) {
    const userExists = await this.getUserByEmail(data.email);

    if (userExists) {
      throw new Error("Ya existe un usuario con ese correo electrónico");
    }

    validateFullName(data.fullName);
    validateEmail(data.email);
    validatePassword(data.password);

    const hashedPassword = await hashPassword(data.password);

    return prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateUser(id: string, data: UpdateUserData) {
    validateFullName(data.fullName);
    validateEmail(data.email);

    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async updatePassword(id: string, password: string) {
    validatePassword(password);

    const hashedPassword = await hashPassword(password);

    return prisma.user.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
      },
    });
  }

  static async activateUser(id: string) {
    return prisma.user.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });
  }

  static async deactivateUser(id: string) {
    return prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
