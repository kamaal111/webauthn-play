import React from 'react';

import Page from '@/components/Layout/Page';
import SignUpForm from '@/components/SignUpForm';

type User = {
  name: string;
};

export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <Page title={user ? `Welcome ${user.name}` : 'Sign Up'}>
      <SignUpForm />
    </Page>
  );
}
