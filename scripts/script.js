// 🌙 MODO OSCURO Y BARRA LATERAL
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const toggleDarkMode = document.getElementById('toggleDarkMode');

toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

toggleDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('modoOscuro', isDark ? 'activado' : 'desactivado');
  toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
});

window.addEventListener('DOMContentLoaded', () => {
  const modoGuardado = localStorage.getItem('modoOscuro');
  const isDark = modoGuardado === 'activado';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
  if (toggleDarkMode) {
    toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
  }
});

// MENÚS DESPLEGABLES EN LA BARRA LATERAL
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
  const toggle = drop.querySelector('.dropdown-toggle');
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    drop.classList.toggle('active');
  });
});

//  NAVEGACIÓN ENTRE SECCIONES
const mostrarConsulta = document.getElementById('mostrarConsulta');
const mostrarPanel = document.getElementById('mostrarPanel');
const panelNomina = document.getElementById('panelNomina');
const consultaEmpleado = document.getElementById('consultaEmpleado');

if (mostrarConsulta) {
  mostrarConsulta.addEventListener('click', (e) => {
    e.preventDefault();
    panelNomina.style.display = 'none';
    consultaEmpleado.style.display = 'block';
  });
}

if (mostrarPanel) {
  mostrarPanel.addEventListener('click', (e) => {
    e.preventDefault();
    consultaEmpleado.style.display = 'none';
    panelNomina.style.display = 'block';
  });
}

// CONSULTA DE EMPLEADOS
const empleados = [
  { id: 1, nombre: "Manuela Murcia", cargo: "Contadora", salario: 3200000, estado: "Activo" },
  { id: 2, nombre: "Yeison Hernandez", cargo: "Ingeniero", salario: 2500000, estado: "Migajero-senil" },
  { id: 3, nombre: "Marta Ruiz", cargo: "Auxiliar", salario: 2100000, estado: "Inactivo" }
];

const formBusqueda = document.getElementById('busquedaEmpleado');
const filtroInput = document.getElementById('filtroEmpleado');
const resultadoTabla = document.getElementById('resultadoEmpleado');

if (formBusqueda) {
  const mostrarTodos = () => {
    resultadoTabla.innerHTML = empleados.map(emp => `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.nombre}</td>
        <td>${emp.cargo}</td>
        <td>$${emp.salario.toLocaleString()}</td>
        <td>${emp.estado}</td>
      </tr>
    `).join('');
  };

  mostrarTodos();

  formBusqueda.addEventListener('submit', function(e) {
    e.preventDefault();
    const filtro = filtroInput.value.toLowerCase();
    const resultados = empleados.filter(emp =>
      emp.nombre.toLowerCase().includes(filtro) || emp.id.toString().includes(filtro)
    );

    resultadoTabla.innerHTML = resultados.map(emp => `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.nombre}</td>
        <td>${emp.cargo}</td>
        <td>$${emp.salario.toLocaleString()}</td>
        <td>${emp.estado}</td>
      </tr>
    `).join('');
  });
}
