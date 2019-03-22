import { takeEvery, all, put } from 'redux-saga/effects';
import { getDashboardData } from '../../scripts/api';

export const moduleName = 'dashboard';
const prefix = `${moduleName}`;

/**
 * Constants
 * */
export const METRICS_AVERAGE = 0.11;

export const FETCH = `${prefix}/FETCH`;
export const ERROR_LOAD = `${prefix}/ERROR_LOAD`;
export const LOADED = `${prefix}/LOADED`;
export const LOADING = `${prefix}/LOADING`;

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
    case LOADING:
      return { ...state, loading: true };
    case ERROR_LOAD:
      return { ...state, loading: false, error: payload };
    case LOADED:
      return { ...state, ...payload, loading: false, error: null };
    default:
      return state;
  }
}

/**
 * Selectors
 * */
export const isLoadingDashboard = state => state[moduleName].loading;
export const errorDashboard = state => state[moduleName].error;
export const getMetricsDashboard = state => state[moduleName].metrics;
export const getChartInfoDashboard = state => state[moduleName].charts;

/**
 * Action Creators
 * */
export function fetchDashboardData() {
  return {
    type: FETCH,
  };
}

/**
 * Sagas
 */
export function* fetchDashboardSaga() {
  yield put({
    type: LOADING,
  });
  try {
    const data = yield getDashboardData();
    yield put({
      type: LOADED,
      payload: data,
    });
  } catch (err) {
    yield put({
      type: ERROR_LOAD,
      error: true,
      payload: err.message,
    });
  }
}

export function* saga() {
  yield all([takeEvery(FETCH, fetchDashboardSaga)]);
}
