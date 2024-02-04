import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Goals,
  CurrentUser,
  IndividualPlanWorker,
  TaskData,
  UserTask,
  WorkersList,
} from './types';

import { CURRENT_YEAR } from '../../utils/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://alfa-idp.ddns.net/api/v1/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    // Список сотрудников команды
    getWorkers: build.query<
      WorkersList,
      { team_id: string; sort_by?: string; order?: string; year: number }
    >({
      query: ({ team_id, sort_by, order, year }) => ({
        url: `users`,
        params: {
          team_id,
          sort_by,
          order,
          year,
        },
      }),
    }),

    // Список годов
    getYears: build.query<string[], unknown>({
      query: () => ({
        url: `years`,
      }),
    }),

    // Получить план сотрудника
    getIndividualPlan: build.query<
      IndividualPlanWorker,
      { year?: number; user_id: string }
    >({
      query: ({ year = CURRENT_YEAR, user_id }) => ({
        url: `idp/${user_id}`,
        params: {
          year,
        },
      }),
    }),

    // Цели и стороны сотрудника
    getUserGoal: build.query<Goals, { user_id: string }>({
      query: ({ user_id }) => ({
        url: `users/${user_id}/goals`,
      }),
    }),
    patchUserGoal: build.mutation<
      unknown,
      { dataToSend: { [key: string]: string }; goal_id: string }
    >({
      query: ({ dataToSend, goal_id }) => ({
        url: `goals/${goal_id}`,
        method: 'PATCH',
        body: dataToSend,
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
    getTasks: build.query<UserTask[], string>({
      query: (user_id) => `users/${user_id}/tasks`,
    }),
    postTask: build.mutation<UserTask, TaskData>({
      query: (data) => ({
        url: 'tasks',
        method: 'POST',
        body: data,
      }),
    }),

    // Текущий пользователь
    getCurrentUser: build.query<CurrentUser, void>({
      query: () => `users/me`,
    }),
  }),
});

export const {
  useGetWorkersQuery,
  useLazyGetWorkersQuery,
  useGetIndividualPlanQuery,
  useGetUserGoalQuery,
  usePatchUserGoalMutation,
  useGetCommentsQuery,
  usePostCommentMutation,
  useGetTasksQuery,
  usePostTaskMutation,
  useGetYearsQuery,
  useGetCurrentUserQuery,
} = api;
