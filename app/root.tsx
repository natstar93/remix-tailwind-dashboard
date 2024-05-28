import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  redirect,
  useLoaderData,
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

  try {
    const res = await fetch(
      `${PATIENTS_ENDPOINT}${query ? `?lastName=${query}` : ''}`
    );
    const patientRecords: PatientRecord[] | string = await res.json();

    if (typeof patientRecords === 'string') {
      throw new Error(patientRecords);
    }

    return json({ patientRecords, err: null });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return json({ patientRecords: [] as PatientRecord[], err: err.message });
      // TODO: Better error display messages
    }

    return json({
      patientRecords: [] as PatientRecord[],
      err: 'unknown error',
    });
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { patientRecords, err } = useLoaderData<typeof loader>();

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
          <Header error={err} />
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
