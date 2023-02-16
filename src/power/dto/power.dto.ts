import { IsNotEmpty } from 'class-validator';

export default class PowerDTO {
  @IsNotEmpty()
  name: string;
}
