// ✅ Función para generar reporte
document.addEventListener('DOMContentLoaded', () => {
    const btnGenerar = document.getElementById('btnGenerar');
    
    if (btnGenerar) {
        btnGenerar.addEventListener('click', () => {
            const tipo = document.getElementById('tipoReporte').value;
            const periodo = document.getElementById('periodo').value;

            // Mapeo para mostrar nombre legible en el alert
            const tipoNombre = {
                'nomina': 'Nómina',
                'vacaciones': 'Vacaciones',
                'horasextras': 'Horas Extras'
            }[tipo] || 'Reporte';

            const periodoNombre = {
                'mesActual': 'Mes Actual',
                'opcion2': 'Option 2',
                'opcion3': 'Option 3',
                'opcion4': 'Option 4',
                'opcion5': 'Option 5'
            }[periodo] || 'Periodo';

            alert(`✅ Reporte de "${tipoNombre}" para el periodo "${periodoNombre}" generado exitosamente.`);
        });
    }
});