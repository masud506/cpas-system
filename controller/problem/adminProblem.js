const express = require("express");

const Problem = require("../../model/problem");

const route = express.Router();

// problem list show

route.use("/adminProblem", (req, res, next) => {
  // fetch all the problem and show them on the page
  Problem.getAll()
    .then(([data, fieldData]) => {
      //console.log(data);

      const page = `./Admin/problem/adminProblem.ejs`;
      res.render(page, {
        title: "Problem List Showing",
        data: data,
        Link: "/adminProblemStatement/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//GET  specific problem statment Details
route.use("/adminProblemStatement/:id", (req, res, next) => {
 // console.log("Request Id:", req.params.id);

  let id = req.params.id;

  // fetch problem based on the number

  Problem.findById(id)
    .then(([probData]) => {
      // render the specific Problem
      //console.log(probData[0]);

      const page = `./Admin/problem/details.ejs`;
      res.render(page, {
        title: "Problem Statement Showing",
        problem: probData[0],
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// GET Create
route.use("/adminCreate", (req, res, next) => {
  const page = `./Admin/problem/create.ejs`;
  res.render(page, { title: "Problem Statement Create" });
});

// POST new Problem
route.use("/adminCreatePost", (req, res, next) => {

  const name = req.body.name;
  const statement = req.body.statement;
  const inputs = req.body.inputs;
  const outputs = req.body.outputs;
  const input = req.body.input;
  const output = req.body.output;
  const difficulties = req.body.difficulties;
  const topic = req.body.topic;
  const solution = req.body.solution;

  const problem = new Problem(null, name, statement, inputs, outputs, input, output, difficulties, topic, solution);

  problem.save()
    .then(()=>{
        // save data properly see on databse 
        res.redirect('/admin');
    })
    .catch(err =>{
      console.error(err);
    });

});

// UPDATE Problem

module.exports = route;
