import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'localhost:8000/' }),
  endpoints: (build) => ({
    // Список сотрудников команды
    getWorkers: build.query<unknown, unknown>({
      query: ({ team_id }: { team_id: number }) => ({
        url: `user`,
        params: {
          team_id,
        },
      }),
    }),

    // Получить план сотрудника
    getIndividualPlan: build.query<unknown, unknown>({
      query: ({ user_id, year }: { user_id: number; year: number }) => ({
        url: `idp`,
        params: {
          user_id,
          year,
        },
      }),
    }),

    // Цели и стороны сотрудника
    getUserGoal: build.query<unknown, unknown>({
      query: ({ user_id }: { user_id: number }) => ({
        url: `goal`,
        params: {
          user_id,
        },
      }),
    }),
    postUserGoal: build.mutation<unknown, unknown>({
      query: (formData) => ({
        url: `goal`,
        method: 'POST',
        body: formData,
      }),
    }),
    putUserGoal: build.mutation<unknown, unknown>({
      query: (formData) => ({
        url: `goal`,
        method: 'PUT',
        body: formData,
      }),
    }),

    // Комментарии
    getComments: build.query<unknown, unknown>({
      query: ({ task_id }: { task_id: number }) => ({
        url: `comment`,
        params: {
          task_id,
        },
      }),
    }),
    postComment: build.mutation<
      unknown,
      { task_id: number; user_id: number; formData: FormData }
    >({
      query: ({ task_id, user_id, formData }) => ({
        url: `comment`,
        method: 'POST',
        body: formData,
        params: {
          task_id,
          user_id,
        },
      }),
    }),

    // Задачи
    getTasks: build.query<unknown, unknown>({
      query: ({ user_id, idp_id }: { user_id: number; idp_id: number }) => ({
        url: `tasks`,
        params: {
          user_id,
          idp_id,
        },
      }),
    }),
  }),
});

export const {
  useGetWorkersQuery,
  useGetIndividualPlanQuery,
  useGetUserGoalQuery,
  usePostUserGoalMutation,
  usePutUserGoalMutation,
  useGetCommentsQuery,
  usePostCommentMutation,
  useGetTasksQuery,
} = api;
