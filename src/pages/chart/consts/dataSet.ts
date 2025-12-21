import {
  getCoffeeConsumptionByTeam,
  getPopSnackBrands,
  getSnackImpactByDepartment,
  getTopCoffeeBrands,
  getWeeklyMoodTrend,
  getWeeklyWorkoutTrend,
} from '../chartApi.ts';

export const dataSet = [
  {
    title: 'Top Coffee Brand',
    api: getTopCoffeeBrands,
    xKey: 'brand',
    yKey: 'popularity',
    xLabel: '브랜드',
    yLabel: '인기도',
  },
  {
    title: 'Popular Snack Brand',
    api: getPopSnackBrands,
    xKey: 'name',
    yKey: 'share',
    xLabel: '기업',
    yLabel: '점유율',
  },
  { title: 'Weekly Mood', api: getWeeklyMoodTrend, xKey: '', yKey: '', xLabel: '', yLabel: '' },
  { title: 'Weekly Workout Trend', api: getWeeklyWorkoutTrend, xKey: '', yKey: '', xLabel: '', yLabel: '' },
  { title: 'Coffee Team', api: getCoffeeConsumptionByTeam, xKey: '', yKey: '', xLabel: '', yLabel: '' },
  { title: 'Snack Impact Response', api: getSnackImpactByDepartment, xKey: '', yKey: '', xLabel: '', yLabel: '' },
];
