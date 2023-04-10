
const db = require('../db/database');


module.exports = class Notice {

    constructor(noticeId, description, pdfPath) {

        this.noticeId = noticeId;
        this.description = description;
        this.pdfPath = pdfPath;
    }

    save() {
        return db.execute('INSERT INTO notice (description,pdfPath) VALUES(?,?)',
            [this.description, this.pdfPath]
        );
    }

    update(noticeId) {
        return db.execute('UPDATE user SET name = ?, email = ?, image = ? , position = ?  WHERE cmId = ?',
            [this.name, this.jobStatus, this.picture, this.email, cmId]);
    }

    static getAll() {

        // return full promise where it need
        let data = db.execute('SELECT * FROM notice');
        return data;
    }
}