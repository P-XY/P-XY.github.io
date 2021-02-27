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

###  HTTP 重定向和跳转





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

