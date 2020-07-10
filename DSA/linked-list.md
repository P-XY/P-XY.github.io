# 链表
链表有单向链表、双向链表、循环链表和有序链表     
**链表结构**
```js
head = { value, next:{
    value,next:{
        value,next:{
            value,next:{
                value,next: null
            }
        }
    }
}}
```
## 1.单向链表
``` javascript
class Node{
    constructor( value ){
        this.value = value
        this.next = null
    }
}
class SingleLinkedList{
    constructor(){
        this.head = null
        this.length = 0
    }
    //查
    getNodeByIndex(index){
        let previous = this.head
        if(index < 0 || index > this.length - 1) return false
        if(index = 0){
            return this.head
        }else{
            [...Array(index - 1).keys()].forEach( ()=>previous = previous.next )
            return previous.next
        }
    }
    getNodeByValue(value){
        let current = this.head
        if(!this.length) return flase
        for(let i = 0; i < this.length; i++){
            if(current.value === value) return current
            current = current.next
        }
        return flase
    }
    getIndexByValue(value){
        if(this.length) return -1
        let current = this.head
        for(let i = 0; i < this.length;i++ ){
            if(current.value === value) return i
            current = current.next
        }
        return -1 
    }
    //增
    push(value){
        const node = new Node(value)
        let current = this.head
        !this.head ? (this.head = node) : (()=>{ 
            //模拟了Python的 [ i for i in range(n) ]，主要是我不想写for循环,这样比较函数式。
            [ ...Array(this.length - 1).keys() ].forEach( ()=>current = current.next )
            current.next = node
        })()
        this.length++
    }
    insert(value,index){
        const node =  new Node(value)
        //判断index是否合理
        if(index > this.length || index < 0) return flase
        if(index = 0){
            node.next = this.head
            this.head = node
        }else{
            previous = this.getNodeByIndex(index - 1)
            node.next = previous.next
            previous.next = node
        }
        this.length++    
    }
    //删
    removeNodeByIndex(index){
        let previous = this.getvalueByIndex(index - 1)
        let current = this.getvalueByIndex(index)
        if(!current) return false
        if(previous){
            previous.next = current.next
        }else{
            this.head = null
        }
        this.length--
    }
    removeNodeByValue(value){
        const index = this.getIndexByValue(value)
        if(index < 0 ) return false
        this.removeNodeByIndex(index)
    }
    //其他
    clear(){
        this.head = null
        this.length = 0
    }
    size(){
        return this.length
    }
    isEmpty(){
        return this.length === 0
    }
    toString(){
        if(this.length === 0 ) return ''
        let objString = `${ this.head.value }`
        let current = this.head.next
        for(let i = 1; i < this.length; i++ ){
            objString = `${objString},${current.value}`
            current = current.next
        }
        return objString
    }
}
```
## 2. 双向链表
```js
class DoubleNode {
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}
class DoubleLinkList {
    constructor(){
        this.head = null
        this.length = 0
        this.tail = null
    }
}
```




## 3. 循环链表

## 4. 有序链表




