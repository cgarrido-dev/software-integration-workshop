// Index.html
var loginForm = document.getElementById('login');
if(loginForm != null){
    loginForm.onsubmit = function(event) {
        event.preventDefault(); // Prevenir el envío del formulario de manera predeterminada
        window.location.href = 'home.html';
    };
}

// Home.html
function signOut(){
    window.location.href = 'index.html';
}



window.onload = function() {
    getCounters();
};

function getCounters() {
    fetch('assets/resources/get_counters.php')
    .then(response => response.json())
    .then(data => {
        document.getElementById('profesores').innerText = data.profesores;
        document.getElementById('cursos').innerText = data.cursos;
        document.getElementById('asistencia').innerText = data.asistencias;
    })
    .catch(error => console.error('Error:', error));
}
