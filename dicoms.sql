-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 10, 2023 at 04:30 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_dicom`
--

-- --------------------------------------------------------

--
-- Table structure for table `dicoms`
--

CREATE TABLE `dicoms` (
  `id` int NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `dicomFile` varchar(255) NOT NULL,
  `patientId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dicoms`
--

INSERT INTO `dicoms` (`id`, `uuid`, `dicomFile`, `patientId`, `createdAt`, `updatedAt`) VALUES
(4, 'd96e5320-1149-4a00-9c0d-6d7d5ddcf1d6', '/images/309e4ee3cddf37ab26e2060ad01a6dc5.dcm', 11, '2022-11-30 15:25:36', '2022-11-30 15:25:36'),
(5, 'ca785008-68ad-4e8f-9daa-78f62aa3a7d0', '/images/309e4ee3cddf37ab26e2060ad01a6dc5.dcm', 11, '2022-11-30 15:28:00', '2022-11-30 15:28:00'),
(6, 'a86d9d5c-e3f7-47d6-951f-2ff2535e2523', '/images/facc687bed75bd5b2a6f1169495d3eb1.DCM', 11, '2022-11-30 15:28:18', '2022-11-30 15:28:18'),
(7, '594d3d96-cb03-436e-b319-366bbf0741e9', '/images/bdc98d68248228bf79370cb6807803b0.DCM', 11, '2022-11-30 15:28:34', '2022-11-30 15:28:34'),
(11, '6ce36266-0a33-48a9-81ee-17aa9a9e57e5', '/images/309e4ee3cddf37ab26e2060ad01a6dc5.dcm', 3, '2022-12-17 04:46:43', '2022-12-17 04:46:43'),
(18, '8d72461f-4c22-48ce-a899-82c0543ebb21', '/images/55ef928f92a82dcfcbb438aa7a6867bd.dcm', 17, '2023-07-06 08:42:29', '2023-07-06 08:42:29'),
(20, 'c78a8398-618e-49a4-8214-b997a7de8634', '/images/df60a76c2d0f91aeda9da87c3a945875.dcm', 1, '2023-07-06 08:43:34', '2023-07-06 08:43:34'),
(21, 'fd969690-7c09-402f-8ce7-75d74e27ba9d', '/images/2503ed0177bc54ce5a7b3f97d85ac6b0.dcm', 1, '2023-07-07 12:26:53', '2023-07-07 12:26:53'),
(22, '134e1b1b-720a-47ef-8494-edfe1a414ee6', '/images/2503ed0177bc54ce5a7b3f97d85ac6b0.dcm', 17, '2023-07-07 13:12:20', '2023-07-07 13:12:20'),
(23, 'd745082a-2093-416f-b882-5a23ccce8a0e', '/images/25157215b046aaa830c1be8391ddace8.dcm', 17, '2023-07-07 13:13:58', '2023-07-07 13:13:58'),
(24, '1d8e1eed-0e2e-4359-b484-e7111fb61c6e', '/images/8468476ccb452b09335e6e33bc440ca7.dcm', 31, '2023-07-08 03:13:46', '2023-07-08 03:13:46'),
(25, 'c528b505-1ce1-445f-886f-699053377526', '/images/816ee0d9f1ae4bd2d9bf19d76f3fa2d4.dcm', 31, '2023-07-08 03:13:58', '2023-07-08 03:13:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dicoms`
--
ALTER TABLE `dicoms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patientId` (`patientId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dicoms`
--
ALTER TABLE `dicoms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dicoms`
--
ALTER TABLE `dicoms`
  ADD CONSTRAINT `dicoms_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
