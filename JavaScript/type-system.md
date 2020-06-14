# JavaScript 之类型系统

JavaScript 规定了8种数据类型：

1. Undefined 
2. Null
3. Boolean
4. String
5. Number
6. Symbol
7. BigInt（提案中，暂时略过）
8. Object

从变量、参数、表达式、函数返回值等，任何JavaScript代码运行过程中产生的数据，都囊括在这8种数据类型中,其中除了Obejct类型，其他7种类型都是不可变的，称为原始类型。接下来我们从简单到复杂重新学习一下这些类型。    

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

描述： Null类型也只有一个值 null，但null 是关键字，表示空，比如：变量已声明且赋值，但值为空。

参考： [MDN | null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)

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


