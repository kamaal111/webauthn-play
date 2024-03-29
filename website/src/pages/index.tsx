import Head from 'next/head';
import * as React from 'react';

import SignUpForm from '@/components/sign-up-form';

function Home() {
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
        <SignUpForm />
      </main>
    </>
  );
}

export default Home;
