## 链表

链表有单向链表、双向链表、循环链表和有序链表

### 链表结构

```js
// head -> node{ element,next} -> node{ element,next }-> .... -> undefined
head { element, next:{
    element,next:{
        element,next:{
            element,next:{
                element,next: undefined
            }
        }
    }
} }
```
### 单向链表

```js
class node{
    constructor( element,next=undefined ){
        this.element = element
        this.next = next
    }
}
class LinkedList{
    constructor(){
        this.count = 0  //链表中元素的数量
        this.head = undefined   //第一个元素的引用
    }
    push( element ){ //向链表尾部添加一个元素,有两种情况：//1.链表为空，则添加第一个元素；2.链表不为空，向其追加元素。
        let node = new Node( element)
        if( this.head == null){ //(this.head ==null) 和( this.head === null || this.head === undefined) 是等价的
            this.head = node
            this.count++
            return
        }
        let current = this.head
        while( current.next != null){ //(current.next != null) 和 (current.next !== undefined && current.next !== null ) 等价
            current = current.next //理解这行代码很重要
        }
        current.next = node //current是this.head的最后一个节点的引用，改变current就是改变了this.head
        this.count++
    }
    getElementAt( index ){  //返回特定位置的元素
        if( index = 0 ){
            return this.head
        }
        if( index > 0 && index < this.count){
            let node = this.head
            for( let i = 0; i < index; i++ ){
                node = node.next
            }
            return node
        }
        return undefined //链表最后一个节点的next指向的是 undefiend，index大于this.count时因为不存在所以也是返回undefined
    }
    insert( element, index ){ //向特定位置插入一个新元素
        let node = new Node( element )
        if( index < 0 || index > this.count ){
            return false
        }
        if( index === 0 ){
            node.next = this.head
            this.head = node
        }else{
            let previous = this.getElementAt( index - 1)
            node.next = previous.next
            previous.next = node
        }
        this.count++
        return true
    }
    removeAt( index ){ //从链表特定位置删除一个元素
        if( index < 0 || index >= this.count ){
            return undefined
        }
        if( index = 0 ){
            this.head = this.head.next
        }else{
            let previous = this.getElementAt( index -1 )
            let current = previous.next
            previous.next = current.next
        }
        this.count--
        return current.element
    }
    indexOf( element ){ //元素在链表中的索引
        let current = this.head
        for( let i = 0; i < this.count; i++ ){
            if(  element === current.element ){
                return i
            }
            current = current.next
        }
        return -1
    }
    remove( element){   //从链表中删除一个元素
        const index = this.indexOf( element )
        return this.removeAt( index )
    }
    size(){ //链表大小
        return this.count
    }
    isEmpty(){ //判空
        retrn this.size() === 0
    }  
}
```
### 双向链表

### 循环链表

### 有序链表




