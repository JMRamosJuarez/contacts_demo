import * as Yup from 'yup';

import { eDepartment } from '@contacts/Contacts.types';
import { AppErrorType } from '@core/App.error';

export const CreateContactFormSchema = Yup.object({
  name: Yup.string().required(AppErrorType.NAME_IS_REQUIRED),
  email: Yup.string()
    .email(AppErrorType.INVALID_EMAIL)
    .required(AppErrorType.EMAIL_IS_REQUIRED),
  phone: Yup.string().optional().min(10, AppErrorType.INVALID_PHONE),
  department: Yup.string()
    .required(AppErrorType.DEPARTMENT_IS_REQUIRED)
    .oneOf(Object.values(eDepartment), AppErrorType.INVALID_DEPARTMENT),
});

export type tContactFormInput = Yup.InferType<typeof CreateContactFormSchema>;
