import { Response } from "@/lib/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Movie, MovieDetail, Videos } from "./index";

export const getNowPlaying = async () => {
  try {
    const response = await axiosWithConfig.get(`movie/now_playing`);
    return response.data as Response<Movie[]>;
  } catch (error: any) {
    throw Error("failed to get NowPlaying movies");
  }
};

export const getPopular = async (page: number) => {
  try {
    const response = await axiosWithConfig.get(`movie/popular?page=${page}`);
    return response.data as Response<Movie[]>;
  } catch (error: any) {
    throw Error("failed to get Popular movies");
  }
};

export const getData = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/movie/${id}`);

    return response.data as MovieDetail;
  } catch (error: any) {
    throw Error("failed to get Detail movies");
  }
};

export const getVideo = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/movie/${id}/videos`);

    return response.data as Videos;
  } catch (error: any) {
    throw Error("failed to get Video movies");
  }
};

export const getSearch = async (q: string) => {
  const response = await axiosWithConfig.get(`search/movie?query=${q}&page=1`);
  return response.data;
};
