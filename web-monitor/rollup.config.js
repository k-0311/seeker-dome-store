import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
export default {
    input: './index.js',
    output: {
        file: './lib/bundle.js',
        format: 'umd',
        name: 'KMmonitor'
    },
    plugins: [
        resolve(),
        commonjs()
    ]
};