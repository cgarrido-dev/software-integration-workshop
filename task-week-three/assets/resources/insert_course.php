<?php

require_once 'db_connection.php';

$nombre_curso = $conn->real_escape_string($_POST['nombre_curso']);

$sql = "SELECT CursoID FROM cursos WHERE NombreCurso = '$nombre_curso'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "duplicate";
} else {

    // Consulta SQL para insertar datos
    $sql = "INSERT INTO cursos (NombreCurso) VALUES ('$nombre_curso')";

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
