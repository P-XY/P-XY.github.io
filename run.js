
var exec = require('child_process').exec

/* promise 写法
let promise = Promise.resolve();
promise
.then(
    ()=>exec( 'git add .',console.log("add success")) )
.then(
    ()=>exec('git commit -m"x"',console.log("commit success")) )
.then(
    ()=>exec( 'git push',console.log('push success') ) )
*/

//async/await 写法

async function run(){
    let add =  await Promise.resolve().then( exec( 'git add .') )
    let commit = await add.then( exec( 'git commit -m"y"') )
    let push = await commit.then( exec( 'git push') )
    console.log( 'push success !')
}

run()
.catch( e => console.log( 'error ' + e.message))
