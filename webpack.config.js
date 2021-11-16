const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './index.ts',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    plugins: [
        new HtmlWebpackPlugin({
            'filename': 'index.html',
            'template': './index.pug'
        }),
        new CleanWebpackPlugin
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
                    use:  [{
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '' }
                    },
                    'css-loader']
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: { publicPath: '' }
                        },
                        'css-loader',
                        'sass-loader']
                },
            ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

};