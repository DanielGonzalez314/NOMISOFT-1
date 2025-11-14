// 🧭 NAVEGACIÓN ENTRE SECCIONES — FUNCION PRINCIPAL
function mostrarSeccion(seccionId) {
  // Lista de todas las secciones que deben ocultarse
  const idsSecciones = ['inicio', 'consultaEmpleado', 'registrarEmpleado', 'editarEmpleado', 'crearNomina', 'editarNomina'];
  
  // Ocultar todas
  idsSecciones.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = 'none';
  });

  // Mostrar la seleccionada
  const seccion = document.getElementById(seccionId);
  if (seccion) {
    seccion.style.display = 'block';
  }
}

// 🧪 SCRIPT COMPLETO — SIDEBAR + NAVEGACIÓN + MODO OSCURO

document.addEventListener('DOMContentLoaded', () => {
  // 🔧 BARDA LATERAL
  const toggleSidebar = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  
  if (toggleSidebar && sidebar) {
    toggleSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // 🌙 MODO OSCURO
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  if (toggleDarkMode) {
    toggleDarkMode.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('modoOscuro', isDark ? 'activado' : 'desactivado');
      toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
    });

    // Cargar modo oscuro guardado
    const modoGuardado = localStorage.getItem('modoOscuro');
    const isDark = modoGuardado === 'activado';
    if (isDark) {
      document.body.classList.add('dark-mode');
    }
    if (toggleDarkMode) {
      toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
    }
  }

  // 📊 MENÚS DESPLEGABLES
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        drop.classList.toggle('active');
      });
    }
  });

  // 🔗 EVENTOS DE NAVEGACIÓN
  const mostrarInicio = document.getElementById('mostrarInicio');
  const mostrarConsulta = document.getElementById('mostrarConsulta');
  const mostrarRegistrar = document.getElementById('mostrarRegistrar');
  const mostrarEditar = document.getElementById('mostrarEditar');
  const mostrarCrearNomina = document.getElementById('mostrarCrearNomina');
  const mostrarEditarNomina = document.getElementById('mostrarEditarNomina');

  if (mostrarInicio) {
    mostrarInicio.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion('inicio');
    });
  }

  if (mostrarConsulta) {
    mostrarConsulta.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion('consultaEmpleado');
    });
  }

  if (mostrarRegistrar) {
    mostrarRegistrar.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion('registrarEmpleado');
    });
  }

  if (mostrarEditar) {
    mostrarEditar.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion('editarEmpleado');
    });
  }

  if (mostrarCrearNomina) {
    mostrarCrearNomina.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion('crearNomina');
    });
  }

  if (mostrarEditarNomina) {
    mostrarEditarNomina.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion('editarNomina');
    });
  }

  // 🏠 Mostrar inicio por defecto
  mostrarSeccion('inicio');
});