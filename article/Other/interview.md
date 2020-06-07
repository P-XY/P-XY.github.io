<div align="center">
    <h1 >面试 </h1>
    <p>面试就和考试一样，平时需要对知识有系统的学习和归纳总结。</p>
</div>

## （零）正确看待面试/准备面试

- [如何轻松拿到淘宝前端 offer | 掘金技术征文](https://juejin.im/post/5bbc54a2e51d450e5a7445b4)
- [面试官到底想看什么样的简历？](https://www.cxymsg.com/guide/resume.html)
- [面试回答问题的技巧](https://www.cxymsg.com/guide/project.html)
- [如何通过HR面](https://www.cxymsg.com/guide/hr.html)
- [关于前端框架的面试须知](https://github.com/Advanced-Interview-Question/front-end-interview/blob/dev/docs/guide/framework.md)


## （一）布局

## （二）编程语言（JS）

### 面向对象的原理

1. 一切（引用类型）都是对象；所谓对象，就是属性的集合。    

2. 对象和函数的关系（[如图](http://mollypages.org/tutorials/js.mp)）：     

(1) 对象，是通过对函数使用new后构建的。          

(2) 而函数，是通过new Function()构建的。    

(3) Function构建了自身（Function.__proto__指向了Function.prototype)

3.  new（创建对象）的过程

### 代码执行顺序

代码执行分两个过程：先编译、后执行。因此，代码的执行顺序是由编译过程决定的。

1. 作用域（词法作用域、动态作用域）

作用域是指程序源代码中定义变量的区域。    
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。 

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。    

2. 执行上下文    

JS中执行代码的顺序不是“一行一行执行”，而是“一段一段执行”。    
这些“一段一段”的代码分三种类型：全局代码、函数代码、eval代码。重点是函数代码。    
而当执行一个函数时，需要进行准备工作，用更专业的说法，就叫做“执行上下文”。     





## （三）框架（React技术栈）

## （四）计算机网络/网络安全

### 计算机网络

- [HTTP协议](https://www.cxymsg.com/guide/http.html)
- [TCP面试题](https://www.cxymsg.com/guide/tcp.html)

### 网络安全

- [前端安全面试题](https://www.cxymsg.com/guide/security.html)
- [「每日一题」XSS 是什么？](https://zhuanlan.zhihu.com/p/22500730)
- [浅谈CSRF攻击方式](https://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

## （五）数据结构和算法

## （六）设计模式

## （七）面试资料

- [前端面试与进阶指南](https://www.cxymsg.com/guide/)
- [2018大厂高级前端面试题汇总](https://github.com/Advanced-Frontend/Daily-Interview-Question/blob/master/datum/summary.md)
