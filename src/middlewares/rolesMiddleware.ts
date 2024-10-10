import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    try {
      const decodedToken = AuthService.verifyToken(token);

      // Verificación de tipo: Comprobamos si el token es de tipo JwtPayload
      if (typeof decodedToken !== "object" || !decodedToken.role) {
        res.status(400).json({ message: "Token inválido o mal formado" });
        return;
      }

      // Cast a 'decodedToken'
      const role = decodedToken.role as string;

      // Comprobamos si el role del usuario está en la lista de roles permitidos
      if (!roles.includes(role)) {
        res
          .status(403)
          .json({ message: "No tienes permisos para realizar esta acción" });
        return;
      }

      next();
    } catch (error) {
      res.status(400).json({ message: "Token inválido o expirado" });
      return;
    }
  };
};
