import { takeEvery, all, put } from 'redux-saga/effects';
import { getDashboardData } from '../../scripts/api';

export const moduleName = 'dashboard';
const prefix = `${moduleName}`;

/**
 * Constants
 * */
export const METRICS_AVERAGE = 0.11;
export const FETCH_DASHBOARD = `${prefix}/FETCH_DASHBOARD`;
export const DASHBOARD_LOADED = `${prefix}/DASHBOARD_LOADED`;
export const DASHBOARD_LOADING = `${prefix}/DASHBOARD_LOADING`;
const initialState = {
  loading: false,
  metrics: {},
  charts: {},
};
/**
 * Reducer
 * */
export function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_LOADING:
      return { ...state, loading: true };
    case DASHBOARD_LOADED:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const isLoadingDashboard = state => state[moduleName].loading;
export const getMetricsDashboard = state => state[moduleName].metrics;
export const getChartInfoDashboard = state => state[moduleName].charts;

/**
 * Action Creators
 * */
export function fetchDashboardData() {
  return {
    type: FETCH_DASHBOARD,
  };
}

/**
 * Sagas
 */
export function* fetchDashboardSaga() {
  yield put({
    type: DASHBOARD_LOADING,
  });
  const data = yield getDashboardData();

  yield put({
    type: DASHBOARD_LOADED,
    payload: data,
  });
}

export function* saga() {
  yield all([takeEvery(FETCH_DASHBOARD, fetchDashboardSaga)]);
}
