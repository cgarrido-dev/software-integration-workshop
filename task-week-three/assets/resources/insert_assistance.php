<?php

require_once 'db_connection.php';

$addProfesor = $conn->real_escape_string($_POST['addProfesor']);
$addCurso = $conn->real_escape_string($_POST['addCurso']);
$fecha_curso = $conn->real_escape_string($_POST['fecha_curso']);
$hora_inicio_planificada = $conn->real_escape_string($_POST['hora_inicio_planificada']);
$hora_fin_planificada = $conn->real_escape_string($_POST['hora_fin_planificada']);
$asistencia = $conn->real_escape_string($_POST['asistencia']);
$hora_inicio_real = $conn->real_escape_string($_POST['hora_inicio_real']);
$hora_fin_real = $conn->real_escape_string($_POST['hora_fin_real']);
$inasistencia = $conn->real_escape_string($_POST['inasistencia']);
$descripcion = $conn->real_escape_string($_POST['descripcion']);

/*$sql = "SELECT ProfesorID FROM profesores WHERE Nombre = '$nombre' AND Apellido = '$apellido'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "duplicate";
} else {*/

    // Consulta SQL para insertar datos
    $sql = "INSERT INTO asistencias (ProfesorID, CursoID, Fecha, HoraInicioPlanificada, HoraFinPlanificada, Asistencia, HoraInicioReal, HoraFinReal, TipoInasistencia, DescripcionInasistencia) VALUES ('$addProfesor', '$addCurso', '$fecha_curso', '$hora_inicio_planificada', '$hora_fin_planificada', '$asistencia', '$hora_inicio_real', '$hora_fin_real', '$inasistencia', '$descripcion')";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error al insertar el registro: " . $conn->error;
    }
//}

// Cerrar conexión
$conn->close();

?>
