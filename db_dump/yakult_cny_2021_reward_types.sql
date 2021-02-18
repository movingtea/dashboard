-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: yakult_cny_2021
-- ------------------------------------------------------
-- Server version	5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `reward_types`
--

DROP TABLE IF EXISTS `reward_types`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward_types`
(
    `id`         bigint(20) unsigned                     NOT NULL AUTO_INCREMENT,
    `name`       varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `quantity`   int(10) unsigned                        NOT NULL,
    `given`      int(10) unsigned                        NOT NULL DEFAULT '0',
    `type`       varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` timestamp                               NULL     DEFAULT NULL,
    `updated_at` timestamp                               NULL     DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_types`
--

LOCK TABLES `reward_types` WRITE;
/*!40000 ALTER TABLE `reward_types`
    DISABLE KEYS */;
INSERT INTO `reward_types`
VALUES (1, '扫地机器人', 13, 2, 'Physical', '2021-01-27 11:02:34', '2021-02-02 13:50:03'),
       (2, '京东E卡', 527, 157, 'JdCode', '2021-01-27 11:02:34', '2021-02-18 08:00:08'),
       (3, '红包', 134417, 45583, 'RedPocket', '2021-01-27 11:02:34', '2021-02-18 16:24:41'),
       (4, '壁纸', 89163, 30138, 'Image', '2021-01-27 11:02:34', '2021-02-18 16:24:17');
/*!40000 ALTER TABLE `reward_types`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2021-02-19  0:30:59
