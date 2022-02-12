# 链表
链表有单向链表、双向链表、循环链表和有序链表。


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
        if(!this.head){
            this.head = node
        }else{
            let tail = this.getNodeByIndex( this.length  -1)
            tail.next = node
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
    /*以下方法继承父类

    // search
    getIndexByValue()
    getNodeByIndex()
    getNodeByValue()

    //other
    getHead()
    size()
    isEmpty()
    toString()
    */
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
```
## 3. 单向循环链表
循环链表的最后一个节点的next指向的不是null，而是head。

```js
class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}
class CycleLinkedList extends SingleLinkedList{
    constructor(){
        super()
    }
    push(value){
        let node = new Node(value)
        //链表为空时
        if(!this.length){
            this.head = node
            this.head.next = head
        }
        //链表不为空时
        let current = this.head
        while(current.next != head){
            current = current.next//找到最后一个节点
        }
        current.next = node
        node.next = head
        //长度+1
        this.length++
    }
    insert(value,index){
        let node = new Node(value)
        //判断索引是否合格
        if(index < 0 || index > this.length + 1) return false
        //尾部插入
        if(index === this.length) return this.push(value)
        //头部插入
        if(index === 0 ){
            let current = this.head
            this.head = node
            node.next = current
        }
        //其他情况，找到插入位置的前一个节点
        let i = 0
        let current = this.head
        while(i < index){
            current = current.next
            i++
        }
        node.next = current.next
        current.next = node
        this.length++   
    }
    removeNodeByIndex(index){
        //判断index 是index否合格
        if(!this.length || index < 0 || index > this.length -1 ) return false
        //头部删除
        if(index === 0 ){
            this.head = this.head.next
            return this.length--
        }
        //尾部删除
        if(index === this.length - 1){
            let current = this.head
            //找到被删除节点的前一个节点
            for(let i = 0;i < index -1; i++){
                current = current.next
            }
            current.next = this.head
            return this.length--

        }
        //其他位置删除
        let current = this.head
        for(let i = 0; i < index - 1; i++){
            current = current.next
        }
        current.next = current.next.next
        this.length--
    }
    removeNodeByValue(value){
        let current = this.head
        let i = 0
        while(i < this.length){
            if(current.value === value){
                this.removeNodeByIndex(i)
                break;
            }
            current = current.next
        }
        return false
    }
}
```

## 4. 有序链表
有序链表，指链表的node是按照value的大小排序的，因此，本质上来讲，除了第一次添加节点是push，此后push操作都是调用insert。

```js
//单向有序链表
class  SortLinkedList extends SingleLinkedList {
    constructor(){
        super()
    }
    push(value){
        if(this.isEmpty()){
            super.push(value)
        }else{
            //比较大小，从小到大的排序
            let current = this.head
            while(current && value > current.value ){
                current = current.next
            }
            //有两种情况：1,链表里没有大于或等于vlaue的 2.存在存在大于或等于value
            if(!current){
                //链表没有大于或等于value的，，此时应该把node从尾部插入
                super.push(value)
            }else{
                //存在比value大的。此时应该把value 插入current所在的索引位置
                let index = this.getIndexByValue(current.value)
                this.insert(value,index)
            }
        }
    }
}

```
