const handler = require('serve-handler')
const http = require('http')
const path = require('path')

const server = http.createServer((req, res) => {
	return handler(req, res, {
		public: path.join(__dirname, 'build')
	})
})

const port = process.env.PORT || 3000

server.listen(port, () => {
	console.log('Server running on port: ' + port)
})
