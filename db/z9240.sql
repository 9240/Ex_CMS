/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50727
Source Host           : localhost:3306
Source Database       : zniot

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2019-09-11 18:36:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for zn_adminer
-- ----------------------------
DROP TABLE IF EXISTS `zn_adminer`;
CREATE TABLE `zn_adminer` (
  `id` char(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `passwd` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of zn_adminer
-- ----------------------------
INSERT INTO `zn_adminer` VALUES ('ed261c80-d11f-11e9-8539-057040f37447', '9240@qq.com', '1234');

-- ----------------------------
-- Table structure for zn_carousel
-- ----------------------------
DROP TABLE IF EXISTS `zn_carousel`;
CREATE TABLE `zn_carousel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zn_carousel
-- ----------------------------
INSERT INTO `zn_carousel` VALUES ('5', '/files/1568191680758_13.jpg');
INSERT INTO `zn_carousel` VALUES ('6', '/files/1568191685750_14.jpg');
INSERT INTO `zn_carousel` VALUES ('7', '/files/1568192132960_2.jpg');
INSERT INTO `zn_carousel` VALUES ('8', '/files/1568196451187_183146.jpg');

-- ----------------------------
-- Table structure for zn_category
-- ----------------------------
DROP TABLE IF EXISTS `zn_category`;
CREATE TABLE `zn_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of zn_category
-- ----------------------------
INSERT INTO `zn_category` VALUES ('1', '智能产品');
INSERT INTO `zn_category` VALUES ('2', '智能产品1');
INSERT INTO `zn_category` VALUES ('3', '智能产品3');

-- ----------------------------
-- Table structure for zn_news
-- ----------------------------
DROP TABLE IF EXISTS `zn_news`;
CREATE TABLE `zn_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(100) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of zn_news
-- ----------------------------
INSERT INTO `zn_news` VALUES ('11', '标题1', '2019-09-11', '/files/1568197417500_14.jpg', '<p>在会上,中国电信董事长柯瑞文发表5G主旨演讲表示,5G是演进,更是变革。从4G到5G,最主要的区别是核心网络架构的变化,更加开放,这也将催生融合互促的新生态,让设备提供商</p><p>、网络运营商、平台服务商和应用提供商实现跨界融合、交叉赋能。并表示,中国电信将以更加积极开放的心态,全面平等地向合作伙伴开放能力,与合作伙伴共同探索5G应用和运营模式。</p>');
INSERT INTO `zn_news` VALUES ('13', '标题2', '2019-09-12', '/files/1568197429663_13.jpg', '<p>4月26日,以Hello 5G 赋能未来为主题的中国电信5G创新合作大会在深圳举行。广东省委副书记、深圳市委书记王伟中,广东省副省长覃伟中,工业和信息化部党组成员、总工程师张峰,深圳市委副书记、深圳市市长陈如桂,中国电信董事长柯瑞文等出席大会。和而泰作为受邀企业出席会议,并在会上与中国电信签署5G创新合作备忘录,和而泰副总裁王宏代表企业出席签约仪式。</p>');

-- ----------------------------
-- Table structure for zn_pro
-- ----------------------------
DROP TABLE IF EXISTS `zn_pro`;
CREATE TABLE `zn_pro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_id` int(11) NOT NULL,
  `proName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `proDesc` text COLLATE utf8_unicode_ci NOT NULL,
  `proImg` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cate_id` (`cate_id`),
  CONSTRAINT `cate_id` FOREIGN KEY (`cate_id`) REFERENCES `zn_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of zn_pro
-- ----------------------------
INSERT INTO `zn_pro` VALUES ('1', '1', '智能睡眠监测器', '<p>-监测呼吸、心率、体动等多个生命体征</p><p>-提供睡眠报告和睡眠改善建议</p><p>-可实惠睡眠过程关怀功能</p>', '/files/1568196378132_13.jpg');
INSERT INTO `zn_pro` VALUES ('2', '1', '智慧盒子', '<p>-智能联动多设备打造舒适睡眠环境</p><p>-随时了解千里之外父母的睡眠状况</p><p>-下载C-Life睡眠，可享受云端操控/智能联动/数据查看等服务</p>', '/files/1568194296628_104434a.jpg');
INSERT INTO `zn_pro` VALUES ('3', '2', '心型洁面仪', '<p>深层清洁：2种洁面刷头，适用于各类肌肤。</p><p>3D按摩功能：创新高频振动技术，去死皮去角质。</p><p>l   竹炭硅胶技术：竹炭强力吸附化妆品残留物，毛孔卸妆无残留。</p><p>l   柔软亲肤：深层负离子导入，温和清洁。</p><img src=\"http://www.szhittech.com/data/attachment/portal/201811/30/192651mn2nxo2txf6lon8t.jpg\" style=\"width:100%;\" />', '/files/1568196392281_4.jpg');
INSERT INTO `zn_pro` VALUES ('4', '3', '桌面空气净化器', '<h4>产品介绍</h4><p>1、前卫的手势操控体验。</p><p>2、多重过滤技术，小空间全能净化。</p><p>3、低功耗蓝牙数据传输。</p><p>4、APP实时查看空气质量和设备状态。</p><img src=\"http://www.szhittech.com/data/attachment/portal/201608/01/135035i3fw7t23yztf2otf.jpg\" style=\"width:100%;\"/>', '/files/1568195812051_2.jpg');
