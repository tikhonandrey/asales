import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import lazyFeatureLoad from '../scripts/featureLazyLoad';

const reducersFromFeaturesFolder = {};
lazyFeatureLoad((module, path) => {
  if (!module.moduleName) {
    throw new Error(`Cant find "moduleName" in ${path}`);
  }
  if (!module.reducer) {
    throw new Error(`Cant find function "reducer" in ${path}`);
  }
  reducersFromFeaturesFolder[module.moduleName] = module.reducer;
});

export default history => {
  return combineReducers({
    router: connectRouter(history),
    ...reducersFromFeaturesFolder,
  });
};
