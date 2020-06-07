## 队列(FIFO)和双端队列

### 单向队列：前出后进
```JS
class Queue(){
    constructor(){
        this.count = 0 //记录下一次入队的key值
        this.items = {} //以{}存储元素，在出队操作的时间复杂度为O(1),以[]存储则为O(n)
        this.lowestCount = 0 //当前队列头部的key
    }
    enqueue(element){   // 入队：队列尾部添加元素
        this.items[ this.count ] = element
        this.count++
    }
    dequeue(){  // 出队：返回队列第一个元素后删除
        if( this.isEmpty() ){
            console.log( '队列已空')
            return undefined
        }
        const result = this.items[ this.lowestCount ]
        delete this.items[ this.lowestCount]
        this.lowestCount++
        return result
    }
    peek(){  //返回队列第一个元素
        if( this.isEmpty() ){
            console.log( '队列已空')
            return undefined
        }
        return this.items[ this.lowestCount ]
    }
    isEmpty(){  //判空
        return this.count - this.lowestCount === 0
    }
    size(){ // 队列大小
        return this.count - this.lowestCount
    }
    clear(){  //清空队列
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
}
```
### 双端队列（结合了队列和栈）：两端都可以进行增删
```js
class Deque {
    constructor(){
        this.count = 0  //下一次 尾部入队的key
        this.items = {}
        this.lowestCount = 0 //当前头部的key
    } 
    addFront( element ){    //从队列头部添加元素，有三种情况
        if( this.isEmpty() ){
            this.addBack( element)
            return
        }
        if( this.lowestCount > 0){
            this.lowestCount--
            this.items[ this.lowestCount ] = element
            return
        }
        //下标不能是负数，lowestCount = 0 的情况，则把下标+1
        for( let i = this.count; i>0; i--){
            this.items[i] = this.items[ i-1 ]
        }
        this.items[0] = element
        this.lowestCount = 0
        this.count++
    }
    addBack( element ){   //从队列尾部添加元素
        this.items[ this.count ] = element
        this.count++
    }
    removeFront(){  //从队列头部删除元素
        if( this.isEmpty() ){
            console.log( '队列已空')
            return undefined
        }
        const result = this.items[ this.lowestCount ]
        delete this.items[ this.lowestCount ]
        this.lowestCount++
        return result
    }
    removeBack(){   //从队列尾部删除元素
        if( this.isEmpty()){
            console.log( '队列已空')
            return undefined
        }
        this.count--
        result = this.items[ this.count]
        delete this.items[ this.count]
        return result 
    }
    peekFront(){    //获取队列头部元素
        if( this.isEmpty()){
           console.log('队列已空')
           return undefined
        } 
        return this.items[ this.lowestCount]
    }
    peekBack(){ //获取队列尾部元素
        if( this.isEmpty()){
            console.log( '队列已空')
            return undefined
        }
        return this.items[ this.count-- ]
    }
    isEmpty(){ //判空
        return this.count - this.lowestCount === 0
    }
    size(){ //队列长度
        return this.count - this.lowestCount
    }
    clear(){    //清空队列
        this.count = 0
        this.items = {}
        this.lowestCount = 0
    }
}
```
### 使用队列解决问题

- 循环队列: 击鼓传花游戏
- 和双端队列：回文检查器


