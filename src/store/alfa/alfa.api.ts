import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Goals,
  CurrentUser,
  IndividualPlanWorker,
  TaskData,
  UserTask,
  WorkersList,
  Comment,
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
  tagTypes: ['Comments', 'Goals'],
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
      providesTags: ['Goals'],
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
      invalidatesTags: ['Goals'],
    }),

    // Комментарии
    getComments: build.query<Comment[], unknown>({
      query: ({ task_id }: { task_id: string }) => ({
        url: `tasks/${task_id}/comments`,
      }),
      providesTags: ['Comments'],
    }),
    postComment: build.mutation<
      unknown,
      {
        task_id: string;
        data: {
          user_id: string;
          text: string;
          created_at: string;
          updated_at: string;
        };
      }
    >({
      query: ({ task_id, data }) => ({
        url: `tasks/${task_id}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
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
