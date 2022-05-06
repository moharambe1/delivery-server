/* Replace with your SQL commands */
CREATE TYPE StatePackageEnum AS ENUM('RECEIVING','RECEIVED','DELEVRING','DELEVERED','RETURN');
CREATE TYPE StateMoneyEnum AS ENUM('MANAGER','DELIVER','RECIVER','CLIENT','PAYED');
CREATE TYPE StateMoneyDeliveringEnum AS ENUM('CLIENT','RECIVER','PAYED');

CREATE TABLE PACKAGES(
  id SERIAL PRiMARY KEY,
  
  idCreater INT,
  idClient INT,
  idDelivery INT,

  PackageMoney INT,
  delivringMoney INT,

  statePackage StatePackageEnum NOT NULL,
  stateMoney StateMoneyEnum NOT NULL,
  StateMoneyDelivering StateMoneyDeliveringEnum NOT NULL,

  phoneNumer VARCHAR(12),
  wilaya WilayaEnumShared DEFAULT 'BISKRA' NOT NULL,
  city CityEnumShared DEFAULT 'BISKRA' NOT NULL,
  addrass VARCHAR(40)

);

ALTER SEQUENCE packages_id_seq START WITH 766400 INCREMENT BY 3 RESTART WITH 766400;