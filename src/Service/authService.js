import bcrypt from "bcrypt";
import conn from "../config/conn.js";

const authService = {
  register: async (userData) => {
    try {
      if (!userData.password) {
        throw new Error("La contraseña no está definida.");
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const query = "INSERT INTO USER (name, lastname, email, password) VALUES (?, ?, ?, ?)";
      const values = [userData.name, userData.lastname, userData.email, hashedPassword];

      const result = await conn.query(query, values);
      return result;
    } catch (error) {
      console.log("Error al registrar usuario: " + error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const query = "SELECT * FROM USER WHERE email = ?";
      const values = [email];
      const user = await conn.query(query, values);

      if (user.length > 0) {
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (passwordMatch) {
          return { success: true, user: user[0] };
        } else {
          return { success: false, message: "Credenciales incorrectas" };
        }
      } else {
        return { success: false, message: "Credenciales incorrectas" };
      }
    } catch (error) {
      console.log("Error al iniciar sesión: " + error);
      throw error;
    }
  },
};

export default authService;
