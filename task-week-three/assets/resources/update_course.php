<?php

require_once 'db_connection.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$_POST = json_decode(file_get_contents("php://input"), true);

if (isset($_POST['id']) && isset($_POST['nombre'])) {

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];

    // Prepara la sentencia UPDATE
    $stmt = $conn->prepare("UPDATE cursos SET NombreCurso = '$nombre' WHERE CursoID = '$id'");

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