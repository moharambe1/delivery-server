/* Replace with your SQL commands */
ALTER TABLE PACKAGES
ADD CONSTRAiNT constraint_idClient
FOREIGN KEY (idClient)
REFERENCES ACCOUNTS(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE PACKAGES
ADD CONSTRAiNT constraint_idDelivery
FOREIGN KEY (idDelivery)
REFERENCES ACCOUNTS(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE PACKAGES
ADD CONSTRAiNT constraint_idCreater
FOREIGN KEY (idCreater)
REFERENCES ACCOUNTS(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE;