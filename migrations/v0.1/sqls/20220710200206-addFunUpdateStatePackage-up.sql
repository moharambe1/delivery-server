CREATE OR REPLACE FUNCTION update_state_package(p_id int,p_state_pack StatePackageEnum,p_role RoleEnum)
returns int
LANGUAGE plpgsql
as 
$$
DECLARE 
  t_state_pack statepackageenum;
  t_state_deli_mny statemoneydeliveringenum;


BEGIN
SELECT statePackage,StateMoneyDelivering INTO t_state_pack,t_state_deli_mny FROM PACKAGES WHERE id=p_id;
IF p_role='MANAGER'::RoleEnum then 
  IF p_state_pack='STORED' AND (t_state_pack ='RECEIVING'::StatePackageEnum  OR  t_state_pack ='RECEIVED'::StatePackageEnum) then
  
    IF t_state_deli_mny='CLIENT'::StateMoneyDeliveringEnum then 
      UPDATE PACKAGES SET statemoneydelivering='PAYED'::StateMoneyDeliveringEnum, statePackage = p_state_pack WHERE id=p_id;
	  RETURN 1;
    ELSEIF t_state_deli_mny='RECIVER'::StateMoneyDeliveringEnum THEN 
      UPDATE PACKAGES SET  statePackage= p_state_pack WHERE id=p_id;
	  RETURN 1;
    END IF;

  END IF;
  
  IF p_state_pack='PAYED' AND (t_state_pack= 'STORED'::StatePackageEnum OR t_state_pack= 'DELEVERED'::StatePackageEnum) then
  	UPDATE PACKAGES SET stateMoney = 'MANAGER'::statemoneyEnum ,statemoneydelivering='PAYED'::StateMoneyDeliveringEnum, statePackage = p_state_pack WHERE id=p_id;
  	RETURN 1;
  ELSEIF  p_state_pack='RETURN' AND (t_state_pack= 'STORED'::StatePackageEnum OR t_state_pack= 'RETURNING'::StatePackageEnum) then
  	UPDATE PACKAGES SET  statePackage = p_state_pack WHERE id= p_id;
  	RETURN 1;
  END IF;
  
  IF p_state_pack='DONE' AND (t_state_pack= 'RETURN'::StatePackageEnum OR t_state_pack= 'PAYED'::StatePackageEnum) then
  	UPDATE PACKAGES SET  statePackage = p_state_pack WHERE id= p_id;
    RETURN 1;
  END IF;
END IF;
RETURN 0;
end;
$$ 