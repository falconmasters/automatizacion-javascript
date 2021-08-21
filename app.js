const lista = document.getElementById('lista');
const preview = document.getElementById('preview');
const btnAceptar = document.getElementById('aceptar');
let elementosLista = document.querySelectorAll('#lista a');
let postId;

// Eventlistener para click en los elementos de la lista.
document.addEventListener('click', (e) => {
	if(e.target && Array.from(e.target.classList).includes('elemento')){
		e.preventDefault();
		
		// Quitamos la clase activo de los demas elementos.
		lista.querySelectorAll('.activo').forEach(elemento => elemento.classList.remove('activo'));
		// Ponemos la clase activo al elemento actual
		e.target.classList.toggle('activo');

		setTimeout(async() => {
			// Obtenemos el ID
			postId = e.target.dataset.postId;

			// Llamamos la API y pasamos datos al contenedor
			const respuesta = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
			const comentarios = await respuesta.json();
	
			const plantilla = `
				<p class="titulo">${comentarios[0].email.toLowerCase()}</p>
				<p class="body">${comentarios[0].body}</p>
			`;
	
			preview.innerHTML = plantilla;
		}, 300);
	}
});

// Obtenemos los Post de la Lista Izquierda
const obtenerPosts = async() => {
	const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts');
	const body = await respuesta.json();
	
	await body.forEach(post => {
		lista.innerHTML += `
			<a href="#" data-post-id="${post.id}" class="elemento">
				${post.title}
			</a>
		`;
	});
}
obtenerPosts();

btnAceptar.addEventListener('click', (e) => {
	setTimeout(() => {
		lista.querySelector('.activo').classList.add('aceptado');
	
		const mensaje = document.getElementById('mensaje');
		document.getElementById('mensaje').innerHTML = '';
		preview.innerHTML += `
			<p class="respuesta">${mensaje.value}</p>
		`;
		mensaje.value = '';
	}, 300);
});