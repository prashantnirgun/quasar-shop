-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: HOST IP    Database: retail_production
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `general_ledger`
--

DROP TABLE IF EXISTS `general_ledger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `general_ledger` (
  `general_ledger_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL DEFAULT '0',
  `general_ledger_name` varchar(100) DEFAULT NULL,
  `alias` varchar(100) DEFAULT NULL,
  `account_group_id` int(10) unsigned NOT NULL DEFAULT '0',
  `is_statutory` char(1) NOT NULL,
  `primary_name` varchar(50) DEFAULT NULL,
  `debit_credit_id` char(1) NOT NULL DEFAULT 'D',
  `opening_amount` decimal(18,2) NOT NULL DEFAULT '0.00',
  `gst_no` varchar(50) DEFAULT NULL,
  `pancard_no` varchar(50) DEFAULT NULL,
  `aadhaar_no` varchar(50) DEFAULT NULL,
  `ie_code` varchar(50) DEFAULT NULL,
  `reference_no` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `rmn` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `contact_person` varchar(50) DEFAULT NULL,
  `is_maintain_bill` char(1) NOT NULL DEFAULT 'N',
  `credit_period` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `credit_limit` decimal(12,2) unsigned DEFAULT '0.00',
  `billing_cycle` varchar(3) DEFAULT NULL,
  `hierarchy` tinyint(4) NOT NULL DEFAULT '0',
  `tag` varchar(50) DEFAULT NULL,
  `remark` text,
  `created_by_user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_by_user_id` int(10) unsigned DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`general_ledger_id`),
  KEY `fk_general_ledger_company_id_idx` (`company_id`),
  KEY `fk_general_ledger_account_group_id_idx` (`account_group_id`),
  KEY `fk_general_ledger_user_id_idx` (`created_by_user_id`),
  CONSTRAINT `fk_general_ledger_account_group_id` FOREIGN KEY (`account_group_id`) REFERENCES `account_group` (`account_group_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_general_ledger_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_general_ledger_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 12:23:50
