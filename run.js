
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

function exe(str){
    return Promise.resolve().then( ()=>exec(str))
}

async function run(){
    await exe('git add .')
    await exe( 'git commit -m"z"') 
    await exe( 'git push') 
    console.log( 'push success !')
}

run()
.catch( e => console.log( 'error ' + e.message))
