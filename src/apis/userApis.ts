import baseApi from '@/apis/baseApi';
import {
  IApiResponseWrapper,
  IUserDataType,
  IUserWithAccessTokenType,
} from '@/lib/types/interfaces';
import { LoginValues, RegisterValues } from '@/lib/validations';

export const loginAPI = async (credentials: LoginValues) => {
  try {
    const { data } = await baseApi.post<
      IApiResponseWrapper<IUserWithAccessTokenType>
    >('/Users/signin', credentials);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const registerAPI = async (credentials: RegisterValues) => {
  try {
    const { data } = await baseApi.post<
      IApiResponseWrapper<IUserWithAccessTokenType>
    >('/Users/signup', credentials);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

interface GetUsersParams {
  projectId?: number;
  page?: number;
  limit?: number;
}

export const getUsersAPI = async ({ projectId }: GetUsersParams) => {
  try {
    const endpoint = projectId
      ? `/Users/getUserByProjectId?idProject=${projectId}`
      : '/Users/getUser';

    const { data } = await baseApi.get<IApiResponseWrapper<IUserDataType[]>>(
      endpoint
    );

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};
