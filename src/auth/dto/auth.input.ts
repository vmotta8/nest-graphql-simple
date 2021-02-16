import { InputType } from '@nestjs/graphql';

@InputType()
export class IAuthInputDTO {
  email: string;
  password: string;
}
