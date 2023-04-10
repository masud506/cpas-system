
const db = require('../db/database');


module.exports = class Submission{
    
    constructor(suid, spid, status, ssolution, visitsolution, acStatus) 
    {
        
        this.suid = suid;
        this.spid   = spid;
        this.status = status;
        this.ssolution = ssolution;
        this.visitsolution = visitsolution;
        this.acStatus = acStatus;
       
    }
    
    save()
    {
        return db.execute('INSERT INTO submission (suid, spid, status, ssolution, visitsolution, acStatus) VALUES(?, ?, ?, ?, ?, ?)',
         [this.suid, this.spid, this.status, this.ssolution, this.visitsolution, this.acStatus]
        );
    }

    update(uid, pid)
    {
        return db.execute('UPDATE submission SET suid = ?, spid = ?, status = ?, ssolution = ?, visitsolution = ?, acStatus = ? WHERE suid = ? AND spid = ?', 
        [this.suid, this.spid, this.status, this.ssolution, this.visitsolution, this.acStatus, uid, pid]);
    }

    static getAll()
    {
        
         // return full promise where it need
         let data = db.execute('SELECT * FROM submission');
         return data;
    }

    static deleteById(id)
    {

    }

    static findByProblemIdAndSubmissionId(pid, uid)
    {
       
      let data =  db.execute('SELECT * FROM submission WHERE submission.spid = ? AND submission.suid = ?', [pid, uid]);
      console.log(data);
      return data;
    }

    
}