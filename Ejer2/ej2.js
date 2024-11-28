const form = document.forms.suscripcionForm;
const temasContainer = document.getElementById('temasContainer');
const nombreError = document.getElementById('nombreError');
const nombreInput = form.elements.nombre;
const dniInput = form.elements.dni;
const dniError = document.getElementById('dniError');
const precioSpan = document.getElementById('precio');

const suscripciones = {
  'basico': {
    precio: 5,
    temas: 1,
  },
  'estandar': {
    precio: 10,
    temas: 3,
  },
  'premium': {
    precio: 15,
    temas: 6,
  },
  'elite': {
    precio: 20,
    temas: TEMAS.length,
  },
}

TEMAS.forEach(tema => {
  // temasContainer.innerHTML += `<input 
  //   type="checkbox" 
  //   name="tema[]" 
  //   id="${t}"
  //   value="${t}" >
  //   <label for="${t}">${t}</label>`;

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = 'tema[]';
  input.id = input.value = tema;
  input.addEventListener('change', changeTema);

  const label = document.createElement('label');
  label.htmlFor = tema;
  label.textContent = tema;

  temasContainer.append(input, label);
});

nombreInput.addEventListener('input', (e) => {
  nombreInput.value = nombreInput.value.toLocaleUpperCase();
  if (nombreInput.value.length < 3) {
    nombreInput.setCustomValidity('Tienes que tener 3 caracteres o más');
  } else {
    nombreInput.setCustomValidity('');
  }
  nombreError.textContent = e.target.validationMessage;
});

dniInput.addEventListener('input', (e) => {
  dniError.textContent = e.target.validationMessage;
  dniInput.value = dniInput.value.toLocaleUpperCase();
});


form.elements.tipo.forEach(radio => radio.addEventListener('change', (e) =>{
  let tipo = form.elements.tipo.value;
  precioSpan.textContent = suscripciones[tipo].precio;
}));

precioSpan.textContent = suscripciones.basico.precio;

function changeTema(e) {
  let tipo = form.elements.tipo.value;
  console.log('Número de temas suscripcion: ', suscripciones[tipo].temas);
  console.log('Temas seleccionados (checked)');
  console.log('Número de temas seleccionados');
}
