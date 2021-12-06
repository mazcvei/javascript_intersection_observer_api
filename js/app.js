const elementos_obeserver = document.querySelectorAll('.element_observer')
const contenedor_api = document.querySelector('#contenedor_api')
let cargado = false;

const cargarImagen = (entradas, observador) => {
	// console.log(entradas)
	// console.log(observador)

	entradas.forEach((entrada) => {
		if(entrada.isIntersecting){
			entrada.target.classList.add('visible');
		} else {
			// entrada.target.classList.remove('visible');
		}
	});
}
const cargarApi =  (elementos, observador) => {
	 //console.log(elementos[0])
	// console.log(observador)
		if(elementos[0].isIntersecting && !cargado){
			//console.log('Elemento api cargado')
			let photo_num = Math.round(Math.random()*5000); //La API provee hasta 5000 fotos.
			fetch(`https://jsonplaceholder.typicode.com/photos/${photo_num}`)
				.then((response) => response.json())
				.then((datos) =>{
					console.log(datos)
					let element = `<hr>
					<p>Elemento creado a partir de una peticion fetch:</p>
					<p>Album ID: ${datos.albumId}</p>
					<p>Id: ${datos.id}</p>
					<p>Titulo: ${datos.title}</p>
					<img src="${datos.url}">
					<hr>
					` 
				contenedor_api.innerHTML=element;
				cargado=true;
				});
		} else {
			// entrada.target.classList.remove('visible');
		}	
}

const observador = new IntersectionObserver(cargarImagen, {
	root: null,
	rootMargin: '500px 0px 100px 0px',
	threshold: 1.0
});
const observador_api = new IntersectionObserver(cargarApi, {
	root:null,
	rootMargin: '500px 0px 100px 0px',
	threshold: 1.0
});


elementos_obeserver.forEach((elemento) => {
	
	observador.observe(elemento);
});
observador_api.observe(contenedor_api);