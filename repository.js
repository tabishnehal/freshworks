// Importing node.js file system module 
const fs = require('fs') 

class Repository { 

constructor(filename) { 
	
	// Filename where datas are going to store 
	if (!filename) { 
	throw new Error( 
'Filename is required to create a datastore!') 
	} 

	this.filename = filename 

	try { 
	fs.accessSync(this.filename) 
	} catch (err) { 

	// If file not exist 
	// it is created with empty array 
	fs.writeFileSync(this.filename, '[]') 
	} 
} 

// Logic to add data 
async createNewRecord(attributes) { 

	// Read filecontents of the datastore 
	const jsonRecords = await 
	fs.promises.readFile(this.filename,{ 
	encoding : 'utf8'
	}) 

	// Parsing JSON records in JavaScript 
	// object type records 
	const objRecord = JSON.parse(jsonRecords) 

	// Adding new record 
	objRecord.push(attributes) 

	// Writing all records back to the file 
	await fs.promises.writeFile( 
	this.filename, 
	JSON.stringify(objRecord, null, 2) 
	) 

	return attributes; 
} 

async findByKey(key){ 
  
    // Read all filecontents of the datastore 
    const jsonRecords = await  
        fs.promises.readFile(this.filename, { 
      encoding : 'utf8'
    }) 
  
    // Parsing JSON records in JavaScript 
    // object type records 
    const objRecord = JSON.parse(jsonRecords) 
  
    // Search for required record 
    const requiredRecord =  
      objRecord.find(record => record.key === key) 
    return requiredRecord 
  } 

// Method to fetch all records 
async getAllRecords() { 
    return JSON.parse( 
        await fs.promises.readFile(this.filename, { 
            encoding: 'utf8'
        }) 
    ) 
} 

// Delete Method 
async delete(key) { 
  
    // Read all file contents of  
    // the datastore 
    const jsonRecords = await  
        fs.promises.readFile(this.filename, { 
        encoding: 'utf8'
    }) 

    // Parsing json records in javascript 
    // object type records 
    const records = JSON.parse(jsonRecords) 

    // Filter Records 
    const filteredRecords = records.filter( 
                record => record.key !== key) 

    // Write all records back to the  
    // custom database 
    await fs.promises.writeFile( 
        this.filename, 
        JSON.stringify(filteredRecords, null, 2) 
    ) 
} 

} 

// The 'datastore.json' file created at 
// runtime and all the information 
// provided via signup form store in 
// this file in JSON formet. 
module.exports = new Repository('datastore.json') 
