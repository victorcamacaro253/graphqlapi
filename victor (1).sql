-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-01-2025 a las 20:31:48
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
-- Base de datos: `victor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `product_id` int(50) NOT NULL,
  `quantity` int(50) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `user_id`, `product_id`, `quantity`, `created_at`) VALUES
(4, 2, 1, 10, '2024-12-16 18:17:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'plastic', 'it\'s plastic'),
(2, 'food', 'its food');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login_history`
--

CREATE TABLE `login_history` (
  `id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `date` datetime NOT NULL,
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `most_sold_products`
--

CREATE TABLE `most_sold_products` (
  `product_id` int(11) NOT NULL,
  `total_sold` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `most_sold_products`
--

INSERT INTO `most_sold_products` (`product_id`, `total_sold`) VALUES
(1, 15),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id` int(50) NOT NULL,
  `message` varchar(250) NOT NULL,
  `type` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updateAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` int(50) NOT NULL,
  `name` enum('create','read','delete','update') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`) VALUES
(1, 'create'),
(2, 'read'),
(3, 'delete'),
(4, 'update');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` decimal(50,2) NOT NULL,
  `category_id` int(50) NOT NULL,
  `supplier_id` int(50) NOT NULL,
  `image` varchar(250) DEFAULT NULL,
  `status` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `code`, `name`, `description`, `price`, `category_id`, `supplier_id`, `image`, `status`) VALUES
(1, '25', 'caja', 'es una caja 2', 34.00, 1, 1, 'bvbvc', 'yhtg'),
(2, '25', 'fdzfdfds', 'fdsfdsds', 10.00, 1, 1, 'gfdgfd', 'ggfdgfd'),
(3, '06ce1917d029aaba237a', 'zapato', 'es una zapato', 12.00, 1, 1, NULL, 'active'),
(4, '645c9efba1e78fd8d8b8', 'zapato', 'es una zapato', 12.00, 1, 1, NULL, 'active'),
(5, 'b17cf1a8e25b40fe0d3f', 'zapato', 'es una zapato', 12.00, 1, 1, NULL, 'active'),
(6, 'ba41f8f124b002c94966', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(7, 'a032af72c041eee94f48', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(8, 'f04b99845cf2496ba7ce', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(9, 'b72a80760f544f0f021e', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(10, '2f96d12a717d7c18ceb3', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(11, '6fc6cd56577f2d7dcab8', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(12, 'b3e66c593def343756c9', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(13, '145091b60813fcfed882', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(14, '5f69bf208bdff826d939', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(15, 'a77723af0708ac8e2f51', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(16, 'e93831b5d019e4096155', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(17, '5511789654a6dcb4f003', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(18, 'bb9b23018e95674bcf37', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(19, '991492ad8ad1ebdf5db4', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(20, 'c798ef63962747582e74', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(21, '56ba9cc0259ed5b40c92', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(22, '4ff18fc001269d2e2750', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(23, '0a1054a511ac1a5d2b84', 'zapato', 'es un zapato', 12.00, 1, 1, NULL, 'active'),
(26, '846baa9ccc97c5458813', 'Product 1', 'Description of product 1', 100.00, 1, 1, NULL, 'active'),
(27, 'aecf6e4d0719b92443a1', 'Product 2', 'Description of product 2', 200.00, 1, 1, NULL, 'active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_stock`
--

CREATE TABLE `product_stock` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_stock`
--

INSERT INTO `product_stock` (`id`, `product_id`, `stock`) VALUES
(1, 1, 998),
(2, 5, 10),
(3, 7, 10),
(4, 8, 10),
(5, 9, 10),
(6, 10, 10),
(7, 11, 10),
(8, 12, 10),
(9, 13, 10),
(10, 14, 10),
(12, 16, 10),
(13, 17, 10),
(14, 18, 10),
(15, 19, 10),
(16, 20, 10),
(17, 21, 10),
(18, 22, 10),
(19, 23, 10),
(21, 26, 50),
(22, 27, 30),
(23, 2, 200),
(24, 11, 100),
(25, 3, 200),
(26, 4, 200),
(27, 6, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchased_products`
--

