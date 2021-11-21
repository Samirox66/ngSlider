const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './index.ts',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    plugins: [
        new HtmlWebpackPlugin({
            'filename': 'index.html',
            'template': './index.pug'
        }),
        new CleanWebpackPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.pug$/,
                    use: 'pug-loader?pretty=true'
                },
                {
                    test: /\.css$/,
                    use:  [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: { publicPath: '' }
                        },
                    'css-loader']
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader']
                }
            ]
    },
    devServer: {
        port: 4200
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};