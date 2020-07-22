
# 栈(FILO)
栈，先进后出，实现方式有，数组栈、链式栈。
栈是一种“操作受限”的线性表，只允许在一端插入和删除数据。从功能上来说，数组或链表确实可以替代栈，

但你要知道，特定的数据结构是对特定场景的抽象，而且，数组或链表暴露了太多的操作接口，操作上的确灵活自由，但使用时就比较不可控，自然也就更容易出错。

栈既可以用数组来实现，也可以用链表来实现。用数组实现的栈，我们叫作顺序栈，用链表实现的栈，我们叫作链式栈。

## 0. 栈的应用

**栈在函数调用中的应用**
操作系统给每个线程分配了一块独立的内存空间，这块内存被组织成“栈”这种结构, 用来存储函数调用时的临时变量。每进入一个函数，就会将临时变量作为一个栈帧入栈，当被调用函数执行完成，返回之后，将这个函数对应的栈帧出栈。

**栈在表达式求值中的应用**
计算机实现 1+3*4-7 表达式求值，是通过编译器，使用两个栈来实现的。
其中一个保存操作数的栈，另一个是保存运算符的栈。我们从左向右遍历表达式，当遇到数字，我们就直接压入操作数栈；当遇到运算符，就与运算符栈的栈顶元素进行比较。

如果比运算符栈顶元素的优先级高，就将当前运算符压入栈；如果比运算符栈顶元素的优先级低或者相同，从运算符栈中取栈顶运算符，从操作数栈的栈顶取 2 个操作数，然后进行计算，再把计算完的结果压入操作数栈，继续比较。

**栈在括号匹配中的应用**
比如，{[] ()[{}]}或[{()}([])]等都为合法格式，而{[}()]或[({)]为不合法的格式。那我现在给你一个包含三种括号的表达式字符串，如何检查它是否合法呢？

**浏览器的前进和后退功能**
使用两个栈，浏览新的的页面时入栈，后退的话就把栈顶出栈到另一个栈。



## 1. 数组栈
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
## 2. JavaScript对象栈

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

