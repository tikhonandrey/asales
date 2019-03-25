import { takeEvery, all, call, put } from 'redux-saga/effects';
import { getDashboardData } from '../../scripts/api';
import { createSelector } from 'reselect';

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
export const stateSelector = state => state[moduleName];
export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const errorSelector = createSelector(
  stateSelector,
  state => state.error
);
export const getMetricsSelector = createSelector(
  stateSelector,
  state => state.metrics
);
export const getChartInfoSelector = createSelector(
  stateSelector,
  state => state.charts
);

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
    const data = yield call(getDashboardData);
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
