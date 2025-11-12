// MODO OSCURO
const toggleDarkMode = document.getElementById('toggleDarkMode');
toggleDarkMode?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('modoOscuro', isDark ? 'activado' : 'desactivado');
  toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
});

window.addEventListener('DOMContentLoaded', () => {
  const modoGuardado = localStorage.getItem('modoOscuro');
  if (modoGuardado === 'activado') {
    document.body.classList.add('dark-mode');
    if (toggleDarkMode) toggleDarkMode.innerHTML = '☀️ Modo claro';
  }
});

// BARRA LATERAL
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

toggleSidebar?.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// MENUS DESPLEGABLES
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggle.parentElement.classList.toggle('active');
  });
});

// NAVEGACION ENTRE MODULOS
const mostrarConsulta = document.getElementById('mostrarConsulta');
const mostrarPanel = document.getElementById('mostrarPanel');
const panelNomina = document.getElementById('panelNomina');
const consultaEmpleado = document.getElementById('consultaEmpleado');

mostrarConsulta?.addEventListener('click', (e) => {
  e.preventDefault();
  panelNomina.style.display = 'none';
  consultaEmpleado.style.display = 'block';
});

mostrarPanel?.addEventListener('click', (e) => {
  e.preventDefault();
  consultaEmpleado.style.display = 'none';
  panelNomina.style.display = 'block';
});
