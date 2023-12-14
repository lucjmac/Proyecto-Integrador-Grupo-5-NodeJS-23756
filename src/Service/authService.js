import { conn } from "../config/conn.js";


const authService = {
  register: async (userData) => {
    try {
      if (!userData.password) {
        throw new Error("La contraseña no está definida.");
      }

      const query = "INSERT INTO user (name, lastname, email, password) VALUES (?, ?, ?, ?)";
      const values = [userData.username, userData.lastname, userData.email, userData.password];

      const result = await conn.query(query, values);
      return result;
    } catch (error) {
      console.log("Error al registrar usuario: " + error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const query = "SELECT user_id, name, lastname, email, password FROM user WHERE email = ?";
      const values = [email];

      const result = await conn.query(query, values);
      const user = result[0][0]; // Extraer el primer usuario de la lista

      if (!user || result.length === 0) {
        throw new Error("Usuario no encontrado");
      }

      // Comparar la contraseña ingresada con la contraseña almacenada
      if (password === user.password) {
        return { success: true, user: user };
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      throw error;
    }
  },
};

export default authService;
