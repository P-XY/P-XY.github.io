### react 是什么？解决了什么问题？
react是一个构建web UI的js库。
与jquery相比：
    1.提出组件开发的思想，jsx语法。
    2.操控的是虚拟DOM，而不是真实的DOM。
    3.响应式UI

当我们说react的时候，实际上是讲react技术栈，因为一个应用包括‘展示和容器’
--即UI和数据流，react仅仅是负责UI部分构建。数据流管理要用到redux，url要用到router。
    
### create-react-app
create-react-app = react + react-dom + react-scripts

### react中的css
react建议不要在不同的组件中使用同一个css类，每个组件都有自身唯一使用的css类。
遵循这个规则通常会使 CSS 预处理器变得不那么有用，因为 mixins 和嵌套等功能会被组件组合所取代。

### 什么时候使用函数或对象
编写react组件有函数和对象两种写法，用函数写的组件是无状态的，对象写的组件可有可无。

### redux
#### 三大原则：
1:单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

2:state 是只读的
唯一改变 state 的方法就是触发 action

3：用纯函数来执行修改
为了描述 action 如何改变 state tree ，你需要编写 reducers

#### redux用于做状态管理，redux实际可分为三个步骤：
1. 编写 action （是store数据的唯一来源，本质上是 JavaScript 普通对象 ，
   约定必须使用一个字符串类型的 type 字段来表示将要执行的动作。建议使用单独的模块或文件来存放 action。
   Action 创建函数 就是生成 action 。 action一般是函数，返回一个字典对象(dispatch只接受对象）。字典里有type属性
   
2. 编写 reducer 
(previousState, action) => newState ;reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
这样的函数叫reducer。一定要保证reducer是纯函数
设计State结构:
如何才能以最简的形式把应用的 state 用对象描述出来？ (normalizr)

返回新的state时使用 Object.assign()，不要修改传入的state( 保证reducer的纯函数)
reducer的state应该有个初始值

项目会有很多个reducer，每个 reducer 只负责管理全局 state 中它负责的一部分。
Redux 提供了 combineReducers()把所有reducer管理到一起。combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中

```javascript
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers)
```

3. 编写 store 
其中，store = createStore(reducer(state,action))；
store是只有一个的；reducer可以有多个，最后以字典（对象）形式规划为一个；

store维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state,正常情况下，参数只能是对象，不能是函数.
通过 subscribe(listener) 注册监听器,state虽然更新了但组件没有自动刷新，listener一般是组件的setState函数用来更新组件;
通过 subscribe(listener) 返回的函数注销监听器。

#### 数据流：Redux 应用中数据的生命周期遵循下面 4 个步骤
1. 调用 store.dispatch(action)，Action 就是一个描述“发生了什么”的普通对象

2. Store 会把两个参数传入 根reducer： 当前的 state 树和 action

3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

``` javascript
function todos(state = [], action) {
   // 省略处理逻辑...
   return nextState
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // 省略处理逻辑...
   return nextState
 }

 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 })
 ```

 4.Redux store 保存了根 reducer 返回的完整 state 树


 ### 总结

 react开发可分为两个部分： UI和数据，分别对应react 和redux。 

 UI： 难点在于组件的划分（一个功能需求划分为几个组件最好？）
 数据流： 难点在于数据管理该如何编写（组件之间的数据耦合？）

### react-redux

在react中使用redux，不仅需要安装redux，还需要安装react绑定库 react-redux。

react写的都是UI组件，redux组件是数据组件。通过react-redux写一些容器组件把两者联系起来。
* 技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，
并通过 props 来把这些数据提供给要渲染的组件

可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成， 
使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中。


### 中间件和异步操作

Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。
怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。

首先，异步操作不应该在reducer中写，因为reducer是个纯函数。
View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。

既然store.dispatch是改变数据的方法，那就只能通过改造dispatch添加中间件功能。
```javascript 
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```
上面代码通过改造dispatch方法增加了log日志功能。
其实redux就有别人写的好的redux-logger模块，我们只需引用就好：

```javascript
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

既然可以通过中间件的方式添加功能，那么就可以添加异步的中间件



异步操作至少要发送两个action：
```javascript
//操作发起时的 Action
//操作成功时的 Action
//操作失败时的 Action
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }


const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```
（1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。

（2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。

（3）在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。

（4）异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

这样的处理，就解决了自动发送第二个 Action 的问题。但是，又带来了一个新的问题，Action 是由store.dispatch方法发送的。而store.dispatch方法正常情况下，参数只能是对象，不能是函数。

这时，就要使用中间件redux-thunk

#### 如何使用中间件
```javascript
import { applyMiddleware, createStore } from 'redux';
const store = createStore(
  reducer,
  applyMiddleware(xxxxx)
);
```

#### 使用redux-thunk 中间件
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```
上面代码使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。

因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch.

#### redux-promise 中间件


### redux源码解读

1. 无论是 dispatch 哪个 action，都会流通所有的 reducer。
2. dispatch每个reducer之后，会执行所有listener

表面上看来，这样子很浪费性能，但 JavaScript 对于这种纯函数的调用是很高效率的，因此请尽管放心
这也是为何 reducer 必须返回其对应的 state 的原因。否则整合状态树时，该 reducer 对应的键值就是 undefined


### react-redux
[注：react开发中，组件分为：UI组件(react)和容器组件（redux)两大类 ]。

虽然在UI组件中直接使用store是可以的，但非常不方便。react设计原则里，
所有UI组件（包括有状态和无状态）获取数据的方式都是通过props传递。

举个简单的无状态组件的例子：

1.一个无状态UI组件，需要接受store传递来的state数据，具体<MyComp username = { store.getState().username }>
2.组件得到来自 store的数据，内部进行渲染。

组件的常规运行都要通过1、2两步，那么问题来了：  如果state被A组件dispatch后更新了，如何自动更新B组件的状态？
redux提供了store.subscribe(listener)注册监听函数：

```js 
let MyComp = <MyComp username = { store.getState().username }>
store.subscribe( MyComp)
```
上面只是一个脑洞，listener其实只接受function类型，即便可以这样用，性能？

react-redux提供的connect函数，通过mapStateToProps 能解决自动更新的问题。

另一个问题： UI组件内如何 执行dispatch（action）？
因为UI组件因该是纯粹的纯函数， 不因该在UI组件内编写业务逻辑代码，所以dispatch也是
通过props传入， 这部分由 connect的第二个参数 mapDispatchToProps函数解决。

总结： 
    1. 一个UI组件和redux连接，使用connect传入两 个参数。
    2. 一个UI组件，需要的从props得到的也就 dispacth 和 state（ 一个负责改变，一个负责重新渲染）


### 建立react项目 -> 打包发布项目 的流程

1.  新建项目 my-app
npm install create-react-app
create-react-app my-app
cd my-app
npm start

2. 了解项目里每个文件/文件夹 的作用
查看 create-react-app 的中文手册，了解creact-react-app 的命令有哪些

3. 安装项目用到的包
查看npm手册，了解npm的使用，比如全局安装和本地安装
npm install -g xxx  全局安装
npm install xxx  本地安装
npm install xxx --save    自动把模块和版本号添加到package.json 的dependencies部分（开发依赖）
npm install xxx --save-dev    自动把模块和版本号添加到package.json的 devDependencies部分（环境依赖）

4. 打包发布项目






