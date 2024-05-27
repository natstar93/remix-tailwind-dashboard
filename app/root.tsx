import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import stylesheet from '~/tailwind.css?url';
import PatientRecordsContext from '~/contexts/PatientRecordsContext';
import { PATIENTS_ENDPOINT } from '~/constants';
import Header from './components/header';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const loader = async () => {
  try {
    const res = await fetch(PATIENTS_ENDPOINT);
    const data = await res.json();

    return json(data);
  } catch (err: unknown) {
    console.log('boo');
    // TODO
    return [];
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const patientRecords = useLoaderData<typeof loader>();

  return (
    <html lang='en'>
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
          {children}
        </PatientRecordsContext.Provider>
        <footer>Contact us</footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
