# HTTP 协议

## 1. TCP/IP 网络分层模型

**链接层（link layer**）：负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 MAC 地址来标记网络上的设备，所以有时候也叫 MAC 层。
  
**网际层（internet layer）**：IP 协议就处在这一层，负责把许许多多的局域网、广域网连接成一个虚拟的巨大网络，在这个网络里找设备时只要把 IP 地址再“翻译”成 MAC 地址就可以了。

**传输层（transport layer）**：职责是保证数据在 IP 地址标记的两点之间“可靠”地传输，是 TCP 协议工作的层次，另外还有它的一个“小伙伴”UDP。

**应用层（application layer）**：面向具体应用的协议。例如 Telnet、SSH、FTP、SMTP、HTTP 等等。

MAC 层的传输单位是帧（frame），IP 层的传输单位是包（packet），TCP 层的传输单位是段（segment），HTTP 的传输单位则是消息或报文（message）。但这些名词并没有什么本质的区分，可以统称为数据包。**在 TCP/IP 协议栈里，传输数据基本上都是 header+body 的格式，理解数据包的格式很重要**。

## 2. HTTP 连接过程

从浏览器地址栏输入 URL 到页面展示的粗略过程：

- 浏览器的主进程负责 UI 交互，经过一些处理（细节略过），把最终的 URL 发送给浏览器的网络进程。
- 网络进程查询本地资源缓存，没有则进行 DNS 查询（细节略过），获取目标 IP 地址和端口。
- 接下来完成 TCP 三次握手，建立通信通道：[SYN],[SYN,ACK],[ACK] （细节略过）。
- 浏览器把 HTTP 请求报文封装进 TCP 的数据段，以 TCP 作为载体发送了请求报文。
- 服务器收到数据包后发送一个带 [ACK] 的 TCP 表示收到请求。
- 服务器去掉 TCP 头部后开始解析剩下的 HTTP 请求报文，随后发送相应的 HTTP 响应报文。
- 浏览器收到数据包，发送一个带 [ACK] 的 TCP 表示收到。
- 剩余的就是浏览器解析、渲染报文的过程。比较复杂且与 HTTP 无关，要结合渲染引擎和 V8 来说明，这里先略过。  

## 3. HTTP 报文

### 3.1 HTTP 报文结构
HTTP 报文分为请求报文和响应报文，基本结构相同，由以下几部分组成：

1. 起始行（start line）（回车）：描述请求报文（请求行）或响应报文（状态行）的基本信息。
2. 头部字段集合（header）（回车）：分为请求头和响应头，使用 key-value 形式更详细说明报文。
3. 空行：把 body 和 header 分开
4. 消息正文（body）：传输的实体数据。    


通常把 start line 和 header 统称为 header。HTTP 协议规定报文必须有 header，可以没有 body。**HTTP 协议功能都在 header 字段里定义，学习 header 的字段很重要。**

### 3.2 HTTP 实体数据（body)

本节内容：数据类型，压缩格式，语言类型与编码，内容协商质量，内容协商结果。

**数据类型**     
在 TCP/IP 协议栈里，TCP 在传输层只负责传输数据不关心数据类型，而 HTTP 在应用层，必须告知上层应用数据类型。HTTP 取了“多用途互联网邮件扩展（Multipurpose Internet Mail Extensions，简称为 MIME）”的一部分用来标记 body 的数据类型，这就是我们平常总能听到的“MIME type”，形式是“type/subtype”的字符串。

注意：HTTP 使用 content-type 字体段设置数据格式，它是一个通用字段，不仅在响应报文出现，比如用 post 请求向服务器提交一个文件（比如图片），也需要指明数据格式。

**压缩格式**    
但仅有 MIME type 还不够，因为 HTTP 在传输时为了节约带宽，有时候还会压缩数据,还需要有一个“Encoding type”，
比起 MIME type 来说，Encoding type 就少了很多，常用的只有下面三种：
- gzip：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
- deflate：zlib（deflate）压缩格式，流行程度仅次于 gzip；
- br：一种专门为 HTTP 优化的新压缩算法（Brotli）。

**语言类型和字符集**    
MIME type 和 Encoding type 解决了计算机理解 body 数据的问题，但不同国家的人使用了很多不同的语言，虽然都是 text/html，但如何让浏览器显示出每个人都可理解可阅读的语言文字呢？HTTP 采用了与数据类型相似的解决方案，又引入了两个概念：语言类型与字符集。

