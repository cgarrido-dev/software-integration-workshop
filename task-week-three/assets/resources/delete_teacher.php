<?php

require_once 'db_connection.php';

$_POST = json_decode(file_get_contents("php://input"), true);

// Verificar si el ID está presente
if (isset($_POST['Id'])) {
    $profesorId = $_POST['Id'];

    // Preparar la sentencia DELETE
    $stmt = $conn->prepare("DELETE FROM profesores WHERE ProfesorID = '$profesorId'");

    // Ejecución de la sentencia
    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "success"]);
    } else {
        echo json_encode(["mensaje" => "error"]);
    }

    $stmt->close();
} else {
    echo json_encode(["mensaje" => "ID no proporcionado"]);
}


// Cerrar conexión
$conn->close();

?>
