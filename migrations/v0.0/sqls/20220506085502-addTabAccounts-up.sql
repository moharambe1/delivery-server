/* Replace with your SQL commands */
CREATE TYPE RoleEnum AS ENUM ('MANAGER', 'DELIVER', 'CLIENT');
CREATE TABLE ACCOUNTS(

  id SERIAL PRIMARY KEY, 
  phoneNumber VARCHAR(12) NOT NULL,

  email VARCHAR(40) UNIQUE NOT NULL,
  pwd VARCHAR(40) NOT NULL,

  accountLevel int DEFAULT 0 NOT NULL,
  accountRole RoleEnum DEFAULT 'CLIENT' NOT NULL,

  fullName VARCHAR(40),
  
  wilaya WilayaEnumShared DEFAULT 'BISKRA' NOT NULL,
  city CityEnumShared DEFAULT 'BISKRA' NOT NULL,

  addrass VARCHAR(40)
);
