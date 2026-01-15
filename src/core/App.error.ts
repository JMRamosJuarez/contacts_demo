export enum AppErrorType {
  UNKNOWN_ERROR = 'unknown_error',
  CONTACT_NOT_FOUND = 'contact_not_found',
  NAME_IS_REQUIRED = 'name_is_required',
  INVALID_EMAIL = 'invalid_email',
  EMAIL_IS_REQUIRED = 'email_is_required',
  EMAIL_MUST_BE_UNIQUE = 'email_must_be_unique',
  INVALID_PHONE = 'invalid_phone',
  DEPARTMENT_IS_REQUIRED = 'deparment_is_required',
  INVALID_DEPARTMENT = 'invalid_department',
}

export type tAppError = {
  readonly type: AppErrorType;
  readonly message: string;
};

export class AppError extends Error {
  /**
   * The "message" is only for debugging and you can put any string, we use the AppErrorType value to localize the error.
   */
  constructor(
    readonly type: AppErrorType,
    message: string,
  ) {
    super(message); // Call the constructor of the base class `Error`
    this.name = 'AppError'; // Set the error name to your custom error class name
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, AppError.prototype);
  }

  get value(): tAppError {
    return { type: this.type, message: this.message };
  }
}
