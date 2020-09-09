import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isString } from 'util';
import validator from 'validator';

@Injectable()
export class TokenPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (value === undefined)
      throw new BadRequestException(`${metadata.data} is required.`);

    if (!isString(value))
      throw new BadRequestException(`${metadata.data} must be a string.`);

    if (!validator.isAlphanumeric(value))
      throw new BadRequestException(`${metadata.data} must be alphanumeric.`);

    if (value.length !== 256)
      throw new BadRequestException(`${metadata.data} must be a valid token.`);

    return value;
  }
}
