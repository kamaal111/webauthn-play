import React from 'react';

import User from '@/models/user';

type Form = {
  email: string;
  name: string;
};

type Props = {
  setUser: (user: User) => void;
};

const inputs: {
  id: string;
  type: React.HTMLInputTypeAttribute;
  name: keyof Form;
  label: string;
}[] = [
  {
    id: '51aa4af6-ce32-4ba1-a509-0cfbeb06939c',
    type: 'email',
    name: 'email',
    label: 'Email',
  },
  {
    id: 'd5ad6016-4bfc-4512-8e1a-953e8188885b',
    type: 'text',
    name: 'name',
    label: 'Name',
  },
];

function SignUpForm({ setUser }: Props) {
  const [form, setForm] = React.useState<Form>({ email: '', name: '' });

  const disableSubmit = form.email.length < 1 || form.name.length < 1;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await User.register({ email: form.email, name: form.name });
    if (!result.ok) {
      console.error(result.error);
      return;
    }

    setUser(result.value);
  }

  function handleFormChange(
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Form,
  ) {
    setForm({ ...form, [key]: event.target.value });
  }

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      {inputs.map(({ id, label, type, name }) => {
        return (
          <label key={id}>
            <span>{label}</span>
            <input
              type={type}
              value={form[name]}
              onChange={(event) => handleFormChange(event, name)}
            />
          </label>
        );
      })}
      <input disabled={disableSubmit} type="submit" value="submit" />
    </form>
  );
}

export default SignUpForm;
