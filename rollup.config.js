// main rollup build config
import commonjs from '@rollup/plugin-commonjs'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import buble from '@rollup/plugin-buble';
import info from './src/info'

// description of library
function getBanner(format) {
    return `/**
 * HashJs javascript library v${info.version}
 * Copyright (c) ${new Date().getFullYear()} irmmr
 * MIT License
 *
 * (${format})
 * https://github.com/irmmr/hash.js
 */\n`
}

export default {
    input: 'src/hash.js',
    moduleName: 'Hash',
    sourceMap: true,
    plugins: [
        buble(),
        nodeResolve({
            browser: true
        }),
        commonjs(),
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