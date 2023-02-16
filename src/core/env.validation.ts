import { ValidationError } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;
}

export const validate = (config: Record<string, string>) => {
  const envVariables: EnvironmentVariables = plainToInstance(
    EnvironmentVariables,
    config,
    {
      enableImplicitConversion: true,
    },
  );
  const errors: ValidationError[] = validateSync(envVariables, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return envVariables;
};
