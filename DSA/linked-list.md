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
        let current = this.head
        let i = 0
        if(index < 0 || index >= this.length || isNaN(index)) return false
        while(i < this.length){
            if(index === i) return current;
            current = current.next
            i++
        }
    }
    getNodeByValue(value){
        let current = this.head
        let i = 0
        if(!this.length) return flase
        while(i < this.length){
            if(current.value === value) return current
            current = current.next
            i++
        }
        return false
    }
    getIndexByValue(value){
        let current = this.head
        let i = 0
        if(!this.length) return false
        while(i < this.length){
            if(current.value === value) return i
            current = current.next
            i++
        }
        return false 
    }
    //增
    push(value){
        const node = new Node(value)
        let current = this.head
        if(!this.head){
            this.head = node
        }else{
            while( current.next != null){
                current = current.next
            }
            current.next = node
        }
        this.length++
    }
    insert(value,index){
        const node =  new Node(value)
        let previous = this.getNodeByIndex(index - 1)
        if(index > this.length || index < 0 || isNaN(index) ) return false
        if( previous ){
            node.next = previous.next
            previous.next = node
        }else{
            node.next = this.head
            this.head = node
        }
        this.length ++    
    }
    //删
    removeNodeByIndex(index){
        let previous = this.getNodeByIndex(index - 1)
        let current = this.getNodeByIndex(index)
        if(!current) return false
        if(previous){
            previous.next = current.next
        }else{
            this.head = this.head.next
        }
        this.length --
    }
    removeNodeByValue(value){
        const index = this.getIndexByValue(value)
        if( index === false ) return false
        this.removeNodeByIndex(index)
    }
    //其他
    clear(){
        this.head = null
        this.length = 0
    }
    getHead(){
        return this.head
    } 
    size(){
        return this.length
    }
    isEmpty(){
        return this.length === 0
    }
    toString(){
        if(!this.length) return ''
        let string = `${ this.head.value }`
        let current = this.head
        while(current.next != null){
            current = current.next
            string = `${ string},${ current.value }`
        }
        return string
    }
}
```

## 2. 双向链表
```js
class DoubleNode extends Node {
    constructor(value){
        super(value)
        this.next = null
        this.prev = null
    }
}
class DoubleLinkList extends SingleLinkedList {
    constructor(){
        super()
        this.tail = null //tail指向链表的最后一个节点
    }
    /*add*/
    push(value){
        let node = new DoubleNode(value)
        if(!this.length){
            this.head = node
            this.tail = node
        }else{
            this.tail.next = node
            node.prev = this.tail
            this.tail = node //把tail指向链表最后一个节点
        }
        this.length ++
    }
    insert(value,index){
        let node = new DoubleNode(value)
        let previous = super.getNodeByIndex(index - 1)
        let current = super.getNodeByIndex(index)
        if(index > this.length || index < 0 || isNaN(index) ) return false
        if(!previous){
            node.next = this.head
            this.head.prev = node
            this.head = node
        }else{
            if(!current){
                this.tail.next = node
                node.prev = this.tail
                this.tail = node
            }else{
                node.next = current
                current.prev = node
                node.prev = previous
                previous.next = node
            }
        }
        this.length++
    }
    /*delete*/
    //removeNodeByValue 
    removeNodeByIndex(index){
        let current = super.getNodeByIndex(index)
        if(!current) return false
        if(this.length === 1){
            this.head = null
            this.tail = null
            this.length--
            return
        }
        if(current.prev === null){
            this.head = current.next
            this.head.prev = null
            this.length--
            return
        }
        if(current.next === null){
            this.tail = current.prev
            this.tail.next = null
            this.length--
            return
        }
        current.prev.next = current.next
        current.next.prev = current.prev
        this.length--
    }
    /* search*/
    //getIndexByValue
    //getNodeByIndex
    //getNodeByValue

    /*other*/
    //getHead
    //size
    //isEmpty
    //toString
    clear(){
        super.clear()
        this.tail = null
    }
    reverseToString(){
        if(!this.length) return ''
        let string = `${ this.tail.value }`
        let current = this.tail.prev
        while(current != null){
            string = `${ string },${ current.value }`
            current = current.prev
        }
        return string
    }
}



## 3. 循环链表

## 4. 有序链表




