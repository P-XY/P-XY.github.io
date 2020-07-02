
var exec = require('child_process').exec

let promise = Promise.resolve();
promise
.then(
    ()=>exec( 'git add .',console.log("add success")) )
.then(
    ()=>exec('git commit -m"x"',console.log("commit success")) )
.then(
    ()=>exec( 'git push',console.log('push success') ) )

