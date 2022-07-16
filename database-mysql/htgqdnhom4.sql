-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 16, 2022 lúc 09:23 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `htgqdnhom4`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `address`
--

CREATE TABLE `address` (
  `id` int(10) NOT NULL,
  `latitude_company` varchar(100) NOT NULL,
  `longitude_company` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `address`
--

INSERT INTO `address` (`id`, `latitude_company`, `longitude_company`) VALUES
(1, '21.199870601292957', '105.99032151778287'),
(2, '21.025252877941288', '105.78495012577612'),
(3, '21.03101779024436', '105.78282715208606'),
(4, '20.93537517398236', '105.84621245461538'),
(5, '21.03072905996961', '105.76133210778414'),
(6, '21.00702591262848', '105.84313338314284');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `epidemic_tatus`
--

CREATE TABLE `epidemic_tatus` (
  `id` int(11) NOT NULL,
  `patient` int(30) NOT NULL,
  `p_condition` int(10) NOT NULL,
  `doctor` int(11) NOT NULL,
  `id_region` int(10) NOT NULL,
  `num_doctors_needed` int(30) NOT NULL,
  `num_shortage_doctors` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `epidemic_tatus`
--

INSERT INTO `epidemic_tatus` (`id`, `patient`, `p_condition`, `doctor`, `id_region`, `num_doctors_needed`, `num_shortage_doctors`) VALUES
(1, 99235, 2, 3023, 1, 0, 2031),
(2, 654210, 3, 11093, 2, 0, 4551),
(3, 92929, 1, 1350, 3, 0, 421),
(4, 111111, 2, 3240, 4, 0, 2129),
(5, 1000235, 3, 18350, 5, 0, 8348),
(6, 301030, 1, 2793, 6, 217, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `region`
--

CREATE TABLE `region` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `id_address` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `region`
--

INSERT INTO `region` (`id`, `name`, `id_address`) VALUES
(1, 'Đà Nẵng', 1),
(2, 'Hồ Chí Minh', 2),
(3, 'Lâm Đồng', 3),
(4, 'Khánh Hòa', 4),
(5, 'Hà Nội', 5),
(6, 'Bắc Giang', 6);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `epidemic_tatus`
--
ALTER TABLE `epidemic_tatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_company` (`id_region`);

--
-- Chỉ mục cho bảng `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_address` (`id_address`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `address`
--
ALTER TABLE `address`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `epidemic_tatus`
--
ALTER TABLE `epidemic_tatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `region`
--
ALTER TABLE `region`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