所谓的“语言类型”就是人类使用的自然语言，也是使用“type-subtype”的形式，例如 zh-CN,en-US。

而字符集，在计算机发展的早期，各个国家和地区的人们发明了许多字符编码方式来处理文字，比如英语世界用的 ASCII、汉语世界用的 GBK，同样的一段文字，用一种编码显示正常，换另一种编码后可能就会变得一团糟。后来就出现了 Unicode 和 UTF-8，把世界上所有的语言都容纳在一种编码方案里，UTF-8 也成为了互联网上的标准字符集。

**内容协商的质量值**    
在 HTTP 协议里用 Accept、Accept-Encoding、Accept-Language 等请求头字段进行内容协商的时候，还可以用一种特殊的“q”参数表示权重来设定优先级，这里的“q”是“quality factor”的意思。权重的最大值是 1，最小值是 0.01，默认值是 1，如果值是 0 就表示拒绝。

**内容协商的结果**    
内容协商的过程是不透明的，每个 Web 服务器使用的算法都不一样。但有的时候，服务器会在响应头里多加一个Vary字段，记录服务器在内容协商时参考的请求头字段，给出一点信息，Vary 字段可以认为是响应报文的一个特殊的“版本标记”。每当 Accept 等请求头变化时，Vary 也会随着响应报文一起变化。也就是说，同一个 URI 可能会有多个不同的“版本”，主要用在传输链路中间的代理服务器实现缓存服务。
    
**小结**
```请求报文
Accpet: text/html,image/webp,application/xml    
Accept-Encoding: gzip, deflate, br
Accpet-Languge: zh-CN,zh;q=0.9,en-US
Accept-Charset: gbk, utf-8
```
```响应报文
Content-Type: text/html;charset=utf-8
Content-Encoding: gzip
Content-Language: zh-CN
Vary: Accept-Encoding,User-Agent,Accept
```

### 3.3 HTTP 传输大文件

本节内容： 分块传输， 范围请求， 多段数据。    

前面说到有 Encoding type 字段可以对文本选择三种压缩方式，但对于二进制文件（比如音视图等文件）就没效果了，因为其本身就已经压缩过了，对于传输大文件（如 1GB 的视频），HTTP 还有什么方式呢？

**分块传输**    
Transfer-Encoding: chunked  ，表示报文里的 body 部分不是一次性发过来的，而是分成了许多的块（chunk）逐个发送。Transfer-Encoding: chunked”和“Content-Length”这两个字段是互斥的，也就是说响应报文里这两个字段不能同时出现，一个响应报文的传输要么是长度已知，要么是长度未知（chunked）。

**范围请求**    
范围请求不是 Web 服务器必备的功能，可以实现也可以不实现，所以服务器必须在响应头里使用字段“Accept-Ranges: bytes”明确告知客户端：“我是支持范围请求的”。如果不支持的话该怎么办呢？服务器可以发送“Accept-Ranges: none”。
请求头Range是 HTTP 范围请求的专用字段，格式是“bytes=x-y”，其中的 x 和 y 是以字节为单位的数据范围

**多段数据**    
范围请求一次只获取一个片段，其实它还支持在 Range 头里使用多个“x-y”，一次性获取多个片段数据。这种情况需要使用一种特殊的 MIME 类型：“multipart/byteranges”，表示报文的 body 是由多段字节序列组成的，并且还要用一个参数“boundary=xxx”给出段之间的分隔标记。

### 3.4 HTTP 的连接管理    

**短连接**    
在 HTTP/0.9/1.0 使用的使短连接，短连接在每次“请求--响应”之后都会使用 TCP 四次挥手断开 TCP 连接，所以短连接已经被抛弃了，
HTTP/1.1 开始，默认开启长连接。

**长连接**    
由于长连接对性能的改善效果非常显著，所以在 HTTP/1.1 中的连接都会默认启用长连接。当然，我们也可以在请求头里明确地要求使用长连接机制，使用的字段是Connection，值是“keep-alive”，不过不管客户端是否显式要求长连接，如果服务器支持长连接，它总会在响应报文里放一个“Connection: keep-alive”字段，告诉客户端：“我是支持长连接的，接下来就用这个 TCP 一直收发数据吧”。

