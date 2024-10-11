import prisma from "./prisma";
import { hashPassword } from "../utilities";

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

    try {
      return prisma.$transaction(async (prismaTx) => {
        const hashedPassword = await hashPassword(password);

        const user = await prismaTx.user.create({
          data: {
            fullName,
            email,
            passwordHash: hashedPassword,
          },
        });

        // Crear el carrito
        await prismaTx.cart.create({
          data: {
            userId: user.id,
          },
        });

        return user;
      });
    } catch (error) {
      throw new Error("No se pudo crear el usuario");
    }
  }

  static async updateUser(id: string, { fullName, email }: UpdateUserData) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    const userWithSameEmail = await this.getUserByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new Error("Ya existe un usuario con ese correo electrónico");
    }

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

    try {
      return prisma.$transaction(async (prismaTx) => {
        const user = await prismaTx.user.delete({
          where: { id },
        });

        await prismaTx.cart.delete({
          where: { userId: user.id },
        });

        return user;
      });
    } catch (error) {
      throw new Error("No se pudo eliminar el usuario");
    }
  }
}
