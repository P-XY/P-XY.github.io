## 递归

在学习非线性的数据结构之前，有必要先学习递归，递归能使我们能更简单的操作树和图数据结构。

### 概念： 递归就是函数调用自身。 使用递归必须设置终止点。
### 例子
- 栗子1: 常规斐波那契
```js
//斐波那契数列: 0 , 1, 1 ,2 ,
function fibonacci( n ){
    if(n < 1){ return 0 }
    if(n <= 2){ return 1 }
    return fibonacci( n-1) + fibonacci( n-2 )
}
```

- 栗子2：使用缓存去冗余计算的斐波那契
```js
function fibonacciMemoization(n) {
  if (n < 1) { return 0 }
  const memo = [0, 1]
  const fibonacciMem = num => {
    if (memo[num] != null) { return memo[num] }
    return (memo[num] = fibonacciMem(num - 1) + fibonacciMem(num - 2))
  };
  return fibonacciMem(n);
}
```

- 栗子3：带缓存结果的最终版斐波那契
```js
function memoizer(fun) {
    let cache = {}
    return function (n) {
        if (cache[n] != undefined) {
            return cache[n]
        } else {
            let result = fun(n)
            cache[n] = result
            return result
        }
    }
}
// 使用栗子2中的fibonacciMemoization
fibonacci = memoizer(fibonacciMemoization)
fibonacci(5)
fibonacci(10)
fibonacci(5)
```

### 参考

- [Web 性能优化：理解及使用 JavaScript 缓存](https://mp.weixin.qq.com/s/PEjEfP9HwqnYt34YN6E8Zw)
- [Fibonacci(斐波那契数列)的最佳实践方式(JavaScript)](https://www.cnblogs.com/iriszhang/p/6093175.html)
- [尾递归为啥能优化？](https://zhuanlan.zhihu.com/p/36587160)