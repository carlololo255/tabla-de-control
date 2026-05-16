// Configuración extraída de tu consola de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBoo0eqjPihAfYiETfnr-p1qWrCNjxnyj4",
    authDomain: "album-virtual2026.firebaseapp.com",
    databaseURL: "https://album-virtual2026-default-rtdb.firebaseio.com",
    projectId: "album-virtual2026",
    storageBucket: "album-virtual2026.firebasestorage.app",
    messagingSenderId: "74601943665",
    appId: "1:74601943665:web:a9810bb3671178ff54c1d0"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const ALBUM_CONFIG = {
    faseGrupos: {
        "ESTADIOS": { inicio: 1, fin: 16 },
        "Grupo A - México": { inicio: 17, fin: 32 },
        "Grupo A - Sudáfrica": { inicio: 33, fin: 48 },
        "Grupo A - Corea del Sur": { inicio: 49, fin: 55 },
        "Grupo A - República Checa": { inicio: 56, fin: 62 },
        "Grupo B - Canadá": { inicio: 63, fin: 78 },
        "Grupo B - Bosnia y Herzegovina": { inicio: 79, fin: 94 },
        "Grupo B - Catar": { inicio: 95, fin: 101 },
        "Grupo B - Suiza": { inicio: 102, fin: 108 },
        "Grupo C - Brasil": { inicio: 109, fin: 124 },
        "Grupo C - Marruecos": { inicio: 125, fin: 140 },
        "Grupo C - Haití": { inicio: 141, fin: 147 },
        "Grupo C - Escocia": { inicio: 148, fin: 154 },
        "Grupo D - Estados Unidos": { inicio: 155, fin: 170 },
        "Grupo D - Paraguay": { inicio: 171, fin: 186 },
        "Grupo D - Australia": { inicio: 187, fin: 193 },
        "Grupo D - Turquía": { inicio: 194, fin: 200 },
        "Grupo E - Alemania": { inicio: 201, fin: 216 },
        "Grupo E - Ecuador": { inicio: 217, fin: 232 },
        "Grupo E - Costa de Marfil": { inicio: 233, fin: 239 },
        "Grupo E - Curazao": { inicio: 240, fin: 246 },
        "Grupo F - Países Bajos": { inicio: 247, fin: 262 },
        "Grupo F - Japón": { inicio: 263, fin: 278 },
        "Grupo F - Suecia": { inicio: 279, fin: 285 },
        "Grupo F - Túnez": { inicio: 286, fin: 292 },
        "Grupo G - Bélgica": { inicio: 293, fin: 308 },
        "Grupo G - Egipto": { inicio: 309, fin: 324 },
        "Grupo G - Irán": { inicio: 325, fin: 331 },
        "Grupo G - Nueva Zelanda": { inicio: 332, fin: 338 },
        "Grupo H - España": { inicio: 339, fin: 354 },
        "Grupo H - Uruguay": { inicio: 355, fin: 370 },
        "Grupo H - Cabo Verde": { inicio: 371, fin: 377 },
        "Grupo H - Arabia Saudita": { inicio: 378, fin: 384 },
        "Grupo I - Francia": { inicio: 385, fin: 400 },
        "Grupo I - Noruega": { inicio: 401, fin: 416 },
        "Grupo I - Senegal": { inicio: 417, fin: 423 },
        "Grupo I - Irak": { inicio: 424, fin: 430 },
        "Grupo J - Argentina": { inicio: 431, fin: 446 },
        "Grupo J - Argelia": { inicio: 447, fin: 462 },
        "Grupo J - Austria": { inicio: 463, fin: 469 },
        "Grupo J - Jordania": { inicio: 470, fin: 476 },
        "Grupo K - Portugal": { inicio: 477, fin: 492 },
        "Grupo K - Colombia": { inicio: 493, fin: 508 },
        "Grupo K - Uzbekistán": { inicio: 509, fin: 515 },
        "Grupo K - R.D. Congo": { inicio: 516, fin: 522 },
        "Grupo L - Inglaterra": { inicio: 523, fin: 538 },
        "Grupo L - Croacia": { inicio: 539, fin: 554 },
        "Grupo L - Ghana": { inicio: 555, fin: 561 },
        "Grupo L - Panamá": { inicio: 562, fin: 568 }
    },
    especiales: {
        "Los últimos campeones del mundo": { tipo: "rango", inicio: 569, fin: 580 },
        "Primera vez en el mundial": { tipo: "rango", inicio: 581, fin: 584 },
        "Troquelados": { tipo: "prefijo", letra: "T-", inicio: 1, fin: 48 },
        "Nuevos clasificados": { tipo: "letras", lista: ["A", "B", "C", "D", "E", "F", "G"] },
        "Repechajes": { tipo: "prefijo", letra: "E", inicio: 1, fin: 67 }
    }
};

