-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 192.168.199.101    Database: minxianfd
-- ------------------------------------------------------
-- Server version	5.5.56-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n\n主键id',
  `username` varchar(25) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n\n\n用户名',
  `password` char(32) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n\n\n密码',
  `type` tinyint(1) unsigned NOT NULL COMMENT '\n类型？（0>超级管理员，1>普通管理员）',
  `status` tinyint(1) unsigned NOT NULL COMMENT '\n状态？（0>正常，1>冻结）',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='后台用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'重庆存己科技','aef484683fc283db3c98551d67ffe218',0,0,1516687707),(2,'岷县海晟商贸','aef484683fc283db3c98551d67ffe218',1,0,1516687912);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_ancillary_facility`
--

DROP TABLE IF EXISTS `hm_ancillary_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_ancillary_facility` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `cname` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n名称',
  `sort` tinyint(3) unsigned NOT NULL COMMENT '\n排序？数字越小越靠前',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='房源配套设施表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_ancillary_facility`
--

LOCK TABLES `hm_ancillary_facility` WRITE;
/*!40000 ALTER TABLE `hm_ancillary_facility` DISABLE KEYS */;
INSERT INTO `hm_ancillary_facility` VALUES (1,'床',1,1516688901),(2,'冰箱',2,1516688911),(3,'洗衣机',3,1516688921),(4,'可做饭',4,1516688931),(5,'包物业费',5,1516688944),(6,'集中供暖',6,1516688953),(7,'空调',7,1516688964),(8,'沙发',8,1516688973),(9,'独立卫生间',9,1516688983),(10,'包取暖费',10,1516688994),(11,'电视',11,1516689003),(12,'热水器',12,1516689013),(13,'衣柜',13,1516689037),(14,'阳台',14,1516689052);
/*!40000 ALTER TABLE `hm_ancillary_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_area`
--

DROP TABLE IF EXISTS `hm_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_area` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `hm_min_xian_id` int(10) unsigned NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n街道及小区',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`),
  KEY `fk_hm_area_hm_min_xian1_idx` (`hm_min_xian_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='房源区域表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_area`
--

LOCK TABLES `hm_area` WRITE;
/*!40000 ALTER TABLE `hm_area` DISABLE KEYS */;
INSERT INTO `hm_area` VALUES (1,1,'江北区大石坝东原D7',1517454377);
/*!40000 ALTER TABLE `hm_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_basics`
--

DROP TABLE IF EXISTS `hm_basics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_basics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `housing_resource_genre` varchar(25) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n房源类型？0’其它，1’住宅，2‘别墅，3’写字楼，4’商铺',
  `decorate_degree` varchar(25) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n装修程度？0‘其它，1‘豪华装修，2’精装修，3‘中等装修，4’简装修，5‘毛坯',
  `orientation` varchar(25) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n朝向？0’南北，1‘南，2’东南，3‘东，4’西南，5’北，6‘西，7’东西，8’东北，9‘西北',
  `hm_house_type_id` int(10) unsigned NOT NULL COMMENT '\n关联户型主键id',
  `area` int(5) unsigned NOT NULL COMMENT 'X平方米？',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`),
  KEY `fk_basics_house_type1_idx` (`hm_house_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='房源基础信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_basics`
--

LOCK TABLES `hm_basics` WRITE;
/*!40000 ALTER TABLE `hm_basics` DISABLE KEYS */;
INSERT INTO `hm_basics` VALUES (1,'1','1','4',1,443,1517126634);
/*!40000 ALTER TABLE `hm_basics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_community`
--

DROP TABLE IF EXISTS `hm_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_community` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `cname` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n小区名称',
  `hm_floor_id` int(10) unsigned NOT NULL,
  `hm_doorplate_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hm_community_hm_floor1_idx` (`hm_floor_id`),
  KEY `fk_hm_community_hm_doorplate1_idx` (`hm_doorplate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='房源小区信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_community`
--

LOCK TABLES `hm_community` WRITE;
/*!40000 ALTER TABLE `hm_community` DISABLE KEYS */;
INSERT INTO `hm_community` VALUES (1,'东原D7',1,1);
/*!40000 ALTER TABLE `hm_community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_counselor`
--

DROP TABLE IF EXISTS `hm_counselor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_counselor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `head_portrait` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n头像',
  `cname` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n姓名',
  `telephone` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n电话号码',
  `status` tinyint(1) unsigned NOT NULL COMMENT '\n状态？0·启用，1·弃用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='房源租房顾问表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_counselor`
--

LOCK TABLES `hm_counselor` WRITE;
/*!40000 ALTER TABLE `hm_counselor` DISABLE KEYS */;
INSERT INTO `hm_counselor` VALUES (1,'/uploads/20180123/88a149b12f21887786c8d776f646d3f5.JPG','张三','123456',0),(2,'/uploads/20180123/4b54797a94872a07e465aa0bfc356183.jpeg','李四','545454',0),(3,'/uploads/20180123/343a34cc2a17c32d66b68bcca3da88e8.jpg','王五','4565655',0);
/*!40000 ALTER TABLE `hm_counselor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_doorplate`
--

DROP TABLE IF EXISTS `hm_doorplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_doorplate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `building` tinyint(3) unsigned NOT NULL COMMENT '\nX号楼',
  `unit` tinyint(3) unsigned NOT NULL COMMENT '\nX单元',
  `household` tinyint(3) unsigned NOT NULL COMMENT '\nX户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='房源小区门牌表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_doorplate`
--

LOCK TABLES `hm_doorplate` WRITE;
/*!40000 ALTER TABLE `hm_doorplate` DISABLE KEYS */;
INSERT INTO `hm_doorplate` VALUES (1,4,3,4);
/*!40000 ALTER TABLE `hm_doorplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_floor`
--

DROP TABLE IF EXISTS `hm_floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_floor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `total_floor` tinyint(3) unsigned NOT NULL COMMENT '\n总楼层',
  `present_floor` tinyint(3) unsigned NOT NULL COMMENT '\n当前楼层',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='房源小区楼层表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_floor`
--

LOCK TABLES `hm_floor` WRITE;
/*!40000 ALTER TABLE `hm_floor` DISABLE KEYS */;
INSERT INTO `hm_floor` VALUES (1,34,23);
/*!40000 ALTER TABLE `hm_floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_house_type`
--

DROP TABLE IF EXISTS `hm_house_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_house_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `habitable_room` tinyint(1) unsigned NOT NULL COMMENT '\nX室?',
  `living_room` tinyint(1) unsigned NOT NULL COMMENT '\nX厅？',
  `shower_room` tinyint(1) unsigned NOT NULL COMMENT '\nX卫？',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='房源基础信息户型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_house_type`
--

LOCK TABLES `hm_house_type` WRITE;
/*!40000 ALTER TABLE `hm_house_type` DISABLE KEYS */;
INSERT INTO `hm_house_type` VALUES (1,3,2,2),(2,2,2,2);
/*!40000 ALTER TABLE `hm_house_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_housing_resource`
--

DROP TABLE IF EXISTS `hm_housing_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_housing_resource` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `title` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n标题',
  `describe` mediumtext CHARACTER SET utf8mb4 NOT NULL COMMENT '\n描述',
  `trait` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n特点',
  `in_time` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n入住时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='房源信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_housing_resource`
--

LOCK TABLES `hm_housing_resource` WRITE;
/*!40000 ALTER TABLE `hm_housing_resource` DISABLE KEYS */;
INSERT INTO `hm_housing_resource` VALUES (1,'4343','4334','4343','2018-02-02');
/*!40000 ALTER TABLE `hm_housing_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_landlord`
--

DROP TABLE IF EXISTS `hm_landlord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_landlord` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `cname` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n姓名',
  `phone` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n手机号码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源房东信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_landlord`
--

LOCK TABLES `hm_landlord` WRITE;
/*!40000 ALTER TABLE `hm_landlord` DISABLE KEYS */;
/*!40000 ALTER TABLE `hm_landlord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_landlord_rent`
--

DROP TABLE IF EXISTS `hm_landlord_rent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_landlord_rent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `weapp_user_id` int(10) unsigned NOT NULL COMMENT '\n关联小程序用户表主键id',
  `hm_basics_id` int(10) unsigned NOT NULL COMMENT '\n关联房源基础信息表主键id',
  `hm_area_id` int(10) unsigned NOT NULL COMMENT '\n关联房源区域表主键id',
  `hm_community_id` int(10) unsigned NOT NULL COMMENT '\n关联房源小区信息表主键id',
  `hm_lease_id` int(10) unsigned NOT NULL COMMENT '\n关联房源租赁信息表主键id',
  `hm_housing_resource_id` int(10) unsigned NOT NULL COMMENT '\n关联房源信息表主键id',
  `hm_owner_id` int(10) unsigned NOT NULL COMMENT '\n关联房源业主信息表主键id',
  `hm_landlord_id` int(10) unsigned NOT NULL COMMENT '\n关联房源房东信息表主键id',
  `hm_promotion_id` int(10) unsigned NOT NULL COMMENT '\n关联房源置顶推广表主键id',
  `hm_promotion_time_id` int(10) unsigned NOT NULL COMMENT '\n关联房源模块推广时间表主键id',
  `hm_counselor_id` int(10) unsigned NOT NULL COMMENT '\n关联房源租房顾问表主键id',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  `status` tinyint(1) unsigned NOT NULL COMMENT '\n状态？0·启用，1·弃用',
  PRIMARY KEY (`id`),
  KEY `fk_hm_landlord_rent_weapp_user_idx` (`weapp_user_id`),
  KEY `fk_hm_landlord_rent_basics1_idx` (`hm_basics_id`),
  KEY `fk_hm_landlord_rent_hm_area1_idx` (`hm_area_id`),
  KEY `fk_hm_landlord_rent_hm_community1_idx` (`hm_community_id`),
  KEY `fk_hm_landlord_rent_hm_lease1_idx` (`hm_lease_id`),
  KEY `fk_hm_landlord_rent_hm_housing_resource1_idx` (`hm_housing_resource_id`),
  KEY `fk_hm_landlord_rent_hm_owner1_idx` (`hm_owner_id`),
  KEY `fk_hm_landlord_rent_hm_landlord1_idx` (`hm_landlord_id`),
  KEY `fk_hm_landlord_rent_hm_promotion1_idx` (`hm_promotion_id`),
  KEY `fk_hm_landlord_rent_hm_counselor1_idx` (`hm_counselor_id`),
  KEY `fk_hm_landlord_rent_hm_promotion_time1_idx` (`hm_promotion_time_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='房源模块房东出租表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_landlord_rent`
--

LOCK TABLES `hm_landlord_rent` WRITE;
/*!40000 ALTER TABLE `hm_landlord_rent` DISABLE KEYS */;
INSERT INTO `hm_landlord_rent` VALUES (1,1,1,1,1,1,1,1,0,0,0,0,1517561539,1);
/*!40000 ALTER TABLE `hm_landlord_rent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_lease`
--

DROP TABLE IF EXISTS `hm_lease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_lease` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `hm_lease_manner_id` int(10) unsigned NOT NULL COMMENT '\n关联房源租赁方式表主键id',
  `hm_payment_method_id` int(10) unsigned NOT NULL COMMENT '\n关联房源付款方式表主键id',
  `hm_ancillary_facility` varchar(5000) NOT NULL COMMENT '\n关联房源配套设置表主键id',
  `rent` int(10) unsigned NOT NULL COMMENT '\n租金？X元/月',
  PRIMARY KEY (`id`),
  KEY `fk_hm_lease_hm_lease_manner1_idx` (`hm_lease_manner_id`),
  KEY `fk_hm_lease_hm_payment_method1_idx` (`hm_payment_method_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='房源租赁信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_lease`
--

LOCK TABLES `hm_lease` WRITE;
/*!40000 ALTER TABLE `hm_lease` DISABLE KEYS */;
INSERT INTO `hm_lease` VALUES (1,1,1,'床,冰箱,洗衣机,集中供暖,包物业费,可做饭,空调',3443);
/*!40000 ALTER TABLE `hm_lease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_lease_manner`
--

DROP TABLE IF EXISTS `hm_lease_manner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_lease_manner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `cname` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n名称',
  `sort` tinyint(3) unsigned NOT NULL COMMENT '\n排序？数字越小越靠前',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='房源出租方式';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_lease_manner`
--

LOCK TABLES `hm_lease_manner` WRITE;
/*!40000 ALTER TABLE `hm_lease_manner` DISABLE KEYS */;
INSERT INTO `hm_lease_manner` VALUES (1,'整租',1,1516688633),(2,'合租',2,1516688645),(3,'短租',3,1516688655);
/*!40000 ALTER TABLE `hm_lease_manner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_min_xian`
--

DROP TABLE IF EXISTS `hm_min_xian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_min_xian` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `town_village` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n城镇',
  `sort` tinyint(3) unsigned NOT NULL COMMENT '\n排序？数字越小越靠前',
  `type` tinyint(1) unsigned NOT NULL COMMENT '\n类型？0’城镇，1>乡村',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='房源岷县地区表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_min_xian`
--

LOCK TABLES `hm_min_xian` WRITE;
/*!40000 ALTER TABLE `hm_min_xian` DISABLE KEYS */;
INSERT INTO `hm_min_xian` VALUES (1,'岷阳镇',1,0),(2,'蒲麻镇',2,0),(3,'西寨镇',3,0),(4,'梅川镇',4,0),(5,'西江镇',5,0),(6,'闾井镇',6,0),(7,'十里镇',7,0),(8,'茶埠镇',8,0),(9,'中寨镇',9,0),(10,'清水乡',1,1),(11,'马坞乡',2,1),(12,'寺沟乡',3,1),(13,'麻子川乡',4,1),(14,'秦许乡',5,1),(15,'禾驮乡',6,1),(16,'维新乡',7,1),(17,'申都乡',8,1),(18,'锁龙乡',9,1);
/*!40000 ALTER TABLE `hm_min_xian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_owner`
--

DROP TABLE IF EXISTS `hm_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_owner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `description` mediumtext CHARACTER SET utf8mb4 NOT NULL COMMENT '\n描述',
  `demand` mediumtext CHARACTER SET utf8mb4 NOT NULL COMMENT '\n要求',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='房源业主信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_owner`
--

LOCK TABLES `hm_owner` WRITE;
/*!40000 ALTER TABLE `hm_owner` DISABLE KEYS */;
INSERT INTO `hm_owner` VALUES (1,'344343','3443');
/*!40000 ALTER TABLE `hm_owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_owner_collect`
--

DROP TABLE IF EXISTS `hm_owner_collect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_owner_collect` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `hm_landlord_rent_id` int(10) unsigned NOT NULL COMMENT '\n关联房源模块房东出租表主键id',
  `weapp_user_id` int(10) unsigned NOT NULL COMMENT '\n关联小程序用户表主键id',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`),
  KEY `fk_hm_owner_wanted_hm_landlord_rent1_idx` (`hm_landlord_rent_id`),
  KEY `fk_hm_owner_wanted_weapp_user1_idx` (`weapp_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源模块业主收藏表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_owner_collect`
--

LOCK TABLES `hm_owner_collect` WRITE;
/*!40000 ALTER TABLE `hm_owner_collect` DISABLE KEYS */;
/*!40000 ALTER TABLE `hm_owner_collect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_owner_estimate`
--

DROP TABLE IF EXISTS `hm_owner_estimate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_owner_estimate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `hm_landlord_rent_id` int(10) unsigned NOT NULL COMMENT '\n关联房源模块房东出租表主键id',
  `weapp_user_id` int(10) unsigned NOT NULL COMMENT '\n关联小程序用户表主键id',
  `content` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n评价内容',
  `ctime` int(10) NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`),
  KEY `fk_hm_owner_estimate_hm_landlord_rent1_idx` (`hm_landlord_rent_id`),
  KEY `fk_hm_owner_estimate_weapp_user1_idx` (`weapp_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源模块业主评价表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_owner_estimate`
--

LOCK TABLES `hm_owner_estimate` WRITE;
/*!40000 ALTER TABLE `hm_owner_estimate` DISABLE KEYS */;
/*!40000 ALTER TABLE `hm_owner_estimate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_owner_record`
--

DROP TABLE IF EXISTS `hm_owner_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_owner_record` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `hm_landlord_rent_id` int(10) unsigned NOT NULL COMMENT '\n关联房源模块房东出租表主键id',
  `weapp_user_id` int(10) unsigned NOT NULL COMMENT '\n关联小程序用户表主键id',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`),
  KEY `fk_hm_owner_record_hm_landlord_rent1_idx` (`hm_landlord_rent_id`),
  KEY `fk_hm_owner_record_weapp_user1_idx` (`weapp_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源模块业主看房记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_owner_record`
--

LOCK TABLES `hm_owner_record` WRITE;
/*!40000 ALTER TABLE `hm_owner_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `hm_owner_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_payment_method`
--

DROP TABLE IF EXISTS `hm_payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_payment_method` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cname` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n名称',
  `sort` tinyint(3) unsigned NOT NULL COMMENT '\n排序？数字越小越靠前',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='房源付款方式表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_payment_method`
--

LOCK TABLES `hm_payment_method` WRITE;
/*!40000 ALTER TABLE `hm_payment_method` DISABLE KEYS */;
INSERT INTO `hm_payment_method` VALUES (1,'押一付三',1,1516688764),(2,'押一付二',2,1516688778),(3,'押一付一',3,1516688791),(4,'押二付一',4,1516688801),(5,'半年付',5,1516688812),(6,'年付',6,1516688829),(7,'面议',7,1516688845);
/*!40000 ALTER TABLE `hm_payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_promotion`
--

DROP TABLE IF EXISTS `hm_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_promotion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `hm_promotion_cost_id` int(10) unsigned NOT NULL COMMENT '\n关联房源置顶推广费用表主键id',
  `start_time` int(10) unsigned NOT NULL COMMENT '\n开始时间',
  `end_time` int(10) unsigned NOT NULL COMMENT '\n结束时间',
  `status` tinyint(1) unsigned NOT NULL COMMENT '\n状态管理？0·启用，1·弃用',
  PRIMARY KEY (`id`),
  KEY `fk_hm_promotion_hm_promotion_cost1_idx` (`hm_promotion_cost_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源置顶推广表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_promotion`
--

LOCK TABLES `hm_promotion` WRITE;
/*!40000 ALTER TABLE `hm_promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `hm_promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_promotion_cost`
--

DROP TABLE IF EXISTS `hm_promotion_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_promotion_cost` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `day` int(10) unsigned NOT NULL COMMENT '\n天数',
  `cost` decimal(14,2) unsigned NOT NULL COMMENT '\n费用',
  `sort` tinyint(3) unsigned NOT NULL COMMENT '\n排序？数字越小越靠前',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='房源置顶推广费用表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_promotion_cost`
--

LOCK TABLES `hm_promotion_cost` WRITE;
/*!40000 ALTER TABLE `hm_promotion_cost` DISABLE KEYS */;
INSERT INTO `hm_promotion_cost` VALUES (1,1,25.00,1),(2,3,60.00,2),(3,7,100.00,3),(5,30,300.00,4);
/*!40000 ALTER TABLE `hm_promotion_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_promotion_time`
--

DROP TABLE IF EXISTS `hm_promotion_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_promotion_time` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n\n主键id',
  `start_time` int(10) unsigned NOT NULL COMMENT '\n开始时间',
  `end_time` int(10) unsigned NOT NULL COMMENT '\n结束时间',
  `status` tinyint(1) unsigned NOT NULL COMMENT '\n状态？0·正常，1·停用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房源模块推广时间表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_promotion_time`
--

LOCK TABLES `hm_promotion_time` WRITE;
/*!40000 ALTER TABLE `hm_promotion_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `hm_promotion_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hm_view_images`
--

DROP TABLE IF EXISTS `hm_view_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hm_view_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `path` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '\n路径',
  `sort` tinyint(3) unsigned NOT NULL COMMENT '\n排序？数字越小越靠前',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  `hm_housing_resource_id` int(10) unsigned NOT NULL COMMENT '关联房源信息表主键id',
  PRIMARY KEY (`id`),
  KEY `fk_hm_view_images_hm_housing_resource1_idx` (`hm_housing_resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='房源环景图片表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hm_view_images`
--

LOCK TABLES `hm_view_images` WRITE;
/*!40000 ALTER TABLE `hm_view_images` DISABLE KEYS */;
INSERT INTO `hm_view_images` VALUES (1,'/uploads/20180202/d8335df09c05cd9a06e631097496659d.jpg',0,1517558930,1),(2,'/uploads/20180202/35932540be82eee2f36f4459a06dce8b.jpg',0,1517558930,1),(3,'/uploads/20180202/1774437a108722cb0243d280b5224cf6.jpg',0,1517558930,1),(4,'/uploads/20180202/847e6d6528463907a4040c039674586e.jpg',0,1517558930,1),(5,'/uploads/20180202/d59bc420565fb1b4f1e7a2cc3961bd2c.jpg',0,1517558930,1);
/*!40000 ALTER TABLE `hm_view_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information_module_about`
--

DROP TABLE IF EXISTS `information_module_about`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `information_module_about` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `content` mediumtext CHARACTER SET utf8mb4 NOT NULL COMMENT '\n内容',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯模块关于我们表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information_module_about`
--

LOCK TABLES `information_module_about` WRITE;
/*!40000 ALTER TABLE `information_module_about` DISABLE KEYS */;
/*!40000 ALTER TABLE `information_module_about` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `information_module_banner`
--

DROP TABLE IF EXISTS `information_module_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `information_module_banner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `path` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n路径',
  `sort` tinyint(3) NOT NULL COMMENT '\n排序？数字越小越靠前',
  `ctime` int(10) NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资讯模块banner';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `information_module_banner`
--

LOCK TABLES `information_module_banner` WRITE;
/*!40000 ALTER TABLE `information_module_banner` DISABLE KEYS */;
/*!40000 ALTER TABLE `information_module_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weapp_user`
--

DROP TABLE IF EXISTS `weapp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weapp_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '\n主键id',
  `openid` varchar(45) CHARACTER SET utf8mb4 NOT NULL COMMENT '\n绑定用户openid',
  `ctime` int(10) unsigned NOT NULL COMMENT '\n时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='小程序用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weapp_user`
--

LOCK TABLES `weapp_user` WRITE;
/*!40000 ALTER TABLE `weapp_user` DISABLE KEYS */;
INSERT INTO `weapp_user` VALUES (1,'o_IcX0W0CNw5998GP_q6XDvwno18',1516753116),(2,'o_IcX0QNAdj887VBW7X7-Zi7Kyl8',1516759584);
/*!40000 ALTER TABLE `weapp_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'minxianfd'
--

--
-- Dumping routines for database 'minxianfd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-02 18:01:30
