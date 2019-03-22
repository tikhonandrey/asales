
/** Ленивый резолв модулей для удобного подключения фич
 * например, скопом подключить reducer'ы из папки с фичами
 *
    const reducersFromFeaturesFolder = {};
    lazyFeatureLoad(module => {
      reducersFromFeaturesFolder[module.moduleName] = module.reducer;
    });
 */
//todo несколько разных контекстов
const featuresContext = require.context(
  '../features',
  true,
  /duck\.js$/
);

export default function lazyFeatureLoad(forEachModule) {
  featuresContext.keys().forEach(function(key) {
    forEachModule(featuresContext(key), key);
  });
}
