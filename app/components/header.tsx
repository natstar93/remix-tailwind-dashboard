import { Form, useSubmit } from '@remix-run/react';

const Header = () => {
  const submit = useSubmit();

  return (
    <header>
      <span className='text-4xl font-bold text-white'>accuBook Dashboard</span>
      <Form
        method='post'
        onChange={(event) => {
          submit(event.currentTarget, { replace: true });
        }}
        aria-label='patient search form'
        autoComplete='off'
      >
        <label className='text-white p-2' htmlFor='searchTerm'>
          Search by last name:
        </label>
        <input id='searchTerm' autoComplete='off' name='searchTerm' />
      </Form>
    </header>
  );
};

export default Header;
