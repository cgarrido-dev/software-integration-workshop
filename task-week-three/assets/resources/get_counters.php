<?php

require_once 'db_connection.php';

// Consulta SQL para obtener tipos de seguro
$sql = "SELECT ProfesorID, Nombre, Apellido FROM profesores";

$query1 = "SELECT COUNT(*) AS total1 FROM asistencias";
$query2 = "SELECT COUNT(*) AS total2 FROM cursos";
$query3 = "SELECT COUNT(*) AS total3 FROM profesores";

$result1 = $conn->query($query1);
$result2 = $conn->query($query2);
$result3 = $conn->query($query3);

$count1 = $result1->fetch_assoc()['total1'];
$count2 = $result2->fetch_assoc()['total2'];
$count3 = $result3->fetch_assoc()['total3'];

// Cerrar conexión
$conn->close();

echo json_encode([
    "asistencias" => $count1,
    "cursos" => $count2,
    "profesores" => $count3
]);

?>
