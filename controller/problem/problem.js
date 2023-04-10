const express = require("express");
let compiler = require("compilex");
var fs = require("fs");

const Problem = require("../../model/problem");
const User = require("../../model/user");
const JoinQuery = require("../../model/JoinQuery");
const Submission = require("../../model/submission");
const { Router } = require("express");
const isAuth = require('../Auth/auth');

const route = express.Router();

let option = { stats: true };
compiler.init(option);


// problem list show

route.use("/problem", isAuth, (req, res, next) => {
  // fetch all the problem and show them on the page

  JoinQuery.getLeftJoinProblemAndSubmission(req.session.userID)
    .then(([data, fieldData]) => {
      // console.log(data);

      const page = `./User/ProblemList.ejs`;
      res.render(page, {
        title: "Problem List Showing",
        data: data,
        Link: "/problemStatment/",
        notYet: "Not Solve",
        isAuth: req.session.isAuth,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// problem statment show
route.get("/problemStatment/:id", (req, res, next) => {
  console.log("Request Id:", req.params.id);

  let id = req.params.id;

  // fetch problem based on the number

  Problem.findById(id)
    .then(([probData]) => {
      // render the specific Problem
      //console.log(probData[0]);

      const page = `./User/ProblemStatement.ejs`;
      res.render(page, {
        title: "Problem Statement Showing",
        problem: probData[0],
        outputArea: "off",
        code: "",
        input: "",
        output: "write code",
        isAuth: req.session.isAuth,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Compile Code and execute and send data

route.post("/compilercode",isAuth, (req, res) => {
  let pid = req.body.pid;
  let code = req.body.code;
  let input = req.body.input;
  let inputRadio = req.body.inputRadio;
  let lang = req.body.lang;
  let compil = req.body.compile;
  let outputData = "";

  code = JSON.parse(code);

  console.log("code" + typeof input);
  // When we compile code
  if (compil === "Compile") {
    if (lang === "C" || lang === "C++") {
      if (inputRadio === "true") {
        let envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPPWithInput(envData, code, input, (data) => {
          if (data.error) {
            //return res.send(data.error);
            showOutput(data.error);
          } else {
            // res.send(data.output);
            showOutput(data.output);
          }
        });
      } else {
        let envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };
        compiler.compileCPP(envData, code, (data) => {
          if (data.error) {
           // res.send(data.error);
            showOutput(data.error);
          } else {
            // res.send(data.output);

            showOutput(data.output);
          }
        });
      }

      const showOutput = (outputResult) => {
        // Data show as output on the page
        Problem.findById(pid)
          .then(([probData]) => {
            const page = `./User/ProblemStatement.ejs`;
            return res.render(page, {
              title: "Problem Statement Showing",
              problem: probData[0],
              outputArea: "on",

              code: code,
              input: input,
              output: outputResult,
              isAuth: req.session.isAuth,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      };
    }
  } else {
    // when we submit code for validation Online Checker

    if (lang === "C" || lang === "C++") {
      // INPUT
      // File to read data for input and output matching
      let path = `${__dirname}/../../testCase/input${pid}.txt`;

      fs.readFile(path, "utf8", function (err, data) {
        if (err) throw err;

        // call compiler to check Acepted code or not
        CompileCode(data);
      });

      // COMPILE CODE
      // Compiler function to Run the C/C++ code
      const CompileCode = (inputData) => {
        let envData = {
          OS: "windows",
          cmd: "g++",
          options: { timeout: 10000 },
        };

        if (inputData === "") {
          compiler.compileCPP(envData, code, (data) => {
            if (data.error) {
           //  return res.send(data.error);
             outputDataShow(data.error);
            } else {
              // res.send(data.output);

              outputDataShow(data);
            }
          });
        } else {
          compiler.compileCPPWithInput(envData, code, inputData, (data) => {
            if (data.error) {
              // Redirect with with error
             return res.send(data.error);
              //showOutput(data.error);
            } else {

              outputDataShow(data);
            }
          });
        }
      };

      // OUTPUT MATCHING
      // output matching and check Acepted or not
      let statusVardict = "";

      const outputDataShow = (data) => {
        let path = `${__dirname}/../../testCase/output${pid}.txt`;

        fs.readFile(path, "utf8", function (err, data1) {
          if (err) throw err;
         // console.log(typeof data1 + " " + typeof data.output);
          if (data1.trim() === data.output.trim()) {
            // Accepted Result
            console.log("Accepted");
            statusVardict = "Accepted";

            // here submission code and save database
            saveDataIntoDatabase();
          } else {
            // Store the Worng Result
            statusVardict = "Wrong";

            saveDataIntoDatabase();
          }
        });
      };

      // All the Save data into sumbission part
      const saveDataIntoDatabase = () => {
        // get information from database
        // some validation logic check

        Submission.findByProblemIdAndSubmissionId(pid, req.session.userID)
          .then(([data, status]) => {
            saveSubmission(data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const saveSubmission = (submissionData) => {
        // some vriable

        let userPoint = 0;
        let acStatus = 0;
        let visitsolution = "NO";

        if (Object.keys(submissionData).length !== 0) {
          submissionData = submissionData[0]; // only first index need

          // second time update data

          if (submissionData.visitSolution == "YES") {
            userPoint = 0;
            if (statusVardict == "Accepted") {
              acStatus = +submissionData.acStatus + 1;
            } else {
              acStatus = +submissionData.acStatus;
            }
          } else {
            if (statusVardict === "Accepted" && +submissionData.acStatus == 0) {

              userPoint = 10;
              acStatus = +submissionData.acStatus + 1;
            } else {
              acStatus = +submissionData.acStatus;
            }
          }

          // data exists we have to update the data now
          updateSubmissionData();
        } else {
          // first time give data

          if (statusVardict == "Accepted") {
            userPoint = 10;
            acStatus = 1;
          } else {
            acStatus = 0;
          }

          insertIntoSubmissionData();
        }

        // Update  and insert  submission data data

        function updateSubmissionData() {
          const submission = new Submission(
            req.session.userID,
            pid,
            statusVardict,
            code,
            visitsolution,
            acStatus
          );

          submission
            .update(req.session.userID, pid)
            .then(([data, status]) => {
              // user info update
              updateUserInfo();
            })
            .catch((err) => {
              console.log(err);
            });
        }

        function insertIntoSubmissionData() {
          const submission = new Submission(
            req.session.userID,
            pid,
            statusVardict,
            code,
            visitsolution,
            acStatus
          );
          submission
            .save()
            .then(() => {
              updateUserInfo();
            })
            .catch((err) => {
              console.error(err);
            });
        }

        // Update User inof Success Fully
        function updateUserInfo() {

          User.findById(req.session.userID)
            .then(([data, status]) => {

              data = data[0];
              console.log(data);

             
              let acCnt = 0;  
              let waCnt = 0;
              // Update User info 
              console.log("Print" + status);
              if(statusVardict == "Accepted")
              {
                console.log("HI Accepted");
                  acCnt = (+data.cntac) + 1;
               
                  waCnt = (+data.cntwa);
              }
              else
              {
                acCnt = (+data.cntac);
                waCnt = (+data.cntwa) + 1;
              }

              data.cntpoint = data.cntpoint +  userPoint;
              console.log(acCnt, waCnt, data.cntpoint);


              const user = new User(null,data.username, data.password, acCnt, data.cntpoint ,waCnt);
              user
              .update(req.session.userID)
              .then(() => {

               // console.log("User data saved successfully");
              //  res.send("HO Gia Check");
                res.redirect(`/submission/${pid}`);

              })
              .catch(err =>{
                console.log(err);
              });

           
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
    }
  }
});

// Solution Page
route.get("/solution/:id",isAuth, (req, res, next) => {
  console.log("Request Id:", req.params.id);

  let id = req.params.id;

  // fetch problem based on the number

  Problem.findById(id)
    .then(([probData]) => {
      // render the specific Problem
      //console.log(probData[0]);

      const page = `./User/solution.ejs`;
      res.render(page, {
        title: "Problem Solution",
        problem: probData[0],
        isAuth: req.session.isAuth,
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// Solution Page
route.get("/submission/:id",isAuth, (req, res, next) => {
  let id = req.params.id;

  //TODO: we need user ID   to get user Data from DB  Last submited Code

  // fetch problem based on the number

  JoinQuery.getInnerJoinProblemAndSubmission(id, req.session.userID)
    .then(([probData]) => {
      console.log(probData);
      const page = `./User/submit.ejs`;
      let solve = "NO";

      if(Object.keys(probData).length !== 0 )
      {
        solve = 'YES';
      }

      res.render(page, {

        title: "Problem Solution",
        problem: probData[0],
        Link: "/problemStatment/",
        solve: solve,
        pid : id,
        isAuth: req.session.isAuth,

      });

    })
    .catch((err) => {
      console.error(err);
    });
});

route.get("/fullStat", (req, res) => {
  compiler.fullStat((data) => {
    res.send(data);
  });
});

compiler.flush(() => {
  console.log("All temporary files flushed!");
});

module.exports = route;
