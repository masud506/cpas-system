
const db = require('../db/database');


module.exports = class Currentmember{
    
    constructor(cmId  , name, email, image, position) 
    {

      this.cmId = cmId;
      this.name = name;
      this.email = email;
      this.image = image;
      this.position = position;
    }

    
    
    save()
    {
        return db.execute('INSERT INTO currentmember (name, email, image, position ) VALUES(?, ?, ?, ?)',
         [this.name, this.email, this.image, this.position]
        );
    }

    update(cmId)
    {
        return db.execute('UPDATE user SET name = ?, email = ?, image = ? , position = ?  WHERE cmId = ?', 
        [this.name, this.jobStatus, this.picture, this.email ,cmId]);
    }

    static getAll()
    {
        
         // return full promise where it need
         let data = db.execute('SELECT * FROM currentmember');
         return data;
    }

   


    
}