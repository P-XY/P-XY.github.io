# 万物皆可归类：JavaScript 数据类型

JavaScript 规定了8种数据类型：
1. Undefined 
2. Null
3. Boolean
4. String
5. Number
6. Symbol
7. BigInt（提案中，暂时略过）
8. Object

从变量、参数、表达式、函数返回值等，任何JavaScript代码运行过程中产生的数据，都囊括在这8种数据类型中,其中除了Obejct类型，其他7种类型都是不可变的，称为原始类型。
原始类型 保存为简单数据值。 引用类型 保存为对象，其本质是指向内存位置的引用。接下来我们从简单到复杂重新学习一下这些类型。    

参考：[MDN | JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

##  1. Udefined 类型
> Q : 为什么有的编程规范要求用 void 0 代替 undefined？

描述： Undefined 类型表示未定义，它的类型只有一个值，就是 undefined，任何变量在赋值前是 Undefined 类型、值为 undefined 。一个函数如果没有使用return语句指定返回值，就会返回一个undefined值。

**然而 undefined 不是一个系统保留的关键字，它是全局对象的一个属性，也就是说，它是全局作用域的一个变量，这是公认的JS的一个设计失误**。 因为，即便undefined 的属性特征： writeable、enumerable、configure 都是false，但是它有可能在非全局作用域中被当作标识符（变量名），这样会使你的代码难以去维护和排错。

> A: 因为在JavaScript中，undefined是一个变量，而并非是一个关键字，为了避免undefined 无意中被篡改，我们建议使用 void 0 来获取 undefined 的值。

参考：
- [MDN | undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [MDN | void 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

## 2. Null
描述： Null类型也只有一个值 null，但 null 是关键字，表示空，比如：变量已声明且赋值，但值为空。
> 何时使用 null 和 undefined？

参考 [ 阮一峰 | undefined与null的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html) 和
[MDN | null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)，建议只使用null。


## 3. Boolean
描述： Boolean 类型有两个值， true 和 false，它用于表示逻辑意义上的真和假，同样有关键字 true 和 false 来表示两个值。

## 4. String
> Q： 字符串有最大长度吗？

描述： String 用于表示文本数据，不同于C语言，JavaScript 字符串是不可更改的。String 采用的是 UTF16 编码，比如符串的操作 charAt、charCodeAt、length 等方法针对的都是 UTF16 编码。 所以处理非BMP（超出 U+0000 - U+FFFF 范围）的字符时，你应该格外小心。因为根据UTF16编码，基本平面（BMP）的字符占用2个字节，辅助平面的字符占用4个字节。因此，String的最大长度，实际上是受字符串的编码长度（基本平面/辅助平面）影响的。

参考：[阮一峰的网络日志: Unicode与JavaScript详解](https://www.ruanyifeng.com/blog/2014/12/unicode.html)

## 5. Number
> Q： 0.1 + 0.2不是等于0.3么？为什么JavaScript里不是这样的？

描述： JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，
这就是说，JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）。

由于浮点数不是精确的值，涉及小数的比较和运算要特别小心，非整数的Number类型无法用 ==（===也不行） 来比较，比如 0.1+0.2 === 0.3 是false。 **因为，浮点数运算的精度问题导致等式左右的结果并不是严格相等，而是相差了个微小的值。**

```js
//检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON); //true
```
对于某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算。

## 6. Symbol

描述： JavaScript的对象属性都是字符串，这容易造成属性名冲突，ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值，symbol的引入就是为了解决这个问题。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。

参考：[ECMAScript 6 入门 | Symbol](https://es6.ruanyifeng.com/#docs/symbol)

## 7. BigInt

略

## 8. Object
> Q1：为什么说 JavaScript 中函数也是对象？

我们首先要知道什么是对象，维基百科上 *对象* 的词条解释：

>“In computer science, an object can be a variable, a data structure, a function, or a method, and as such, is a value in memory referenced by an identifier.    
在计算机科学中，一个对象可以是一个变量、一个数据结构、一个函数或一个方法，因此，它是一个由标识符引用的内存中的值。”

怎么理解这段话呢？ 我们站在编译器的角度看，内存只有堆和栈两种存储结构，栈存放*基本数据类型*（比如：number、string、布尔值，都是不可变的，因为相应的变量被定义后会立刻在栈上分配内存空间），堆存放*引用数据类型*（相应的变量被声明时不会被分配内存空间，只是存储了一个内存地址而已，所以是可变的）。
我们可以得出： 对象 > 由标识符引用的内存中的值 == 引用类型 ，这相当于说对象是个引用类型，却没说满足怎样条件的引用类型能称为对象，依旧没说明白什么是对象。


面向对象系统的设计有不同的实现方式，常见的有基于类和基于原型（原型本身就是一个对象，所以也叫基于对象），Grandy Booch 在《面向对象分析与设计》一书中，概述了对象有三个特点：

- 对象具有唯一标识性
- 对象有状态
- 对象具有行为

对于第一点“对象具有唯一标识性”，任何不同的 JavaScript 对象都是互不相等的

```js
var o1 = { a: 1 };
var o2 = { a: 1 };
console.log(o1 == o2); // false
```
关于对象的第二个和第三个特征“状态和行为”，不同语言会使用不同的术语来抽象描述它们，比如 C++ 中称它们为“成员变量”和“成员函数”，Java 中则称它们为“属性”和“方法”，在 JavaScript 中，将状态和行为统一抽象为“属性”(所以JavaScript的属性被设计成比别的语言更加复杂)。


在JavaScript中，参数的传递规则是这样的：不可变类型按值传递（按值传递会产生数据的拷贝），可变类型以引用方式传递，而函数可以被保存在变量中，像其他对象一样以引用方式传递，这说明函数是一个引用类型。并且函数被设计成拥有属性和方法（比如任何函数都能使用 call 和 apply ），那么函数满足唯一标识吗？

```js
var x = function(){}
var y = function(){}
x === y //false,即便相同的两个函数，也不相等，函数具有唯一性
```
以上，足以说明函数属于对象。那，函数属于对象，对象又是函数创建的，它们之间是什么关系呢？ 
答案在JavaScript的面向对象的实现方式 -- **基于原型的面向对象设计模式**，这里预先给一张函数和原型对象的关系图：
[JavaScript Object Layout](http://www.mollypages.org/tutorials/js.mp)

参考：[JavaScript 到底是面向对象还是基于对象？](https://www.infoq.cn/article/3*8POPcRSClQh1Cp9Sqg)

---

> Q2：为什么给对象添加的方法能用在基本类型上？

从编程语言设计的角度看，JavaScript为了语言的一致性，特意模糊了对象类型和原始类型，因此给原始类型也内置了构造函数，比如:

```js
var stringObject = new String('hello world') // 创建一个string对象
```
值得注意的是，Udefined 和 Null 比较特殊不会产生对象，对 Symbol 不能使用 new。
对于以字面量形式创建的原始类型（number,string,boolean），能够使用对象的一些方法，本质上是JavaScript 做了“包装对象”。

参考：[JavaScript 标准参考教程 |包装对象](https://javascript.ruanyifeng.com/stdlib/wrapper.html)
