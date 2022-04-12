
let carrito = []
let contenedorTarjetas = document.getElementById("contenedorTarjetas")

const llamarModal= async()=>{
  const { value: nombre } = await Swal.fire({
    title: 'ingrese nombre',
    input: 'text',
    inputLabel: 'Password',
    inputPlaceholder: 'ingrese nombre',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  })
  
  if (nombre) {
    sessionStorage.setItem('nombre', nombre)
    Swal.fire(
      `bienvenido ${sessionStorage.getItem('nombre')}!`,
      'Presiona OK para cerrar!',
      'info'
    )
  }
}

fetch('data.json')
  .then(res => res.json())
  .then(async data => {

    await llamarModal()
    miPrograma(data.listaProductos)
  })

function miPrograma(productos) {
  productos.map((producto, i) => {
    let tarjeta = document.createElement("div")
    tarjeta.classList.add("tarjetaProducto")

    tarjeta.innerHTML = `
    <div class="contenedorNombre">
      <h3 class="nombreProducto">${producto.nombre}</h3>
    </div>
    <div class='imagenProducto' style="background-image: url(${producto.imagen})"></div>
    <div class="contenedorPrecioYCarrito">
      <h4>$${producto.precio}</h4>
      <div class="cantidad">
        <input id=${producto.id}Input value="1" min="1" max=${producto.stock} type="number"></input>
        <i class="fa fa-cart-plus" id=${producto.id}Carrito onClick="mostrarAlerta()"></i>
      </div>
    </div>
    `
    contenedorTarjetas.appendChild(tarjeta)
    
    var entrada = document.getElementById(`${producto.id}Input`)

    const btnCarrito = document.getElementById(`${producto.id}Carrito`)
    btnCarrito.addEventListener('mousedown', () => {
      localStorage.getItem('carrito', []) == null && localStorage.setItem('carrito', '[]')
      var carritoStorage = JSON.parse(localStorage.getItem('carrito'))
      carritoStorage.push({ idProd: producto.id, nombreProd: producto.nombre, unidades: parseInt(entrada.value), precioUnidad: producto.precio, subtotal: parseInt(entrada.value) * producto.precio })
      localStorage.setItem('carrito', JSON.stringify(carritoStorage))
    })
  })
}





function mostrarAlerta() {
  Toastify({
    text: "agregaste un producto al carrito",
    duration: 3000
  }).showToast();

    //Swal.fire(
    //'Producto agregado al carrito!',
    //'Presiona OK para cerrar!',
    //'success'
  //) 
}
