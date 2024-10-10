import jwt from "jsonwebtoken";
import { UserService } from "./userService";
import { AdminService } from "./adminService";
import { comparePassword } from "../utilities";

const secretKey = process.env.JWT_SECRET_KEY as string;

export class AuthService {
  static async userLogin(email: string, password: string) {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      throw new Error("Correo electrónico no encontrado");
    }

    const isPasswordMatch = await comparePassword(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new Error("Contraseña inválida");
    }

    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: "2h",
    });

    return { user, token };
  }

  static async adminLogin(username: string, password: string) {
    const user = await AdminService.getAdminByUsername(username);

    if (!user) {
      throw new Error("Nombre de usuario no encontrado");
    }

    const isPasswordMatch = await comparePassword(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new Error("Contraseña inválida");
    }

    const token = jwt.sign({ email: user.email }, secretKey, {
      expiresIn: "2h",
    });

    return { user, token };
  }

  // Verificar el token
  static verifyToken(token: string) {
    return jwt.verify(token, secretKey);
  }
}