因为 TCP 连接长时间不关闭，服务器必须在内存里保存它的状态，这就占用了服务器的资源。如果有大量的空闲长连接只连不发，就会很快耗尽服务器的资源，导致服务器无法为真正有需要的用户提供服务。所以，长连接也需要在恰当的时间关闭，不能永远保持与服务器的连接，这在客户端或者服务器都可以做到。


在客户端，可以在请求头里加上“Connection: close”字段，告诉服务器：“这次通信后就关闭连接”。

在服务器端，服务器端通常不会主动关闭连接，但也可以使用一些策略。拿 Nginx 来举例，它有两种方式：

1. 使用“keepalive_timeout”指令，设置长连接的超时时间，如果在一段时间内连接上没有任何数据收发就主动断开连接，避免空闲连接占用系统资源。
2. 使用“keepalive_requests”指令，设置长连接上可发送的最大请求次数。比如设置成 1000，那么当 Nginx 在这个连接上处理了 1000 个请求后，也会主动断开连接。

**队头阻塞**      
队头阻塞”与短连接和长连接无关，而是由 HTTP 基本的“请求 - 应答”模型所导致的。
因为 HTTP 规定报文必须是“一发一收”，这就形成了一个先进先出的“串行”队列。队列里的请求没有轻重缓急的优先级，只有入队的先后顺序，排在最前面的请求被最优先处理。如果队首的请求因为处理的太慢耽误了时间，那么队列里后面的所有请求也不得不跟着一起等待，结果就是其他的请求承担了不应有的时间成本。       

**性能优化**    
因为“请求 - 应答”模型不能变，所以“队头阻塞”问题在 HTTP/1.1 里无法解决，只能缓解，有什么办法呢？
可以同时对一个域名发起多个长连接，用数量来解决质量的问题，这在 HTTP 里就是“并发连接”（concurrent connections）。

但这种方式也存在缺陷。如果每个客户端都想自己快，建立很多个连接，用户数×并发数就会是个天文数字。服务器的资源根本就扛不住，或者被服务器认为是恶意攻击，反而会造成“拒绝服务”。

所以，HTTP 协议建议客户端使用并发，但不能“滥用”并发。RFC2616 里明确限制每个客户端最多并发 2 个连接。不过实践证明这个数字实在是太小了，众多浏览器都“无视”标准，把这个上限提高到了 6~8。后来修订的 RFC7230 也就“顺水推舟”，取消了这个“2”的限制。

但“并发连接”所压榨出的性能也跟不上高速发展的互联网无止境的需求，还有什么别的办法吗？

还是用数量来解决质量的思路，使用“域名分片”（domain sharding）技术，HTTP 协议和浏览器不是限制并发连接数量吗？好，那我就多开几个域名，比如 shard1.chrono.com、shard2.chrono.com，而这些域名都指向同一台服务器 www.chrono.com，这样实际长连接的数量就又上去了。


**总结**    
1. 早期的 HTTP 协议使用短连接，收到响应后就立即关闭连接，效率很低；
2. HTTP/1.1 默认启用长连接，在一个连接上收发多个请求响应，提高了传输效率；
3. 服务器会发送“Connection: keep-alive”字段表示启用了长连接；
4. 报文头里如果有“Connection: close”就意味着长连接即将关闭；
5. 过多的长连接会占用服务器资源，所以服务器会用一些策略有选择地关闭长连接；
6. “队头阻塞”问题会导致性能下降，可以用“并发连接”和“域名分片”技术缓解。

### 3.4 HTTP 重定向和跳转

浏览器收到 301/302 报文，会检查响应头里有没有“Location”，Location”字段属于响应字段，必须出现在响应报文里，如果有，就从字段值里提取出 URI，发出新的 HTTP 请求，但只有配合 301/302 状态码才有意义，它标记了服务器要求重定向的 URI。

**重定向的应用场景**     
一个最常见的原因就是“资源不可用”，需要用另一个新的 URI 来代替。例如域名变更、服务器变更、网站改版、系统维护，这些都会导致原 URI 指向的资源无法访问，为了避免出现 404，就需要用重定向跳转到新的 URI。

另一个原因就是“避免重复”，让多个网址都跳转到一个 URI，增加访问入口的同时还不会增加额外的工作量。例如，有的网站都会申请多个名称类似的域名，然后把它们再重定向到主站上。

**重定向的相关问题**     
第一个问题是“性能损耗”，重定向的机制决定了一个跳转会有两次请求 - 应答，比正常的访问多了一次。虽然 301/302 报文很小，但大量的跳转对服务器的影响也是不可忽视的。站内重定向还好说，可以长连接复用，站外重定向就要开两个连接，如果网络连接质量差，那成本可就高多了，会严重影响用户的体验。

