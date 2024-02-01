import * as React from 'react';
import {
  UserPayload,
  SignUpPreCheckResponse,
} from 'shared-validator/src/users';
import toast, { Toaster } from 'react-hot-toast';
import { type z } from 'zod';
import { TRPCClientError } from '@trpc/client';

import Input from '@/components/Input';

import trpc from '@/utils/trpc';

import styles from '@/styles/components/sign-up-form.module.css';

type FormValues = {
  email: string;
  name: string;
};

type SignUpToken = z.infer<typeof SignUpPreCheckResponse>;

function SignUpForm() {
  const [formValues, setFormValues] = React.useState<FormValues>({
    name: '',
    email: '',
  });

  const emailIsValid = validateEmail(formValues.email);

  const signUpFormSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!emailIsValid) return;

      const signUpToken = await getSignUpToken(formValues);
      if (signUpToken == null) return;

      const credential = await makeCredentials(signUpToken, formValues);
      if (credential == null) {
        toast.error('Failed to create a user');
        return;
      }

      const success = await signUp({ formValues, signUpToken, credential });
      if (!success) return;

      setFormValues({ name: '', email: '' });
    },
    [formValues, emailIsValid]
  );

  return (
    <div>
      <h1>Sign Up</h1>
      <form className={styles['sign-up-form']} onSubmit={signUpFormSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formValues.name}
          minLength={UserPayload.shape.name.minLength ?? 0}
          onChange={value => setFormValues({ ...formValues, name: value })}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formValues.email}
          minLength={UserPayload.shape.email.minLength ?? 0}
          isValid={emailIsValid}
          onChange={value => setFormValues({ ...formValues, email: value })}
        />
        <button type="submit" disabled={!emailIsValid}>
          Submit
        </button>
        <Toaster
          toastOptions={{
            error: { style: { backgroundColor: 'red' } },
            success: { style: { backgroundColor: 'green' } },
            style: { backgroundColor: '#EAC674' },
          }}
        />
      </form>
    </div>
  );
}

function validateEmail(email: FormValues['email']) {
  return UserPayload.shape.email.safeParse(email).success;
}

async function getSignUpToken(formValues: FormValues) {
  let response: Awaited<SignUpToken>;
  try {
    response = await trpc.users.signUpPreCheck.mutate(formValues);
  } catch (error) {
    if (error instanceof TRPCClientError) {
      toast.error(error.message);
      return;
    }

    toast.error('Failed to create a new user');
    return;
  }

  return response;
}

async function makeCredentials(
  signUpToken: z.infer<typeof SignUpPreCheckResponse>,
  formValues: FormValues
) {
  return navigator.credentials.create({
    publicKey: {
      challenge: Uint8Array.from(Buffer.from(signUpToken.token, 'hex')),
      rp: {
        name: 'Web Authn Play',
      },
      user: {
        id: Uint8Array.from(signUpToken.credential_id, c => c.charCodeAt(0)),
        name: formValues.email,
        displayName: formValues.name,
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: {
        authenticatorAttachment: 'cross-platform',
      },
      timeout: 60000,
      attestation: 'direct',
    },
  });
}

async function signUp({
  formValues,
  signUpToken,
  credential,
}: {
  formValues: FormValues;
  signUpToken: SignUpToken;
  credential: Credential;
}): Promise<boolean> {
  try {
    await trpc.users.signUp.mutate({ ...formValues, token: signUpToken.token });
  } catch (error) {
    if (error instanceof TRPCClientError) {
      toast.error(error.message);
      return false;
    }

    toast.error('Failed to create a new user');
    return false;
  }

  toast.success('Successfully created user');
  return true;
}

export default SignUpForm;
