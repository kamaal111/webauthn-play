import * as React from 'react';
import { UserPayload } from 'shared-validator/src/users';
import toast, { Toaster } from 'react-hot-toast';
import { type ZodError, type z } from 'zod';
import { TRPCClientError } from '@trpc/client';

import Input from '@/components/Input';

import trpc from '@/utils/trpc';

import styles from '@/styles/components/sign-up-form.module.css';

type FormValues = {
  email: string;
  name: string;
};

function validateEmail(email: FormValues['email']) {
  return UserPayload.shape.email.safeParse(email).success;
}

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

      let user: Awaited<z.infer<typeof UserPayload>>;
      try {
        user = UserPayload.parse(formValues);
      } catch (error) {
        const message = (error as ZodError).issues?.[0]?.message;
        if (!message) {
          toast.error('Oops something went wrong');
          return;
        }
        toast(message);
        return;
      }

      try {
        await trpc.users.signUp.mutate(user);
      } catch (error) {
        if (error instanceof TRPCClientError) {
          toast.error(error.message);
          return;
        }

        toast.error('Failed to create a new user');
        return;
      }

      toast.success('Successfully created user');
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
          value={formValues.name}
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

export default SignUpForm;
