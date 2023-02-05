import type { Result } from '@/types';
import makeRequest from '@/utils/request';

const BASE_URL = 'http://127.0.0.1:8080';

class ServerClient {
  user: ServerUserClient;

  constructor() {
    this.user = new ServerUserClient();
  }
}

type CreateUserResponse = {
  email: string;
  display_name: string;
  id: number;
};

class ServerUserClient {
  private url = `${BASE_URL}/v1/user`;

  async create({
    email,
    displayName,
  }: {
    email: string;
    displayName: string;
  }): Promise<Result<CreateUserResponse, ServerClientError>> {
    const response = await makeRequest<CreateUserResponse>({
      url: this.url,
      payload: { email, display_name: displayName },
      method: 'POST',
    });
    if (!response.ok) {
      return {
        ok: false,
        error: new ServerClientError(response.error.response.details),
      };
    }

    return { ok: true, value: response.value! };
  }
}

export class ServerClientError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ServerClientError';
  }
}

export default ServerClient;
