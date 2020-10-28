# Chrome 工作原理


## 1.  Chrome 的架构

经过历史的发展， chrome  由当初的单进程发展到现在更加稳定的多进程架构：

**浏览器进程（Browser Process）**

    主要负责页面展示、用户交互、子进程管理，同时提供存储等功能。

**渲染进程（安全的沙箱模式 sandbox）**

    默认情况下 Chrome 会为 每个 Tab 标签创建一个渲染进程， 负责将 HTML、CSS、和 JavaScript 转化为网页，
    排版引擎 Blink 和 JavaScript 引擎 V8 都是在该进程中。

**网络进程** 
    
    负责页面的网络资源下载。

**GPU 进程**

    网页和 Chrome 的 UI 界面都是采用 GPU 来绘制。  

**插件进程（sandbox）**

    负责插件的运行，为了安全所以运行在沙箱模式下，插件进程独立出来使得插件崩溃不会影响到网页。













## 2. 浏览器中的 JavaScript 执行机制
 