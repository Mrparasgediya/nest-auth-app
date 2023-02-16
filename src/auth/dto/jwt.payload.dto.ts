import { Expose } from 'class-transformer';

export default class JwtPayload {
  @Expose()
  id: string;
  @Expose()
  email: string;
}
