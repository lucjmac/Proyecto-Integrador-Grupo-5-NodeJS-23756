import path from "path";
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
      const {email, password} = req.body;
      const result = await authService.login(email, password);
  
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
      const { name, lastname, email, password, 'repeat-password': repeatPassword } = req.body;
  
      if (password !== repeatPassword) {
        return res.render(path.join(viewsPath, "register.ejs"), { error: "Las contraseñas no coinciden" });
      }
  
      const result = await authService.register({ username: name, lastname: lastname, password: password, email });
  
      if (result[0].affectedRows > 0) {
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
