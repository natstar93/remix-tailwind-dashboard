import { Form, useSubmit } from '@remix-run/react';

const Header = ({ error }: { error: string | null }) => {
  const submit = useSubmit();

  return (
    <header>
      <h1>accuBook Dashboard</h1>
      {error && <span role='alert'>${error}</span>}
      <Form
        method='post'
        onChange={(event) => {
          submit(event.currentTarget, { replace: true });
        }}
        aria-label="patient search form"
      >
        <label className='text-white p-2' htmlFor='patientSearch'>
          Search by last name:
        </label>
        <input id='patientSearch' autoComplete='off' name='patientSearch' />
      </Form>
    </header>
  );
};

export default Header;
