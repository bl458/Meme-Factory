import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import validator from 'validator';

@Injectable()
export class TokenPipe implements PipeTransform {
  transform(value: any, { data, metatype }: ArgumentMetadata): string {
    if (value === undefined)
      throw new BadRequestException(`${data} is required.`);

    if (metatype !== String)
      throw Error(
        `${data} has wrong type; ${String} expected, got ${metatype}`,
      );

    if (typeof value !== 'string')
      throw new BadRequestException(`${data} must be a string.`);

    if (!validator.isAlphanumeric(value))
      throw new BadRequestException(`${data} must be alphanumeric.`);

    if (value.length !== 256)
      throw new BadRequestException(`${data} must be a valid token.`);

    return value;
  }
}
