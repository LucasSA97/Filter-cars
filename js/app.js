
//Variables
const year = document.querySelector('#year')                            
const marca = document.querySelector('#marca')                            
const minimo = document.querySelector('#minimo')                            
const maximo = document.querySelector('#maximo')                            
const puertas = document.querySelector('#puertas')                            
const transmision = document.querySelector('#transmision')                            
const color = document.querySelector('#color')   

//Results
const results = document.querySelector('#resultado')


const max = new Date().getFullYear();
const min = max - 10;


//Generamos un objeto con los datos de la busqueda
const datosBusqueda = {
    marca: '',
    year: '', 
    maximo: '', 
    minimo: '', 
    color: '', 
    puertas: '', 
    transmision: '', 
}



//Eventos
document.addEventListener('DOMContentLoaded', () =>{
   showAutos(autos);
   llenarSelectAños();
})



//Event listener para los select de busqueda
marca.addEventListener('change', e => {
 datosBusqueda.marca = e.target.value

 filtrarAuto() 
})

year.addEventListener('change', e => {
 datosBusqueda.year = parseInt(e.target.value) //Para convertir el string en un numero entero

 filtrarAuto()
})

maximo.addEventListener('change', e => {
 datosBusqueda.maximo = e.target.value

 filtrarAuto() 
})

minimo.addEventListener('change', e => {
 datosBusqueda.minimo = e.target.value

 filtrarAuto() 
})

color.addEventListener('change', e => {
 datosBusqueda.color = e.target.value 

 filtrarAuto()
})

puertas.addEventListener('change', e => {
 datosBusqueda.puertas = parseInt(e.target.value) 

 filtrarAuto()
})

transmision.addEventListener('change', e => {
 datosBusqueda.transmision = e.target.value 

 filtrarAuto()
})




//Funciones
function showAutos(autos){
    cleanHtml() //Limpiara previamente el html para que solo renderice las coincidencias
    autos.forEach(auto => {
        const { marca, modelo, color, precio, puertas, transmision, year } = auto
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} - ${modelo} - ${year} - ${puertas} Puertas -Transmisión: ${transmision} - Color: ${color} - Precio: $${precio}
        `

        //Insertar el resultado en el html
         results.appendChild(autoHTML)
    })

}

function cleanHtml () {
    while(results.firstChild){
        results.removeChild(results.firstChild)
    }
}

function llenarSelectAños() {
   for( let i = max; i >= min; i--){
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); //Agregamos las opciones al select

   }
}

   function filtrarAuto() {
    const results = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarColor ).filter( filtrarPuertas ).filter( filtrarTransmision )
     console.log(results)

     if(results.length){
         showAutos(results)
     } else {
        noResultado()
     }
   }

   function noResultado() {

    cleanHtml()
    const noCar = document.createElement('div');
    noCar.classList.add('alerta', 'error');
    noCar.textContent = 'No hay resultados';
    results.appendChild(noCar)
   }

   function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda
    if( puertas ) {
        return auto.puertas === puertas
    }
    return auto
   }

   function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda
    if( transmision ) {
        return auto.transmision === transmision
    }
    return auto
   }

   function filtrarColor(auto) {
    const { color } = datosBusqueda
    if( color ) {
        return auto.color === color
    }
    return auto
   }

   function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda
    if( minimo ) {
        return auto.precio >= minimo
    }
    return auto
   }

   function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda
    if( maximo ) {
        return auto.precio <= maximo
    }
    return auto
   }

   function filtrarMarca(auto) {
    const { marca } = datosBusqueda
    if( marca ) {
        return auto.marca === marca
    }
    return auto
   }

   function filtrarYear(auto) {
    const { year } = datosBusqueda
    if( year ) {
        return auto.year === year
    }
    return auto
   }