let usuarioActivo = "";
let passwordActiva = "";
let obtenidos = [];
let modoActual = ""; 

// REEMPLAZO DE ALERT() POR CARTELES ELEGANTES
function mostrarAlertaPersonalizada(mensaje, tipo = "error") {
    const alertBox = document.getElementById('custom-alert');
    if (!alertBox) return;

    alertBox.innerText = mensaje;
    alertBox.style.display = "block";
    alertBox.className = "custom-alert-box";
    
    if (tipo === "success") alertBox.classList.add('success');

    setTimeout(() => { alertBox.classList.add('show'); }, 10);

    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => { alertBox.style.display = "none"; }, 300);
    }, 3500);
}

function mostrarFormulario(modo) {
    modoActual = modo;
    document.getElementById('welcome-options').style.display = 'none';
    document.getElementById('form-fields').style.display = 'block';
    
    const instruccion = document.getElementById('form-instruction');
    const botonEnviar = document.getElementById('login-btn');
    
    if (modo === 'registro') {
        instruccion.innerText = "Crea un usuario y contraseña para tu nuevo álbum:";
        botonEnviar.innerText = "Registrar y Crear Álbum";
    } else {
        instruccion.innerText = "Ingresa tus datos para continuar llenando:";
        botonEnviar.innerText = "Entrar al Álbum";
    }
}

function volverAtras() {
    modoActual = "";
    document.getElementById('username-input').value = "";
    document.getElementById('password-input').value = "";
    document.getElementById('welcome-options').style.display = 'block';
    document.getElementById('form-fields').style.display = 'none';
}

function procesarAutenticacion() {
    const inputNombre = document.getElementById('username-input');
    const inputPass = document.getElementById('password-input');
    
    // Normalizar usuario (minúsculas y solo letras/números)
    const nombre = inputNombre.value.trim().toLowerCase().replace(/[^a-z0-9]/g, ""); 
    const pass = inputPass.value.trim();

    if (nombre === "" || pass === "") {
        mostrarAlertaPersonalizada("Por favor, completa todos los campos.");
        return;
    }

    usuarioActivo = nombre;
    passwordActiva = pass;

    db.ref('usuarios/' + usuarioActivo).once('value')
        .then((snapshot) => {
            const datosUsuario = snapshot.val();

            if (modoActual === 'registro') {
                if (datosUsuario) {
                    mostrarAlertaPersonalizada("Ese nombre de usuario ya existe. Elige otro.");
                    usuarioActivo = ""; passwordActiva = "";
                } else {
                    obtenidos = [];
                    guardarEnNube();
                    entrarAlAlbum(inputNombre.value.trim());
                    mostrarAlertaPersonalizada("¡Álbum creado con éxito!", "success");
                }
            } else if (modoActual === 'login') {
                if (datosUsuario) {
                    if (datosUsuario.password === passwordActiva) {
                        obtenidos = datosUsuario.cromos || [];
                        entrarAlAlbum(inputNombre.value.trim());
                    } else {
                        mostrarAlertaPersonalizada("Contraseña incorrecta para este usuario.");
                        usuarioActivo = ""; passwordActiva = "";
                    }
                } else {
                    mostrarAlertaPersonalizada("El usuario no existe. Selecciona 'Crear nuevo álbum'.");
                    usuarioActivo = ""; passwordActiva = "";
                }
            }
        })
        .catch((error) => {
            mostrarAlertaPersonalizada("Error al conectar con Firebase.");
            console.error(error);
        });
}

function entrarAlAlbum(nombreOriginal) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('album-container').style.display = 'block';
    document.getElementById('welcome-msg').innerText = `Álbum de: ${nombreOriginal}`;
    generarAlbum();
}

