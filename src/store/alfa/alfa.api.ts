import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'localhost:8000/' }),
  endpoints: (build) => ({
    getDealers: build.query<unknown, unknown>({
      query: () => 'some/',
    }),
  }),
});
