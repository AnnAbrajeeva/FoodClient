import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const typescriptLoaders = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: '/node_modules/',
  };

  const cssLoaders = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  };

  const assetsLoaders = {
    test: /\.(png|svg|jpg)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024,
      },
    },
  };

  return [typescriptLoaders, cssLoaders, assetsLoaders];
}
