-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 17, 2022 lúc 02:18 PM
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
-- Cấu trúc bảng cho bảng `epidemic_tatus`
--

CREATE TABLE `epidemic_tatus` (
  `id` int(11) NOT NULL,
  `patient` int(30) NOT NULL,
  `p_condition` int(10) NOT NULL,
  `doctor` int(11) NOT NULL,
  `id_region` int(10) NOT NULL,
  `num_doctors_needed` int(30) NOT NULL,
  `num_redundant_doctor` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `epidemic_tatus`
--

INSERT INTO `epidemic_tatus` (`id`, `patient`, `p_condition`, `doctor`, `id_region`, `num_doctors_needed`, `num_redundant_doctor`) VALUES
(1, 99235, 2, 3023, 1, 0, 2031),
(2, 654210, 3, 9093, 2, 0, 2551),
(3, 92929, 1, 500, 3, 429, 0),
(4, 111111, 2, 3240, 4, 0, 2129),
(5, 1000235, 3, 8350, 5, 1652, 0),
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
