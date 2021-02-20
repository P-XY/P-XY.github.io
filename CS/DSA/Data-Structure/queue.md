# 队列(FIFO)

用数组实现的队列叫作顺序队列，用链表实现的队列叫作链式队列。
作为一种非常基础的数据结构，队列的应用也非常广泛，特别是一些具有某些额外特性的队列，比如循环队列、阻塞队列、并发队列。

**阻塞队列**    
在队列为空的时候，从队头取数据会被阻塞，直到队列中有了数据才能取；如果队列已经满了，那么插入数据的操作就会被阻塞，直到队列中有空闲位置。 上述的定义就是一个“生产者 - 消费者模型”！是的，我们可以使用阻塞队列，轻松实现一个“生产者 - 消费者模型”！ 我们可以多配置几个“消费者”，来应对一个“生产者”。

**并发队列**    
前面我们讲了阻塞队列，在多线程情况下，会有多个线程同时操作队列，这个时候就会存在线程安全问题，那如何实现一个线程安全的队列呢？线程安全的队列我们叫作并发队列。

最简单直接的实现方式是直接在 enqueue()、dequeue() 方法上加锁，但是锁粒度大并发度会比较低，同一时刻仅允许一个存或者取操作。实际上，基于数组的循环队列，利用 CAS 原子操作，可以实现非常高效的并发队列。这也是循环队列比链式队列应用更加广泛的原因。

>当我们向固定大小的线程池中请求一个线程时，如果线程池中没有空闲资源了，这个时候线程池如何处理这个请求？是拒绝请求还是排队请求？各种处理策略又是怎么实现的呢？

我们一般有两种处理策略。第一种是非阻塞的处理方式，直接拒绝任务请求；另一种是阻塞的处理方式，将请求排队，等到有空闲线程时，取出排队的请求继续处理。那如何存储排队的请求呢？

我们希望公平地处理每个排队的请求，先进者先服务，所以队列这种数据结构很适合来存储排队请求。队列有基于链表和基于数组这两种实现方式。这两种实现方式对于排队请求又有什么区别呢？

基于链表的实现方式，可以实现一个支持无限排队的无界队列（unbounded queue），但是可能会导致过多的请求排队等待，请求处理的响应时间过长。所以，针对响应时间比较敏感的系统，基于链表实现的无限排队的线程池是不合适的。

而基于数组实现的有界队列（bounded queue），队列的大小有限，所以线程池中排队的请求超过队列大小时，接下来的请求就会被拒绝，这种方式对响应时间敏感的系统来说，就相对更加合理。不过，设置一个合理的队列大小，也是非常有讲究的。队列太大导致等待的请求太多，队列太小会导致无法充分利用系统资源、发挥最大性能。

除了前面讲到队列应用在线程池请求排队的场景之外，队列可以应用在任何有限资源池中，用于排队请求，比如数据库连接池等。实际上，对于大部分资源有限的场景，当没有空闲资源时，基本上都可以通过“队列”这种数据结构来实现请求排队。

## 1. 单向队列

**数组实现**
```js
class Queue {
    constructor(){
        this.items = []
    }
    enQueue(value){ //入队
        this.items.push(value)
    }
    deQueue(){  //出队
        if(this.items.length === 0) return false
        this.items.pop(0)
    }
    //其他操作省略
}
```

**链表实现**
```js
class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}
class Queue{
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0 //记录队列长度
    }
    enQueue(value){
        if(this.length === 0){
            this.head = this.tail = new Node(value)
        }
        else{
            this.tail.next = new Node(value)
        }
        this.length++
    }
    deQueue(){
        switch(this.length){
            case 0:
                return false
            case 1:
                let value = this.head.value
                this.head = this.tail = null
                this.length--
                return value
            default:
                let value = this.head.value
                this.head = this.head.next
                this.length--
                return value
        }
    }
    //剩余操作省略
}
```

## 2. 双端队列：两端都可以进行增删

**链表实现**
```js
class Node{
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}
class Deque{
    constructor(){
        this.length = 0
        this.head = null
        this.tail = null
    }
    enQueueFront(value){
        let node = new Node(value)
        if(this.length === 0){
            this.head = this.tail = node
        }else{
            this.head.prev = node
            node.next = this.head
            this.head = node
        }
        this.length++
    }
    deQueueFront(){
        switch(this.length){
            case 0:
                return false
            case 1:
                let value = this.head.value
                this.head = this.tail = null
                this.length--
                return value
            default:
                let value = this.head.value
                this.head = this.head.next
                this.head.prev = null
                this.length--
                return value
        }
    }
    enQueueEnd(value){
        let node = new Node(value)
        if(this.length === 0){
            this.head = this.tail = node
        }else{
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.length++
    }
    deQueueEnd(){
        switch( this.length ){
            case 0:
                return false
            case 1:
                let value = this.tail.value
                this.tail = this.head = null
                this.length--
                return value
            default:
                let value = this.tail.value
                this.tail = this.tail.prev
                this.tail.next = null
                this.length--
                return value
        }
    }
    //其他操作省略
}
```
**数组实现**

省略

## 3. 循环队列

**链表实现**
```js
class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}
class CircularQueue{
    constrcutor(){
        this.head = null
        this.tail = null
        this.length = 0
    }
    enQueue(value){
        switch(this.length){
            case 0:
                this.head = new Node(value)
                this.head.next = this.head
                this.tail = this.head
                this.length++
                break
            deafult :
                let node = new Node(value)
                this.tail.next = node
                node.next = this.head
                this.tail = node
                this.length++
        }
    }
    deQueue(){
        switch(this.length){
            case 0:
                return false
            case 1:
                let value = this.head.value
                this.head = this.tail = null
                this.length--
                return value
            default:
                let value = this.head.value
                this.head = this.head.next
                this.tail.next = this.head
                this.length--
                return value
        }
    }
    //其他操作省略
}
```
**数组实现**
略





## 4. 使用队列解决问题

- 循环队列: 击鼓传花游戏
- 和双端队列：回文检查器


