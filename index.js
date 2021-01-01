const express = require('express') 
const bodyParser = require('body-parser') 
const repo = require('./repository') 
const showRecordTemplet = require('./showRecord')
const {recordInfo} = require('./fetchRecord')

const app = express() 

const port = process.env.PORT || 3000 

// The body-parser middleware 
// to parse form data 
app.use(bodyParser.urlencoded({extended : true})) 

// Get route to display HTML form 
app.get('/create', (req, res) => { 
res.send(` 
	<div> 
	<form method='POST'> 
		<div> 
		<div> 
			<label id='key'>Key</label> 
		</div> 
		<input type='text' name='key'
					placeholder='Enter key'
		for='key' required> 
		</div> 

		<div> 
		<div> 
			<label id='value'>Value</label> 
		</div> 
		<input type='text' name='value'
					placeholder='Enter value'
		for='value' required> 
		</div> 
	
		<div> 
		<button>Create</button> 
		</div> 
	</form> 
	</div> 
`); 
}) 

// Post route to handle form submission 
// logic and add data to the database 
app.post('/create', async (req, res) => { 
const {key, value} = req.body 

const addedRecord = await 
	repo.createNewRecord({key, value}) 

console.log(`Added Record : 
	${JSON.stringify(addedRecord, null, 4)}`) 

res.send("Information added to the"
        + " database successfully.")
}) 

// Home page 
app.get('/', async (req, res) => { 
    const records = await repo.getAllRecords() 
    res.send(showRecordTemplet(records)) 
  }) 
    
  // Post route to delete record 
  app.post('/delete/:key', async (req, res) => { 
    const key = req.params.key 
    const temp = await repo.delete(key) 
    res.redirect('/') 
  })

  app.post('/read/:key', async (req, res) => { 
    const key = req.params.key 
    const record =  
      await repo.findByKey(key) 
    
    res.send(recordInfo(record)) 
  }) 
// Server setup 
app.listen(port, () => { 
console.log(`Server start on port ${port}`) 
}) 
