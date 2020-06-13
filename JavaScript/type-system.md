# JavaScript 之类型系统

JavaScript 规定了8种数据类型：

1. Undefined 
2. Null
3. Boolean
4. String
5. Number
6. Symbol
7. BigInt
8. Object

从变量、参数、表达式、函数返回值等，任何JavaScript代码运行过程中产生的数据，都囊括在这8种数据类型中,其中除了Obejct类型，其他7种类型都是不可变的，称为原始类型。接下来我们从简单到复杂重新学习一下这些类型。    

参考：[MDN | JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

##  1. Udefined 类型

> Q : 为什么有的编程规范要求用 void 0 代替 undefined？

描述： Undefined 类型表示未定义，它的类型只有一个值，就是 undefined，任何变量在赋值前是 Undefined 类型、值为 undefined 。

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

描述： String 用于表示文本数据，不同于C语言，JavaScript 字符串是不可更改的。String 采用的是 UTF16 编码，比如符串的操作 charAt、charCodeAt、length 等方法针对的都是 UTF16 编码。 所以处理非BMP（超出 U+0000 - U+FFFF 范围）的字符时，你应该格外小心。因为根据UTF16编码，基本平面（BMP）的字符占用2个字节，辅助平面的字符占用4个字节。因此，String的最大长度，实际上是受字符串的编码长度（BMP或非BMP）影响的。

参考：[阮一峰的网络日志: Unicode与JavaScript详解](https://www.ruanyifeng.com/blog/2014/12/unicode.html)


## Number

> Q： 0.1 + 0.2不是等于0.3么？为什么JavaScript里不是这样的？

