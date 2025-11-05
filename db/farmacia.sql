CREATE DATABASE  IF NOT EXISTS `farmacia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `farmacia`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: farmacia
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

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
-- Table structure for table `aquisicoes`
--

DROP TABLE IF EXISTS `aquisicoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquisicoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_laboratorio` int(11) NOT NULL,
  `fk_id_user` int(11) NOT NULL,
  `fornecedor` varchar(180) NOT NULL,
  `status` enum('SOLICITADO','ENVIADO','ENTREGUE') NOT NULL,
  `data_solicitacao` datetime NOT NULL,
  `data_entrega` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_laboratorio` (`fk_id_laboratorio`),
  KEY `fk_id_user` (`fk_id_user`),
  CONSTRAINT `aquisicoes_ibfk_1` FOREIGN KEY (`fk_id_laboratorio`) REFERENCES `laboratorios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aquisicoes_ibfk_2` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER tgr_after_create_aquisicao AFTER INSERT
    ON AQUISICOES
    FOR EACH ROW
    BEGIN
		INSERT INTO RELATORIOS_MEDICAMENTOS
			(fk_id_aquisicao, situacao, created_at)
		VALUES
			(NEW.id, NEW.status, NOW());
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER tgr_after_update_status_aquisicao AFTER UPDATE
    ON AQUISICOES
    FOR EACH ROW
    BEGIN
		INSERT INTO RELATORIOS_MEDICAMENTOS
			(fk_id_aquisicao, situacao, created_at)
		VALUES
			(NEW.id, NEW.status, NOW());
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `clientes_especiais`
--

DROP TABLE IF EXISTS `clientes_especiais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes_especiais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itens_aquisicoes`
--

DROP TABLE IF EXISTS `itens_aquisicoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_aquisicoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_aquisicao` int(11) NOT NULL,
  `fk_id_medicamento` int(11) NOT NULL,
  `quantidade_solicitada` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_aquisicao` (`fk_id_aquisicao`),
  KEY `fk_id_medicamento` (`fk_id_medicamento`),
  CONSTRAINT `itens_aquisicoes_ibfk_1` FOREIGN KEY (`fk_id_aquisicao`) REFERENCES `aquisicoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_aquisicoes_ibfk_2` FOREIGN KEY (`fk_id_medicamento`) REFERENCES `medicamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itens_retiradas`
--

DROP TABLE IF EXISTS `itens_retiradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_retiradas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_retirada` int(11) NOT NULL,
  `fk_id_medicamento` int(11) NOT NULL,
  `quantidade_solicitada` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_retirada` (`fk_id_retirada`),
  KEY `fk_id_medicamento` (`fk_id_medicamento`),
  CONSTRAINT `itens_retiradas_ibfk_1` FOREIGN KEY (`fk_id_retirada`) REFERENCES `retiradas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itens_retiradas_ibfk_2` FOREIGN KEY (`fk_id_medicamento`) REFERENCES `medicamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `laboratorios`
--

DROP TABLE IF EXISTS `laboratorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laboratorios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome_laboratorio` varchar(100) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `endereco` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lotes_medicamentos`
--

DROP TABLE IF EXISTS `lotes_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lotes_medicamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_medicamento` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `data_validade` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_medicamento` (`fk_id_medicamento`),
  CONSTRAINT `lotes_medicamentos_ibfk_1` FOREIGN KEY (`fk_id_medicamento`) REFERENCES `medicamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER tgr_after_create_lotes_medicamentos AFTER INSERT
    ON LOTES_MEDICAMENTOS
    FOR EACH ROW
    BEGIN
		DECLARE newTotal INT default 0;
        
        SET newTotal = (SELECT SUM(QUANTIDADE) FROM LOTES_MEDICAMENTOS
						WHERE FK_ID_MEDICAMENTO = NEW.FK_ID_MEDICAMENTO);
		UPDATE MEDICAMENTOS
        SET quantidade_total = newTotal
        WHERE id = NEW.FK_ID_MEDICAMENTO;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER tgr_after_update_lotes_medicamentos AFTER UPDATE
    ON LOTES_MEDICAMENTOS
    FOR EACH ROW
    BEGIN
		DECLARE newTotal INT default 0;
		SET newTotal = (SELECT SUM(QUANTIDADE) FROM LOTES_MEDICAMENTOS
					WHERE FK_ID_MEDICAMENTO = NEW.FK_ID_MEDICAMENTO);
		UPDATE MEDICAMENTOS
		SET quantidade_total = newTotal
		WHERE id = NEW.FK_ID_MEDICAMENTO;
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `id` int(11) NOT NULL,
  `fk_id_laboratorio` int(11) NOT NULL,
  `nome` varchar(500) NOT NULL,
  `indicacao_uso` text NOT NULL,
  `categoria` enum('CONVENIO','POPULAR') NOT NULL,
  `situacao` enum('ATIVO','INATIVO') NOT NULL DEFAULT 'ATIVO',
  `tipo_unidade` varchar(50) NOT NULL DEFAULT 'CAIXAS',
  `quantidade_minima` int(11) NOT NULL,
  `quantidade_total` int(11) NOT NULL DEFAULT 0,
  `img` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_laboratorio` (`fk_id_laboratorio`),
  CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`fk_id_laboratorio`) REFERENCES `laboratorios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medicamentos_clientes_especiais`
--

DROP TABLE IF EXISTS `medicamentos_clientes_especiais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos_clientes_especiais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_cliente_especial` int(11) NOT NULL,
  `fk_id_medicamento` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_cliente_especial` (`fk_id_cliente_especial`),
  KEY `fk_id_medicamento` (`fk_id_medicamento`),
  CONSTRAINT `medicamentos_clientes_especiais_ibfk_1` FOREIGN KEY (`fk_id_cliente_especial`) REFERENCES `clientes_especiais` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medicamentos_clientes_especiais_ibfk_2` FOREIGN KEY (`fk_id_medicamento`) REFERENCES `medicamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `relatorios_medicamentos`
--

DROP TABLE IF EXISTS `relatorios_medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatorios_medicamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_aquisicao` int(11) NOT NULL,
  `situacao` enum('SOLICITADO','ENVIADO','ENTREGUE') NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_aquisicao` (`fk_id_aquisicao`),
  CONSTRAINT `relatorios_medicamentos_ibfk_1` FOREIGN KEY (`fk_id_aquisicao`) REFERENCES `aquisicoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `retiradas`
--

DROP TABLE IF EXISTS `retiradas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retiradas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_id_user` int(11) NOT NULL,
  `data_retirada` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_user` (`fk_id_user`),
  CONSTRAINT `retiradas_ibfk_1` FOREIGN KEY (`fk_id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) NOT NULL,
  `senha` varchar(220) NOT NULL,
  `nivel_acesso` int(11) NOT NULL,
  `status` enum('ATIVO','INATIVO') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'farmacia'
--

--
-- Dumping routines for database 'farmacia'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 23:10:05
