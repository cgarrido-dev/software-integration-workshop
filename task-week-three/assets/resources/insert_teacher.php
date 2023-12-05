<?php

require_once 'db_connection.php';

$nombre = $conn->real_escape_string($_POST['nombre']);
$apellido = $conn->real_escape_string($_POST['apellido']);

$sql = "SELECT ProfesorID FROM profesores WHERE Nombre = '$nombre' AND Apellido = '$apellido'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "duplicate";
} else {

    // Consulta SQL para insertar datos
    $sql = "INSERT INTO profesores (Nombre, Apellido) VALUES ('$nombre', '$apellido')";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error al insertar el registro: " . $conn->error;
    }
}

// Cerrar conexión
$conn->close();

?>
