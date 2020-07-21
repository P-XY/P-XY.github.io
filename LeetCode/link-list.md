# 链表


> 写链表代码的技巧：
1. 理解指针或引用的含义
2. 警惕指针丢失和内存泄漏
3. 利用哨兵简化实现难度(解决边界问题)
4. 中调留意边界条件处理
5. 举例画图，辅助思考
6. 多写多练，没有捷径

> 链表常用操作
- [206 单链表反转](https://leetcode-cn.com/problems/reverse-linked-list/)
- [141 链表中环的检测](https://leetcode-cn.com/problems/linked-list-cycle/)
- [21 两个有序的链表合并]()
- [19 删除链表倒数第n个节点]()
- [876 求链表的中间节点]()

- [24 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

## 1.  206反转链表

解法一：迭代法
```js
function reverseList(head){
    let prev = null
    while(head){
       [head.next, prev, head] = [prev, head, head.next]//解构赋值
    }
    return prev
}
```
解法二：尾递归
```js
function reverseList(head){
    function reverse(prev, head){ //以尾递归的形式替代了迭代
        if(!head) return prev ;
        [head.next, prev, head] = [prev, head, head.next]
        return reverse(prev, head)
    }
    return reverse(null, head)
}
```
解法三：递归
```js
function reverseList(head){
    if(!head || !head.next) return head
    let reverse = reverseList(head.next) //假设head.next之后的链表已经反转
    head.next.next = head
    head.next = null
    return reverse
    
```


## 2. 24 两两交换链表中的节点

解法一：迭代
```js
function swapPairs(head){
    let thead = { value:0, next: head} //哨兵节点
    let cursor = thead
    while(cursor.next && cursor.next.next){
        let a = cursor.next
        let b =  a.next;
        [cursor.next, b.next , a.next] = [b, a, b.next] //a和b交换位置.这步非常关键
        cursor = a //哨兵进位，开始下一轮节点交换
    }
    return thead.next
}
```
解法二：尾递归
```js
function swapPairs(head){
    let thead = { value:0, next:head }
    let cursor = thead
    function  swap(cursor){
        if(!cursor.next || !cursor.next.next) return thead.next
        let a = cursor.next
        let b = a.next;
        [cursor.next, b.next, a.next] = [b, a, b.next]
        cursor = a
        return swap(cursor)
    }
    return swap(cursor)
}
```