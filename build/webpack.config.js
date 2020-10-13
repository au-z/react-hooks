const path = require('path')

const resolve = (rel) => path.resolve(__dirname, '..', rel)

const load = (test, ...use) => ({test, use})

module.exports = (env) => ({
	mode: env.prod ? 'production' : 'development',
	devtool: env.prod ? 'cheap-eval-source-map' : 'source-map',
	entry: {
		'react-hooks': resolve('src/index.ts'),
	},
	output: {
		path: resolve('dist'),
		filename: env.prod ? `[name].min.js` : `[name].js`,
		library: `[name]`,
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			load(/\.(j|t)s?$/, 'babel-loader'),
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'src': resolve('src')
		},
	}
})
