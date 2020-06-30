const { stderr } = require('process')

var exec = require('child_process').exec
let promise = new Promise( function( resolve, error){
    exec( 'git add .',(er,stdout,stderr)=>{
        if(er){
            console.log( 'add error')
            error(er)
        }else{
            resolve(stdout)
        }
    })
});
promise.then(
    ()=>exec('git commit -m"x"'),
    ()=>console.log( "commit error") 
).then(
    ()=>exec( 'git push'),
    ()=>console.log( 'push error')
)