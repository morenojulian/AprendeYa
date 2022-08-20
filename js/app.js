// Referencias
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let miCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //cuando agregas un curso presionando agregar al carrito
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", () => {
    miCarrito = [];
    limpiarCarrito();
  });
}

//Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito"));
  const cursoSeleccionado = e.target.parentElement.parentElement;

  leerDatosCurso(cursoSeleccionado);
}
//eliminar curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    miCarrito = miCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //revisa que no se repita lo mismo en el carrito
  const existe = miCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = miCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    miCarrito = [...cursos];
  } else {
    // agregando elementos al carrito
    miCarrito = [...miCarrito, infoCurso];
  }

  carritoHTML();
}

//muestra el carrito en html

function carritoHTML() {
  limpiarCarrito();
  miCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>
    <img src="${imagen}" width = "100">
  </td>
  <td>
    ${titulo}
  </td>
  <td>
    ${precio}
  </td>
  <td>
    ${cantidad}
  </td>
  <td>
  <a href="#" class ="borrar-curso" data-id="${id}" > X </a>
  </td>
  `;

    // agrega el html del carrito en el tbody

    contenedorCarrito.appendChild(row);
  });
}

// Limpia el primer elemento del carrito cada vez que agregamos un curso nuevo para no repetirlo.
function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
