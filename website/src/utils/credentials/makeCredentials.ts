import config from '@/config';

import { type SignUpPreCheckResponse } from 'shared-validator/src/users';
import { type z } from 'zod';

async function makeCredentials({
  signUpToken,
  email,
  name,
}: {
  signUpToken: z.infer<typeof SignUpPreCheckResponse>;
  email: string;
  name: string;
}): Promise<string | null> {
  let credential: Awaited<PublicKeyCredential | null>;
  try {
    credential = (await navigator.credentials.create({
      publicKey: {
        challenge: Uint8Array.from(Buffer.from(signUpToken.token, 'hex')),
        rp: {
          name: config.APP_NAME,
        },
        user: {
          id: Uint8Array.from(signUpToken.credential_id, c => c.charCodeAt(0)),
          name: email,
          displayName: name,
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'cross-platform',
        },
        timeout: 60000,
        attestation: 'direct',
      },
    })) as PublicKeyCredential | null;
  } catch (error) {
    return null;
  }

  if (credential == null) return null;

  const utf8Decoder = new TextDecoder('utf-8');
  const decodedClientDataJSON = utf8Decoder.decode(
    credential.response.clientDataJSON
  );
  return decodedClientDataJSON;
}

export default makeCredentials;
