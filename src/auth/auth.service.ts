import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { IAuthInputDTO } from './dto/auth.input';
import { IAuthTypeDTO } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: IAuthInputDTO): Promise<IAuthTypeDTO> {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password.');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      username: user.name,
      sub: user.id,
    };

    return this.jwtService.signAsync(payload);
  }
}
