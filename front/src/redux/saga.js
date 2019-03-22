import { all } from 'redux-saga/effects';
import lazyFeatureLoad from '../scripts/featureLazyLoad';

const sagasFromFeaturesFolder = [];
lazyFeatureLoad((module, path) => {
  if (!module.saga) {
    throw new Error(`Cant find "saga" in ${path}`);
  }
  sagasFromFeaturesFolder.push(module.saga());
});

export default function*() {
  yield all(sagasFromFeaturesFolder);
}