第二个问题是“循环跳转”，如果重定向的策略设置欠考虑，可能会出现“A=>B=>C=>A”的无限循环，不停地在这个链路里转圈圈，后果可想而知。

### 3.5 HTTP 的 cookie 机制


HTTP 是“无状态”的，这既是优点也是缺点。优点是服务器没有状态差异，可以很容易地组成集群，而缺点就是无法支持需要记录状态的事务操作。好在 HTTP 协议是可扩展的，后来发明的 Cookie 技术，给 HTTP 增加了“记忆能力”。

**cookie 的工作过程**    
这要用到两个字段：响应头字段Set-Cookie和请求头字段Cookie。

当用户通过浏览器第一次访问服务器的时候，服务器肯定是不知道他的身份的。所以，就要创建一个独特的身份标识数据，格式是“key=value”，然后放进 Set-Cookie 字段里，随着响应报文一同发给浏览器。

浏览器收到响应报文，看到里面有 Set-Cookie，知道这是服务器给的身份标识，于是就保存起来，下次再请求的时候就自动把这个值放进 Cookie 字段里发给服务器。

**cookie 的属性**    
设置 Cookie 的生存周期：可以使用 Expires 和 Max-Age 两个属性来设置。

Expires”俗称“过期时间”，用的是绝对时间点，可以理解为“截止日期”（deadline）。“Max-Age”用的是相对时间，单位是秒，浏览器用收到报文的时间点再加上 Max-Age，就可以得到失效的绝对时间。如果不指定Expires 或 Max-Age,那么 cookie 仅在浏览器运行时有效，一旦浏览器关闭则失效，这被称为会话 Cookie（sessioin cookie）或内存 cookie（in-memory cookie），在 Chrome 里过期时间会显示为 “Session” 或 “N/A”。

设置 Cookie 的作用域：作用域的设置比较简单，“Domain”和“Path”指定了 Cookie 所属的域名和路径，浏览器在发送 Cookie 前会从 URI 中提取出 host 和 path 部分，对比 Cookie 的属性。如果不满足条件，就不会在请求头里发送 Cookie。

Cookie 的安全性：写过前端的同学一定知道，在 JS 脚本里可以用 document.cookie 来读写 Cookie 数据，这就带来了安全隐患，有可能会导致“跨站脚本”（XSS）攻击窃取数据。属性“HttpOnly”会告诉浏览器，此 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 document.cookie 等一切相关的 API，脚本攻击也就无从谈起了。还有一个属性叫“Secure”，表示这个 Cookie 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送。但 Cookie 本身不是加密的，浏览器里还是以明文的形式存在。


**cookie 的应用**   
Cookie 最基本的一个用途就是身份识别，保存用户的登录信息，实现会话事务。Cookie 的另一个常见用途是广告跟踪。

你上网的时候肯定看过很多的广告图片，这些图片背后都是广告商网站（例如 Google），它会“偷偷地”给你贴上 Cookie 小纸条，这样你上其他的网站，别的广告就能用 Cookie 读出你的身份，然后做行为分析，再推给你广告。

这种 Cookie 不是由访问的主站存储的，所以又叫“第三方 Cookie”（third-party cookie）。如果广告商势力很大，广告到处都是，那么就比较“恐怖”了，无论你走到哪里它都会通过 Cookie 认出你来，实现广告“精准打击”。

为了防止滥用 Cookie 搜集用户隐私，互联网组织相继提出了 DNT（Do Not Track）和 P3P（Platform for Privacy Preferences Project），但实际作用不大。

虽然现在已经出现了多种 Local Web Storage 技术，能够比 Cookie 存储更多的数据，但 Cookie 仍然是最通用、兼容性最强的客户端数据存储手段。

