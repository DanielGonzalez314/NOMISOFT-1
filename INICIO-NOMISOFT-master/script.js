// 🔗 URL DE TU API
const API_URL = 'https://localhost:7203'; // Ajusta al puerto que te muestre Visual Studio

// 🧭 NAVEGACIÓN ENTRE SECCIONES
function mostrarSeccion(seccionId) {
  const idsSecciones = [
    'inicio', 'consultaEmpleado', 'registrarEmpleado',
    'editarEmpleado', 'crearNomina', 'editarNomina', 'liquidarNomina'
  ];
  
  idsSecciones.forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.style.display = 'none';
  });

  const seccion = document.getElementById(seccionId);
  if (seccion) {
    seccion.style.display = 'block';
  }
}

// 🚀 INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  // 🔧 BARRA LATERAL — CORREGIDO
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

    const modoGuardado = localStorage.getItem('modoOscuro');
    const isDark = modoGuardado === 'activado';
    if (isDark) document.body.classList.add('dark-mode');
    toggleDarkMode.innerHTML = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
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

  // 🔗 NAVEGACIÓN
  const botones = {
    mostrarInicio: 'inicio',
    mostrarConsulta: 'consultaEmpleado',
    mostrarRegistrar: 'registrarEmpleado',
    mostrarEditar: 'editarEmpleado',
    mostrarCrearNomina: 'crearNomina',
    mostrarEditarNomina: 'editarNomina',
    mostrarLiquidarNomina: 'liquidarNomina'
  };

  Object.entries(botones).forEach(([id, seccion]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarSeccion(seccion);
      });
    }
  });

  // ❌ CANCELAR OPERACIONES
  const cancelarIds = [
    'btnCancelarRegistro', 'btnCancelarEdicion',
    'btnCancelarNomina', 'btnCancelarEdicionNomina'
  ];
  cancelarIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => mostrarSeccion('inicio'));
    }
  });

  // 🔍 CONSULTA DE EMPLEADOS — FILTROS + COLUMNAS DINÁMICAS
  const formFiltro = document.getElementById('filtroAvanzado');
  if (formFiltro) {
    formFiltro.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const params = new URLSearchParams();
      const doc = document.getElementById('Documento')?.value.trim() || '';
      const nombre = document.getElementById('Nombre')?.value.trim() || '';
      const depto = document.getElementById('comboBox_Departamento')?.value.trim() || '';
      const cargo = document.getElementById('comboBox_Cargo')?.value.trim() || '';
      const salario = document.getElementById('comboBox_Salario_Base')?.value || '';

      if (doc) params.append('documento', doc);
      if (nombre) params.append('nombre', nombre);
      if (depto) params.append('departamento', depto);
      if (cargo) params.append('cargo', cargo);
      if (salario) params.append('salarioRange', salario);

      try {
        const response = await fetch(`${API_URL}/api/empleados?${params.toString()}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const empleados = await response.json();
        mostrarResultadosConsulta(empleados);
      } catch (error) {
        console.error('❌ Error:', error);
        document.getElementById('resultadoAvanzado').innerHTML = 
          '<p class="no-resultados">❌ Error al conectar con la base de datos.</p>';
      }
    });
  }

  // ✍️ REGISTRAR EMPLEADO
  const formRegistro = document.getElementById('formularioRegistroEmpleado');
  if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const datos = {
        Primer_Nombre: document.getElementById('txt_Nombre1')?.value || '',
        Segundo_Nombre: document.getElementById('txt_Nombre2')?.value || '',
        Primer_Apellido: document.getElementById('txt_Apellido1')?.value || '',
        Segundo_Apellido: document.getElementById('txt_Apellido2')?.value || '',
        Tipo_Documento: document.getElementById('Com_Box_Tipo_Doc')?.value || '',
        Numero_Documento: document.getElementById('txt_Numero_Doc')?.value || '',
        Fecha_Nacimiento: document.getElementById('txt_Fecha_Nacimiento')?.value || '',
        Telefono: document.getElementById('txt_Telefono')?.value || '',
        Correo: document.getElementById('txt_Correo')?.value || '',
        Direccion: document.getElementById('txt_Direccion')?.value || '',
        Estado_Civil: document.getElementById('txt_Estado_Civil')?.value || '',
        Numero_Hijos: document.getElementById('txt_Hijos')?.value || '0',
        Cargo: document.getElementById('txt_Cargo')?.value || '',
        Departamento: document.getElementById('txt_Departamento')?.value || '',
        Fecha_Ingreso: document.getElementById('txt_Fecha_Ingreso')?.value || '',
        Tipo_Contrato: document.getElementById('text_Tipo_Contrato')?.value || '',
        Salario_Base: document.getElementById('txt_Salario')?.value || '0',
        Estado: document.getElementById('txt_Estado')?.value || 'Activo'
      };

      try {
        const response = await fetch(`${API_URL}/api/empleados`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        if (response.ok) {
          alert('✅ Empleado registrado exitosamente');
          formRegistro.reset();
          mostrarSeccion('inicio');
        } else {
          const error = await response.text();
          alert('❌ Error al registrar: ' + error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('⚠️ No se pudo conectar con el servidor');
      }
    });
  }

  // ✏️ EDITAR EMPLEADO — BUSCAR POR DOCUMENTO
  const btnBuscarEditar = document.getElementById('button_Buscar');
  if (btnBuscarEditar) {
    btnBuscarEditar.addEventListener('click', async () => {
      const doc = document.getElementById('txt_Numero_Doc')?.value.trim();
      if (!doc) {
        alert('⚠️ Por favor ingresa un número de documento');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/empleados/${doc}`);
        if (!response.ok) {
          alert('❌ Empleado no encontrado');
          return;
        }

        const emp = await response.json();
        
        // ✅ Rellenar campos con los datos reales
        document.getElementById('txt_Nombre1').value = emp.Primer_Nombre || '';
        document.getElementById('txt_Nombre2').value = emp.Segundo_Nombre || '';
        document.getElementById('txt_Apellido1').value = emp.Primer_Apellido || '';
        document.getElementById('txt_Apellido2').value = emp.Segundo_Apellido || '';
        document.getElementById('Com_Box_Tipo_Doc').value = emp.Tipo_Documento || '';
        document.getElementById('txt_Fecha_Nacimiento').value = emp.Fecha_Nacimiento ? emp.Fecha_Nacimiento.split('T')[0] : '';
        document.getElementById('txt_Telefono').value = emp.Telefono || '';
        document.getElementById('txt_Correo').value = emp.Correo || '';
        document.getElementById('txt_Direccion').value = emp.Direccion || '';
        document.getElementById('txt_Estado_Civil').value = emp.Estado_Civil || '';
        document.getElementById('txt_Hijos').value = emp.Numero_Hijos || '0';
        document.getElementById('txt_Cargo').value = emp.Cargo || '';
        document.getElementById('txt_Departamento').value = emp.Departamento || '';
        document.getElementById('txt_Fecha_Ingreso').value = emp.Fecha_Ingreso ? emp.Fecha_Ingreso.split('T')[0] : '';
        document.getElementById('text_Tipo_Contrato').value = emp.Tipo_Contrato || '';
        document.getElementById('txt_Salario').value = emp.Salario_Base || '0';
        document.getElementById('txt_Estado').value = emp.Estado || 'Activo';
        
        alert(`✅ Empleado encontrado: ${emp.Primer_Nombre} ${emp.Primer_Apellido}`);
      } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Error al buscar empleado');
      }
    });
  }

  const btnGuardarEdicion = document.getElementById('btnGuardarEdicion');
  if (btnGuardarEdicion) {
    btnGuardarEdicion.addEventListener('click', async () => {
      const doc = document.getElementById('txt_Numero_Doc')?.value.trim();
      if (!doc) {
        alert('⚠️ Primero busca un empleado');
        return;
      }

      const datos = {
        Primer_Nombre: document.getElementById('txt_Nombre1')?.value || '',
        Segundo_Nombre: document.getElementById('txt_Nombre2')?.value || '',
        Primer_Apellido: document.getElementById('txt_Apellido1')?.value || '',
        Segundo_Apellido: document.getElementById('txt_Apellido2')?.value || '',
        Tipo_Documento: document.getElementById('Com_Box_Tipo_Doc')?.value || '',
        Numero_Documento: document.getElementById('txt_Numero_Doc')?.value || '',
        Fecha_Nacimiento: document.getElementById('txt_Fecha_Nacimiento')?.value || '',
        Telefono: document.getElementById('txt_Telefono')?.value || '',
        Correo: document.getElementById('txt_Correo')?.value || '',
        Direccion: document.getElementById('txt_Direccion')?.value || '',
        Estado_Civil: document.getElementById('txt_Estado_Civil')?.value || '',
        Numero_Hijos: document.getElementById('txt_Hijos')?.value || '0',
        Cargo: document.getElementById('txt_Cargo')?.value || '',
        Departamento: document.getElementById('txt_Departamento')?.value || '',
        Fecha_Ingreso: document.getElementById('txt_Fecha_Ingreso')?.value || '',
        Tipo_Contrato: document.getElementById('text_Tipo_Contrato')?.value || '',
        Salario_Base: document.getElementById('txt_Salario')?.value || '0',
        Estado: document.getElementById('txt_Estado')?.value || 'Activo'
      };

      try {
        const response = await fetch(`${API_URL}/api/empleados/${doc}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        if (response.ok) {
          alert('✅ Cambios guardados exitosamente');
          mostrarSeccion('inicio');
        } else {
          const error = await response.text();
          alert('❌ Error al actualizar: ' + error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('⚠️ No se pudo conectar con el servidor');
      }
    });
  }

  // 💧 LIQUIDAR NÓMINA
  const btnBuscarLiquidar = document.getElementById('btnBuscarLiquidar');
  if (btnBuscarLiquidar) {
    btnBuscarLiquidar.addEventListener('click', async () => {
      const doc = document.getElementById('documentoLiquidar')?.value.trim();
      const periodo = 'Nov2025';
      
      if (!doc) {
        alert('⚠️ Ingresa el documento del empleado');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/nomina?documento=${doc}&periodo=${periodo}`);
        if (response.ok) {
          const nomina = await response.json();
          mostrarResultadoLiquidar(nomina);
        } else {
          document.getElementById('resultadoLiquidar').innerHTML = 
            '<p class="no-resultados">❌ Nómina no encontrada.</p>';
        }
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultadoLiquidar').innerHTML = 
          '<p class="no-resultados">❌ Error de conexión.</p>';
      }
    });
  }

  // 🏠 INICIO POR DEFECTO
  mostrarSeccion('inicio');
});

