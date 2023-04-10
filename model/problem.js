
const db = require('../db/database');


module.exports = class Problem{
    
    constructor(pid, name,statement, inputs, outputs, input, output, difficulties, topic, solution) 
    {
        this.pid = pid;
        this.name = name;
        this.statement = statement;
        this.inputs = inputs;
        this.outputs = outputs;
        this.input = input;
        this.output = output;
        this.difficulties = difficulties;
        this.topic = topic;
        this.solution = solution;
    }
    
    save()
    {
        return db.execute('INSERT INTO problem (name, statement, inputs, outputs, input,  output, difficulties, topic, solution) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
         [this.name, this.statement, this.inputs, this.outputs, this.input, this.output, this.difficulties, this.topic, this.solution]
        );
    }

    static getAll()
    {
        
         // return full promise where it need
         let data = db.execute('SELECT * FROM problem');
         return data;
    }

    static findById(id, cb)
    {
        // find data from database by conditions
        return db.execute('SELECT * FROM problem WHERE problem.pid = ?', [id]);
    }

    static deleteById(id)
    {

    }

    
}