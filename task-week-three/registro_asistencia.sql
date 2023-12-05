-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-12-2023 a las 20:34:09
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `registro_asistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `AsistenciaID` int(11) NOT NULL,
  `ProfesorID` int(11) DEFAULT NULL,
  `CursoID` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `HoraInicioPlanificada` time DEFAULT NULL,
  `HoraFinPlanificada` time DEFAULT NULL,
  `Asistencia` enum('SI','NO') DEFAULT NULL,
  `HoraInicioReal` time DEFAULT NULL,
  `HoraFinReal` time DEFAULT NULL,
  `TipoInasistencia` enum('JUSTIFICADA','NO JUSTIFICADA') DEFAULT NULL,
  `DescripcionInasistencia` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`AsistenciaID`, `ProfesorID`, `CursoID`, `Fecha`, `HoraInicioPlanificada`, `HoraFinPlanificada`, `Asistencia`, `HoraInicioReal`, `HoraFinReal`, `TipoInasistencia`, `DescripcionInasistencia`) VALUES
(1, 40, 4, '2023-12-14', '00:49:07', '00:49:11', 'NO', '00:49:19', '04:49:22', 'JUSTIFICADA', 'test'),
(7, 39, 5, '2023-12-21', '05:01:00', '06:02:00', 'SI', '06:02:00', '05:01:00', 'JUSTIFICADA', 'testfdsfdsfdsfdsfds'),
(8, 40, 5, '2023-12-21', '21:10:00', '22:11:00', 'SI', '21:10:00', '22:11:00', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `CursoID` int(11) NOT NULL,
  `NombreCurso` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`CursoID`, `NombreCurso`) VALUES
(4, 'Sistemas de Información I'),
(5, 'Programación Orientada a Objetos I'),
(6, 'Power BI II'),
(9, 'Java I'),
(10, 'Sistemas de Información II');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `ProfesorID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`ProfesorID`, `Nombre`, `Apellido`) VALUES
(39, 'Claudio', 'Garrido'),
(40, 'Alicia', 'Fernandez'),
(44, 'Angelica', 'Cona'),
(45, 'Juanito', 'Perez');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`AsistenciaID`),
  ADD KEY `ProfesorID` (`ProfesorID`),
  ADD KEY `CursoID` (`CursoID`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`CursoID`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`ProfesorID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `AsistenciaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `CursoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `ProfesorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`ProfesorID`) REFERENCES `profesores` (`ProfesorID`),
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`CursoID`) REFERENCES `cursos` (`CursoID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
