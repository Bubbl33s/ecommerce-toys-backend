export function validateEntityName(name: string) {
  if (name.length < 2) {
    throw new Error("El nombre debe tener al menos 2 caracteres");
  }
}
