import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IAuthInputDTO } from './dto/auth.input';
import { IAuthTypeDTO } from './dto/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => IAuthTypeDTO)
  public async login(@Args('data') data: IAuthInputDTO): Promise<IAuthTypeDTO> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token,
    };
  }
}
