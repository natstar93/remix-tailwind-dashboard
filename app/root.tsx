import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  redirect,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';

import stylesheet from '~/tailwind.css?url';
import PatientRecordsContext, {
  PatientRecord,
} from '~/contexts/PatientRecordsContext';
import { PATIENTS_ENDPOINT } from '~/constants';
import Header from './components/header';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const searchTerm = formData.get('patientSearch') || '';

  if (searchTerm.toString().length > 1) {
    return redirect(`/patients?q=${searchTerm}`);
  }

  return redirect(`/patients`);
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  const res = await fetch(
    `${PATIENTS_ENDPOINT}${query ? `?lastName=${query}` : ''}`
  );
  const response: PatientRecord[] | string = await res.json();

  return typeof response === 'string' ? json([]) : json(response);
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <p>
        {error.statusText}
      </p>
    );
  }
  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }
  return <p>Unknown Error</p>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const patientRecords = useLoaderData<typeof loader>();

  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' type='image/svg+xml' href='/accu-logo.svg' />
        <Meta />
        <Links />
      </head>
      <body>
        <PatientRecordsContext.Provider value={patientRecords}>
          <Header />
          <main>
            {children}
          </main>
        </PatientRecordsContext.Provider>
        <footer>© Some Candidate</footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
