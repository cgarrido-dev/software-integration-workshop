<?php

require_once 'db_connection.php';

$email = $conn->real_escape_string($_POST['email']);

$sql = "SELECT CorreoElectronico FROM Clientes WHERE CorreoElectronico = '$email'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // Si hay un resultado, entonces el email ya existe
    echo "duplicateEmail";
} else {
    $name = $conn->real_escape_string($_POST['name']);
    $lastName = $conn->real_escape_string($_POST['lastName']);
    $phone = $conn->real_escape_string($_POST['phone']);

    $typeInsurance = $conn->real_escape_string($_POST['typeInsurance']);

    // Consulta SQL para insertar datos
    $sql = "INSERT INTO Clientes (Nombre, Apellido, Telefono, CorreoElectronico, TipoSeguroID)
    VALUES ('$name', '$lastName', '$phone', '$email', '$typeInsurance')";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        echo "Sus antecedentes se han registrado correctamente en nuestra base de datos";
    } else {
        echo "Error al insertar el registro: " . $conn->error;
    }
}

// Cerrar conexión
$conn->close();

?>
