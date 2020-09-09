import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { isString } from 'util';

import validator from 'validator';

export class EmailPipe implements PipeTransform {
  transform(value: any, { data, metatype }: ArgumentMetadata): any {
    if (value === undefined)
      throw new BadRequestException(`${data} is required.`);

    if (metatype !== String)
      throw new Error(
        `${data} has wrong type. Expected ${String} but got ${metatype}.`,
      );

    if (!isString(value))
      throw new BadRequestException(`${data} must be a string.`);

    if (!validator.isEmail(value))
      throw new BadRequestException(`${data} must be an email.`);

    return value;
  }
}
