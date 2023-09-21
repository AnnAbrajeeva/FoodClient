const isProd = process.env.NODE_ENV === 'production';


module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV);
    return {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
            'mobx'
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            !isProd && 'react-refresh/babel',
            '@babel/plugin-proposal-optional-chaining'
        ].filter(Boolean)
    }
}