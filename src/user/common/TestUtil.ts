import { User } from '../user.entity';

export default class TestUtil {
  static giveValidUser(): User {
    const user = new User();
    user.name = 'Valid Name';
    user.email = 'validemail@email.com';
    user.id = '1';

    return user;
  }
}
