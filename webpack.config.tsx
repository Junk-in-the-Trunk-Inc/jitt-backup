import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import webpackNodeExternals from 'webpack-node-externals';
import NodePolyfillWebpackPlugin from 'node-polyfill-webpack-plugin';
module.exports = {
    entry: './src/index.tsx',
    target: 'web',
    mode: 'development',
    output: {
        path: [__dirname, 'public'].join('/'),
        filename: 'bundle.js',
        assetModuleFilename: '[path][name].[ext]'
    },
    plugins: [
        new NodePolyfillWebpackPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Realm: 'realm-web'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Junk in the Trunk Inc - JITT'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.json', '.css', '.jpg', '.svg', '.png', '.woff', '.webp', '.ttf', '.otf']
    },
    devtool: 'inline-source-map',
    // externals: [
    //     webpackNodeExternals({
    //         allowlist: [/webpack(\/.*)?/, 'electron-devtools-installer', 'chalk']
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-import', 'tailwindcss', 'postcss-nesting', 'postcss-custom-properties', 'autoprefixer', 'postcss-preset-env']
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg|woff2?|otf|ttf)$/,
                type: 'asset/resource'
            },
            { test: /\.tsx?$/, use: 'ts-loader' }
        ]
    }
};
