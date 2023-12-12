import path from "path";
import bcrypt from "bcrypt";
import authService from "../Service/authService.js";

const viewsPath = path.resolve() + "/src/views/admin";

export class AuthController {
  authLoginGet(req, res) {
    // Renderiza la página de inicio de sesión
    res.render(path.join(viewsPath, "login.ejs"), {});
  }

  authRegisterGet(req, res) {
    // Renderiza la página de registro
    res.render(path.join(viewsPath, "register.ejs"), {});
  }

  async authLoginPost(req, res) {
    try {
      // Maneja la lógica de inicio de sesión
      const { name, password } = req.body;
      const result = await authService.login(name, password);

      if (result.success) {
        res.redirect("/admin"); // Redirige a la página de administración
      } else {
        res.render(path.join(viewsPath, "login.ejs"), { error: result.message });
      }
    } catch (error) {
      console.log("Error en authLoginPost: " + error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async authRegisterPost(req, res) {
    try {
      // Maneja la lógica de registro
      const { name, lastname, email, password, 'repeat-password': repeatPassword } = req.body;

      // Verifica si las contraseñas coinciden
      if (password !== repeatPassword) {
        return res.render(path.join(viewsPath, "register.ejs"), { error: "Las contraseñas no coinciden" });
      }

      // Encripta la contraseña antes de almacenarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Realiza el registro en la base de datos con la contraseña encriptada
      const result = await authService.register({ username: name, password: hashedPassword, email });

      if (result.affectedRows > 0) {
        res.redirect("/auth/login");
      } else {
        res.render(path.join(viewsPath, "register.ejs"), { error: "Error al registrar el usuario" });
      }
    } catch (error) {
      console.log("Error en authRegisterPost: " + error);
      res.status(500).send("Error interno del servidor");
    }
  }

  authLogoutGet(req, res) {
    // Maneja la lógica de cierre de sesión
    res.send("Route for Logout");
  }
}
