import express from 'express';

const router = express.Router();

function requireAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect('/login');
  }
}

router.get('/login', (req, res) => {

});

router.post('/login', (req, res) => {
  // Verificar las credenciales del usuario y establecer la sesión
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    req.session.isAuthenticated = true;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Ruta protegida
router.get('/protected', requireAuth, (req, res) => {
  // Acceso permitido solo para usuarios autenticados
});

export default router;