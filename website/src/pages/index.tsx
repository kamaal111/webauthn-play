import Head from 'next/head';
import * as React from 'react';
import { UserPayload } from 'shared-validator/src/users';

import styles from '@/styles/Home.module.css';

export default function Home() {
  const signUpFormSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const payload: Record<string, string> = {};
      for (const target of e.target as unknown as HTMLElement[]) {
        if (target.tagName !== 'INPUT') continue;

        const inputTarget = target as HTMLInputElement;
        payload[inputTarget.name] = inputTarget.value;
      }

      const user = UserPayload.parse(payload);
      console.log('user', user);
    },
    []
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
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
