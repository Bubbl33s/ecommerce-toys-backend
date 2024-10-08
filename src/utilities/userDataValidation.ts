type UserDataForValidation = {
  fullName: string;
  email: string;
  password: string;
  emailExistsCallback: (email: string) => Promise<any>;
};

export async function validateUserData(data: UserDataForValidation) {
  const existingUser = await data.emailExistsCallback(data.email);

  if (existingUser) {
    throw new Error("Ya existe un usuario con ese correo electrónico");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email)) {
    throw new Error("Correo electrónico inválido");
  }

  if (data.password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

  if (!passwordRegex.test(data.password)) {
    throw new Error(
      "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.",
    );
  }

  if (data.fullName.length < 3) {
    throw new Error("El nombre completo debe tener al menos 3 caracteres");
  }
}
