var exec = require('child_process').exec
/*
exec( 'git add.',()=>{
    console.log('git add .');
    exec('git commit -m"t',()=>{
        console.log('git commit -m"t"');
        exec('git push',(A,B,C)=>{
            console.log('git push')
            if(A){
                console.log(A)
            }else {
                console.log(B)
            }
        })
    })
});
*/

var exe = {
    run: command =>{
        exec(command,(error,data1,data2)=>{
            if(error){
                console.log(error)
            }else{
                console.log(data1)
                console.log(exe)
                return exe
            }
        })
    }
}
function main(){
    try{
        exe.run('git add .').run('git commit -m"t').run('git push')
    }catch(error){
        console.error(error)
    }
}
main()