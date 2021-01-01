module.exports = records => { 
    const displayRecordId = records.map(record => { 
        return ` 
        <p> 
        Record key - <strong>${record.key}</strong> 
        <form action='delete/${record.key}' method='POST'> 
            <button>Delete Record</button> 
        </form> 
        <form action='read/${record.key}' method='POST'> 
            <button>Read Record</button> 
        </form>
        </p> 
        ` 
    }).join('') 
    
    return ` 
        <div> 
        ${displayRecordId} 
        </div> 
    ` 
    }
    