type UserDataForValidation = {
  fullName: string;
  email: string;
  password: string;
  emailExistsCallback: (email: string) => Promise<any>;
};

export const validateUserName = (name: string) => {
  if (name.length < 3) {
    throw new Error("El nombre completo debe tener al menos 3 caracteres");
  }
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Correo electrónico inválido");
  }
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.",
    );
  }
};