// 👁️ MOSTRAR RESULTADOS DE CONSULTA
function mostrarResultadosConsulta(empleados) {
  const contenedor = document.getElementById('resultadoAvanzado');
  if (!empleados || empleados.length === 0) {
    contenedor.innerHTML = '<p class="no-resultados">No se encontraron empleados.</p>';
    return;
  }

  let html = `<table><thead><tr>
    <th>Documento</th>
    <th>Nombre</th>
    <th>Departamento</th>
    <th>Cargo</th>
    <th>Salario</th>
    <th>Estado</th>
  </tr></thead><tbody>`;

  empleados.forEach(emp => {
    html += `
      <tr>
        <td>${emp.Numero_Documento || '—'}</td>
        <td>${emp.Nombre || '—'}</td>
        <td>${emp.Departamento || '—'}</td>
        <td>${emp.Cargo || '—'}</td>
        <td>$${emp.Salario ? parseFloat(emp.Salario).toLocaleString() : '0'}</td>
        <td>${emp.Estado || '—'}</td>
      </tr>`;
  });

  html += '</tbody></table>';
  contenedor.innerHTML = html;
}

// 👁️ MOSTRAR RESULTADO DE LIQUIDACIÓN
function mostrarResultadoLiquidar(nomina) {
  const contenedor = document.getElementById('resultadoLiquidar');
  contenedor.innerHTML = `
    <div class="nomina-resultado">
      <h3>📄 Nómina encontrada</h3>
      <p><strong>Empleado:</strong> ${nomina.Numero_Documento}</p>
      <p><strong>Período:</strong> ${nomina.Periodo}</p>
      <p><strong>Neto a pagar:</strong> $${nomina.Neto_Pagar?.toLocaleString() || '0'}</p>
      <button class="btn-filtrar" onclick="alert('✅ Nómina liquidada exitosamente')">✅ Confirmar liquidación</button>
    </div>`;
}

// 🛑 CERRAR SESIÓN
function cerrarSesion() {
  if (confirm('¿Seguro que deseas cerrar sesión?')) {
    window.location.href = 'login.html';
  }
}