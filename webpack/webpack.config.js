const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin  =require('mini-css-extract-plugin')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/bundle.js'
    },
    module:{
        rules:[
            // CREA UN OBJETO PARA CARGAR ARCHIVOS CSS
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            // CREA UN OBJETO PARA LA CARGA DE LAS IMAGENES
            {
                test: /\.(jpg|png|gif|jpg)$/,
                use:[
                    {
                        loader:'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/img/',
                            useRelativePath: true
                        }
                    }
                ]
            },
            // MODULO PARA CARGAR HANDLEBARS
            {
                test: /\.handlebars$/,
                loader:'handlebars-loader'

            },
            // MODULO PARA MINIFICAR LAS IMAGENES
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                        enabled: true,
                    },
                    pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                        quality: 75
                    }
                }
            }

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.handlebars',
            minify:{
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name]-styles.css'
        })
    ]
}