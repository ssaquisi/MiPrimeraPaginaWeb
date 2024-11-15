let loaded = (eventLoaded) => {
  let myform = document.getElementById("formulario");

  myform.addEventListener("submit", (eventSubmit) => {
    debugger;
  });
};

window.addEventListener("DOMContentLoaded", loaded);

constformulario = document.getElementById("formulario");
constformulario.addEventListener("submit", (event) => {
  event.preventDefault();

  nombre = document.getElementById("nombre");
  email = document.getElementById("email");
  intereses = document.getElementById("intereses");

  if (nombre.value.length == 0) {
    Swal.fire({
      title: "Olvidas algo?",
      text: "Debes escribir tu nombre",
      icon: "warning",
    });
    nombre.focus();
    return;
  }

  if (email.value.length == 0) {
    Swal.fire({
      title: "Olvidas algo?",
      text: "Debes escribir tu correo electrónico",
      icon: "warning",
    });
    email.focus();
    return;
  }

  if (intereses.value == "no_selected") {
    Swal.fire({
      title: "Olvidas algo?",
      text: "Debes seleccionar tus intereses",
      icon: "warning",
    });
    intereses.focus();
    return;
  }

  constnombre = document.getElementById("nombre").value;
  constemail = document.getElementById("email").value;
  constintereses = document.getElementById("intereses").value;

  constdatos = {
    nombre: constnombre,
    email: constemail,
    intereses: constintereses,
  };

  fetch("https://test-9356e-default-rtdb.firebaseio.com/datos.json", {
    method: "POST",
    body: JSON.stringify(constdatos),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      Swal.fire({
        title: "Gracias!",
        text: "Tus datos han sido enviados correctamente",
        icon: "success",
      });
      formulario.reset();
      obtenerDatos();
    })
    .catch((error) => console.error(error));
});

async function obtenerDatos() {
  const url = "https://test-9356e-default-rtdb.firebaseio.com/datos.json";
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    console.error("Error:", respuesta.status);
    return;
  }
  const datos = await respuesta.json();
  console.log(datos);
  let conteoProductos = [];
  for (let key in datos) {
    let producto = datos[key].intereses;
    if (conteoProductos[producto]) {
      conteoProductos[producto]++;
    } else {
      conteoProductos[producto] = 1;
    }
  }
  console.log(conteoProductos);

  document.getElementById("tablebody").innerHTML = '';

  for (let key in conteoProductos) {
      producto = key;
      console.log(producto);
      conteo = conteoProductos[key];
      console.log(conteo);
      let template = `
                <tr>
                  <td>${producto}</td>
                  <td>${conteo}</td>
                </tr>
    `;
      document.getElementById("tablebody").innerHTML += template;
    
  }
  
}

obtenerDatos();


window.onscroll = function() {scrollFunction()};

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var mybutton = document.getElementById("scrollTop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function shopAlert() {
  Swal.fire({
    title: 'En venta!',
    text: 'Pueden parecer defectuosos pero son buenos (?',
    icon: 'success',
    confirmButtonText: 'Agregar al carrito'
  });
}

function shopAlert2() {
  Swal.fire({
    title: 'Disculpa',
    text: 'Por el momento no hay nada sobre esta servidora. Búscame en Google',
    icon: 'error',
    confirmButtonText: 'Bye...'
  });
}

function userAlert() {
  Swal.fire({
    title: 'Disculpas',
    text: 'Esta sección se encuentra en mantenimiento',
    icon: 'error',
    confirmButtonText: 'Seguir comprando'
  });
}

