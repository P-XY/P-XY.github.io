<div align="center">
    <h1 >工具百宝箱 </h1>  
</div>

## 工具

- [在线练习打字速度](http://www.daziba.cn/)
- [JSON在线解析](https://www.json.cn/)
- [阿里巴巴矢量图](https://www.iconfont.cn/)
- [浏览器翻译插件：彩云小译](https://fanyi.caiyunapp.com/#/web)

## 代码编辑器 vscode
- [vscode官方手册](https://code.visualstudio.com/docs)
- [炫酷特效插件 power mode](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-power-mode)
- [vscode主题 bear](https://marketplace.visualstudio.com/items?itemName=dahong.theme-bear)
- [编程字体 Fira Code](https://github.com/tonsky/FiraCode)
- [查看PDF的插件：vscode-pdf](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf)

## 其他文档

- [中文技术文档的写作规范](https://github.com/ruanyf/document-style-guide)
- [超完整的Chrome浏览器客户端调试大全](http://www.igeekbar.com/igeekbar/post/156.htm)
- [猴子都能懂的Git入门](https://backlog.com/git-tutorial/cn/)
- [Git CheatSheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [vscode快捷键](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
- [Markdown 教程](https://www.runoob.com/markdown/md-tutorial.html)
- [GitBook简明教程](http://www.chengweiyang.cn/gitbook/)



### 2.Git配置

1. Ubuntu下安装:
	
    ``$sudo apt-get install git``
2. 全局设置：
	
	``$git config --global user.name "用户名“``
    ``$git config --global user.email "用户email”``
3. 创建ssh秘钥：
	
    ``$ssh-keygen -t rsa -C "用户email"``
4. 在Github添加sshkey：
	
    ``$cd ~`` #回到/home目录
	``$ls -a``# 会看到有一个.ssh文件夹，把里面的id_rsa.pub公钥添加到Github上
    ``$ssh-T git@github.com``# 认证本地是否与Github完成连接
