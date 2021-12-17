# 概念
- viewport

viewport这个概念来自于移动端，代表移动浏览器的web视窗。比如pc web的主流视窗为980px的盒子模型，手机屏幕小，为了可以正常查看pc web，viewport大小设计得比手机屏幕大很多，主流也是980px，那么在移动端查看 pc web，需要通过缩放和平移，否则字体和图片都太小。

- device-width

viewport只是解决了在移动浏览器正常查看pc web的基本需求，需要通过缩放和平移，体验非常差。我们需要一种针对移动设备的web，即mobile web。那么在开发上首先要解决的就是找到合适的“移动端浏览器”的视窗，即理想视窗。 理想视窗的尺寸一般是移动设备的屏幕。
<meta name="viewport" content="width=device-width, initial-scale=1.0">


- web app的布局方式

web app其实有pc和移动端之分，前端工程师都要了解。这里只涉及移动端。
移动端布局主要是解决不同尺寸的手机也能有自适应的ui，目前采用【rem实现自适应布局:font-size的响应式】 和【vm单位设置屏幕百分比】。

- rem

rem是一个相对单位，rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小——MDN。

因此，只要设置了根元素的字体大小，其他的元素就可以使用rem作为单位。

- vm
vm单位是：屏幕尺寸/100，可以用来布局代替rem，目前兼容性不太好，但因该是未来的趋势。

- 关于rem和vm

并不是rem和vm哪个好，关键在于设计图是采用哪种方式设计的。
如果设计图是采用100px（或者任何10的倍数），那么vm更方便。
如果设计图采用750，640，320等等，那么vm不适用，反而是rem好使。

# 布局

rem是弹性布局的一种实现方式，弹性布局可以算作响应式布局的一种，但响应式布局不是弹性布局，弹性布局强调等比缩放，100%还原；响应式布局强调不同屏幕要有不同的显示，比如媒体查询。

- 布局方法
查看:[从网易与淘宝的font-size思考前端设计稿与工作流](https://www.cnblogs.com/lyzg/p/4877277.html) 中网易云的布局方式。

# flex使用原理：

每个元素都有display属性，设置display为flex，那这个元素就可以使用flex布局。

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。
它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

## container 6个属性

flex-direction: 设置item的排列方向(4个值，左右上下)
flex-wrap： 设置item排列空间不足时，是否换行（3个值）
flex-flow： 这个是flex-direction 和 flex-wrap 属性的缩写。

justify-content: 定义item在主轴上的对齐方式(5种)


align-items：定义item在交叉轴上的对齐方式(5种)

align-content： 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## item 6个属性

order： 定义项目的排列顺序。数值越小，排列越靠前，默认为0。
flex-grow： 定义项目的放大比例，默认为0。即如果存在剩余空间，也不放大
flex-shrink： 定义了项目的缩小比例，默认为1，即如果空间不足，将缩小。
flex-basis： 定义item占据主轴的空间，默认为auto。
flex：  是flex-grow, flex-shrink 和 flex-basis的简写。 
align-self： 允许单个项目有与其他项目不一样的对齐方式，默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch