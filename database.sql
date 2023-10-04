
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for produtor
-- ----------------------------
DROP TABLE IF EXISTS `produtor`;
CREATE TABLE `produtor`  (
  `idProdutor` int NOT NULL AUTO_INCREMENT,
  `nomeProdutor` varchar(255)  NOT NULL,
  `cpfProdutor` varchar(20)  NOT NULL,
  PRIMARY KEY (`idProdutor`) USING BTREE
);

-- ----------------------------
-- Table structure for propriedade
-- ----------------------------
DROP TABLE IF EXISTS `propriedade`;
CREATE TABLE `propriedade`  (
  `idPropriedadde` int NOT NULL AUTO_INCREMENT,
  `nomePropriedade` varchar(255)  NOT NULL,
  `cadastroRural` varchar(255)  NOT NULL,
  `produtor_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`idPropriedadde`) USING BTREE,
  INDEX `produtorFk`(`produtor_id`) USING BTREE,
  CONSTRAINT `produtorFk` FOREIGN KEY (`produtor_id`) REFERENCES `produtor` (`idProdutor`) ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario`  (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nomeUsuario` varchar(255)  NOT NULL,
  `senhaUsuario` varchar(255)  NOT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE
) ;

SET FOREIGN_KEY_CHECKS = 1;
