## 前端开发命名规范
___

### 常见的不规范命名
1. 单词拼写错误
举个例子，提交表单<font color="red">(把 Form 写成了 From )submitFrom(){...}</font>如果单词拼写错误，比如 form 和 from 都是正确的单词，但完全不一样的意思，如果把 form 写成 from ，以后读代码的人（也可能是你自己），很有可能会懵逼。

2. 中英文混用
单词拼写错误会误导别人，中英文混用这个命名方式让人很难以理解。
举个例子，<font color="red">let chanpinList=[];</font>这个变量名混用中英文，没有注释的话，意思很不容易理解，而且汉语拼音搭配英文，就像是汉服上衣配西服裤子，很low。也有一种情况，有些名词，被中国人创造出来（淘宝-taobao，微博-weibo），没有英文翻译。这时就可以用中文拼音命名，其他的情况都建议用英文。

3. 以1-9，a-z命名
这个情况相信大家都会遇到过，比如页面上有几个按钮，有人命名成 btn1，btn2，btn3，btn4...或者 btnA，btnB，btnC，btnD。这样的命名看似简单，但实际上从这些命名里面读取不到任何信息，以后可能会痛苦些。

4. 混用命名格式
比如表示评论列表，有地方这样命名：comments，另一个地方这样命名： comment-list，还有这样命名： commentList，几种规范混在一起，就感觉不规范了。

5. 单复数不分
分别有两个操作函数，一个是下载全部订单数据，一个是下载当前订单数据。但是两个函数的命名，一个是downloadOrderData，另一个是downloadOrder。面对这样的情况，建议还是区分下单复数，downloadOrder，downloadOrderAll/downloadOrderList。**区分了单复数的命名，如果有返回值，也可以让别人大概知道，单数可能就是返回单个记录，复数可能返回一个数组。**

6. 正反义词错用
比如：分别有两个操作函数，一个是显示弹窗，一个是关闭弹窗。结果命名上面，一个是 showEditDialog ，另一个是 closeEditDialog 。
上面的案例，show 和 close ，一个是显示，一个是关闭，显然不是正反义词。应该出现的姿势是，showEditDialog 和 hideEditDialog ，或者 openEditDialog 和 closeEditDialog。


### 命名
#### 1. 驼峰式命名法介绍
Pascal Case 大驼峰式命名法：首字母大写。eg：StudentInfo、UserInfo、ProductInfo

Camel Case 小驼峰式命名法：首字母小写。eg：studentInfo、userInfo、productInfo

#### 2. 文件资源命名
文件名不得含有空格。

文件名建议只使用小写字母，不使用大写字母。( 为了醒目，某些说明文件的文件名，可以使用大写字母，比如README、LICENSE)。

文件名包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔。

引入资源使用相对路径，不要指定资源所带的具体协议 ( http:,https: ) ，除非这两者协议都不可用。

不推荐：

```
<script src="http://cdn.com/foundation.min.js"></script>
```

推荐：
```
<script src="//cdn.com/foundation.min.js"></script>
```

#### 3. 变量命名
命名方式 : 小驼峰式命名方法

命名规范 : 类型+对象描述的方式，如果没有明确的类型，就可以使前缀为名词。
类型

小写字母

array => a

boolean => b

function => fn

int => i

object => o

regular => r

string => s

eg.
```
var oDiv = document.body
```

推荐：

```
var tableTitle = "LoginTable"
```

不推荐：

```
var getTitle = "LoginTable"
```
#### 4. 函数
命名方式 : 小驼峰方式 ( 构造函数使用大驼峰命名法 )

命名规则 : 前缀为动词

动词

含义

返回值

can: 判断是否可执行某个动作 ( 权限 )
true-可执行，false-不可执行

has: 判断是否含有某个值
true-含有此值，false-不含此值

is: 判断是否为某个值
true-为某个值，false-不为某值

get: 获取某个值
函数返回一个非布尔值

set: 设置某个值
无返回值、返回是否设置成功或者返回链式对象

推荐：
```
//是否可阅读
function canRead(){
    return true;
}

//获取姓名
function getName{
    return this.name
}

```
#### 5. 常量
命名方法 : 全部大写

命名规范 : 使用大写字母和下划线来组合命名，下划线用以分割单词。

推荐：
```
 var MAX_COUNT = 10;
 var URL = 'http://www.baidu.com';

```
#### 6. 类的成员

公共属性和方法 : 同变量命名方式

私有属性和方法 : 前缀为下划线(_)后面跟公共属性和方法一样的命名方式

推荐：
```
function Student(name) {
    var _name = name; // 私有成员

    // 公共方法
    this.getName = function () {
        return _name;
    }

    // 公共方式
    this.setName = function (value) {
        _name = value;
    }
}
var st = new Student('tom');
st.setName('jerry');
console.log(st.getName()); // => jerry：输出_name私有变量的值

```
#### 7. 注释规范
单独一行：//(双斜线)与注释文字之间保留一个空格

在代码后面添加注释：//(双斜线)与代码之间保留一个空格，并且//(双斜线)与注释文字之间保留一个空格。

注释代码：//(双斜线)与代码之间保留一个空格。

推荐 :
```
// 调用了一个函数；1)单独在一行
setTitle();

var maxCount = 10; // 设置最大量；2)在代码后面注释

// setName(); // 3)注释代码

```

多行注释 ( / 注释说明 / )

若开始(/_和结束(_/)都在一行，推荐采用单行注释

若至少三行注释时，第一行为/_，最后行为_/，其他行以_开始，并且注释文字与_保留一个空格。

推荐 :
```
/*
* 代码执行到这里后会调用setTitle()函数
* setTitle()：设置title的值
*/
setTitle();

```

#### 8. 函数 ( 方法 ) 注释
函数(方法)注释也是多行注释的一种，但是包含了特殊的注释要求。

```
/** 
* 函数说明 
* @关键字 
*/

```

@param 参数名 {参数类型} 描述信息
@return {返回类型} 描述信息
@author 作者信息 [附属信息：如邮箱、日期]
@version XX.XX.XX描述此函数的版本号
@example 示例代码

```
/**
 - 合并Grid的行
 - @param grid {Ext.Grid.Panel} 需要合并的Grid
 - @param cols {Array} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
 - @param isAllSome {Boolean} ：是否2个tr的cols必须完成一样才能进行合并。true：完成一样；false(默认)：不完全一样
 - @return void
 - @author polk6 2015/07/21 
 - @example
 - _________________                             _________________
 - |  年龄 |  姓名 |                             |  年龄 |  姓名 |
 - -----------------      mergeCells(grid,[0])   -----------------
 - |  18   |  张三 |              =>             |       |  张三 |
 - -----------------                             -  18   ---------
 - |  18   |  王五 |                             |       |  王五 |
 - -----------------                             -----------------
*/
function mergeCells(grid, cols, isAllSome) {
    // Do Something
}
```

