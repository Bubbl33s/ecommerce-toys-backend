import prisma from "./prisma";
import {
  hashPassword,
  validateFullName,
  validateEmail,
  validatePassword,
} from "../utilities";

type CreateUserData = {
  fullName: string;
  email: string;
  password: string;
};

type UpdateUserData = {
  fullName: string;
  email: string;
};

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

  static async createUser({ fullName, email, password }: CreateUserData) {
    const userExists = await this.getUserByEmail(email);

    if (userExists) {
      throw new Error("Ya existe un usuario con ese correo electrónico");
    }

    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);

    const hashedPassword = await hashPassword(password);

    return prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateUser(id: string, { fullName, email }: UpdateUserData) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    validateFullName(fullName);
    validateEmail(email);

    return prisma.user.update({
      where: { id },
      data: { fullName, email },
    });
  }

  static async updatePassword(id: string, password: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

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
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    return prisma.user.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });
  }

  static async deactivateUser(id: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    return prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  static async deleteUser(id: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    return prisma.user.delete({
      where: { id },
    });
  }
}
