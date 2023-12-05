<?php

require_once 'db_connection.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$_POST = json_decode(file_get_contents("php://input"), true);

if (isset($_POST['id']) &&
    isset($_POST['update_profesor']) &&
    isset($_POST['update_curso']) &&
    isset($_POST['update_fecha_curso']) &&
    isset($_POST['update_hora_inicio_planificada']) &&
    isset($_POST['update_hora_fin_planificada']) &&
    isset($_POST['update_asistencia']) &&
    isset($_POST['update_hora_inicio_real']) &&
    isset($_POST['update_hora_fin_real']) &&
    isset($_POST['update_tipo_inasistencia']) &&
    isset($_POST['update_descripcion'])) {

    /*
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];*/

    $id = $_POST['id'];
    $profesorId = $_POST['update_profesor'];
    $cursoId = $_POST['update_curso'];
    $fecha_curso = $_POST['update_fecha_curso'];
    $hora_inicio_planificada = $_POST['update_hora_inicio_planificada'];
    $hora_fin_planificada = $_POST['update_hora_fin_planificada'];
    $asistencia = $_POST['update_asistencia'];
    $hora_inicio_real = $_POST['update_hora_inicio_real'];
    $hora_fin_real = $_POST['update_hora_fin_real'];
    $tipoInasistencia = $_POST['update_tipo_inasistencia'];
    $descripcion = $_POST['update_descripcion'];

    // Prepara la sentencia UPDATE
    $stmt = $conn->prepare("UPDATE asistencias SET 
                                ProfesorID = '$profesorId', 
                                CursoID = '$cursoId', 
                                Fecha = '$fecha_curso', 
                                HoraInicioPlanificada = '$hora_inicio_planificada', 
                                HoraFinPlanificada = '$hora_fin_planificada', 
                                Asistencia = '$asistencia', 
                                HoraInicioReal = '$hora_inicio_real', 
                                HoraFinReal = '$hora_fin_real', 
                                TipoInasistencia = '$tipoInasistencia', 
                                DescripcionInasistencia = '$descripcion'
                            WHERE AsistenciaID = '$id'");

    // Ejecuta la sentencia
    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "success"]);
    } else {
        echo json_encode(["mensaje" => "error"]);
    }

    $stmt->close();
} else {
    echo json_encode(["mensaje" => "Datos incompletos"]);
}

$conn->close();

?>