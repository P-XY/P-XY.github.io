var exec = require('child_process').exec
exec( 'git add .',()=>{
    console.log('git add .');
    exec('git commit -m"t',()=>{
        console.log('git commit -m"t"');
        exec('git push',()=>{
            console.log('git push')
            exec('git status',(A,B,C)=>{
                console.log(B)
            })
        })
    })
});
