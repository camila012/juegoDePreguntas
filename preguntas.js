const preguntas = [
  {
    pregunta:'¿En qué año comenzó la II Guerra Mundial?',
    respuestaCorrecta: 0 ,
    opciones: ['1939','1928','1984','1854'],
    img:'./img/guerraM.jpg'
  },
  
  {
    pregunta:'¿Cómo se denomina el resultado de la multiplicación?',
    respuestaCorrecta: 1 ,
    opciones: ['Valor','Producto','Total','Respuesta'],
    img: './img/multiplicar.jpg'
  },
  
  {
    pregunta:'¿Qué país tiene forma de bota?',
    respuestaCorrecta: 0 ,
    opciones: ['Italia','Leticia Amazonas','Alemania','España'],
    img: './img/bota.jpeg'
    
  },
  
  {
    pregunta:'¿Cuál es el planeta mas grande del sistema solar?',
    respuestaCorrecta: 3 ,
    opciones: ['Saturno','Marte','Venus','Jupiter'],
    img: './img/universo.jpg'
  },
  
  {
    pregunta:'¿Qué cantidad de huesos tiene el cuerpo humano adulto?',
    respuestaCorrecta: 2 ,
    opciones: ['126','302','206','205'],
    img: './img/huesos.jpg'
  }
]

function seleccionarOpcion () {
  
  Swal.fire('Any fool can use a computer')
  
}


function mostrarOpciones (pregunta, pasar) {
  const containerJuego = document.getElementById('containerJuego')
  let opciones = pregunta.opciones.map(opcion => `<li>${opcion}</li>`) 
  
  
  
  
  
  containerJuego.innerHTML=
  `
  <a href="./" class="btn btn-danger regresar">Regresar</a>
  <div class="container">
  <div class="row">
  <div class="col-md-12 d-flex justify-content-center">
  <div class="card" style="width: 18rem; background-color: black;">
  <img src="${pregunta.img}" class="card-img-top" >
  <div class="card-body ">
  <div class="preguntas"> 
  <h5 class="card-title"><p>${pregunta.pregunta}</p>
  </h5>
  <ul>${opciones}</ul>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  `
  const opcionesElementos = containerJuego.getElementsByTagName('li')
  for (let index = 0; index < opciones.length; index++) {
    const element = opcionesElementos[index];
    element.addEventListener('click', () => {
      pasar(index)
    } )
  }
  
}






function iniciar() {
  const jugarBoton = document.getElementById('jugarBoton')
  
  let preguntaIndex = 0
  let puntaje = 0
  
  function evaluar (index) {
    const pregunta = preguntas[preguntaIndex]
    if(pregunta.respuestaCorrecta === index) {
      puntaje = puntaje +1
    }
    if((preguntaIndex +1) === preguntas.length) {
      Swal.queue([{
        title: 'TERMINO EL JUEGO',
        confirmButtonText: '¿Numero de acertadas?',
        
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(puntaje)
          .then(response => response.json())
          .then(data => Swal.insertQueueStep(data.ip))
          .catch(() => {
            Swal.insertQueueStep({
              title: puntaje
              
            })
          })
        }
      }])
      return
      
      
    }
    preguntaIndex = preguntaIndex +1
    mostrarOpciones(preguntas[preguntaIndex],evaluar)
  }
  
  
  jugarBoton.addEventListener('click' ,() => mostrarOpciones(preguntas[preguntaIndex],evaluar) )
  
}

iniciar()










