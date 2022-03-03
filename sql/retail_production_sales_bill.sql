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
-- Table structure for table `sales_bill`
--

DROP TABLE IF EXISTS `sales_bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_bill` (
  `sales_bill_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL DEFAULT '0',
  `general_ledger_id` int(10) unsigned DEFAULT '0',
  `voucher_id` int(10) unsigned DEFAULT '0',
  `party_name` varchar(100) NOT NULL,
  `bill_type` char(2) DEFAULT 'CD',
  `user_type` char(1) DEFAULT 'G',
  `sales_bill_date_time` datetime NOT NULL,
  `delivery_date_time` datetime DEFAULT NULL,
  `gross_amount` decimal(12,2) NOT NULL,
  `delivery_charges` decimal(12,2) NOT NULL,
  `tax_amount` decimal(12,2) NOT NULL,
  `net_amount` decimal(12,2) NOT NULL,
  `narration` varchar(100) DEFAULT NULL,
  `reference_no` varchar(10) DEFAULT NULL,
  `bill_status` char(3) NOT NULL DEFAULT 'N',
  `contact_no` varchar(25) NOT NULL,
  `billing_address` text NOT NULL,
  `delivery_address` text NOT NULL,
  `delivery_city` varchar(50) NOT NULL,
  `delivery_pincode` int(11) NOT NULL,
  `special_instruction` text,
  `agent_id` int(11) DEFAULT NULL,
  `internal_note` text,
  `created_by_user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_by_user_id` int(10) unsigned DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`sales_bill_id`),
  KEY `fk_sales_bill_company_id_idx` (`company_id`),
  KEY `fk_sales_bill_user_id_idx` (`created_by_user_id`),
  KEY `fk_sales_bill_general_ledger_id_idx` (`general_ledger_id`),
  CONSTRAINT `fk_sales_bill_company_id` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_bill_general_ledger_id` FOREIGN KEY (`general_ledger_id`) REFERENCES `general_ledger` (`general_ledger_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_bill_user_id` FOREIGN KEY (`created_by_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 12:25:28
