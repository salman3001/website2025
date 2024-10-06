import { ValidationOptions, ValidateIf } from 'class-validator';

export function IsOptionalEmpty(validationOptions?: ValidationOptions) {
  return ValidateIf((obj, value) => {
    return value !== null && value !== undefined && value !== '';
  }, validationOptions);
}
