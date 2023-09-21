const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src')
const isDevelopment = process.env.SERVE ? 'development' : 'production';

let mode = "development";
let target = 'web';
if (!isDevelopment) {
    mode = 'production',
    target = 'browserslist'
}

const getSettingsForStyles = (withModules = false) => {
	return [MiniCssExtractPlugin.loader,
    	!withModules ? 'css-loader' : {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64]'
                }
            }
        }, 
        {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['autoprefixer']
            }
        }
    }, 'sass-loader']
}

module.exports = {
    mode,
    target,
    entry: path.resolve(srcPath, 'index.tsx'),
    output: {
        path: buildPath,
        filename: 'bundle.js',
    },
    devtool: !isDevelopment ? 'hidden-source-map' : 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({filename: '[name]-[hash].css'}),
        new TsCheckerPlugin()
    ].filter(Boolean),
    module: {
       rules: [
        {
            test: /\.module\.s?css$/,
            use: getSettingsForStyles(true)
        },
        {
            test: /\.s?css$/,
            exclude: /\.module\.s?css$/,
            use: getSettingsForStyles()
        },
        {
            test: /\.(t|j)sx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.(woff|woff2)$/,
            use: {
              loader: 'url-loader',
            },
        },
        {
            test: /\.(png|svg|jpg)$/,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024
                }
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
       ] 
    }, 
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.join(srcPath, 'components'),
            config: path.join(srcPath, 'config'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            models: path.join(srcPath, 'models'),
            store: path.join(srcPath, 'store'),
            assets: path.join(srcPath, 'assets')
        }
    },
    devServer: {
        hot: true,
    }  
}