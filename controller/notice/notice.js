const express = require('express');
const dayjs = require('dayjs');
require('dayjs/locale/en'); // load the locale

const User = require("../../model/user");
const Notice = require('../../model/notice');


const route = express.Router();


route.use("/notice", (req, res, next) => {

    Notice.getAll()
        .then(([data, filedData]) => {

            if (data.length > 0) {
                data = data.map((notice) => {
                    return {
                        date: dayjs(notice.date).format('YYYY MM DD'),
                        description: notice.description,
                        pdf: notice.pdfPath
                    }
                })
            }

            const page = `./Home/Notice.ejs`
            res.render(page, { title: "IUBAT CPAS Activites", isAuth: req.session.isAuth, data: data });
        }).catch((err) => {
            console.log(err);
        })
});


route.use("/event", (req, res, next) => {

    const page = `./Home/Event.ejs`
    res.render(page, { title: "IUBAT CPAS Activites", isAuth: req.session.isAuth });
});


module.exports = route;