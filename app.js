const formulario = document.getElementById('form-activo');
const listaActivos = document.getElementById('lista-activos');
let inventario = JSON.parse(localStorage.getItem('activos')) || [];

document.addEventListener('DOMContentLoaded', mostrarActivos);
formulario.addEventListener('submit', agregarActivo);

function agregarActivo(e) {
    e.preventDefault();
    const equipo = document.getElementById('equipo').value.trim();
    const estado = document.getElementById('estado').value;

    if (equipo === '' || estado === '') return;

    const nuevoActivo = { id: Date.now(), equipo, estado };
    inventario.push(nuevoActivo);
    localStorage.setItem('activos', JSON.stringify(inventario));
    mostrarActivos();
    formulario.reset();
}

function mostrarActivos() {
    listaActivos.innerHTML = '';
    inventario.forEach(activo => {
        const row = document.createElement('tr');
        let claseBadge = activo.estado === 'Operativo' ? 'badge-operativo' : 
                         activo.estado === 'En Mantenimiento' ? 'badge-mantenimiento' : 'badge-baja';

        row.innerHTML = `
            <td>${activo.id.toString().slice(-4)}</td>
            <td class="fw-bold">${activo.equipo}</td>
            <td><span class="${claseBadge}">${activo.estado}</span></td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarActivo(${activo.id})">Eliminar</button></td>
        `;
        listaActivos.appendChild(row);
    });
}

function eliminarActivo(id) {
    inventario = inventario.filter(activo => activo.id !== id);
    localStorage.setItem('activos', JSON.stringify(inventario));
    mostrarActivos();
}