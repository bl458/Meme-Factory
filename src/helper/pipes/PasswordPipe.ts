import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { isString } from 'util';

export class PasswordPipe implements PipeTransform {
  transform(value: any, { data, metatype }: ArgumentMetadata) {
    if (value === undefined)
      throw new BadRequestException(`${data} is required.`);

    if (metatype !== String)
      throw new Error(
        `${data} has wrong type. Expected ${String} but got ${metatype}.`,
      );

    if (!isString(data))
      throw new BadRequestException(`${data} must be a string.`);

    if (data.length < 8)
      throw new BadRequestException(`${data} must be a valid password.`);

    return value;
  }
}
