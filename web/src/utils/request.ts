import type { Result } from '@/types';

async function makeRequest<T>({
  url,
  payload,
  method = 'GET',
}: {
  url: string;
  payload?: any;
  method?: 'GET' | 'POST';
}): Promise<Result<T | undefined, RequestError>> {
  const request = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (request.status === 204) {
    return { ok: true, value: undefined };
  }

  const response = await request.json();
  if (!request.ok) {
    return {
      ok: false,
      error: new RequestError(
        JSON.stringify(response),
        request.status,
        response,
      ),
    };
  }

  return { ok: true, value: response };
}

export class RequestError extends Error {
  status: number;
  response: Record<string, any>;

  constructor(message: string, status: number, response: Record<string, any>) {
    super(message);

    this.name = 'RequestError';
    this.status = status;
    this.response = response;
  }
}

export default makeRequest;
