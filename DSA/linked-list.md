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
        this._head = null
        this._length = 0
    }
    //查
    getNodeByIndex(index){
        let current = this._head
        if(index < 0 || index >= this._length || isNaN(index)) return false
        if(index === 0){
            return this._head
        }else{
            for(let i = 1; i <= index ; i++){
                current = current.next
            }
            return current
        }
    }
    getNodeByValue(value){
        let current = this._head
        if(!this._length) return flase
        for(let i = 0; i < this._length; i++){
            if(current.value === value) return current
            current = current.next
        }
        return false
    }
    getIndexByValue(value){
        if(!this._length) return false
        let current = this._head
        for(let i = 0; i < this._length;i++ ){
            if(current.value === value) return i
            current = current.next
        }
        return false 
    }
    //增
    push(value){
        const node = new Node(value)
        let current = this._head
        !this._head ? (this._head = node) : (()=>{ 
            //模拟了Python的 [ i for i in range(n) ]，主要是我不想写for循环,这样比较函数式。
            [ ...Array(this._length - 1).keys() ].forEach( ()=>current = current.next )
            current.next = node
        })()
        this._length++
    }
    insert(value,index){
        const node =  new Node(value)
        //判断index是否合理
        if(index > this._length || index < 0 || isNaN(index) ) return false
        if(index === 0){
            node.next = this._head
            this._head = node
        }else{
            let previous = this.getNodeByIndex(index - 1)
            node.next = previous.next
            previous.next = node
        }
        this._length ++    
    }
    //删
    removeNodeByIndex(index){
        let previous = this.getNodeByIndex(index - 1)
        let current = this.getNodeByIndex(index)
        if(!current) return false
        if(previous){
            previous.next = current.next
        }else{
            this._head = this._head.next
        }
        this._length --
    }
    removeNodeByValue(value){
        const index = this.getIndexByValue(value)
        if( index === false ) return false
        this.removeNodeByIndex(index)
    }
    //其他
    clear(){
        this._head = null
        this._length = 0
    }
    size(){
        return this._length
    }
    isEmpty(){
        return this._length === 0
    }
    toString(){
        if(this._length === 0 ) return ''
        let objString = `${ this._head.value }`
        let current = this._head.next
        for(let i = 1; i < this._length; i++ ){
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




