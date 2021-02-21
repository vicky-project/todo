const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

// Set up template engine
// app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static files
app.use(express.static('./public'))
app.use('/api', require('./server/api/controller.js'))
app.use(cors())

// Fire Api

// 404 handler
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
})

// listen to port
app.listen(PORT, ()=>{
	console.log(`\n*** Server running on port ${PORT} ***\n\thttp://localhost:${PORT}/`)
	// Open browser
	// const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
	// require('child_process').exec(`${start} http://localhost:${PORT}/todo`)
})