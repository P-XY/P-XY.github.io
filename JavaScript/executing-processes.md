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

宏任务：宿主提供的一些API，比如 http、定时、事件监听
微任务：Promise 对象的then、catch、finally等方法

- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [事件循环：微任务和宏任务](https://zh.javascript.info/event-loop)
- [从一道执行题，了解浏览器中JS执行机制](https://juejin.im/post/5b0e84d0f265da08c86fa580)


## 3. 函数的执行




## 4.语句级的执行