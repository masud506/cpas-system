
const db = require('../db/database');


module.exports = class Seniors{
    
    constructor(seniorsId , name, jobStatus, picture, email) 
    {

       this.seniorsId = seniorsId;
       this.name = name;
       this.jobStatus = jobStatus;
       this.picture = picture;
       this.email = email;
    }

    
    
    save()
    {
        return db.execute('INSERT INTO seniors (name, jobStatus, picture, email ) VALUES(?, ?, ?, ?)',
         [this.name, this.jobStatus, this.picture, this.email]
        );
    }

    update(seniorsId)
    {
        return db.execute('UPDATE user SET name = ?, jobStatus = ?, picture = ? , email = ?  WHERE seniorsId = ?', 
        [this.name, this.jobStatus, this.picture, this.email ,seniorsId]);
    }

    static getAll()
    {
        
         // return full promise where it need
         let data = db.execute('SELECT * FROM seniors');
         return data;
    }

   


    
}