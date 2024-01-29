import Head from 'next/head';
import * as React from 'react';
import { UserPayload } from 'shared-validator/src/users';

import Input from '@/components/Input';

import styles from '@/styles/Home.module.css';

type FormValues = {
  email: string;
  name: string;
};

function validateEmail(email: FormValues['email']) {
  return UserPayload.shape.email.safeParse(email).success;
}

function Home() {
  const [formValues, setFormValues] = React.useState<FormValues>({
    name: '',
    email: '',
  });

  const emailIsValid = validateEmail(formValues.email);

  const signUpFormSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!emailIsValid) return;

      try {
        const user = UserPayload.parse(formValues);
        console.log('user', user);
      } catch (error) {
        console.log('error', error);
      }
    },
    [formValues, emailIsValid]
  );

  return (
    <>
      <Head>
        <title>WebAuthn play</title>
        <meta
          name="description"
          content="Playing and learning about web authn"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
        </form>
      </main>
    </>
  );
}

export default Home;
