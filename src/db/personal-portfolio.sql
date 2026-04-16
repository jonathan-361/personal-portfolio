-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2026 a las 20:05:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `personal_portfolio`
--
CREATE DATABASE IF NOT EXISTS `personal_portfolio`;
USE `personal_portfolio`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `achievements`
--

CREATE TABLE `achievements` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `achieved_at` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `achievements`
--

INSERT INTO `achievements` (`id`, `title`, `description`, `user_id`, `achieved_at`, `created_at`, `updated_at`) VALUES
(1, 'Certificación Backend', 'Completé el curso avanzado de Node.js y MySQL.', 4, '2026-04-06', '2026-04-06 10:16:15', '2026-04-06 10:16:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `company` varchar(150) DEFAULT NULL,
  `position` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `experiences`
--

INSERT INTO `experiences` (`id`, `company`, `position`, `description`, `user_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'Tecnológica Metropolitana', 'Desarrollador Fullstack Junior', 'Desarrollo de sistemas internos usando Node.js.', 4, '2025-01-01', NULL, '2026-04-06 10:16:32', '2026-04-06 10:16:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `content` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Arquitectura de Software', 'Repasar patrones de diseño y clean architecture para el proyecto final.', 4, '2026-04-06 10:14:33', '2026-04-06 10:14:33'),
(2, 'Arquitectura de Software2', 'Repasar patrones de diseño.', 4, '2026-04-06 10:15:28', '2026-04-06 10:15:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `task_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `user_id`, `task_date`, `created_at`, `updated_at`) VALUES
(1, 'Terminar API de Logros', 'Subir cambios a producción y verificar Cloudinary.', 4, '2026-04-10', '2026-04-06 10:15:54', '2026-04-06 10:15:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `names` varchar(100) DEFAULT NULL,
  `first_last_name` varchar(100) DEFAULT NULL,
  `second_last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) DEFAULT 'USER',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_image_url` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` timestamp NULL DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `names`, `first_last_name`, `second_last_name`, `email`, `password`, `role`, `created_at`, `updated_at`, `profile_image_url`, `reset_token`, `reset_token_expires`) VALUES
(1, 'Ricardo Usuario', 'Alonzo Test', 'Prueba', 'ricardohuchimz2206@gmail.com', '$2b$10$/GLs5eHpbCMd0FF59xcVhexnWJBRMpXxgXkLsQqa3266PPZW0GLoy', 'USER', '2026-04-06 08:14:39', '2026-04-06 09:30:07', NULL, NULL, NULL),
(2, 'Ricardo2', 'Alonzo2', 'Test2', 'ricardo2.test@gmail.com', '$2b$10$NHlSvcIjHu2TeJTNjD96m.46ZR9WLeKo2GELPZDEfjkl.v5z/4NE2', 'USER', '2026-04-06 08:52:18', '2026-04-06 08:52:18', NULL, NULL, NULL),
(3, 'test1', 'ttes', 'Principal', 'admin.logros@gmail.com', '$2b$10$zyhGjUqLlCxIdyL8jsgfxeqzI5jzY7v9P5uO212h69Yz068FSSxde', 'ADMIN', '2026-04-06 08:54:53', '2026-04-06 08:55:25', NULL, NULL, NULL),
(4, 'Ricardo Test', 'Alonzo', 'API', 'ricardotest@gmail.com', '$2b$10$sLMYm3LWv08GU2X8Ontn3O179t2gRRCOGub0htKfJq5AAyhOZSzVy', 'USER', '2026-04-06 10:13:06', '2026-04-06 10:13:06', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_achievements_user_id` (`user_id`);

--
-- Indices de la tabla `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_experiences_user_id` (`user_id`);

--
-- Indices de la tabla `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notes_user_id` (`user_id`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tasks_user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
