
const db = require('../db/database');


module.exports = class JoinQuery{

   
    static getAll()
    {
        
         // return full promise where it need
         //let data = db.execute('SELECT * FROM problem');
        // return data;


    }

    static getLeftJoinProblemAndSubmission( uid )
    {
        let data = db.execute('SELECT * FROM problem LEFT outer JOIN submission ON problem.pid = submission.spid and submission.suid = ?', [uid]);
        console.log(data);
        return data;
    }

    static getInnerJoinProblemAndSubmission(pid, uid )
    {
        let data = db.execute('SELECT * FROM submission  INNER JOIN problem ON submission.spid = problem.pid WHERE submission.suid = ? and submission.spid = ? ', [uid, pid]);
        
        return data;
    }

    static findById(id, cb)
    {
        // find data from database by conditions
        return db.execute('SELECT * FROM problem WHERE problem.pid = ?', [id]);
    }

    
}