function guardarEnNube() {
    if (usuarioActivo) {
        db.ref('usuarios/' + usuarioActivo).set({
            password: passwordActiva,
            cromos: obtenidos
        });
        actualizarEstadisticas();
    }
}

function crearElementoCromo(id) {
    const div = document.createElement('div');
    div.classList.add('cromo');
    div.innerText = id;
    
    if (obtenidos.includes(id)) div.classList.add('obtained');

    div.addEventListener('click', () => {
        if (div.classList.contains('obtained')) {
            div.classList.remove('obtained');
            obtenidos = obtenidos.filter(item => item !== id);
        } else {
            div.classList.add('obtained');
            obtenidos.push(id);
        }
        guardarEnNube();
    });

    return div;
}

function generarAlbum() {
    const contenedorGrupos = document.getElementById('fase-grupos');
    const contenedorEspeciales = document.getElementById('secciones-especiales');

    contenedorGrupos.innerHTML = "";
    contenedorEspeciales.innerHTML = "";

    for (const [nombre, rango] of Object.entries(ALBUM_CONFIG.faseGrupos)) {
        const card = document.createElement('div');
        card.classList.add('card-subseccion');
        card.innerHTML = `<h3>${nombre}</h3>`;
        
        const cromosDiv = document.createElement('div');
        cromosDiv.classList.add('cromos-container');

        for (let i = rango.inicio; i <= rango.fin; i++) {
            cromosDiv.appendChild(crearElementoCromo(i.toString()));
        }
        card.appendChild(cromosDiv);
        contenedorGrupos.appendChild(card);
    }

    for (const [nombre, info] of Object.entries(ALBUM_CONFIG.especiales)) {
        const card = document.createElement('div');
        card.classList.add('card-subseccion');
        card.innerHTML = `<h3>${nombre}</h3>`;
        
        const cromosDiv = document.createElement('div');
        cromosDiv.classList.add('cromos-container');

        if (info.tipo === "rango") {
            for (let i = info.inicio; i <= info.fin; i++) {
                cromosDiv.appendChild(crearElementoCromo(i.toString()));
            }
        } else if (info.tipo === "prefijo") {
            for (let i = info.inicio; i <= info.fin; i++) {
                cromosDiv.appendChild(crearElementoCromo(`${info.letra}${i}`));
            }
        } else if (info.tipo === "letras") {
            info.lista.forEach(letra => {
                cromosDiv.appendChild(crearElementoCromo(letra));
            });
        }

        card.appendChild(cromosDiv);
        contenedorEspeciales.appendChild(card);
    }

    actualizarEstadisticas();
    configurarBuscador();
}

function actualizarEstadisticas() {
    const totalCromos = document.querySelectorAll('.cromo').length;
    const totalObtenidos = obtenidos.length;
    const porcentaje = totalCromos > 0 ? ((totalObtenidos / totalCromos) * 100).toFixed(1) : 0;
    
    document.getElementById('stats').innerText = `Progreso: ${totalObtenidos} / ${totalCromos} (${porcentaje}%)`;
}

function configurarBuscador() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();
        const tarjetas = document.querySelectorAll('.card-subseccion');

        tarjetas.forEach(tarjeta => {
            const textoTarjeta = tarjeta.querySelector('h3').innerText.toLowerCase();
            const cromos = tarjeta.querySelectorAll('.cromo');
            let contieneNumero = false;

            cromos.forEach(cromo => {
                if (cromo.innerText.toLowerCase() === termino) contieneNumero = true;
            });

            if (textoTarjeta.includes(termino) || contieneNumero) {
                tarjeta.style.display = "";
            } else {
                tarjeta.style.display = "none";
            }
        });
    });
}

function cerrarSesion() {
    usuarioActivo = ""; passwordActiva = ""; obtenidos = [];
    document.getElementById('username-input').value = "";
    document.getElementById('password-input').value = "";
    volverAtras();
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('album-container').style.display = 'none';
}

window.onload = () => {
    document.getElementById('btn-choose-register').addEventListener('click', () => mostrarFormulario('registro'));
    document.getElementById('btn-choose-login').addEventListener('click', () => mostrarFormulario('login'));
    document.getElementById('btn-back').addEventListener('click', volverAtras);
    document.getElementById('login-btn').addEventListener('click', procesarAutenticacion);
    document.getElementById('logout-btn').addEventListener('click', cerrarSesion);
};
