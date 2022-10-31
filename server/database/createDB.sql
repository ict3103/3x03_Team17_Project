CREATE DATABASE IF NOT EXISTS ICT3x03;
USE ICT3x03;
DROP TABLE IF EXISTS `CartItems`;
DROP TABLE IF EXISTS `Cart`;
DROP TABLE IF EXISTS `LaptopInfo`;
DROP TABLE IF EXISTS `UserInfo`;

CREATE TABLE `LaptopInfo` (
  `laptopId` INT NOT NULL AUTO_INCREMENT,
  `laptopName` varchar(50) NOT NULL,
  `imageUrl` varchar(200) DEFAULT NULL,
  `price` double NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`laptopId`)
);

CREATE TABLE `UserInfo` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `verification_status` BOOLEAN DEFAULT false,
  PRIMARY KEY (`userId`)
);


CREATE TABLE `Cart` (
  `cartId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  PRIMARY KEY (`cartId`),
  FOREIGN KEY(`userId`) REFERENCES UserInfo(userId)
);

CREATE TABLE `CartItems`(
  `cartItemId` INT NOT NULL AUTO_INCREMENT,
  `cartId` INT NOT NULL,
  `laptopId` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`cartItemId`),
  FOREIGN KEY(`cartId`) REFERENCES Cart(cartId),
  FOREIGN KEY(`laptopId`) REFERENCES LaptopInfo(laptopId)
);

ALTER TABLE CartItems
  ADD CONSTRAINT CartItems UNIQUE(cartId, laptopId);