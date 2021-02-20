# HTTP 协议

## 1. TCP/IP 网络分层模型

**链接层（link layer**）：负责在以太网、WiFi 这样的底层网络上发送原始数据包，工作在网卡这个层次，使用 MAC 地址来标记网络上的设备，所以有时候也叫 MAC 层。
  
**网际层（internet layer）**：IP 协议就处在这一层，负责把许许多多的局域网、广域网连接成一个虚拟的巨大网络，在这个网络里找设备时只要把 IP 地址再“翻译”成 MAC 地址就可以了。

**传输层（transport layer）**：职责是保证数据在 IP 地址标记的两点之间“可靠”地传输，是 TCP 协议工作的层次，另外还有它的一个“小伙伴”UDP。

**应用层（application layer）**：面向具体应用的协议。例如 Telnet、SSH、FTP、SMTP、HTTP 等等。

MAC 层的传输单位是帧（frame），IP 层的传输单位是包（packet），TCP 层的传输单位是段（segment），HTTP 的传输单位则是消息或报文（message）。但这些名词并没有什么本质的区分，可以统称为数据包。

## 2. HTTP 连接过程



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

