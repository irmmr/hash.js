import * as fs from "fs"
import * as http from "http"
import mime from "mime"
import * as ch_process from "child_process"

// define on port 8090
const PORT  = 8090
const HOST  = 'localhost'
const DIR   = process.cwd()

// main arguments data
const args  = process.argv
let h_file  = './dist/hash.min.js?refID=' + Date.now()

// create a http server
const createServer = () => {
    http.createServer((request, response) => {
        let url     = request.url,
            point   = url.split('?').shift()

        // main index
        if (point === '/') {
            // fs read main index.html file
            fs.readFile(DIR + '/test/index.html', function (err, html) {
                // check for reading error
                if (err) throw err

                let content         = html.toString(),
                    replacements    = [
                        {
                            from: /<script id="hash"+(.*)+<\/script>/g,
                            to: `<script id="hash" src="${h_file}"></script>`
                        },
                        {
                            from: /<link rel="shourtcut icon" href="(.*)">/g,
                            to: (c, h) => {
                                h = h.replace('../', './')
                                return `<link rel="shourtcut icon" href="${h}">`
                            }
                        },
                        {
                            from: /<script data-test-files src="(.*)"><\/script>/g,
                            to: (c, src) => {
                                src = src.replace('./', './test/')
                                return `<script data-test-files src="${src}"></script>`
                            }
                        }
                    ]

                for (const i of replacements) {
                    content = content.replace(i.from, i.to)
                }

                response.setHeader('Content-Type', 'text/html')
                response.end(content)
            })
        } else {
            // read files by url
            fs.readFile(DIR + point, (err, data) => {
                // check for errors
                if (err) {
                    response.statusCode = 404
                    response.end(`404: Page/File not found (${DIR + point})`)
                } else {
                    response.setHeader('Content-Type', mime.getType(url) || 'text/html')
                    response.end(data)
                }
            })
        }
    }).listen(PORT, HOST, () => {
        console.log(`Server is running at http://${HOST}:${PORT}`)
        console.log(`Use EOF to terminate server!`)
    })
}

// check for hash.js-dev file test
if (args.includes('--dev')) {
    h_file = './lab/hash.min.js'

    ch_process.exec('npm run dev-test', (error, stdout, stderr) => {
        if (error) {
            console.log('rollup process error', error.message)
            return
        }

        console.log('rollup process', stdout, stderr)
        createServer()
    })
} else {
    createServer()
}
