<?php

require_once 'db_connection.php';

// Consulta SQL para obtener tipos de seguro
$sql = "SELECT ProfesorID, Nombre, Apellido FROM profesores";
$result = $conn->query($sql);

$typeInsurance = array();

if ($result->num_rows > 0) {
    // Guardar cada fila en array
    while($row = $result->fetch_assoc()) {
        $typeInsurance[] = $row;
    }
    
    echo json_encode($typeInsurance); // Devolver los resultados en formato JSON
} else {
    echo json_encode($typeInsurance); // Devuelve un array vacío si no hay resultados
}

// Cerrar conexión
$conn->close();

?>
