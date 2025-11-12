document.addEventListener('DOMContentLoaded', () => {
  const filtroAvanzado = document.getElementById('filtroAvanzado');
  const resultadoAvanzado = document.getElementById('resultadoAvanzado');

  if (!filtroAvanzado || !resultadoAvanzado) return;

  filtroAvanzado.addEventListener('submit', async function (e) {
  e.preventDefault();

  const filtros = {
    Nombre: document.getElementById('Nombre')?.value,
    Documento: document.getElementById('Documento')?.value,
    Departamento: document.getElementById('Departamento')?.value,
    Cargo: document.getElementById('Cargo')?.value,
    Estado: document.getElementById('Estado')?.value,
    SalarioRange: document.getElementById('SalarioRange')?.value,
    Fecha_Ingreso: document.getElementById('Fecha_Ingreso')?.value,
    Fecha_Nacimiento: document.getElementById('Fecha_Nacimiento')?.value,
    Numero_Hijos: document.getElementById('Numero_Hijos')?.value,
    Tipo_Documento: document.getElementById('Tipo_Documento')?.checked,
    Telefono: document.getElementById('Telefono')?.checked,
    Correo: document.getElementById('Correo')?.checked,
    Direccion: document.getElementById('Direccion')?.checked,
    Estado_Civil: document.getElementById('Estado_Civil')?.checked,
    Cargo_Check: document.getElementById('Cargo_Check')?.checked,
    Fecha_Nacimiento_Check: document.getElementById('Fecha_Nacimiento_Check')?.checked
  };

  console.log("Filtros enviados:", filtros);

  const response = await fetch('http://localhost:5000/api/empleados/consultar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filtros)
  });

  const empleados = await response.json();
  // Renderizar resultados en resultadoAvanzado...
});
});
