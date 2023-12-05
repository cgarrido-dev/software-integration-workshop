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

function validateEmptyFields(){

    let addProfesor = document.getElementById('addProfesor').value;
    let addCurso = document.getElementById('addCurso').value;
    let fecha_curso = document.getElementById('fecha_curso').value;
    let hora_inicio_planificada = document.getElementById('hora_inicio_planificada').value;
    let hora_fin_planificada = document.getElementById('hora_fin_planificada').value;
    let asistencia = document.getElementById('asistencia').value;

    /*let hora_inicio_real = document.getElementById('hora_inicio_real');
    let hora_fin_real = document.getElementById('hora_fin_real');
    let inasistencia = document.getElementById('inasistencia');
    let descripcion = document.getElementById('descripcion');*/

    return (addProfesor !== '' &&
    addCurso !== '' &&
    fecha_curso !== '' &&
    hora_inicio_planificada !== '' &&
    hora_fin_planificada !== '' &&
    asistencia !== '');
}

function insertarAsistencia(){
    disabledButton('insert-button-modal', true);

    if(validateEmptyFields()){

        var formData = new FormData(document.getElementById('addTeacherForm'));

        fetch('assets/resources/insert_assistance.php', {
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
            //document.getElementById('nombre').value = '';
            //document.getElementById('apellido').value = '';

            if(text === 'success'){
                document.getElementById('addTeacherForm').reset();
                warning.innerText = 'Registro Insertado satisfactoriamente';
                warning.classList.remove('hide');

                var tbody = document.querySelector('#tblTeachers tbody');

                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }

                getAssistances();

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

function getAssistances() {
    fetch('assets/resources/get_assistances.php')
    .then(response => response.json())
    .then(data => {
        var totalRecords = data.length;

        document.getElementById('total-records').innerText = 'Total de Registros: ' + totalRecords;
        var tabla = document.getElementById('tblTeachers').getElementsByTagName('tbody')[0];

        data.forEach(function(item) {
            var fila = tabla.insertRow();
            
            fila.insertCell(0).textContent  = item.AsistenciaID;
            fila.insertCell(1).textContent  = item.NombreProfesor + ' ' + item.ApellidoProfesor;
            fila.insertCell(2).textContent  = item.NombreCurso;
            fila.insertCell(3).textContent  = item.Fecha;
            fila.insertCell(4).textContent = item.HoraInicioPlanificada;
            fila.insertCell(5).textContent = item.HoraFinPlanificada;
            fila.insertCell(6).textContent = item.Asistencia;
            fila.insertCell(7).textContent = item.HoraInicioReal;
            fila.insertCell(8).textContent = item.HoraFinReal;
            fila.insertCell(9).textContent = item.TipoInasistencia;
            fila.insertCell(10).textContent = item.DescripcionInasistencia;

            var celdaAcciones = fila.insertCell(11);
            let itemRow = JSON.stringify(item).replaceAll('"', '\'');

            celdaAcciones.innerHTML = '<img src="assets/img/delete.png" alt="Eliminar Registro" title="Eliminar Registro" width="18" height="18" data-id="'+ item.AsistenciaID + '" class="delete-item" onclick="deleteTeacher(this)"/>'+
            '<img src="assets/img/update.png" alt="Actualizar Registro" title="Actualizar Registro" width="18" height="18" data-row="'+ itemRow +'" class="update-item" onclick="updateTeacher(this)"/>'; 
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

    fetch('assets/resources/delete_assistances.php', {
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

            getAssistances();
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

    let dataRow = evt.getAttribute("data-row");
    let data = JSON.parse(dataRow.replaceAll('\'', '"'));

    document.getElementById('update_profesor').value = data.ProfesorID;
    document.getElementById('update_curso').value = data.CursoID;
    document.getElementById('update_fecha_curso').value = data.Fecha;
    document.getElementById('update_hora_inicio_planificada').value = data.HoraInicioPlanificada;
    document.getElementById('update_hora_fin_planificada').value = data.HoraFinPlanificada;
    document.getElementById('update_asistencia').value = data.Asistencia;
    document.getElementById('update_hora_inicio_real').value = data.HoraInicioReal;
    document.getElementById('update_hora_fin_real').value = data.HoraFinReal;
    document.getElementById('update_tipo_inasistencia').value = data.TipoInasistencia;
    document.getElementById('update_descripcion').value = data.DescripcionInasistencia;asistenciaId
    document.getElementById('asistenciaId').value = data.AsistenciaID;

    estadoUpdateAsistencia();
    estadoUpdateJustificacion();
}

function saveUpdateTeacher(){

    let input_update_profesor = document.getElementById('update_profesor').value;
    let input_update_curso = document.getElementById('update_curso').value;
    let input_update_fecha_curso = document.getElementById('update_fecha_curso').value;
    let input_update_hora_inicio_planificada = document.getElementById('update_hora_inicio_planificada').value;
    let input_update_hora_fin_planificada = document.getElementById('update_hora_fin_planificada').value;
    let input_update_asistencia = document.getElementById('update_asistencia').value;
    let input_update_hora_inicio_real = document.getElementById('update_hora_inicio_real').value;
    let input_update_hora_fin_real = document.getElementById('update_hora_fin_real').value;
    let input_update_tipo_inasistencia = document.getElementById('update_tipo_inasistencia').value;
    let input_update_descripcion = document.getElementById('update_descripcion').value;
    let asistenciaId = document.getElementById('asistenciaId').value;

    let strBody = JSON.stringify({
            id: asistenciaId, 
            update_profesor: input_update_profesor,
            update_curso: input_update_curso,
            update_fecha_curso: input_update_fecha_curso,
            update_hora_inicio_planificada: input_update_hora_inicio_planificada,
            update_hora_fin_planificada: input_update_hora_fin_planificada,
            update_asistencia: input_update_asistencia,
            update_hora_inicio_real: input_update_hora_inicio_real,
            update_hora_fin_real: input_update_hora_fin_real,
            update_tipo_inasistencia: input_update_tipo_inasistencia,
            update_descripcion: input_update_descripcion
    });

    fetch('assets/resources/update_assistances.php', {
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

            getAssistances();
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
}

window.onload = function() {
    getTeachers('addProfesor');
    getCourses('addCurso');
    getTeachers('update_profesor');
    getCourses('update_curso');
    getAssistances();
};

function getTeachers(inputName) {
    fetch('assets/resources/get_teachers.php')
    .then(response => response.json())
    .then(data => {
        var select = document.getElementById(inputName);
        data.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item.ProfesorID;
            option.text = item.Nombre + ' ' + item.Apellido;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

function getCourses(inputName) {
    fetch('assets/resources/get_courses.php')
    .then(response => response.json())
    .then(data => {
        var select = document.getElementById(inputName);
        data.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item.CursoID;
            option.text = item.NombreCurso;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error:', error));
}

function estadoAsistencia(){
    let asistencia = document.getElementById('asistencia').value;
    
    if(asistencia === 'SI'){
        document.getElementById('hora_inicio_real').removeAttribute('disabled');
        document.getElementById('hora_fin_real').removeAttribute('disabled');
        document.getElementById('inasistencia').setAttribute('disabled', true);
    } else {
        document.getElementById('hora_inicio_real').setAttribute('disabled', true);
        document.getElementById('hora_fin_real').setAttribute('disabled', true);
        document.getElementById('inasistencia').removeAttribute('disabled');
    }
}

function estadoJustificacion(){
    let justificacion = document.getElementById('inasistencia').value;

    if(justificacion === 'JUSTIFICADA'){
        document.getElementById('descripcion').removeAttribute('disabled');
    } else {
        document.getElementById('descripcion').setAttribute('disabled', true);
    }
}

function estadoUpdateAsistencia(){
    let asistencia = document.getElementById('update_asistencia').value;
    
    if(asistencia === 'SI'){
        document.getElementById('update_hora_inicio_real').removeAttribute('disabled');
        document.getElementById('update_hora_fin_real').removeAttribute('disabled');
        document.getElementById('update_tipo_inasistencia').setAttribute('disabled', true);
        document.getElementById('update_descripcion').setAttribute('disabled', true);
        document.getElementById('update_descripcion').value = '';
        document.getElementById('update_tipo_inasistencia').value = '';
    } else {
        document.getElementById('update_hora_inicio_real').setAttribute('disabled', true);
        document.getElementById('update_hora_fin_real').setAttribute('disabled', true);
        document.getElementById('update_tipo_inasistencia').removeAttribute('disabled');
        document.getElementById('update_hora_inicio_real').value = '';
        document.getElementById('update_hora_fin_real').value = '';
    }
}

function estadoUpdateJustificacion(){
    let justificacion = document.getElementById('update_tipo_inasistencia').value;

    if(justificacion === 'JUSTIFICADA'){
        document.getElementById('update_descripcion').removeAttribute('disabled');
       
    } else {
        document.getElementById('update_descripcion').setAttribute('disabled', true);
        document.getElementById('update_descripcion').value = '';
    }
}