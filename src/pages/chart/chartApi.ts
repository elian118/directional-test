import axiosInstance from '../../common/consts.ts';
import type {
  TopCoffeeBrandItem,
  PopularSnackBrandItem,
  WeeklyMoodItem,
  WeeklyWorkoutItem,
} from './interfaces/chartTypes.ts';
import type { CoffeeTeam } from './interfaces/teamTypes.ts';
import type { SnackImpactResponse } from './interfaces/departmentTypes.ts';

// 바/도넛 차트용 인기 커피 브랜드 분포 조회 목업
export const getTopCoffeeBrands = async (): Promise<TopCoffeeBrandItem[]> => {
  const response = await axiosInstance.get(`/mock/top-coffee-brands`);
  return response.data;
};

// 바/도넛 차트용 인기 간식 브랜드 분포 조회 목업
export const getPopSnackBrands = async (): Promise<PopularSnackBrandItem[]> => {
  const response = await axiosInstance.get(`/mock/popular-snack-brands`);
  return response.data;
};

// 스택형 바/면적 차트용 주간 무드 트렌드 조회 목업
export const getWeeklyMoodTrend = async (): Promise<WeeklyMoodItem[]> => {
  const response = await axiosInstance.get(`/mock/weekly-mood-trend`);
  return response.data;
};

// 스택형 바/면적 차트용 주간 운동 트렌드 조회 목업
export const getWeeklyWorkoutTrend = async (): Promise<WeeklyWorkoutItem[]> => {
  const response = await axiosInstance.get(`/mock/weekly-workout-trend`);
  return response.data;
};

// 멀티라인 차트용 팀별 커피 소비/버그/생산성 조회 목업
export const getCoffeeConsumptionByTeam = async (): Promise<CoffeeTeam[]> => {
  const response = await axiosInstance.get(`/mock/coffee-consumption`);
  return response.data;
};

// 멀티라인 차트용 부서별 간식 영향 목업
export const getSnackImpactByDepartment = async (): Promise<SnackImpactResponse[]> => {
  const response = await axiosInstance.get(`/mock/snack-impact`);
  return response.data;
};
