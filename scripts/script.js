const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const toggleDarkMode = document.getElementById('toggleDarkMode');

// Mostrar u ocultar la barra lateral
toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Activar modo oscuro y guardar preferencia
toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('modoOscuro', isDark ? 'activado' : 'desactivado');
  toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
});

// Cargar preferencia al iniciar
window.addEventListener('DOMContentLoaded', () => {
  const modoGuardado = localStorage.getItem('modoOscuro');
  const isDark = modoGuardado === 'activado';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
  toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
});
