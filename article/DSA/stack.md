
## 栈(FILO)

### 以数组方式实现栈
```js
class Stack {
    constructor(){
        this.items = []
    }
    push：( element)=>{ //入栈
        this.items.push( element)
    }
    pop(){ //出栈
        this.items.pop()
    }
    size(){ //返回栈的大小
        return this.items.length
    }
    peek(){  //返回栈顶元素（不出栈）
        return this.items[ this.items.length - 1]
    }
    clear(){ //清空栈
        this.items = []
    }
    isEmpty(){ //判空
        return items.length === []
    }
}
```
### 以对象的方式实现stack

```js
class Stack{
    constructor(){
        this.count = 0 //栈的下标
        this.items = {}
    }
    push( element ){ //入栈
        this.items[ this.count ] = element
        this.count++
    }
    pop(){ //出栈
        if( this.isEmpty() ){
            console.log( '栈已空，无效操作')
        }else{
            this.count--
            const result = this.items[ this.count ]
            delete this.items[ this.count ]
            return result
        }
    }
    isEmpty(){ //判空
        return this.count === 0
    }
    size(){ //返回栈大小
        return this.count
    }
    peek(){ //返回栈顶元素
        return this.count ? this.items.keys( this.count-1 ) : '栈已空'
    }
    clear(){ //清空栈
        this.items = {}
        this.count = 0
    }

}

```