CREATE TABLE `purchased_products` (
  `id` int(50) NOT NULL,
  `purchase_id` int(50) NOT NULL,
  `product_id` int(50) NOT NULL,
  `amount` int(50) NOT NULL,
  `price` decimal(50,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchased_products`
--

INSERT INTO `purchased_products` (`id`, `purchase_id`, `product_id`, `amount`, `price`) VALUES
(1, 1, 2, 1, 10.00),
(2, 1, 10, 1, 1.00),
(12, 15, 1, 1, 10.00),
(13, 16, 1, 1, 10.00),
(14, 17, 1, 1, 10.00),
(15, 18, 1, 1, 10.00),
(16, 19, 1, 1, 10.00),
(17, 20, 1, 1, 10.00),
(18, 21, 1, 1, 1.00),
(19, 22, 1, 1, 1.00),
(20, 23, 1, 1, 1.00),
(21, 24, 1, 1, 1.00),
(22, 25, 1, 1, 1.00),
(23, 26, 1, 1, 1.00),
(24, 27, 1, 1, 1.00),
(25, 28, 1, 1, 1.00),
(26, 29, 1, 1, 1.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `total_purchase` decimal(50,2) NOT NULL,
  `date` datetime NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'Paid',
  `transaction_id` varchar(100) DEFAULT NULL,
  `shipping_status` varchar(50) DEFAULT 'Pending',
  `discount` decimal(10,2) DEFAULT 0.00,
  `promo_code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `user_id`, `total_purchase`, `date`, `payment_method`, `payment_status`, `transaction_id`, `shipping_status`, `discount`, `promo_code`) VALUES
(1, 18, 100.00, '2025-01-03 16:23:06', 'debit', 'Paid', '1235646', 'Pending', 0.00, NULL),
(15, 18, 10.00, '2025-01-07 14:35:43', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(16, 18, 10.00, '2025-01-07 14:36:02', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(17, 18, 10.00, '2025-01-07 14:36:17', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(18, 18, 10.00, '2025-01-07 14:36:21', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(19, 18, 10.00, '2025-01-07 14:36:57', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(20, 18, 10.00, '2025-01-07 14:41:29', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(21, 18, 1.00, '2025-01-07 14:49:49', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(22, 18, 1.00, '2025-01-07 14:50:08', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(23, 18, 1.00, '2025-01-07 14:53:38', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(24, 18, 1.00, '2025-01-07 15:00:37', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(25, 1, 1.00, '2025-01-07 15:09:21', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(26, 1, 1.00, '2025-01-07 15:13:02', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(27, 1, 1.00, '2025-01-07 15:13:07', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(28, 1, 1.00, '2025-01-07 15:13:41', NULL, 'Paid', NULL, 'Pending', 0.00, NULL),
(29, 1, 1.00, '2025-01-07 15:16:03', NULL, 'Paid', NULL, 'Pending', 0.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `token` varchar(250) NOT NULL,
  `exiresIn` timestamp NULL DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`) VALUES
(1, 'admin', 'it has all the permissions', '2024-12-16 18:36:27'),
(2, 'manager', 'it has some permissions', '2024-12-16 18:36:27'),
(3, 'employee', 'it has some permissions', '2024-12-16 18:39:09'),
(4, 'user', 'it has a permissions', '2024-12-16 18:39:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 2),
(6, 2, 1),
(7, 2, 3),
(8, 3, 1),
(9, 3, 2),
(10, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(50) NOT NULL,
  `code` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `code`, `name`, `address`, `email`, `phone`, `description`) VALUES
(1, '020', 'inversiones cabrera', '5th avenue', 'email@gmail.com', '+58789456123', 'the sell us plastic');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(250) NOT NULL,
  `fullname` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `personal_ID` varchar(50) NOT NULL,
  `role` int(50) NOT NULL,
  `image` varchar(250) NOT NULL,
  `status` enum('on','off') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `username`, `email`, `password`, `personal_ID`, `role`, `image`, `status`, `createdAt`) VALUES
(1, 'victor camacaro', 'victormanuel', 'victor@gmail.com', '1234567', '27119364', 1, 'fdfdvds', 'on', '2024-12-19 16:41:24'),
(2, 'fvfsvsxcv', 'fdfds', 'fdsafds@gmail.com', '56345545', '245245', 3, 'sadasdz', 'on', '2024-12-19 16:41:24'),
(3, 'jose', 'jose24 ', 'victor@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-27 13:08:50'),
(4, 'jose', 'jose24 ', 'jose24@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-19 16:41:24'),
(5, 'jose', 'jose24', 'jose24@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-19 16:41:24'),
(6, 'jose', 'jose24', 'jose24@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-19 16:41:24'),
(7, 'jose', 'jose24', 'jose24@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-19 16:41:24'),
(8, 'miralngel cortez', 'mirla123', 'mirla@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-19 17:43:22'),
(9, 'jose', 'jose24', 'jose24@gmail.com', '1234567', '27119364', 1, '', 'on', '2024-12-19 16:42:03'),
(11, 'jose', 'jose24', 'jose124@gmail.com', '$2b$10$GjEm5R8CGmSpsiTMBRYtFOOYs3eCuZFEW/EBHp0vzMNwETfDuZKxm', '27135419364', 1, '', 'on', '2024-12-19 18:50:11'),
(12, 'miralngel cortez', 'mirla', 'mirla@gmail.com', '$2b$10$Qr/00WsIBYfJoozHsIkmo.fAb7GqaAVD.NVIpPNGY7E/7C/lpRPJi', '289789456', 1, '', '', '2024-12-23 16:50:21'),
(13, 'miralngel cortez', 'mirla', 'mirla@gmail.com', '$2b$10$xNmGCvQnp0b8qV0wh6dZjOQSWlz6nMumWagX22r7KaNUq1bBaRqcS', '289789456', 1, '', '', '2024-12-23 16:50:30'),
(14, 'miralngel cortez', 'mirla', 'mirla@gmail.com', '$2b$10$f8jhK0LufBYinjrKXpT0dOeOurh0cScW3Gl0nYztWVUHWHZS567vy', '289789456', 1, '', '', '2024-12-23 16:50:43'),
(15, 'mirlangel cortez', 'mirla', 'mirla@gmail.com', '$2b$10$Bo4Gy.UbI3ceeiWPPTW8tuAIoPzed5ms8wLcjCNXz8dssDPn/cstO', '289789456', 1, '', '', '2024-12-23 16:51:56'),
(16, 'marina chirinos', 'marimar', 'marina@gmail.com', '$2b$10$foo.nItouAkQyu./HJTex.ACPuVe6/doUM4MoPyqDXuNhFRqIsalK', '289789456', 1, '', '', '2024-12-23 16:51:56'),
(17, 'mirlangel cortez', 'mirla', 'mirla@gmail.com', '$2b$10$1Mqx4bURAlxF/ipJX7CEAugGPq5O/6JoOJJVQXPF/5y81BO6bAgQm', '289789456', 1, '', '', '2024-12-23 16:52:03'),
(18, 'marina chirinos', 'marimar', 'marina@gmail.com', '$2b$10$FF3LtdyDM0f0Rihwy/Do9uz4wrm1GnWBffgwtJu7W/.GysPxGcde2', '289789456', 1, '', '', '2024-12-23 16:52:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD UNIQUE KEY `unique_cart_product_user` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `login_history`
--
ALTER TABLE `login_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_hl_1` (`user_id`);

--
-- Indices de la tabla `most_sold_products`
--
ALTER TABLE `most_sold_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_category` (`category_id`),
  ADD KEY `fk_supplier` (`supplier_id`);

--
-- Indices de la tabla `product_stock`
--
ALTER TABLE `product_stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_id` (`product_id`);

--
-- Indices de la tabla `purchased_products`
--
ALTER TABLE `purchased_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_purchase` (`purchase_id`),
  ADD KEY `fk_prd` (`product_id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indices de la tabla `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`,`role_id`,`permission_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indices de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_rol` (`role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `login_history`
--
ALTER TABLE `login_history`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `product_stock`
--
ALTER TABLE `product_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `purchased_products`
--
ALTER TABLE `purchased_products`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Filtros para la tabla `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `fk_hl_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `most_sold_products`
--
ALTER TABLE `most_sold_products`
  ADD CONSTRAINT `fk_product_i` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`);

--
-- Filtros para la tabla `product_stock`
--
ALTER TABLE `product_stock`
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Filtros para la tabla `purchased_products`
--
ALTER TABLE `purchased_products`
  ADD CONSTRAINT `fk_prd` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `fk_purchase` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`purchase_id`);

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_rol` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
