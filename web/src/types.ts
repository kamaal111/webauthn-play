export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export type User = {
  email: string;
  name: string;
};
