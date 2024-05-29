/**
 * @jest-environment node
 */

import { redirect } from '@remix-run/react';
import { PATIENTS_ENDPOINT } from '~/constants';
import { loader, action } from '~/root';

const unmockedFetch = global.fetch;
const mockedPatientRecord = { id: 'test' };

jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  redirect: jest.fn(),
}));

describe('App loader', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockedPatientRecord]),
      })
    ) as jest.Mock;
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });

  it('returns correct response when no query is used', async () => {
    const response = await loader({
      request: new Request('http://app.com/path'),
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
    const res = await response.json();
    expect(res).toEqual([mockedPatientRecord]);
    expect(global.fetch).toHaveBeenCalledWith(PATIENTS_ENDPOINT);
  });

  it('returns correct response when a query is used', async () => {
    const response = await loader({
      request: new Request('http://app.com/path?q=name'),
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
    const res = await response.json();
    expect(res).toEqual([mockedPatientRecord]);
    expect(global.fetch).toHaveBeenCalledWith(
      `${PATIENTS_ENDPOINT}?lastName=name`
    );
  });

  // TODO:
  // - returns empty array when fetch returns 'no records' string
  // - test error boundary
});

describe('App action', () => {
  const testConditions = [
    { query: 'ab', expectedUrl: '/patients?q=ab' },
    { query: 'a', expectedUrl: '/patients' },
    { query: '', expectedUrl: '/patients' },
    { query: '12', expectedUrl: '/patients?q=12' },
  ];
  testConditions.map(({ query, expectedUrl }) => {
    return it(`url with query ${query} should return a redirect to ${expectedUrl}`, async () => {
      const body = new URLSearchParams({
        q: query,
      });

      const request = new Request('http://app.com/path', {
        method: 'POST',
        body,
      });

      const response = await action({ request, params: {}, context: {} });

      expect(response).toEqual(redirect(expectedUrl));
    });
  });
});
