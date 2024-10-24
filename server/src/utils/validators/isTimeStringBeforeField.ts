import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DateTime } from 'luxon';

export function isTimeStringBeforeField(
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTimeStringBeforeField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, arg: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          const prorperty = arg.object[field];

          if (!prorperty) {
            return false;
          }
          const prorpertyDate = DateTime.fromISO(prorperty);

          const valueDate = DateTime.fromISO(value);
          return (
            valueDate.isValid &&
            prorpertyDate.isValid &&
            valueDate < prorpertyDate
          );
        },

        defaultMessage(args: ValidationArguments) {
          return `"${args.property}" should be valid and should be before "${field}"!`;
        },
      },
    });
  };
}
