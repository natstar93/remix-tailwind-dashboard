import { render, screen } from '@testing-library/react';
import { useSubmit } from '@remix-run/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import Header from '../header';

jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  useSubmit: jest.fn(),
}));

describe('Header', () => {
  let submitMock: jest.Mock;

  beforeEach(() => {
    submitMock = jest.fn();
    (useSubmit as jest.Mock).mockReturnValue(submitMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    const router = createMemoryRouter([{ path: '/', element: ui }]);
    return render(<RouterProvider router={router} />);
  };

  it('renders header text', () => {
    renderWithRouter(<Header error={null} />);

    expect(screen.getByRole('heading')).toHaveTextContent('accuBook Dashboard');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders error message', () => {
    renderWithRouter(<Header error='my error' />);

    expect(screen.getByRole('alert')).toHaveTextContent('my error');
  });

  it('calls submit on input change', async () => {
    const user = userEvent.setup();

    renderWithRouter(<Header error={null} />);
    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    await user.type(input, 'test');

    expect(submitMock).toHaveBeenCalledWith(form, { replace: true });
  });
});
