<?php

$servername = "localhost";
$username = "root";
$password = "123456789";
$dbname = "registro_asistencia";

// Crear conexión con la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

?>
