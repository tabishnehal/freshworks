module.exports = { 

    // Function to displays user information 
    recordInfo(record) { 
        return ` 
        <div> 
            <p><strong>key : </strong>${record.key}<p> 
        </div> 
        <div> 
            <p><strong>Value : </strong>${record.value}<p> 
        </div> 	 
        ` 
    } 
    } 
    