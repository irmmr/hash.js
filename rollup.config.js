import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import buble from '@rollup/plugin-buble';
import whiteSpace from 'rollup-plugin-flow-no-whitespace';
import {terser} from 'rollup-plugin-terser';
import info from './src/info';

/**
 * @param {string} format   format name
 * @returns {string}
 */
const getBanner = (format) => {
    return `/**
 * HashJs javascript library v${info.version}
 * Copyright (c) ${new Date().getFullYear()} irmmr
 * MIT License
 *
 * (${format})
 * https://github.com/irmmr/hash.js
 */\n`;
}

// trs comments
const fileTerser = terser({
    output: {
        comments: function (node, comment) {
            let text = comment.value;
            let type = comment.type;

            if (type === "comment2") {
                return /HashJs javascript library/i.test(text);
            }
        },
    },
});

export default {
    input: 'src/hash.js',
    moduleName: 'Hash',
    sourceMap: true,
    plugins: [
        whiteSpace(),
        buble(),
        nodeResolve({
            browser: true
        }),
        commonjs()
    ],
    output: [
        {
            file: 'dist/hash.js',
            format: 'umd',
            name: 'Hash',
            env: 'production',
            banner: getBanner('umd - main')
        },
        {
            file: 'dist/hash.min.js',
            format: 'umd',
            name: 'Hash',
            env: 'production',
            sourceMap: true,
            plugins: [fileTerser],
            banner: getBanner('umd - main')
        },
        {
            file: 'dist/hash.amd.js',
            format: 'amd',
            name: 'Hash',
            env: 'production',
            banner: getBanner('amd')
        },
        {
            file: 'dist/hash.cjs.js',
            format: 'cjs',
            name: 'Hash',
            env: 'production',
            banner: getBanner('cjs')
        },
        {
            file: 'dist/hash.iife.js',
            format: 'iife',
            name: 'Hash',
            env: 'production',
            banner: getBanner('life')
        }
    ]
}