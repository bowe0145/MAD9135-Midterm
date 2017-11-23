module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["./src/css/sass"]
                }
            }]
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            query: {
                presets: ['react']
            }
        }]
    }
}