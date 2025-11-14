// 👤 Usuarios predeterminados (solo para desarrollo/pruebas)
const USUARIOS = [
  {
    email: "admin@nomisoft.com",
    password: "123456",
    role: "admin"
  },
  {
    email: "empleado@nomisoft.com",
    password: "123456",
    role: "empleado"
  }
];

// 🔐 Función principal de inicio de sesión
function iniciarSesion() {
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();

  // Validación básica
  if (!email || !password) {
    alert("⚠️ Por favor, ingrese correo y contraseña.");
    return;
  }

  // Buscar usuario
  const usuario = USUARIOS.find(u => 
    u.email === email && u.password === password
  );

  if (usuario) {
    // Guardar sesión (opcional pero útil)
    localStorage.setItem('usuarioLogueado', JSON.stringify({
      email: usuario.email,
      role: usuario.role
    }));

    // Redirigir según rol
    if (usuario.role === "admin") {
      window.location.href = "admin1.html";
    } else if (usuario.role === "empleado") {
      window.location.href = "empleconsulta.html";
    }
  } else {
    alert("❌ Correo o contraseña incorrectos. Intente nuevamente.");
  }
}