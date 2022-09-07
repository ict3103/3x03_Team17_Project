CREATE DATABASE IF NOT EXISTS ICT3x03;
USE ICT3x03;
DROP TABLE IF EXISTS `LaptopInfo`;
CREATE TABLE `LaptopInfo` (
  `laptopName` varchar(50) NOT NULL,
  `imageUrl` varchar(200) DEFAULT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`laptopName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `UserInfo`;
CREATE TABLE `UserInfo` (
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;