**参考：** [https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

### 3.6 HTTP 的缓存控制

缓存（Cache）是计算机领域里的一个重要概念，是优化系统性能的利器。

HTTP 传输的每一个环节基本上都会有缓存，非常复杂。基于“请求 - 应答”模式的特点，可以大致分为客户端缓存和服务器端缓存，因为服务器端缓存经常与代理服务“混搭”在一起，客户端缓存——也就是浏览器的缓存。

**服务器的缓存控制**    
服务器标记资源有效期使用的头字段是“Cache-Control”，其中属性有：    
- max-age=value，资源的有效时间，时间的计算起点是响应报文的创建时刻。最常用。 
- no_store：不允许缓存，用于某些变化非常频繁的数据，例如秒杀页面   
- no_cache：可以缓存，但在使用之前必须要去服务器验证是否过期，是否有最新的版本，可以理解为“max-age=0,must-revalidate”
- must-revalidate：它的意思是如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。
  

**客户端的缓存控制**    
其实不止服务器可以发“Cache-Control”头，浏览器也可以发“Cache-Control”，也就是说请求 - 应答的双方都可以用这个字段进行缓存控制，互相协商缓存的使用策略。

当你点“刷新”按钮的时候，浏览器会在请求头里加一个“Cache-Control: max-age=0”，浏览器就不会使用缓存，而是向服务器发请求。服务器看到 max-age=0，也就会用一个最新生成的报文回应浏览器。

Ctrl+F5 的“强制刷新”又是什么样的呢？ 它其实是发了一个“Cache-Control: no-cache”，含义和“max-age=0”基本一样，就看后台的服务器怎么理解，通常两者的效果是相同的。

**条件请求**     
浏览器用“Cache-Control”做缓存控制只能是刷新数据，不能很好地利用缓存数据，又因为缓存会失效（max-age 过期），使用前还必须要去服务器验证是否是最新版。那要怎么验证呢？

HTTP 协议就定义了一系列“If”开头的“条件请求”字段，专门用来检查验证资源是否过期，条件请求一共有 5 个头字段，我们最常用的是“if-Modified-Since”和“If-None-Match”这两个。需要第一次的响应报文预先提供“Last-modified”（文件的最后修改时间）和“ETag”（是资源的一个唯一标识，主要是用来解决修改时间无法准确区分文件变化的问题）。

“if-Modified-Since” 配合 “Last-modified” 使用，“If-None-Match” 配合 “ETag” 使用。如果资源没有变，服务器就回应一个“304 Not Modified”，表示缓存依然有效，浏览器就可以更新一下有效期，然后放心大胆地使用缓存了。

**小结**    
我们学习了 HTTP 的缓存控制和条件请求，用好它们可以减少响应时间、节约网络流量。

### 3.7 HTTP 的代理服务

所谓的“代理服务”就是指服务本身不生产内容，而是处于中间位置转发上下游的请求和响应，具有双重身份：面向下游的用户时，表现为服务器，代表源服务器响应客户端的请求；而面向上游的源服务器时，又表现为客户端，代表客户端发送请求。

**代理的作用**    
代理最基本的一个功能是**负载均衡**，因为在面向客户端时屏蔽了源服务器，代理服务器掌握了请求分发的“大权”，决定由后面的哪台服务器来响应请求。

在负载均衡的同时，代理服务还可以执行更多的功能，比如：    
- 健康检查：使用“心跳”等机制监控后端服务器，发现有故障就及时“踢出”集群，保证服务高可用；
- 安全防护：保护被代理的后端服务器，限制 IP 地址或流量，抵御网络攻击和过载；
- 加密卸载：对外网使用 SSL/TLS 加密通信认证，而在安全的内网不加密，消除加解密成本；
- 数据过滤：拦截上下行的数据，任意指定策略修改请求或者响应；
- 内容缓存：暂存、复用服务器响应；

**代理相关头字段**    
因为代理“欺上瞒下”的特点，隐藏了真实客户端和服务器，如果双方想要获得这些“丢失”的原始信息，该怎么办呢？

首先，代理服务器需要用字段“Via”标明代理的身份，Via 是一个通用字段，请求头或响应头里都可以出现。每当报文经过一个代理节点，代理服务器就会把自身的信息追加到字段的末尾，如果通信链路中有很多中间代理，就会在 Via 里形成一个链表，这样就可以知道报文究竟走过了多少个环节才到达了目的地。

Via 字段只解决了客户端和源服务器判断是否存在代理的问题，还不能知道对方的真实信息。服务器的 IP 地址应该是保密的，关系到企业的内网安全，所以一般不会让客户端知道。通常服务器需要知道客户端的真实 IP 地址，方便做访问控制、用户画像、统计分析。可惜的是 HTTP 标准里并没有为此定义头字段。但已经出现了很多“事实上的标准”，最常用的两个头字段是“X-Forwarded-For”和“X-Real-IP”。

“X-Forwarded-For”的字面意思是“为谁而转发”，“Via”追加的是代理主机名（或者域名），而“X-Forwarded-For”追加的是请求方的 IP 地址。
X-Real-IP”是另一种获取客户端真实 IP 的手段，它的作用很简单，就是记录客户端 IP 地址，没有中间的代理信息，相当于是“X-Forwarded-For”的简化版。

另外有两个字段，“X-Forwarded-Host”和“X-Forwarded-Proto”，它们的作用与“X-Real-IP”类似，只记录客户端的信息，分别是客户端请求的原始域名和原始协议名。

**代理协议**    
有了“X-Forwarded-For”等头字段，源服务器就可以拿到准确的客户端信息了。但对于代理服务器来说它并不是一个最佳的解决方案。因为通过“X-Forwarded-For”操作代理信息必须要解析 HTTP 报文头，这对于代理来说成本比较高，原本只需要简单地转发消息就好，而现在却必须要费力解析数据再修改数据，会降低代理的转发性能。另一个问题是“X-Forwarded-For”等头必须要修改原始报文，而有些情况下是不允许甚至不可能的（比如使用 HTTPS 通信被加密）。

所以就出现了一个专门的“代理协议”（The PROXY protocol），它由知名的代理软件 HAProxy 所定义，也是一个“事实标准”，被广泛采用。

代理协议”有 v1 和 v2 两个版本，v1 和 HTTP 差不多，也是明文，而 v2 是二进制格式。
v1 比较好理解，它在 HTTP 报文前增加了一行 ASCII 码文本，相当于又多了一个头。这一行文本其实非常简单，开头必须是“PROXY”五个大写字母，然后是“TCP4”或者“TCP6”，表示客户端的 IP 地址类型，再后面是请求方地址、应答方地址、请求方端口号、应答方端口号，最后用一个回车换行（\r\n）结束。

例如下面的这个例子，在 GET 请求行前多出了 PROXY 信息行，客户端的真实 IP 地址是“1.1.1.1”，端口号是 55555。
```html
PROXY TCP4 1.1.1.1 2.2.2.2 55555 80\r\n
GET / HTTP/1.1\r\n
Host: www.xxx.com\r\n
\r\n
```






### 3.8 HTTP 的缓存代理






## 4. HTTP 的安全（HTTPS）

## 5. HTTP/2

## 6. HTTP 性能优化

## 7. 总结

- 根据HTTP 的特点（从优缺点谈，如通信模式、安全性、开放性、传输效率），从而有了xxx



















## 参考

网络协议也是要着重了解的，尤其是 HTTP/2，还有 HTTP 的几种请求方式：短连接、长连接、Stream 连接、WebSocket 连接.


- [《Web性能权威指南》(原著：High Performance Browser Networking)](https://book.douban.com/subject/25856314/)
- HTTP/2
  - [Gitbook - HTTP/2详解](https://legacy.gitbook.com/book/ye11ow/http2-explained/details)
  - [HTTP/2 for a Faster Web](https://cascadingmedia.com/insites/2015/03/http-2.html)
  - [Nginx HTTP/2 白皮书](https://www.nginx.com/wp-content/uploads/2015/09/NGINX_HTTP2_White_Paper_v4.pdf)
  - HTTP/2的两个RFC
    - [Hypertext Transfer Protocol Version 2 (HTTP/2)](https://httpwg.org/specs/rfc7540.html)
    - [HPACK: Header Compression for HTTP/2](https://httpwg.org/specs/rfc7541.html)
- WebSocket
  - [HTML5 WebSocket: A Quantum Leap in Scalability for the Web](http://www.websocket.org/quantum.html)
  - [My Understanding of HTTP Polling, Long Polling, HTTP Streaming and WebSockets](https://stackoverflow.com/questions/12555043/my-understanding-of-http-polling-long-polling-http-streaming-and-websockets)
  - [awesome-websockets](https://github.com/facundofarias/awesome-websockets)
  - 一些Websocket的想法
    - [Introducing WebSockets: Bringing Sockets to the Web](https://www.html5rocks.com/en/tutorials/websockets/basics/)
    - [Websockets 101](https://lucumr.pocoo.org/2012/9/24/websockets-101/)
    - [The State of Real-Time Web in 2016](https://banksco.de/p/state-of-realtime-web-2016.html)
    - [WebSockets, caution required!](https://samsaffron.com/archive/2015/12/29/websockets-caution-required)

