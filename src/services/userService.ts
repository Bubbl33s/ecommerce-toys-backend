import prisma from "./prisma";
import { hashPassword, validateUserData } from "../utilities";

interface UserData {
  fullName: string;
  email: string;
  password: string;
}

export class UserService {
  static async getUsers() {
    return prisma.user.findMany();
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async createUser(data: UserData) {
    await validateUserData({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      emailExistsCallback: this.getUserByEmail,
    });

    const hashedPassword = await hashPassword(data.password);

    return prisma.user.create({
      data: {
        ...data,
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateUser(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
