let carritoStorage = JSON.parse(localStorage.getItem('carrito'))

let tabla = document.getElementById('tabla')
let cantidadTotal = 0
let total = 0

if (carritoStorage) {  carritoStorage.map(producto => {
  cantidadTotal = cantidadTotal + producto.unidades
  total = total + producto.subtotal
  let tr = document.createElement('tr')
  tr.innerHTML = `   
    <tr>
      <td><img src="${producto.imagen}" class="imagenProducto"></img></td>
      <td>${producto.nombreProd}</td>
      <td>$${producto.precioUnidad}</td>
      <td>${producto.unidades}</td>
      <td>$${producto.subtotal}</td>
    </tr>
  `
  tabla.appendChild(tr)
  let hr = document.createElement("hr")
  tabla.appendChild(hr)
})

let tr = document.createElement('tr')
  tr.innerHTML = `   
      <td>TOTAL</td>
      <td></td>
      <td></td>
      <td>${cantidadTotal}</td>
      <td>$${total}</td>
  `
tabla.appendChild(tr)
}

