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

// Teachers.html
var btn = document.getElementById("addTeacher");
var modal = document.getElementById("addModal");

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function closeModal(evt){
    let dataId = evt.getAttribute("data-id");
    var modal = document.getElementById(dataId);
    modal.style.display = "none";

    if(dataId === 'addModal'){
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('warning-teacher').classList.add('hide');
    } else {
        document.getElementById('update_nombre').value = '';
        document.getElementById('update_apellido').value = '';
        document.getElementById('warning-update-teacher').classList.add('hide');
    }

}

function showWarningAddTeacher(message){
    document.getElementById('warning-teacher').innerText = message;
    document.getElementById('warning-teacher').classList.remove('hide');

    setTimeout(function(){ 
        document.getElementById('warning-teacher').classList.add('hide');
    }, 5000);
}

function validationOnlyLetters(evt) {
    let dataId = evt.getAttribute("data-id");
    let fieldText = document.getElementById(dataId);

    if (/\d/.test(fieldText.value)) {
        showWarningAddTeacher('Por favor, ingrese solo letras.');
        fieldText.value = fieldText.value.replace(/\d/g, '');
        disabledButton('insert-button-modal', false);
        return false;
    }
}

function validationEmptyFields(){
    let nombre = document.getElementById('nombre').value,
        apellido = document.getElementById('apellido').value;
  
    if(nombre === '' || apellido === '') {
        showWarningAddTeacher('Por favor, completa todos los campos del formulario.');
        disabledButton('insert-button-modal', false);
        return false;
    }
}

function insertTeacher(){
    disabledButton('insert-button-modal', true);
    //let validate = validationEmptyFields();

    let nombre = document.getElementById('nombre').value,
        apellido = document.getElementById('apellido').value;
  
    if(nombre !== '' && apellido !== '') {
    
        var formData = new FormData(document.getElementById('addTeacherForm'));

        fetch('assets/resources/insert_teacher.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then((text) => {
            // success / duplicate

            let warning = document.getElementById('warning-table-teacher');
            var modal = document.getElementById('addModal');
            modal.style.display = "none";
            disabledButton('insert-button-modal', false);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';

            if(text === 'success'){
                warning.innerText = 'Registro Insertado satisfactoriamente';
                warning.classList.remove('hide');

                var tbody = document.querySelector('#tblTeachers tbody');

                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }

                getTeachers();

            } else if(text === 'duplicate') {
                warning.innerText = 'El profesor ingresado ya se encuentra registrado';
                warning.classList.remove('hide');
            } else {
                warning.innerText = 'Error: ' + text;
                warning.classList.remove('hide');
            }

            setTimeout(function(){ 
                document.getElementById('warning-table-teacher').classList.add('hide');
                document.getElementById('warning-table-teacher').innerText = '';
            }, 3000);
        
        })
        .catch(error => console.error('Error:', error));
    } else {
        showWarningAddTeacher('Por favor, completa todos los campos del formulario.');
        disabledButton('insert-button-modal', false);
    }
}

window.onload = function() {
    if(window.location.pathname.includes('teachers.html')){
        getTeachers();
    }
};

function getTeachers() {
    fetch('assets/resources/get_teachers.php')
    .then(response => response.json())
    .then(data => {
        var totalRecords = data.length;

        document.getElementById('total-records').innerText = 'Total de Registros: ' + totalRecords;
        var tabla = document.getElementById('tblTeachers').getElementsByTagName('tbody')[0];

        data.forEach(function(item) {
            var fila = tabla.insertRow();
            
            var celdaId = fila.insertCell(0);
            celdaId.textContent = item.ProfesorID;

            var celdaNombre = fila.insertCell(1);
            celdaNombre.textContent = item.Nombre;
    
            var celdaApellido = fila.insertCell(2);
            celdaApellido.textContent = item.Apellido;

            var celdaAcciones = fila.insertCell(3);
            celdaAcciones.innerHTML = '<img src="assets/img/delete.png" alt="Eliminar Registro" title="Eliminar Registro" width="18" height="18" data-id="'+item.ProfesorID+'" class="delete-item" onclick="deleteTeacher(this)"/>'+
            '<img src="assets/img/update.png" alt="Actualizar Registro" title="Actualizar Registro" width="18" height="18" data-id="'+item.ProfesorID+'" data-nombre="'+ item.Nombre +'" data-apellido="'+item.Apellido+'" class="update-item" onclick="updateTeacher(this)"/>'; 
        });

    })
    .catch(error => console.error('Error:', error));
}

