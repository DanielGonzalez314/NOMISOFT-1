document.addEventListener('DOMContentLoaded', () => {
  const filtroAvanzado = document.getElementById('filtroAvanzado');
  const resultadoAvanzado = document.getElementById('resultadoAvanzado');

  if (!filtroAvanzado || !resultadoAvanzado) return;

  filtroAvanzado.addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura de filtros
    const salarioBase = document.getElementById('salarioBase')?.value;
    const fechaIngreso = document.getElementById('fechaIngreso')?.value;
    const departamento = document.getElementById('departamento')?.value;
    const cargo = document.getElementById('cargo')?.value;
    const estadoCivil = document.getElementById('estadoCivil')?.value;
    const hijos = document.getElementById('hijos')?.value;
    const fechaNacimiento = document.getElementById('fechaNacimiento')?.value;

    // Opciones extra
    const mostrarDocumento = document.getElementById('mostrarDocumento')?.checked;
    const mostrarTelefono = document.getElementById('mostrarTelefono')?.checked;
    const mostrarCorreo = document.getElementById('mostrarCorreo')?.checked;

    // Simulación de resultado
    resultadoAvanzado.innerHTML = `
      <h3>Resultados filtrados</h3>
      <p>Mostrando empleados que coinciden con los filtros seleccionados.</p>
      <ul>
        <li><strong>Nombre:</strong> Manuela Murcia</li>
        <li><strong>Cargo:</strong> Contadora</li>
        <li><strong>Departamento:</strong> Finanzas</li>
        <li><strong>Salario:</strong> $3.200.000</li>
        <li><strong>Estado Civil:</strong> Soltera</li>
        ${mostrarDocumento ? '<li><strong>Tipo de Documento:</strong> Cédula de Ciudadanía</li>' : ''}
        ${mostrarTelefono ? '<li><strong>Teléfono:</strong> 321-456-7890</li>' : ''}
        ${mostrarCorreo ? '<li><strong>Correo Electrónico:</strong> manuela@empresa.com</li>' : ''}
      </ul>
    `;
  });
});
