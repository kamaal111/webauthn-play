import ServerClient from '@/network/serverClient';
import { Result, User as IUser } from '@/types';

class User implements IUser {
  email: string;
  name: string;

  constructor({ email, name }: { email: string; name: string }) {
    this.email = email;
    this.name = name;
  }

  public static async register({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<Result<User>> {
    const client = new ServerClient();
    const response = await client.user.create({ email, displayName: name });
    if (!response.ok) {
      return response;
    }

    const user = new User({
      email: response.value.email,
      name: response.value.display_name,
    });
    return { ok: true, value: user };
  }
}

export default User;
