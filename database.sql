-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbmovies
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actor` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idactors_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (1,'Steven Yeun','2025-02-06','2025-02-06'),(2,'Sandra Oh','2025-02-06','2025-02-06'),(3,'Walton Goggins','2025-02-06','2025-02-06'),(4,'Jean Claude Van Damme','2025-02-08','2025-02-08'),(11,'Lily Rose Depp','2025-02-09','2025-02-09'),(12,'Nicholas Hoult','2025-02-09','2025-02-09'),(13,'Willem Dafoe','2025-02-09','2025-02-09'),(14,'Emma Corrin','2025-02-09','2025-02-09');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idgenres_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Acción',NULL,NULL),(2,'Avntura',NULL,NULL),(3,'Ciencia Ficción',NULL,NULL),(4,'Comedia',NULL,NULL),(5,'Drama',NULL,NULL),(6,'Fantasía',NULL,NULL),(7,'Terror',NULL,NULL),(8,'Suspenso',NULL,NULL),(9,'Romance',NULL,NULL),(10,'Musical',NULL,NULL),(11,'Animación',NULL,NULL);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `synopsis` varchar(600) COLLATE utf8mb3_spanish_ci NOT NULL,
  `date` varchar(50) COLLATE utf8mb3_spanish_ci NOT NULL,
  `genre` int NOT NULL,
  `studio` varchar(45) COLLATE utf8mb3_spanish_ci NOT NULL,
  `age` int NOT NULL,
  `qualification` int NOT NULL,
  `duration` int NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idmovies_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `movies_genre_idx` (`genre`),
  CONSTRAINT `movies_genre` FOREIGN KEY (`genre`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (11,'The Gardener','D:\\Documentos\\PRUEBA ESVYDA\\Backend\\src\\public\\files\\The Gardener.jpg','Cada año, el Primer Ministro hace eliminar una lista de todo tipo de alborotadores en nombre de la famosa Razón de Estado. Serge Shuster, consejero especial del Presidente de la República, se encuentra en esta lista, más conocida como la Lista Matignon. Condenado a una muerte segura y en el centro de una conspiración implacable y de un secreto de Estado que también pone en peligro a su familia, Serge, su mujer y sus hijos sólo tienen una esperanza: su jardinero, Léo, que odia que las «babosas» invadan su jardín... Sobre todo las que quieren matar a familias inocentes.','2025-01-09',4,'Sin estudio',12,3,3,'2025-02-08','2025-02-09'),(34,'Los dos emisferios de Luca','D:\\Documentos\\PRUEBA ESVYDA\\Backend\\src\\public\\files\\Los dos emisferios de Luca.jpg','Bárbara viaja a la India con su familia para probar un tratamiento experimental y ayudar a su hijo con parálisis cerebral.','2025-01-17',5,'Michael Polaco',16,3,96,'2025-02-09','2025-02-09'),(38,'Mulan','D:\\Documentos\\PRUEBA ESVYDA\\Backend\\src\\public\\files\\Mulan.jpg','cualquier cosa','2020-07-24',1,'Disney',12,5,118,'2025-02-09','2025-02-09'),(45,'Nosferatu','D:\\Documentos\\PRUEBA ESVYDA\\Backend\\src\\public\\files\\Nosferatu.jpg','Historia gótica de obsesión entre una joven hechizada y el aterrador vampiro encaprichado de ella que causa un indescriptible terror a su paso.','2025-01-02',7,'Prana film',15,3,133,'2025-02-09','2025-02-09');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies_actors`
--

DROP TABLE IF EXISTS `movies_actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies_actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idmovies` int NOT NULL,
  `idactors` int NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idmovies_actors_UNIQUE` (`id`),
  KEY `movies_actors_movies_idx` (`idmovies`),
  KEY `movies_actors_actors_idx` (`idactors`),
  CONSTRAINT `movies_actors_actors` FOREIGN KEY (`idactors`) REFERENCES `actors` (`id`),
  CONSTRAINT `movies_actors_movies` FOREIGN KEY (`idmovies`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies_actors`
--

LOCK TABLES `movies_actors` WRITE;
/*!40000 ALTER TABLE `movies_actors` DISABLE KEYS */;
INSERT INTO `movies_actors` VALUES (1,11,4,'2025-02-08','2025-02-08'),(2,11,4,'2025-02-08','2025-02-08'),(28,45,4,'2025-02-09','2025-02-09'),(29,45,11,'2025-02-09','2025-02-09'),(30,45,12,'2025-02-09','2025-02-09'),(31,45,13,'2025-02-09','2025-02-09'),(32,45,14,'2025-02-09','2025-02-09');
/*!40000 ALTER TABLE `movies_actors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-09 23:51:41
