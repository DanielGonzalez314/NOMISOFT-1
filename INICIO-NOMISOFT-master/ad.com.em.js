document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('filtroAvanzado');
  const resultado = document.getElementById('resultadoAvanzado');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const filtros = {
      Nombre: document.getElementById('Nombre')?.value,
      Documento: document.getElementById('Documento')?.value,
      // ...otros filtros
    };

    try {
      const response = await fetch('http://localhost:5000/api/empleados/consultar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filtros)
      });

      const empleados = await response.json();
      resultado.innerHTML = generarTabla(empleados);
    } catch (error) {
      resultado.innerHTML = '<p>Error al consultar empleados.</p>';
    }
  });

  function generarTabla(data) {
    if (!Array.isArray(data) || data.length === 0) return '<p>No se encontraron empleados.</p>';

    let html = '<table><thead><tr>';
    Object.keys(data[0]).forEach(key => {
      html += `<th>${key}</th>`;
    });
    html += '</tr></thead><tbody>';
    data.forEach(emp => {
      html += '<tr>';
      Object.values(emp).forEach(val => {
        html += `<td>${val}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
  }
});
