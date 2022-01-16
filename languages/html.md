# HTML 

HTML 的学习分为元素和元素的属性两个方面。
我们使用抽象思维，对 HTML 元素进行分类，得到清晰的知识框架，再根据八二原则，注重常见的 20% 那部分元素，其余的用到再查。
HTML 属性包含元素的特有属性和全局属性，用到再查就好。

参考：[HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)、
[HTML 全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)、
[HTML 知识导图](https://gitmind.cn/app/doc/9765426876)

# 文档元数据
<table>
    <tr>
      <th colspan='6'> 元数据元素 </th>
    </tr>
    <tr>
      <td> head </td>
      <td> base </td>
      <td> link </td>
      <td> meta </td>
      <td> style </td>
      <td> title </td>
    </tr>
</table>

# 文档结构
<table>
  <thead>  
    <tr>
      <th> 主根元素</th>
      <th> 分区根元素</th>
      <th> 内容分区元素</th>
    </tr>
  </thead>
    <tr>
      <td rowspan='9'>html </td>
      <td rowspan='9'> body</td>
      <td> nav</td>
    </tr>
    <tr>
      <td> header</td>
    </tr>
    <tr>
      <td> aside</td>
    </tr>
    <tr>
      <td> main</td>
    </tr>
    <tr>
      <td>article </td>
    </tr>
    <tr>
      <td> section</td>
    </tr>
    <tr>
      <td>h1 ~ h6 </td>
    </tr>
    <tr>
      <td>footer </td>
    </tr>
    <tr>
      <td> address</td>
    </tr>
</table>

# 文档内容
<table>
  <tr>
    <th colspan='9'> 文本元素 </th>
   </tr> 
  <tbody>
    <tr>
      <th rowspan='2' > 文本内容（块）</th>
      <td> div </td>
      <td> hr </td>
      <td> p </td>
      <td> ul </td>
      <td> ol </td>
      <td> li </td>
      <td> figure </td>
      <td> figcaption </td>
    </tr>
    <tr>
      <td > blockquote</td>
      <td> pre</td>
      <td> dd</td>
      <td> dl</td>
      <td colspan='4'> dt</td>
    </tr>
    <tr>
      <th rowspan='4'> 文本语义（内联） </th>
      <td> span </td>
      <td> a </td>
      <td> abbr </td>
      <td> strong </td>
      <td> s </td>
      <td>  u </td>
      <td> b </td>
      <td> i </td>
    </tr>
    <tr>
      <td> small </td>
      <td> em </td>
      <td> br </td>
      <td> cite </td>
      <td> code </td>
      <td> data</td>
      <td> dnf </td>
      <td> time </td>
    </tr>
    <tr>
      <td> var </td>
      <td> bdi </td>
      <td> bdo </td>
      <td> kdb </td>
      <td> mark </td>
      <td> q </td>
      <td> rp </td>
      <td> rt </td>
    </tr>
    <tr>
      <td> ruby </td>
      <td> samp </td>
      <td> sub </td>
      <td> sup </td>
      <td colspan='4'> wbr </td>
    </tr>
    <tr>
      <th> 编辑标识 </th>
      <td> del </td>
      <td colspan='7' > ins </td>
    </tr>
  </tbody>
</table>
<br>

<table>
  <tr>
    <th colspan='6'> 图片和多媒体元素 </th>
  </tr>
  <tr>
    <td> img </td>
    <td> audio </td>
    <td> video </td>
    <td> track</td>
    <td> map </td>
    <td> area </td>
  </tr>
</table>
<br>

<table>
  <tr>
    <th colspan='6'> 数据相关元素 </th>
  </tr>
  <tr>
    <th rowspan='3'> 表单 </th>
    <td> form  </td>
    <td> fieldset </td>
    <td> legend</td>
    <td> label </td>
    <td> input </td>
  </tr>
   <tr>
    <td> datalist </td>
    <td> button </td>
    <td> select  </td>
    <td> option </td>
    <td> optgroup </td>
  </tr>
  <tr>
    <td> textarea</td>
    <td> meter</td>
    <td> output </td>
    <td colspan='2'> progress</td>
  </tr>
  <tr>
    <th rowspan='2'>表格</th>
    <td> table</td>
    <td> caption</td>
    <td> colgroup</td>
    <td> col</td>
    <td> tr</td>
  </tr>
  <tr>
    <td> th</td>
    <td> td</td>
    <td>thead </td>
    <td> tbody</td>
    <td> tfoot</td>
  </tr>
</table> 

# 功能和扩展
<table>
  <tr>
    <th> 内嵌内容 </th>
    <td> embed </td>
    <td> iframe</td>
    <td> object</td>
    <td> param</td>
    <td> picture</td>
    <td> source</td>
  </tr>
  <tr>
    <th>交互元素 </th>
    <td>details </td>
    <td> summary</td>
    <td> dialog</td>
    <td colspan='3'> menu</td>
  </tr>
  <tr>
    <th>脚本元素 </th>
    <td> script</td>
    <td> canvas</td>
    <td colspan='4'> noscript</td>
  </tr>
  <tr> 
    <th> Web 组件 </th>
    <td> template </td>
    <td colspan='5'> slot</td>
  </tr>
</table>
