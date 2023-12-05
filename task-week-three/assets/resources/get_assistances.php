<?php

require_once 'db_connection.php';

// Consulta SQL para obtener tipos de seguro
$sql = "SELECT 
            Asistencias.AsistenciaID,
            Profesores.Nombre AS NombreProfesor,
            Profesores.Apellido AS ApellidoProfesor,
            Asistencias.ProfesorID,
            Asistencias.CursoID,
            Cursos.NombreCurso,
            Asistencias.Fecha,
            Asistencias.HoraInicioPlanificada,
            Asistencias.HoraFinPlanificada,
            Asistencias.Asistencia,
            Asistencias.HoraInicioReal,
            Asistencias.HoraFinReal,
            Asistencias.TipoInasistencia,
            Asistencias.DescripcionInasistencia
        FROM 
            Asistencias
        INNER JOIN 
            Profesores ON Asistencias.ProfesorID = Profesores.ProfesorID
        INNER JOIN 
            Cursos ON Asistencias.CursoID = Cursos.CursoID
        ORDER BY Asistencias.AsistenciaID ASC";

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
