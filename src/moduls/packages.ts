import { CityEnum, WilayaEnum } from './shared';

export class ErrorPackage extends Error {}

export enum StatePackageEnum {
  RECEIVING = 'RECEIVING',
  RECEIVED = 'RECEIVED',
  DELIVERING = 'DELIVERING',
  DELEVERED = 'DELEVERED',
  RETURN = 'RETURN'
}
export enum StatsMoneyEnum {
  MANAGER = 'MANAGER',
  DELIVER = 'DELIVER',
  RECIVER = 'RECIVER',
  CLIENT = 'CLIENT',
  PAYED = 'PAYED'
}
export enum StatsMoneyDeliveringEnum {
  CLIENT = 'CLIENT',
  RECIVER = 'RECIVER',
  PAYED = 'PAYED'
}

export interface ReqCreatePackagesArg {
  id?: number;

  idCreater?: number;
  idClient?: number;
  idDelivey?: number;

  fullName?: string;
  phoneNumber?: string;

  moneyPackage?: number;
  moneyDelivring?: number;

  statePackage: StatePackageEnum;
  stateMoney: StatsMoneyEnum;
  stateMoneyDelivring: StatsMoneyDeliveringEnum;

  wilaya?: WilayaEnum;
  city?: CityEnum;
  address?: string;
}
export interface ReqUpdatePackageArg {
  updateMoney?: number;

  updateStatePackage?: StatePackageEnum;
  updateStateMoney?: StatsMoneyEnum;
  updateStateMoneyDelivring?: StatsMoneyDeliveringEnum;

  updateCity?: CityEnum;
  updateAddress?: string;
}
export class Packages {
  id: number;

  idCreater: number;
  idClient: number;
  idDelivey: number;

  fullName?: string;
  phoneNumber: string;

  moneyPackage: number;
  moneyDelivring: number;

  statePackage: StatePackageEnum;
  stateMoney: StatsMoneyEnum;
  stateMoneyDelivring: StatsMoneyDeliveringEnum;

  wilaya?: WilayaEnum;
  city?: CityEnum;
  address?: string;

  constructor(reqPackage: ReqCreatePackagesArg) {
    Object.assign(this, reqPackage);
    this.idClient = this.idClient || null;
    this.idDelivey = this.idDelivey || null;
    this.fullName = this.fullName || null;

    this.wilaya = this.wilaya || WilayaEnum.BISKRA;
    this.city = this.city || CityEnum.BISKRA;
  }

  static valid_create_package_argiments(reqPackage: ReqCreatePackagesArg) {
    if (!reqPackage.phoneNumber) throw new ErrorPackage('phoneNumber argument is missing');

    if (!(reqPackage.moneyDelivring > 0)) throw new ErrorPackage('moneyDelivring argument is missing');

    if (!reqPackage.city) throw new ErrorPackage('city argument is missing');
    if (!reqPackage.address) reqPackage.address = '';

    if (!(reqPackage.statePackage in StatePackageEnum))
      throw new ErrorPackage('statePackage argument is mast be one of ' + StatePackageEnum);

    if (!(reqPackage.stateMoney in StatsMoneyEnum))
      throw new ErrorPackage('stateMoney argument is mast be one of ' + StatsMoneyEnum);

    if (reqPackage.stateMoney === StatsMoneyEnum.RECIVER)
      if (!(reqPackage.moneyPackage > 0)) throw new ErrorPackage('stateMoney masy be RECIVER or moneyPackage>0');

    if (!(reqPackage.stateMoneyDelivring in StatsMoneyDeliveringEnum))
      throw new ErrorPackage('stateMoneyDelivring argument is mast be one of ' + StatsMoneyDeliveringEnum);

    return true;
  }
  valid_update_package_argiments(reqPackage: ReqCreatePackagesArg) {
    if (!reqPackage.id) throw new ErrorPackage('id argument is missing');
  }
  toArray() {
    const list = [];
    list.push(this.idCreater);
    list.push(this.idClient);
    list.push(this.idDelivey);
    list.push(this.moneyPackage);
    list.push(this.moneyDelivring);
    list.push(this.statePackage);
    list.push(this.stateMoney);
    list.push(this.stateMoneyDelivring);
    list.push(this.phoneNumber);
    list.push(this.fullName);
    list.push(this.wilaya);
    list.push(this.city);
    list.push(this.address);
    return list;
  }
}
