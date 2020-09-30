import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import validator from 'validator';

@Injectable()
export class IntegerPipe implements PipeTransform {
  constructor(private min?: number, private max?: number) {
    this.min = min;
    this.max = max;
  }

  transform(value: any, { data, metatype }: ArgumentMetadata): number {
    if (value === undefined)
      throw new BadRequestException(`${data} is required.`);

    if (metatype != Number)
      throw new BadRequestException(
        `${data} has wrong type. Expected ${String} but got ${metatype}.`,
      );

    if (!validator.isInt(value))
      throw new BadRequestException(`${data} has to be an integer`);

    if (this.min && value < this.min)
      throw new BadRequestException(
        `${data} has to be greater than equal to ${this.min}`,
      );

    if (this.max && value > this.max)
      throw new BadRequestException(
        `${data} has to be less than or equal to ${this.max}`,
      );

    return value;
  }
}
