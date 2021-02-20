const express = require('express')
const router = require('./router/router')
const cors = require('cors')

const app = express()
const PORT = 3000

// Set up template engine
app.set('view engine', 'ejs')

// static files
app.use(express.static('./public'))
app.use(cors())

// Fire Router
app.use(router)

// listen to port
app.listen(PORT, ()=>{
	console.log(`\n*** Server running on port ${PORT} ***\n\thttp://localhost:${PORT}/`)
	// Open browser
	// const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
	// require('child_process').exec(`${start} http://localhost:${PORT}/todo`)
})
