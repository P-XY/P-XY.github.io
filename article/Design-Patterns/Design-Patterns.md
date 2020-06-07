

## 第二部分（14个设计模式）

学习规则： 定义（是什么）、应用场景（用来做什么）、实现（怎么做）

### 1.单例模式

- 定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
- 场景：比如线程池、全局缓存、浏览器中的 window 对象等。
- 实现：符合单一职责原则，把创建对象和管理单例分开，可解耦

```js
//模拟用户点击登录，弹出登录窗口
//js本身并无类，因此用函数模拟单例类

//管理单例
var getSingle = function( fn ){ 
    var result; 
    return function(){ 
        return result || ( result = fn .apply(this, arguments ) ); 
    } 
};
//创建对象的函数（模拟类）：登录窗口
var createLoginLayer = function(){ 
    var div = document.createElement( 'div' ); 
    div.innerHTML = '我是登录浮窗'; 
    div.style.display = 'none'; 
    document.body.appendChild( div ); 
    return div; 
}; 
var createSingleLoginLayer = getSingle( createLoginLayer ); 
document.getElementById( 'loginBtn' ).onclick = function(){ 
    var loginLayer = createSingleLoginLayer(); 
    loginLayer.style.display = 'block'; 
};

```
### 2.策略模式

- 定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
- 场景：消除各种if-else判断
- 实现：模拟登录表单的用户输入校验

```html
<html> 
    <body> 
        <form action="http:// xxx.com/register" id="registerForm" method="post"> 
            请输入用户名：<input type="text" name="userName"/ > 
            请输入密码：<input type="text" name="password"/ > 
            请输入手机号码：<input type="text" name="phoneNumber"/ > 
            <button>提交</button> 
        </form> 
    <script> 
/***********************策略对象**************************/ 
    var strategies = { 
        isNonEmpty: function( value, errorMsg ){ 
            if ( value === '' ){ 
                return errorMsg; 
            } 
        }, 
        minLength: function( value, length, errorMsg ){ 
            if ( value.length < length ){ 
                return errorMsg; 
            } 
        }, 
        isMobile: function( value, errorMsg ){ 
            if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){ 
                return errorMsg; 
            } 
        } 
    }; 
 /***********************Validator 类**************************/ 
    var Validator = function(){ 
        this.cache = []; 
    }; 
    Validator.prototype.add = function( dom, rules ){ 
        var self = this; 
        for ( var i = 0, rule; rule = rules[ i++ ]; ){ 
            (function( rule ){ 
                var strategyAry = rule.strategy.split( ':' ); 
                var errorMsg = rule.errorMsg; 
                self.cache.push(function(){ 
                    var strategy = strategyAry.shift();
                    strategyAry.unshift( dom.value ); 
                    strategyAry.push( errorMsg ); 
                    return strategies[ strategy ].apply( dom, strategyAry ); 
                    }); 
            })( rule ) 
        } 
    };
    Validator.prototype.start = function(){ 
        for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){ 
            var errorMsg = validatorFunc(); 
            if ( errorMsg ){ 
                return errorMsg; 
            } 
        } 
    };
    /***********************客户调用代码**************************/ 
    var registerForm = document.getElementById( 'registerForm' );
    var validataFunc = function(){ 
        var validator = new Validator();

        validator.add( registerForm.userName, [{ 
            strategy: 'isNonEmpty', 
            errorMsg: '用户名不能为空' 
        }, { 
            strategy: 'minLength:6', 
            errorMsg: '用户名长度不能小于 10 位' 
        }]);

        validator.add( registerForm.password, [{ 
            strategy: 'minLength:6', 
            errorMsg: '密码长度不能小于 6 位' 
        }]);

        validator.add( registerForm.phoneNumber, [{ 
            strategy: 'isMobile', 
            errorMsg: '手机号码格式不正确' 
        }]);

        var errorMsg = validator.start(); 
        return errorMsg;
    }
    registerForm.onsubmit = function(){ 
        var errorMsg = validataFunc(); 
        if ( errorMsg ){ 
            alert ( errorMsg ); 
            return false; 
        }
    }
    </script> 
    </body> 
 </html>
```
### 3.代理模式

- 定义：代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
- 场景：虚拟代理、缓存代理
- 实现：缓存复杂计算，对于相同的计算，下次直接返回结果
```js
/**************** 计算乘积 *****************/ 
var mult = function(){ 
    var a = 1; 
    for ( var i = 0, l = arguments.length; i < l; i++ ){ 
        a = a * arguments[i]; 
    } 
    return a; 
}; 
/**************** 计算加和 *****************/ 
var plus = function(){ 
    var a = 0; 
    for ( var i = 0, l = arguments.length; i < l; i++ ){ 
        a = a + arguments[i]; 
    } 
    return a; 
}; 
/**************** 创建缓存代理的工厂 *****************/ 
var createProxyFactory = function( fn ){ 
    var cache = {}; 
    return function(){ 
        var args = Array.prototype.join.call( arguments, ',' ); 
        if ( args in cache ){ 
            return cache[ args ]; 
        } 
        return cache[ args ] = fn.apply( this, arguments ); 
    } 
}; 
var proxyMult = createProxyFactory( mult ), 
proxyPlus = createProxyFactory( plus ); 
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24 
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24 
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10 
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
```

### 4.迭代器模式

- 定义：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
- 场景：

### 5.发布订阅（观察者）模式

- 定义： 对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
- 场景： 
- 实现：

### 6.命令模式

- 定义：命令模式中的命令（command）指的是一个执行某些特定事情的指令。
- 场景：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。
        此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
- 实现：

### 7.组合模式

- 定义： 组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成的。
- 场景： 
- 实现：

### 8.模板方法模式

- 定义：子类实现中的相同部分被上移到父类中，然后子类继承父类。不同的部分留待子类来实现。
- 场景：
- 实现：

### 9.享元模式

- 定义：享元模式是为解决性能问题而生的模式，在一个存在大量相似对象的系统中，享元模式可以很好地解决大量对象带来的性能问题。
- 场景：
- 实现：

### 10.职责链模式

- 定义：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
- 场景：
- 实现：

### 11.中介者模式

- 定义：
- 场景：
- 实现：

### 12.装饰者模式

- 定义：装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。
- 场景：
- 实现：

### 13. 状态模式

- 定义：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。
- 场景：
- 实现：

### 14.适配器模式

- 定义：适配器模式的作用是解决两个软件实体间的接口不兼容的问题。
- 场景：
- 实现：

