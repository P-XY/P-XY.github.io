<div align="center">
    <h1 > 如何全面掌握JavaScript </h1>
    <p> 培养结构化思维，先从宏观到微观、远到近、从外往里看，掌握原理再去深入细节，构建知识结构图</p>
</div>

## 运行原理（由外而内，登堂入室）

1. 新手步入JS村庄：啊，原来你是这样的JS       
[JavaScript 竟然没有标准库?](https://juejin.im/post/5d50ca33f265da03b2152a7e)

2. 运行一：JS引擎、Web API、事件循环、调用队列，大家都是给浏览器打工的仔      
[浏览器和Node中的JavaScript是如何工作的? 可视化解释](https://juejin.im/post/5d693d8b6fb9a06aca383488)      

3. 运行二：做事有先后，宏任务和微任务    
[从一道执行题，了解浏览器中JS执行机制](https://juejin.im/post/5b0e84d0f265da08c86fa580)    

4. 运行三：“执行上下文” 面纱     
[JavaScript. The Core: 2nd Edition](http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/)

## 语言细节

### 作用域（词法环境）和闭包（本质是静态作用域）

- 什么是作用域？        

答：每个编程语言都有一套存储、查找变量的规则。为了提高程序逻辑的局部性，增强程序的可靠性，减少名字冲突等等，
从而引入了作用域，起到代码隔离的作用。因此作用域，可看作一个地盘、有效区域，或者名字空间。
在规范中作用域更官方的叫法是词法环境（Lexical Environments）

- 作用域分类    

答：有两种，动态作用域（Bash、Perl）、词法作用域（也叫静态作用域，js、python、c++等等大部分编程语言）。
词法作用域就是定义在词法阶段的作用域，是在书写代码时就已经决定的，当词法分析器处理代码时会保持作用域不变。

- 作用域链    

作用域其实由两部分组成：        
(1).记录作用域内变量信息（我们假设变量，常量，函数等统称为变量）和代码结构信息的东西，称之为 Environment Record。    
(2).一个引用 __outer__，这个引用指向当前作用域的父作用域，全局作用域的 __outer__ 为 null。    
由作用域内的引用形成了作用域链，在当前作用域内查找不到变量就会去父作用域内查找。

- js中的作用域    

如何能产生作用域呢，js的作用域主要有： 全局作用域、块作用域（比如let、with、try/catch）和函数作用域，每个函数都会创建一个作用域。

- 执行上下文    

js引擎由调用堆和调用栈两部分组成，调用堆存放声明的变量，而调用栈是程序执行的空间，其中每个栈存放的是执行上下文。
即js的执行不是一行一行解析的，而是以执行上下文为单位。执行上下文可看成一个普通对象，包括三个属性：    
this值（动态作用域，函数调用时才确定）、词法环境（静态作用域，比如闭包的应用，作用域链的本质）、变量对象（var声明的变量）。

- 闭包

闭包的原理是作用域链接，子作用域能够引用父作用域

### this（本质是动态作用域）    

- this是什么？    

this是执行上下文中的一个属性，在代码执行时才动态分配给执行上下文的，因为是动态的，所以与函数所用的静态作用域相对。
this 在任何情况下都不指向函数的词法作用域。在 JavaScript 内部，作用域和对象类似，可见的标识符都是它的属性。但是“作用域对象”无法通过 JavaScript 代码访问，它存在于 JavaScript 引擎内部。

- this的值？    

this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。
当一个函数被调用时，拥有它的object会作为this传入。在global下，就是window or global，
其他时候就是相应的object。 也可以看到，call和apply就是利用这一点实现更改this 值的。

- 为什么使用this？    

函数可以自动引用合适的上下文对象 很重要。随着你的使用模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，
而this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计 得更加简洁并且易于复用。

- this的绑定规则    

调用位置：this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

绑定规则：    
1.默认绑定（绑定到全局对象）。    

2.隐式绑定（函数引用有上下文对象，函数的this会绑定到该对象（函数被作为键值调用了才会被绑定））    
隐式丢失（函数别名方式调用函数会丢失，及函数的参数传递就是一种隐式赋值）  
```js
//this的值去取决于调用上下文，如果一个函数不是作为某个对象的方法被调用，那么this就是global object
window.id = 'window'
document.getElementById('div1').onclick = function(){
    console.log(this.id) //输出 div1
    var callback = function(){
        console.log( this.id) //输出 window,原因是： callback并不是某个对象（这里指div1 DOM这个节点对象）的属性方法
    }
}
```

3.显示绑定（call、apply区别在于参数，而bind返回对应函数，便于稍后调用，apply、call则是立即调用。） 
```js
//用apply实现的bind
Function.prototype.bind = function( ){ 
    var self = this //这里的this指向函数本身，因为bind是作为函数的属性方法被调用的。比如myFunc.bind( obj ),这里的this指向myFunc.
        obj = [].shift.call( arguments) //bind函数的第一个参数是要绑定的对象
        args = [].slice.call( arguments) //剩余参数
    return function(){
        //apply的第二个参数是一个有下标的集合。concat用于合并两个数组。[].slice.call(arguments)中的arguments是第二次传入的参数。
        return self.apply(obj, [].concat.call( args, [].slice.call( arguments)) ) 
    }
}
var obj = { name: 'testing bind function'}
var myFunc = funciton( a,b,c,d){
    alert( this.name ) //输出 'testing bind function'[1,2,3,4]
    alert( [ a,b,c,d ]) //输出 [1,2,3,4]
}.bind( obj, 1, 2) // 此时的myFunc等于 myFunc.apply( obj, [].concat.call( [1,2], [].slice.call( arguments) ))
myFunc(3,4) 


//call、apply和bind的应用：解决this丢失的问题
<html> 
    <body> 
        <div id="div1">我是一个 div</div> 
    </body> 
    <script> 
        var getId = document.getElementById; 
        getId( 'div1' ); //抛出异常，因为document.getElementById的this被绑定到了window对象
    </script> 
</html>
// 解决方案：提前绑定函数的this
document.getElementById = (function( func ){ 
    return function(){ 
        return func.apply( document, arguments ); 
    } 
})( document.getElementById );


```

4.new绑定 （this绑定在 new 构造函数（）产生的新对象，如果构造函数显示返回一个对象，则this绑定在构造函数返回的对象）   
```js
var MyClass = function(){
    this.name = ' sven'
    return {    //显示返回一个对象
        name: 'anne'
    }
}
var obj = new MyClass()
alert( obj.name ) //输出：anne，而不是sven
```
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。    
(1) 创建（或者说构造）一个全新的对象。     
(2) 这个新对象会被执行 原型  连接。     
(3) 这个新对象会绑定到函数调用的 this。    
(4) 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。    
    
- this绑定的优先级  

new > call,apply,bind > 隐式绑定 > 默认绑定

- 箭头函数的this  
 
箭头函数不使用以上四种规则，而是根据外层作用域来决定this（箭头函数会继承外层函数调用的 this 绑定）

- 相关文章
[this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)



### 对象原型  

- 对象是什么 

“JavaScript 中万物都是对象”，这是错误的。对象是6个（或者是 7 个，取 决于你的观点）基础类型之一。
对象有包括 function 在内的子类型，不同子类型具有不同 的行为，比如内部标签 [object Array] 表示这是对象的子类型数组。    

对象就是键 / 值对的集合。可以通过 .propName 或者 ["propName"] 语法来获取属性值。访 问属性时，引擎实际上会调用内部的默认 [[Get]] 操作（在设置属性值时是 [[Put]]）， [[Get]] 操作会检查对象本身是否包含这个属性，如果没找到的话还会查找 [[Prototype]] 链。    

属性的特性可以通过属性描述符来控制，属性可以是 可枚举或者不可枚举的，这决定了它们是否会出现在 for..in 循环中。    

- 类理论    

类是一种代码的组织结构形式，一种对真实世界问题领域的建模方法，把数据和数据的相关操作结合，也叫数据结构，类也是一种设计模式。
在面向对象的类的基础上，又产生了设计门模式。        

- 委托   

js的原型本质是委托

## 参考文章


### JS面向对象的设计模式，原理和设计思想？(解释原型和原型链)   
- [JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)  
- [从__proto__和prototype来深入理解JS对象和原型链](https://github.com/creeperyang/blog/issues/9)    
- [一张图总结继承和原型链](http://www.mollypages.org/tutorials/js.mp)    


### 内存管理

- [MDN：JavaScript 中的内存生命周期和垃圾回收机制。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)



## JS入门文档及使用手册

- [MDN：JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- [JavaScript5.1 教程 - ruanyifeng](https://wangdoc.com/javascript/)
- [ECMAScript 6 入门 - ruanyifeng](http://es6.ruanyifeng.com/)


## 深入JS系列博客

- [dmitrysoshnikov的博客](http://dmitrysoshnikov.com/)
- [深入理解javascript原型和闭包（完结）](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)
- [木易杨前端进阶：高级前端进阶博文](https://muyiy.cn/blog/)
- [冴羽的博客](https://github.com/mqyqingfeng/Blog)
