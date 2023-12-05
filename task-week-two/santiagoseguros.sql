-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-11-2023 a las 02:21:53
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `santiagoseguros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `ClienteID` int(11) NOT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `CorreoElectronico` varchar(100) DEFAULT NULL,
  `TipoSeguroID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`ClienteID`, `Nombre`, `Apellido`, `Telefono`, `CorreoElectronico`, `TipoSeguroID`) VALUES
(1, 'Silvia', 'Soler', '+34730 89 36 00', 'gualmarcelo@hotmail.com', 1),
(2, 'Bautista', 'Cerezo', '+34731 729 586', 'ocid@santos.com', 2),
(3, 'Etelvina', 'Huerta', '+34749 401 125', 'ciro83@hotmail.com', 2),
(4, 'Sergio', 'Acevedo', '+34 730 422 554', 'ruperta31@gmail.com', 5),
(5, 'Aroa', 'Pellicer', '+34 707 834 440', 'emedina@yahoo.com', 2),
(6, 'Claudio', 'Garrido', '+56912345678', 'cgarrido@gmail.com', 3),
(7, 'Alicia', 'Fernandez', '+56978945612', 'alicia@gmail.com', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposdeseguro`
--

CREATE TABLE `tiposdeseguro` (
  `TipoSeguroID` int(11) NOT NULL,
  `Descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposdeseguro`
--

INSERT INTO `tiposdeseguro` (`TipoSeguroID`, `Descripcion`) VALUES
(1, 'Seguro de Vida'),
(2, 'Seguro de vida con ahorro (SVA)'),
(3, 'Seguro de Salud'),
(4, 'Seguro de Accidentes Personales'),
(5, 'Seguro Obligatorio de Accidentes Personales');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ClienteID`),
  ADD UNIQUE KEY `CorreoElectronico` (`CorreoElectronico`),
  ADD KEY `TipoSeguroID` (`TipoSeguroID`);

--
-- Indices de la tabla `tiposdeseguro`
--
ALTER TABLE `tiposdeseguro`
  ADD PRIMARY KEY (`TipoSeguroID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ClienteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tiposdeseguro`
--
ALTER TABLE `tiposdeseguro`
  MODIFY `TipoSeguroID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`TipoSeguroID`) REFERENCES `tiposdeseguro` (`TipoSeguroID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
