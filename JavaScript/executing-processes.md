# 代码运动定律：JavaScript 的执行过程

- 程序 = 算法 + 数据结构
- 算法 = 控制逻辑（执行过程）+ 业务逻辑

即便我们站在JavaScript引擎的角度，也很难弄清代码是以什么样的规则被执行的。
因为JavaScript引擎只是浏览器的一个线程，除此之外还有定时器触发线程、异步HTTP请求线程、事件触发线程、GUI渲染线程一起协同工作。
我们必须了解浏览器的架构，有这方面的知识储备，才能看清JavaScript执行过程的庐山真面目，在看接下来的文章前，先阅览浏览器篇章。


## 1. 事件循环

> Q1: 什么是事件循环，它是一个怎样的过程？ （how）

> Q2： 为什么要有事件循环，它解决了什么问题？（why）

A：[浏览器和Node中的JavaScript是如何工作的? 可视化解释](https://juejin.im/post/5d693d8b6fb9a06aca383488)

## 2. 宏任务和微任务

step 1：了解宏任务和微任务的执行步骤
宏任务：宿主提供的一些API，比如 http、定时、事件监听
微任务：Promise 对象的then、catch、finally等方法

- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [事件循环：微任务和宏任务](https://zh.javascript.info/event-loop)
- [从一道执行题，了解浏览器中JS执行机制](https://juejin.im/post/5b0e84d0f265da08c86fa580)

step 2：掌握JavaScript所有异步编程的方式（尤其是promise 和 async/await）

- [理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

## 3. 函数的执行

> 关键字：闭包，作用域链，执行上下文，this

**闭包**

```JavaScript
// JavaScript的函数就是闭包，或者这样理解： 闭包 = 带有执行环境的函数
/*
闭包 =  λ 表达式 + 环境部分{ 标识符, 环境[ 变量环境,词法环境，this值 ]  }
JavaScript函数 = 函数 + 环境部分{ 函数里面不带 var/let/const 的变量，词法作用域[ score,this ] }
*/
```
**执行上下文**：JavaScript标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。
  
在 ES3 中，执行上下文包含三个部分：
- scope：作用域，也常常被叫做作用域链
- variable object：变量对象，用于存储变量的对象
- this value：this值

在ES5中，我们改进了命名方式，把执行上下文最初的三个部分改为下面这个样子：
- lexical environment：词法环境，当获取变量时使用
- variable environment：变量环境，当声明变量时使用
- this value：this值
  
在ES2018中，执行上下文又变成了这个样子，this值被归入lexical environment，但是增加了不少内容：
- lexical environment：词法环境，当获取变量或者this值时使用
- variable environment：变量环境，当声明变量时使用
- code evaluation state：用于恢复代码执行位置
- Function：执行的任务是函数时使用，表示正在被执行的函数
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码
- Realm：使用的基础库和内置对象实例
- Generator：仅生成器上下文有这个属性，表示当前生成器



## 4.语句级的执行