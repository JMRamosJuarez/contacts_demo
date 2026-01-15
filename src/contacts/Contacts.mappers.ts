import { eDepartment, tContact } from '@contacts/Contacts.types';
import { tContactDbModel } from '@database/models/Contacts.model';

export const departmentMapper: { readonly [key: string]: eDepartment } = {
  sales: eDepartment.SALES,
  development: eDepartment.DEVELOPMENT,
  marketing: eDepartment.MARKETING,
  support: eDepartment.SUPPORT,
  unknown: eDepartment.UNKNOWN,
};

export const departmentSeedMapper: { readonly [key: string]: eDepartment } = {
  Ventas: eDepartment.SALES,
  Desarrollo: eDepartment.DEVELOPMENT,
  Marketing: eDepartment.MARKETING,
  Soporte: eDepartment.SUPPORT,
  unknown: eDepartment.UNKNOWN,
};

export const mapContactDbModel = (model: tContactDbModel): tContact => {
  return {
    id: model.id,
    name: model.name,
    phone: model.phone,
    email: model.email,
    department: departmentMapper[model.department] || eDepartment.UNKNOWN,
  };
};
