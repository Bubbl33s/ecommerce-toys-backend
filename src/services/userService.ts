import prisma from "./prisma";
import {
  hashPassword,
  generateVerificationToken,
  sendAccountConfirmationEmail,
} from "../utilities";
import path from "path";
import { promises as fs } from "fs";

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
            verificationToken: generateVerificationToken(),
          },
        });

        // Crear el carrito
        await prismaTx.cart.create({
          data: {
            userId: user.id,
          },
        });

        // Enviar correo de verificación
        if (user.verificationToken) {
          await sendAccountConfirmationEmail(
            user.email,
            user.verificationToken,
          );
        } else {
          throw new Error("Verification token is null");
        }

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

  static async verifyAccount(token: string) {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new Error("Token de verificación inválido");
    }

    return prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
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

  static async updateUserImage(id: string, profileImage: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    // Si el usuario ya tiene una imagen de perfil, eliminarla del servidor
    await this.deleteUserImage(id);

    return prisma.user.update({
      where: { id },
      data: {
        profileImage,
      },
    });
  }

  static async deleteUserImage(id: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error("No existe un usuario con ese ID");
    }

    if (userExists.profileImage) {
      const oldImagePath = path.join(__dirname, "/", userExists.profileImage);

      console.log(oldImagePath);

      try {
        // Verificar si el archivo existe
        await fs.access(oldImagePath);
        // Eliminar el archivo
        await fs.unlink(oldImagePath);

        return prisma.user.update({
          where: { id },
          data: {
            profileImage: null,
          },
        });
      } catch (err) {
        console.log("No se pudo eliminar la imagen anterior");
      }
    }

    return userExists;
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
        await prismaTx.cart.delete({
          where: { userId: id },
        });

        const user = await prismaTx.user.delete({
          where: { id },
        });

        return user;
      });
    } catch (error) {
      throw new Error("No se pudo eliminar el usuario");
    }
  }
}
