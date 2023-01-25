// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// module.exports = {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: true,
//         },
//       }),
//     },
//     //added this
//     resolver: {
//       sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
//     },
//   };

  module.exports = (async () => {
    const {
      resolver: { sourceExts, assetExts },
    } = await getDefaultConfig(__dirname);
    return {
      transformer: {
        // babelTransformerPath: require.resolve('react-native-svg-transformer'),
        assetPlugins: ['expo-asset/tools/hashAssetFiles'],
        getTransformOptions: async () => ({
            transform: {
              experimentalImportSupport: false,
              inlineRequires: true,
            },
          }),
      },
      resolver: {
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg', 'jsx', 'js', 'ts', 'tsx', 'cjs'],
      },
    };
  })();