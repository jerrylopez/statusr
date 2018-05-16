const { parse } = require('url')
const match = require('micro-route/match')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

async function main (req, res) {
  const parsedUrl = parse(req.url, true)
  const { query } = parsedUrl

  return handle(req, res, parsedUrl)
}

async function setup (handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