function disabledButton(idButton, isDisabled){
    let element = document.getElementById(idButton);

    if(isDisabled){
        element.setAttribute('disabled', true);
        element.classList.add('disabled');
    } else {
        element.removeAttribute('disabled');
        element.classList.remove('disabled');
    }
   
}

function deleteTeacher(evt) {
    let dataId = evt.getAttribute("data-id");

    fetch('assets/resources/delete_teacher.php', {
        method: 'POST',
        body: JSON.stringify({ Id: dataId }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then((data) => {

        let warning = document.getElementById('warning-table-teacher');
        
        if(data.mensaje === 'success'){
            warning.innerText = 'Registro Eliminado satisfactoriamente';
            warning.classList.remove('hide');
            var tbody = document.querySelector('#tblTeachers tbody');
            while (tbody.firstChild) {
                tbody.removeChild(tbody.firstChild);
            }

            getTeachers();
        } else if(data.mensaje === 'error') {
            warning.innerText = 'Ha ocurrido un error al eliminar el registro';
            warning.classList.remove('hide');
        } else {
            warning.innerText = 'Error: ' + data.mensaje;
            warning.classList.remove('hide');
        }

        setTimeout(function(){ 
            document.getElementById('warning-table-teacher').classList.add('hide');
            document.getElementById('warning-table-teacher').innerText = '';
        }, 3000);
    })
    .catch(error => console.error('Error:', error));
}

function updateTeacher(evt){

    var modal = document.getElementById("updateModal");
    modal.style.display = "block";

    let dataId = evt.getAttribute("data-id");
    let dataNombre = evt.getAttribute("data-nombre");
    let dataApellido = evt.getAttribute("data-apellido");

    document.getElementById('update_nombre').value = dataNombre;
    document.getElementById('update_apellido').value = dataApellido;
    document.getElementById('profesorId').value = dataId;
}

function saveUpdateTeacher(){

    let nombreInput = document.getElementById('update_nombre').value,
        apellidoInput = document.getElementById('update_apellido').value,
        profesorId = document.getElementById('profesorId').value;
  
    if(nombreInput !== '' && apellidoInput !== '') {

        let strBody = JSON.stringify({ id: profesorId, nombre: nombreInput, apellido: apellidoInput });

        fetch('assets/resources/update_teacher.php', {
            method: 'POST',
            body: strBody,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data) => {
    
            let warning = document.getElementById('warning-table-teacher');
            var modal = document.getElementById('updateModal');
            modal.style.display = "none";

            if(data.mensaje === 'success'){
                warning.innerText = 'Registro Actualizado satisfactoriamente';
                warning.classList.remove('hide');
                var tbody = document.querySelector('#tblTeachers tbody');
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }

                getTeachers();
            } else if(data.mensaje === 'error') {
                warning.innerText = 'Ha ocurrido un error al Actualizar el registro';
                warning.classList.remove('hide');
            } else {
                warning.innerText = 'Error: ' + data.mensaje;
                warning.classList.remove('hide');
            }



            setTimeout(function(){ 
                document.getElementById('warning-table-teacher').classList.add('hide');
                document.getElementById('warning-table-teacher').innerText = '';
            }, 3000);

        })
        .catch(error => console.error('Error:', error));
    } else {
        document.getElementById('warning-update-teacher').innerText = 'Por favor, completa todos los campos del formulario.';
        document.getElementById('warning-update-teacher').classList.remove('hide');
    
        setTimeout(function(){ 
            document.getElementById('warning-update-teacher').classList.add('hide');
        }, 5000);
    }
}