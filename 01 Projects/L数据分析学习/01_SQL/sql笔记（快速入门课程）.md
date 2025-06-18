[课程：Mosh_完全掌握SQL【笔记】](https://zhuanlan.zhihu.com/p/222865842)
[【中字】SQL进阶教程 | 史上最易懂SQL教程！10小时零基础成长SQL大师！！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1UE41147KC/?spm_id_from=333.337.top_right_bar_window_history.content.click&vd_source=e262ca33c115016ff9015f45c885fb29)
# 数据概要
课程总共用到四个数据库，分别是：
1. sql_store （商店数据库）
2. sql_invoicing （发票数据库）
3. sql_hr （人力资源数据库）
4. sql_inventory （存货数据库）
其中，主要是前两个数据库用的比较多，结构也花哨一些，后两个数据库只是在讲特定主题时用到过一两次，结构也比较简单
下面是各个数据库的详细介绍：
## 1. sql_store
sql_store（商店数据库）是课程前半段用的最多的一个数据库，其结构如下图所示（点击可放大）：
![](https://cdn.nlark.com/yuque/0/2022/webp/21688751/1666496372664-80bfbdc4-ef16-496b-beb0-69072c7a9af5.webp#averageHue=%23e0ded0&clientId=u561466ce-13c6-4&errorMessage=unknown%20error&from=paste&id=u14727b00&originHeight=622&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u5b3f689a-3fd0-46e8-8d4b-9153752fb79&title=)
sql_store（商店数据库）
可以看作**以中间的orders表（订单表）为核心**，然后……
1. 通过customer_id（顾客编号）与customers表（顾客表）相联
2. 通过status_id（状态编号）与order_statuses表（订单状态表）相联
3. 通过shipper_id（运货商编号）与shippers表（运货商表）相联
4. 通过order_id（订单编号）与order_items表（订单项目表）相联
其中：
5. customers 表提供了每个顾客的详细信息
6. order_statuses 表提供了每种订单状态编号的含义（包括：processed 已处理、shipped 已寄出、delivered 已送达）
7. shippers 表提供了每个运货商的详细信息
8. order_items 表列明了每个订单包含的具体产品项目。
这几个表（顾客表、订单状态表、运货商表、订单项目表）充当了订单表的**“查询表”（lookup table）**，为订单提供了各个角度的更详细信息。以顾客表为例，相较于“在订单表的每个订单里都详细记录顾客的信息”，像现在这样只记录顾客id而把顾客的详细信息单独分离出来作为查询表可以减少数据的冗余和重复性，还能方便顾客信息的更改，这在第十三章设计数据库里会讲到
同理，orders_items（订单项目表）里的商品都只记录product_id（商品编号），商品的详细信息保存在products表（商品表）里，后者可看作是前者的查询表，两者通过product_id相联系
右下角还有一个order_item_notes表（订单项目备注表）本来也该是orders_items表的查询表的，但实际上，如图可见，并没有和orders_items表联系起来，这是Mosh为了课程讲解的需要故意保留的一个设计错误
## 2. sql_invoicing
sql_invoicing（发票数据库）是课程后半段用的最多的一个数据库，其中最重要的三张表clients表（客户表）、invoices表（发票表）和payments表（支付记录表）是通过client_id（客户编号）和invoice_id（发票记录编号）两个字段来相互联系的，如图所示：
![](https://cdn.nlark.com/yuque/0/2022/webp/21688751/1666496372654-5ca3f5ed-d121-4339-9463-ff1c04855501.webp#averageHue=%23e6e3d6&clientId=u561466ce-13c6-4&errorMessage=unknown%20error&from=paste&id=u24be0535&originHeight=605&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u22daab23-44c5-4862-b71d-368b142eaa4&title=)
sql_invoicing（发票数据库）
对这三张表我个人的理解是：客户表记录客户的详细信息，发票表记录的是某次交易的应付款总额（一次交易对应一次发票记录），而支付记录表记录的是客户为特定发票进行付款的记录。之后课程中会常常要将特定发票的应付款总额与已付款总额相减来得到该发票的balance（剩余欠款）
另外右下角还有一个payment_methods表（付款方式表），充当查询表为payments表提供各种付款方式的详细信息，两表通过payment_method_id相联系，
## 3. sql_hr
sql_hr（人力资源数据库）结构很简单，就两个表，offices表（办公室表）和employees表（雇员表），offices表充当查询表为employees表提供雇员所在办公室的详细信息，这两张表通过office_id（办公室编号）相联系
值得注意的是employees表本身的一个特性：它的reports_to（向谁汇报）字段引用了该表本身的emploee_id（雇员编号字段），毕竟，雇员的上级也是该公司的雇员。正因为这个特性，这个表在之后讲解 “self join 自链接” 时被当作素材。
![](https://cdn.nlark.com/yuque/0/2022/webp/21688751/1666496372675-14c8714a-69fe-4a1c-ba0b-889011e48a08.webp#averageHue=%23f8f8f8&clientId=u561466ce-13c6-4&errorMessage=unknown%20error&from=paste&id=uff6ec865&originHeight=678&originWidth=630&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9ec3afa4-b9f8-457c-940d-b22dc3481f1&title=)
sql_hr（人力资源数据库）
## 4. sql_inventory
sql_inventory （存货数据库）只有一张products表（商品表），其实和sql_store里商品表是一样的，这个数据库在整个课程中只在讲解 “跨数据库连接” 时用到了一次
![](https://cdn.nlark.com/yuque/0/2022/webp/21688751/1666496372622-cc360848-388a-4f8e-a837-f87ba4d49e21.webp#averageHue=%23f8f8f8&clientId=u561466ce-13c6-4&errorMessage=unknown%20error&from=paste&id=ua2392dfd&originHeight=401&originWidth=607&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u3eb32c64-cb1f-4f55-9eea-1ecf4c7609c&title=)
sql_inventory （存货数据库）
# 第一部分：基础——增删查改
## 【第一章】做好准备
### 什么是SQL
What is SQL (3:24)
- A DATABASE is a collection of data stored in a format that can easily be accessed
数据库是一个以易访问格式存储的数据集合
- 为了管理我们的数据库 我们使用一种叫做数据库管理系统（DBMS, Database Management System）的软件。我们连接到一个DBMS然后下达查询或者修改数据的指令，DBMS就会执行我们的指令并返回结果
![](https://cdn.nlark.com/yuque/0/2022/webp/21688751/1666496462395-5f9c34b4-7ce4-49a0-9a6e-c26ebdbd233f.webp#averageHue=%2340306d&clientId=u561466ce-13c6-4&errorMessage=unknown%20error&from=paste&id=ud8511a65&originHeight=369&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=u9f5c4063-eda1-43f9-b36d-29606dd8184&title=)
DBMS
- 有关系型和非关系型两类数据库，在更流行的关系型数据库中，我们把数据存储在**通过某些关系相互关联的数据表中，每张表储存特定的一类数据**，这正是关系型数据库名称的由来。（如：顾客表通过顾客id与订单表相联系，订单表又通过商品id与商品表相联系）
- SQL（Structured Query Language，结构化查询语言）是专门用来处理（包括查询和修改）关系型数据库的标准语言
- 不同关系型数据库管理系统语法略有不同，但都是基于标准SQL，本课使用最流行的开源关系型数据库管理系统，MySQL
### SQL进阶教程：数据库环境搭建入门指南
> [!NOTE] 核心摘要  
> 这份笔记旨在帮你理解如何使用一个叫 ==MySQL Workbench== 的工具，来搭建学习SQL所需的数据环境。我们会从认识这个工具的界面开始，到成功导入课程用的所有数据，并初步探索这些数据是如何组织存放的。
#### 1. 初识 MySQL Workbench：你的SQL指挥中心
> [!TIP] 通俗概括  
> MySQL Workbench就像一个可视化的控制台，让你不用敲复杂的命令行，就能方便地管理数据库、编写和执行SQL代码。
#### 界面核心区域详解
当你第一次打开 ==MySQL Workbench==，可能会觉得界面有点复杂，但别担心，我们把它拆分成几个区域来看就清晰了。
#### 顶部工具栏 (Toolbar)
这里放着最常用的一些快捷按钮。
- **创建新查询标签页**: 就像浏览器的“新建标签页”，点一下就会给你一个空白的文档，让你可以在里面写SQL代码。
- **打开SQL文件**: 如果你已经有写好的SQL代码文件（通常以.sql结尾），可以用这个按钮打开它。
- **创建数据库/表**: 这些按钮可以引导你通过图形化界面创建数据库或表，但课程中我们主要通过执行代码来完成。
#### 左侧导航面板 (Navigation Panel)
这是你的导航区，主要有两个标签页。
- **Administration (管理)**:
    - **来源**: 这是数据库管理（DBA）工作的集合地。
    - **作用**: 用于做一些“运维”性质的工作。比如启动或停止你的MySQL服务器（就像开关电脑一样），或者导入、导出数据（就像给你的数据库做备份或搬家）。
- **Schemas (模式)**:
    - **来源**: "Schema" 在数据库语境里，可以理解为“数据库的结构蓝图”或直接就是“数据库”的同义词。
    - **作用**: 这里会列出你当前MySQL服务器上所有的数据库。刚装好的时候，你可能会看到一个叫 sys 的数据库，这是MySQL自己内部工作用的，我们一般不去动它。
#### 中间查询编辑器 (Query Editor)
> [!IMPORTANT]  
> 这是你未来学习SQL时==待得最久的地方==。所有的SQL代码都在这个窗口里编写和执行。
#### 右侧/底部辅助面板
- **Context Help (上下文帮助)** 和 **Snippets (代码片段)**: 提供一些辅助信息和常用代码块，初期可以先不用管，甚至可以像视频里那样点击按钮隐藏它们，让界面更清爽。
- **Output (输出窗口)**:
    - **来源**: 这是你所有操作的“回执中心”。
    - **作用**: 当你执行一段SQL代码后，这个窗口会显示执行的过程和结果。每一行操作后面是成功了（显示绿色对勾✅）还是失败了（显示红色叉❌），都会在这里告诉你。这对排查错误至关重要。
---
## 2. 准备弹药：创建课程所需的数据库
> [!TIP] 通俗概括  
> 我们需要先下载一个包含了所有“建库指令”的压缩包，然后用MySQL Workbench打开其中的主文件，为后续学习做好数据准备。
### 操作步骤详解
1. **下载并解压文件**:
    - 你会得到一个 .zip 压缩文件。解压后，里面是一堆以 .sql 结尾的文件。
    - 这些 .sql 文件本质上是==纯文本文件==，里面写满了SQL指令。
    - **主文件**: create-databases.sql。这个文件是“总纲”，包含了创建本次课程所有数据库的全部代码。
    - **单个文件**: 其他文件是用来创建单个数据库的。这是为了方便你以后如果想单独重建某一个数据库时使用。目前，我们只需要关注主文件。
2. **在MySQL Workbench中打开主文件**:
    - 点击顶部工具栏的“打开SQL文件”按钮，找到并打开你解压出来的 create-databases.sql 文件。
    - 你会在中间的查询编辑器里看到大量的SQL代码。现在看不懂完全没关系！学完课程后，你就能自己写出这样的代码了。
> [!INFO] SQL代码示例（截取）
    > 	sql
    >       ``CREATE DATABASE IF NOT EXISTS `sql_store`; USE `sql_store`;  CREATE TABLE `products` (   `product_id` int(11) NOT NULL AUTO_INCREMENT,   `name` varchar(50) NOT NULL,   `quantity_in_stock` int(11) NOT NULL,   `unit_price` decimal(4,2) NOT NULL,   PRIMARY KEY (`product_id`) );``
    >     
    > 
    > **解释**: 这段代码的意思是：创建一个名叫sql_store的数据库（如果它不存在的话），然后使用它。接着，在里面创建一个叫products的表，并定义好这个表里有哪些列（比如产品ID、名字、库存等）。
---
## 3. 一键部署：执行SQL脚本
> [!TIP] 通俗概括  
> 点击一个“闪电”按钮，MySQL Workbench就会自动读取并执行文件里的所有指令，像变魔术一样创建好所有的数据库和数据。
### 操作步骤详解
1. **执行代码**:
    - 在顶部工具栏找到那个黄色的==闪电图标 (Thunder Icon)⚡==。
    - **它的作用**: 执行当前查询编辑器里的SQL代码。
        - **重要细节**: 如果你==没有用鼠标选中任何代码==，它会执行整个文件的所有代码。这正是我们现在想要的。
        - **对比**: 如果你只选中了其中一行代码再点它，那么它就只会执行你选中的那一行。
    - 我们现在什么都不选，直接点击这个闪电图标。
2. **检查输出窗口**:
    - 点击执行后，底部的 Output 窗口会开始滚动，显示每一条指令的执行情况。
    - 你会看到很多行操作，如果每一行后面都有一个==绿色的对勾 ✅==，恭喜你，所有数据库都成功创建了！
3. **刷新Schemas视图**:
    - 数据库虽然创建好了，但左侧的 Schemas 面板可能不会马上显示出来。你需要手动刷新一下。
    - 在 Schemas 标签页旁边有一个==刷新按钮==（通常是两个循环的箭头）。点击它。
    - **结果**: 你会看到多出了好几个新的数据库，它们的名字都以 sql_ 开头。
> [!NOTE] 为什么要用 sql_ 作为前缀？  
    > 这是一种很好的编程习惯。它有两个目的：
    > 
    > 1. **标识性**: 一看就知道这些是属于这个SQL课程的数据库。
    >     
    > 2. **避免冲突**: 假如你的电脑上还有其他项目也用到了一个叫 store 的数据库，那么我们这个 sql_store 就不会和它重名，从而避免了冲突和混乱。
    >     
---
## 4. 探索新世界：数据库内部有什么？
> [!TIP] 通俗概括  
> 一个数据库就像一个大文件柜，里面分门别类放着不同的“柜子”（对象），其中最重要的柜子叫“表”，专门用来存放数据。
### 数据库的核心组件
现在，我们展开左侧 Schemas 里的 sql_store 数据库，看看里面都有些什么“对象”。
- #### **表 (Tables)**
    - **通俗解释**: ==这就是存放数据的“Excel表格”==。数据最终都存储在表里。
    - **例子**: customers (客户表), orders (订单表), products (产品表)。
- #### **视图 (Views)**
    - **通俗解释**: ==一个“虚拟的”或“快捷方式”一样的表==。它本身不存数据，但可以把一个或多个表的数据按你想要的方式组合起来给你看。
    - **来源**: 当你需要频繁地从多个表中查询、组合数据来生成报表时，每次都写一长串复杂的SQL会很麻烦。于是，你可以把这个复杂的查询逻辑存成一个视图。
    - **公式化理解**:
        视图 = 一个被保存的、有名字的查询
    - **作用**: 简化复杂的查询，特别适合做报表。
- #### **存储过程 (Stored Procedures) & 函数 (Functions)**
    - **通俗解释**: ==存放在数据库里的一段“小程序”==。你可以给它传递参数，让它执行一系列操作。
    - **来源**: 有些操作可能非常频繁，比如“根据城市名查找所有客户”。每次都写一遍SQL代码很低效。
    - **例子**: 我们可以写一个叫 get_customers_by_city 的存储过程。当调用它并传入参数“旧金山”时，它就会自动执行查询，返回所有在旧金山的客户信息。
    - **公式化理解**:
        存储过程 = 预编译好的、可重复使用的SQL代码块
---
## 5. 数据的奥秘：表、列、行与关系
> [!TIP] 通俗概括  
> 数据被存放在由“列”（标题）和“行”（记录）组成的“表”中，不同表之间通过一个共享的ID（比如客户ID）巧妙地关联起来，避免了信息重复和修改困难。
### 案例分析：customers 表和 orders 表
让我们深入探索 sql_store 数据库里的两个核心表。
#### customers 表：客户信息库
- 展开 Tables，找到 customers 表，将鼠标悬浮在上面，点击最右边的==带闪电的表格图标==。这会查询并显示表里的所有数据。
- 你会看到一个表格：
    - **列 (Columns)**: 表的“表头”，定义了我们记录了关于客户的哪些信息。例如：
        - customer_id: 客户ID，==唯一标识==一个客户，就像每个人的身份证号。
        - first_name: 名字
        - last_name: 姓氏
        - birth_date: 生日
        - address: 地址...等等
    - **行 (Rows)**: 表的每一行数据，也叫==记录 (Record)==。每一行代表一个具体的客户，包含了该客户的所有信息。
**示例数据**:  

| customer_id | first_name | last_name | address |  
| :--- | :--- | :--- | :--- |  
|    `111`
| Babara | MacCaffrey | 78923 Archway Road |  
|
  `222`

| Ines | Brushfield | 34479 Bunting Pass |  
| ... | ... | ... | ... |  
|
        `666`
| Elka | Twiddell | 7 Memphis Trail |
#### orders 表：订单记录本
- 用同样的方法打开 orders 表。
- 你会看到这个表的列：
    - order_id: 订单ID，唯一标识一个订单。
    - customer_id: 客户ID。
    - order_date: 下单日期。
    - status: 订单状态。
**示例数据**:  
| order_id | customer_id | order_date |  
| :--- | :--- | :--- |  
|
        `111`
|
        `666`
| 2019-01-30 |  
|
        `222`
|
        `777`
| 2018-08-02 |  
|
        `333`
|
        `888`
| 2017-12-01 |  
|
        `444`
|
        `222`
| 2017-01-22 |
#### 核心概念：关系 (Relationship)
> [!WARNING] 这是理解关系型数据库的第一个，也是最重要的概念！
**问题**: 为什么在orders表里，我们只存了一个数字 customer_id（比如
        `666`
），而不是直接存客户的名字“Elka Twiddell”、地址、电话等信息呢？
**原因 & 优势**:
1. **避免数据冗余 (Data Redundancy)**:
    - 假设客户Elka下了
                `101010`
        个订单。如果每个订单后面都存一遍她的姓名、地址、电话，这些信息就会重复
                `101010`
        次。这非常浪费存储空间。
2. **保证数据一致性 & 简化更新 (Data Consistency & Easy Updates)**:
    - 假设某天Elka搬家了，换了新地址。
    - **如果信息重复存储**: 我们必须找到她所有的
                `101010`
        个订单，然后一个一个地去修改地址。万一漏掉一个，就会导致数据不一致（有的订单是旧地址，有的是新地址）。
    - **==现在的设计（关系型设计）==**: 我们只需要去 customers 表里，找到 customer_id 为
                `666`
        的那==唯一一条记录==，把地址改掉即可。所有引用了这个 customer_id 的订单，在查询时都能自动获得最新的地址信息。这被称为“单一事实来源 (Single Source of Truth)”。
**这就是“关系型数据库” (Relational Database) 的精髓**。
- **定义**: 数据库由多个相互关联的表组成。
- **实现方式**: 通过“关系”来连接。
- **公式化理解**:
    关系 = customers\text{表}.customer_id \longleftrightarrow orders\text{表}.customer_id
- 这个 customer_id 在 customers 表里是“主角”，我们称之为==主键 (Primary Key)==。
- 当它在 orders 表里出现，用来引用 customers 表时，它就扮演了“外援”的角色，我们称之为==外键 (Foreign Key)==。
---
## 6. 总结与下一步
> [!TIP] 通俗概括  
> 你已经成功搭建了学习环境，并了解了数据库、表、列、行和它们之间最重要的“关系”概念。现在，你应该亲自动手去探索，熟悉这些数据。
**你的任务**:
- 花几分钟时间，在 MySQL Workbench 里：
    - 点开 sql_inventory 和 sql_hr 等其他数据库。
    - 逐个打开里面的表，看看它们有哪些列，存了些什么样的数据。
    - 试着理解不同表之间的关系。例如，products 表和 order_items 表是如何关联的？
熟悉这些数据对你接下来的学习至关重要，因为后续所有的查询练习都将围绕这些表展开。祝你探索愉快！
## 【第二章】在单一表格中检索数据
Retrieving Data From a Single Table (时长53分钟)
### 0、priamrykey和foreignkey
主键：primary key 不能重复（唯一），注意可以有多个
外键：foreign key外键可以重复  对应另一个表格的primary key  ，这个表格也可以有foreign key ，对应回去到主要表格的primary key （照片1）![f447e1ea68108510d737d796ca48ba3.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/21688751/1661830497058-c2d2de94-d0b2-4c11-8a42-b452930c570c.jpeg#averageHue=%23bfbfbe&clientId=u1b1c46fa-9d3d-4&errorMessage=unknown%20error&from=paste&height=421&id=u8ac5a591&originHeight=1080&originWidth=1546&originalType=binary&ratio=1&rotation=0&showTitle=false&size=142669&status=error&style=none&taskId=ua27229dd-a557-48cd-81aa-b8258442e16&title=&width=602)
自己的表格也可以还有一个外键，对应**自己**这个表格的foreign key、
可以把一个属性同时设定为primary key和foreign  key
![92b446d2db82e26557868a70691aecc.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/21688751/1661830551955-61a76627-3623-43ec-b02d-7e8f197a1a44.jpeg#averageHue=%23f5f3f3&clientId=u1b1c46fa-9d3d-4&errorMessage=unknown%20error&from=paste&height=461&id=ud2a6e829&originHeight=1118&originWidth=1079&originalType=binary&ratio=1&rotation=0&showTitle=false&size=117556&status=error&style=none&taskId=u3e73e406-b73e-4e85-83a8-455d55a0ba8&title=&width=445)
### 2. WHERE子句（比较运算，数学运算，逻辑运算）
USE sql_store; 
SELECT * FROM customers 
WHERE points > 3000 
执行优先级：数学→比较→逻辑
### 3、比较运算符
** > < = >= <= !=/<>** ，**注意等于是一个等号而不是两个等号**
**也可对日期或文本进行比较运算，注意SQL里日期的标准写法及其需要用引号包裹这一点**
**WHERE birth_date > '1990-01-01'**
### 4. AND, OR, NOT运算符
执行优先级：数学→比较→逻辑
**实例**
USE sql_store; 
SELECT * FROM customers 
WHERE birth_date > '1990-01-01' AND points > 1000 
/WHERE birth_date > '1990-01-01' OR    points > 1000 AND state = 'VA'
**AND优先级高于OR，但最好加括号，更清晰**
**WHERE birth_date > '1990-01-01' OR        (points > 1000 AND state = 'VA')**
**NOT的用法**
**WHERE NOT (birth_date > '1990-01-01' OR points > 1000)**
** 等效转化为**
**WHERE birth_date <= '1990-01-01' AND points <= 1000**
### 5. IN运算符
**用 IN 操作符简化该条件**
**WHERE state IN ('va', 'fl', 'ga')**
**可加NOT**
**WHERE state NOT IN ('va', 'fl', 'ga')**
这里可用NOT的原因：可以这么看，IN语句 IN ('va', 'fl', 'ga') 是在进行一种是否符合条件的判断，可看作是一种特殊的比较运算，得到的是一个逻辑值，故可用NOT进行取反
### 6. BETWEEN运算符
The BETWEEN Operator (2:12)
**小结**
用于表达**范围**型条件
**注意**
- 用AND而非括号
- **闭区间，包含两端点**
- 也可用于日期，毕竟日期本质也是数值，日期也有大小（早晚），可比较运算
- 同 IN 一样，BETWEEN 本质也是一种特定的 多重比较运算条件 的简化
**案例**
**选出积分在1k到3k的顾客**
**USE sql_store; **
**select * from customers**
**where points >= 1000 and points <= 3000**
**等效简化为：**
**WHERE points BETWEEN 1000 AND 3000**
### 7. LIKE运算符
**小结**
模糊查找，查找具有某种模式的字符串的记录/行
**注意**
- 过时用法（但有时还是比较好用，之后发现好像用的还是比较多的），下节课的正则表达式更灵活更强大
- 注意和正则表达式一样都是用**引号包裹表示字符串**
引号内描述想要的字符串模式，**注意SQL（几乎）任何情况都是不区分大小写的**
两种通配符：
- % 任何个数（包括0个）的字符（**用的更多**），开头也可以不代表前后一定需要有字符
- _ 单个字符
### 8. REGEXP运算符
**小结 **
正则表达式，在搜索字符串方面更为强大，可搜索更复杂的模板
**实例**
**USE sql_store;**
** select * from customers where last_name like '%field%'**
**等效于：**
**where last_name regexp 'field'**
regexp 是 regular expression（正则表达式） 的缩写
正则表达式可以组合来表达更复杂的字符串模式
where last_name regexp **'^mac|field$|rose'  **
where last_name regexp **'[gi]e | e[fmq]'** -- 查找含ge/ie或ef/em/eq的 where last_name regexp **'[a-h]e | e[c-j]'**
正则表达式总结：

| **符号** | **意义** |
| ------ | ------ |
| ^      | 开头     |
| $      | 结尾     |
| [abc]  | 含abc   |
| [a-c]  | 含a到c   |
| &#124; | or     |
|        |        |

### 9. IS NULL运算符
**小结**
找出空值，找出有某些属性缺失的记录
**案例**
找出电话号码缺失的顾客，也许发个邮件提醒他们之类
USE sql_store; select * from customers where phone is null/is not null
注意是 IS NULL 和 IS NOT NULL 这里 NOT 不是前置于布林值，而是更符合英语语法地放在了be动词后
**回顾**
3~9 节全在讲WHERE子句中条件的具体写法 :
- 第3节：比较运算 > < = >= <= !=
- 第4节：逻辑运算 AND、OR、NOT
- 5~9节：特殊的比较运算（是否符合某种条件）：IN 和 BETWEEN、LIKE 和 REGEXP、IS NULL
所以总的来说WHERE条件就是
数学运算 → 比较运算（包括特殊的比较运算）→ 逻辑运算
逻辑层次和执行优先级也是按照这三个的顺序来的。
### 10. ORDER BY子句
**默认是primary排序**
**小结**
排序语句，和 SELECT …… 很像：
1. 可多列
2. 先后顺序，否则按primary
3. 任何一个排序依据列后面都可选加 DESC
**实例**
USE sql_store;
 select name, unit_price * 1.1 + 10 as new_price  from products order by new_price desc, product_id -- 这两个分别是 别名列 和 未选择列，都用到了 MySQL 特性
### 11. LIMIT子句
The LIMIT Clause (3:26)
**小结**
限制返回结果的记录数量，“前N个” 或 “跳过M个后的前N个”
**实例**
USE sql_store;
select * from customers
**limit 3**
**limit  6, 3**
**6, 3 表示跳过前6个，取第7~9个，6是偏移量，**
如：网页分页 每3条记录显示一页 第3页应该显示的记录就是 limit 6, 3
**回顾**
SELECT 语句完结了，里面的子句顺序固定要记牢，顺序乱会报错
select from where + order by limit
纵选列，确定表，横选行（各种条件写法和组合要清楚熟悉），最后再进行排序和限制
## 【第三章】在多张表格中检索数据
常常需要在多张表中检索数据，这一章讲的就是这个，具体来说，主要讲如何横向连接表和纵向连接查询结果
### 1. 内连接
Inner Joins (8:26)，**inner写不写都行，注意连接的列的名字可以不同**
**小结**
各表分开存放是为了减少重复信息和方便修改，需要时可以根据相互之间的关系连接成相应的合并详情表以满足相应的查询。**FROM JOIN ON** 语句就是告诉sql： 将哪几张表以什么基础连接/合并起来。
这种有多表合并的查询语句可分两部分从后往前看：
1. 后面的 from 表A join 表B on AB的关系，就是以某些相关联的列为依据（关系型数据库就是这么来的）进行多表合并得到所需的详情表
2. 前面的 select 就是在合并详情表中找到所需的列.
**关于表别名 from order o join custom c order ,注意定义了其他地方也要用，有歧义再用**
之前在SELECT中给选定的列加别名主要是为了得到更有意义的列名，这里在 FROM JOIN 中给表加别名主要是为了简化
USE sql_store; 
select      order.order_id ,  ；
o.customer_id,      ……
o.是别名，是之后from语句里定义的，试过，不用确实会报错，因为两个表都有这个customer_id列，只写customer_id的话会报错：ambiguous，必须指定一个表的customer_id，这里指定任意一个表的都行，因为正是按相等的customer_id来链接两个表的。总之选择多张表里都有的同名列时，必须**加上表名前缀**来明确列的来源。
Mosh 个人喜欢在多表查询时将SELECT里所有的列名都加上表名前缀，因为这样更清晰，也能保证不会出错
用了别名后其他地方（包括前面select语句，这一点当时觉得挺奇怪的，后来知道了是SQL语句执行顺序的关系，FROM … JOIN … 语句最先执行）只能用别名，用全名会报错。另外就像在select里一样，这里as也是可省略的。
```sql
SELECT order_id, p.product_id,quantity,o.unit_price
FROM order_items o
JOIN products p ON o.product_id  = p.product_id;
```
### 2. 跨数据库连接（合并）
Joining Across Databases (2:47)
**小结**
有时需要选取不同库的表的列，其他都一样，就只是WHERE JOIN里对于非现在正在用的库的表要**加上库名前缀而已**。依然可用别名来简化
**实例**
use sql_store; select * from order_items oi join sql_inventory.products p     on oi.product_id = p.product_id
或
use sql_inventory; select * from sql_store.order_items oi join products p     on oi.product_id = p.product_id
可见只有非当前使用的库才要加库前缀
### 3. 自连接（公司组织架构）
Self Joins (4:13)
**小结**
一个表和它自己合并。如下面的例子，员工的上级也是员工，所以也在员工表里，所以想得到的有员工和他的上级信息的合并表，就要员工表自己和自己合并，**用两个不同的表别名即可实现**。这个例子中只有两级，但也可用类似的方法构建多层级的组织结构。
**案例**
**USE sql_hr; **
**select  e.employee_id,     e.first_name,     m.first_name AS manager ……**
**from employees e**
** join employees m    **
** on e.reports_to = m.employee_id**
**自合并必然每列都要加表前缀**，因为每列都同时在两张表中出现。另外，两个 first_name 列有歧义，注意将最后一列改名为 manager 使得结果表更易于理解（**给列起别名用as**）
…… 
### 4. 多表连接
Joining Multiple Tables (6:46)
**小结**
FROM 一个核心表A，用多个 JOIN …… ON …… 分别通过不同的链接关系链接不同的表B、C、D……，通常是让表B、C、D……为表A提供更详细的信息从而合并为一张详情合并版A表，即：
FROM  A      JOIN B ON AB的关系      JOIN C ON AC的关系      JOIN D ON AD的关系      ……
将得到一个合并了BCD……等表详细信息的详情合并版A表
真实工作场景中有时甚至要合并十多张表
**案例1**
订单表同时链接顾客表和订单状态表，合并为有顾客和状态信息的详细订单表
USE sql_store; SELECT      o.order_id,      o.order_date,     c.first_name,     c.last_name,     os.name AS status FROM orders o JOIN customers c     ON o.customer_id = c.customer_id JOIN order_statuses os     ON o.status = os.order_status_id
**案例2**
同理，支付记录表链接顾客表和支付方式表形成支付记录详情表
USE sql_invoicing; SELECT      p.invoice_id,     p.date,     p.amount,     c.name,     pm.name AS payment_method FROM payments p JOIN clients c     ON p.client_id = c.client_id JOIN payment_methods pm     ON p.payment_method = pm.payment_method_id
```
select o.order_id,o.customer_id,c.first_name,c.last_name,os.name = status
from orders o
join customers c on  o.customer_id = c.customer_id
join order_statuses os on o.status = os.order_status_id   #名字可以不一样;
```
### 5. 复合连接条件（两个primary）（一个）AND 语法
Compound Join Conditions (3:41)
**小结**
像订单项目（order_items）这种表，**订单id和产品id合在一起才能唯一表示一条记录**，这叫**复合主键**，设计模式下也可以看到两个字段都有PK标识，订单项目备注表（order_item_notes）也是这两个复合主键，因此他们两合并时要用复合条件：FROM 表1 JOIN 表2 ON 条件1 【AND】 条件2
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666527448592-e6dfa4e5-955c-4b30-84ce-1513405860b7.png#averageHue=%23f5f5f4&clientId=u869f102b-1183-4&errorMessage=unknown%20error&from=paste&height=241&id=ueb566900&originHeight=241&originWidth=821&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97966&status=error&style=none&taskId=uc4937ced-b8af-44e8-9480-420afda4645&title=&width=821)
### 6. 隐式连接语法（**别用）**
Implicit Join Syntax (2:20)
**小结**
就是用FROM WHERE取代FROM JOIN ON
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666527565136-4e3a5549-6786-4e36-a151-c9a8c0848969.png#averageHue=%23f6f6f6&clientId=u869f102b-1183-4&errorMessage=unknown%20error&from=paste&height=431&id=ueffaacb5&originHeight=431&originWidth=860&originalType=binary&ratio=1&rotation=0&showTitle=false&size=126911&status=error&style=none&taskId=u53c2f417-ca7b-492a-82a8-69d91da6a60&title=&width=860)，
**注意**
**尽量别用，**因为若忘记WHERE条件筛选语句，不会报错但会得到**交叉合并（cross join）结果**：即10条order会分别与10个customer结合，得到100条记录。最好使用显性合并语法，因为会强制要求你写合并条件ON语句，不至于漏掉。
**案例**
合并顾客表和订单表，显性合并：
USE sql_store; SELECT *  FROM orders o JOIN customers c     ON o.customer_id = c.customer_id
隐式合并语法：
SELECT *  FROM orders o, customers c   WHERE o.customer_id = c.customer_id
注意 FROM 子句里的逗号，就像 SELECT 多条列用逗号隔开一样，FROM 多个表也用逗号隔开，此时若忘记WHERE条件筛选语句则得到这几张表的交叉合并结果
这里也可以看得出来，ON/USING 和 WHERE 以及后面会学的 HAVING 的作用是类似的，本质上都是**对行进行筛选的条件语句**，只不过使用的位置不一样而已
### 7. 外连接（inner是有null的整行就不显示了，left就是左边的表代表的都显示，例如显示所有顾客，即使他没买东西显示null）**最好只用 JOIN 和 LEFT JOIN**
Outer Joins (6:27)
**小结**
- (INNER) JOIN 结果只包含两表的交集，**另外注意“广播（broadcast）”效应**
- LEFT/RIGHT (OUTER) JOIN 结果里除了交集，还包含只出现在左/右表中的记录
**案例**
合并顾客表和订单表，用 INNER JOIN：
USE sql_store; SELECT      c.customer_id,     c.first_name,     o.order_id FROM customers c JOIN orders o     ON o.customer_id = c.customer_id ORDER BY customer_id
这样是INNER JOIN，**只展示有订单的顾客（及其订单），也就是两张表的交集**，但注意这里因为一个顾客可能有多个订单，所以INNER JOIN以后顾客信息其实是是广播了的，即一条顾客信息被多条订单记录共用，当然 这叫广播（broadcast）效应，是另一个问题，这里关注的重点是 INNER JOIN 的结果确实是两表的交集，是那些同时有顾客信息和订单信息的记录。
若要展示全部顾客（及其订单，如果有的话），要改用LEFT (OUTER) JOIN，结果相较于 INNER JOIN 多了没有订单的那些顾客，即只有顾客信息没有订单信息的记录
当然，也可以调换左右表的顺序（即调换FROM和JOIN的对象）再 RIGHT JOIN，即：
FROM orders o     RIGHT [OUTER] JOIN customers c     -- 中括号 [] 表示是可选项、可省略      ON o.customer_id = c.customer_id
若要展示全部订单（及其顾客），就应该是 orders RIGHT JOIN customers，结果相较于 INNER JOIN 多了没有顾客的那些订单，即只有订单信息没有顾客信息的记录。（注：因为这里所有订单都有顾客，所以这里 RIGHT JOIN 结果和 INNER JOIN 一样）
### 8. 多表外连接
Outer Join Between Multiple Tables (6:18)
**小结**
与内连接类似，我们可以对多个表（3个及以上）进行外连接，**最好只用 JOIN 和 LEFT JOIN**
**案例**
查询顾客、订单和发货商记录，要包括所有顾客（包括无订单的顾客），也要包括所有订单（包括未发出的）
USE sql_store; SELECT      c.customer_id,     c.first_name,     o.order_id,     sh.name AS shipper FROM customers c LEFT JOIN orders o     ON c.customer_id = o.customer_id LEFT JOIN shippers sh     ON o.shipper_id = sh.shipper_id ORDER BY customer_id
**最佳实践**
虽然可以调换顺序并用 RIGHT JOIN，但作为最佳实践，最好调整顺序并统一只用 [INNER] JOIN 和 LEFT [OUTER] JOIN（总是左表全包含），这样，当要合并的表比较多时才方便书写和理解而不易混乱
**练习**
查询 订单 + 顾客 + 发货商 + 订单状态，包括所有的订单（包括未发货的），其实就只是前两个优先级变了一下，是要看全部订单而非全部顾客了
USE sql_store; SELECT      o.order_id,     o.order_date,     c.first_name AS customer,     sh.name AS shipper,     os.name AS status FROM orders o JOIN customers c     ON o.customer_id = c.customer_id LEFT JOIN shippers sh     ON o.shipper_id = sh.shipper_id JOIN order_statuses os     ON o.status = os.order_status_id
订单必有顾客和状态，所以这第1个和第3个 JOIN 加不加 LEFT 效果一样 但订单不一定发货了，即不一定有发货商，所以第2个 JOIN 必须是 LEFT JOIN，否者会筛掉没发货的订单
### 9. 自我外部连接
Self Outer Joins (2:12)
**小结**
就用前面那个员工表的例子来说，就是用LEFT JOIN让得到的 员工-上级 合并表也包括老板本人（老板没有上级，即 reports_to 字段为空，如果用 JOIN 会被筛掉，用 LEFT JOIN 才能保留）
**USE sql_hr;**
**SELECT      e.employee_id,     e.first_name,     m.first_name AS manager**
**FROM employees e **
**LEFT JOIN employees m           -- 包含所有雇员（包括没有report_to的老板本人）    **
** ON e.reports_to = m.employee_id**
### 10. USING子句（注意只能是两个表需要join的列名字完全相同时使用）
The USING Clause (5:22)
**小结**
当作为合并条件（join condition）的列在两个表中有相同的列名时，可用 
USING (……, ……) 取代 ON ……  =  …… 予以简化，内/外链接均可如此简化。
**注意**
**一定注意 USING 后接的是括号，特容易搞忘**
**实例**
SELECT     o.order_id,     c.first_name,     sh.name AS shipper FROM orders o JOIN customers c     USING (customer_id) LEFT JOIN shippers sh     USING (shipper_id) ORDER BY order_id
**复合主键**表间复合连接条件的合并也可用 USING，中间逗号隔开就行：
SELECT * FROM order_items oi 
JOIN order_item_notes oin ON oi.order_id = oin.order_Id 
AND     oi.product_id = oin.product_id 
**/USING (order_id, product_id)**
**USING对复合主键的简化效果更加明显**
**注意**
列名不同就必须用 ON …… 了
实际中同一个字段在不同表列名不同的情况也很常见（如上面的 payment_method 和payment_method_id），不能想当然的用USING
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666530303334-0fd63518-078c-4007-a952-dfb4fc4710e6.png#averageHue=%23ececec&clientId=u869f102b-1183-4&errorMessage=unknown%20error&from=paste&height=193&id=ps0vp&originHeight=193&originWidth=678&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60233&status=error&style=none&taskId=u16130ab6-5477-417e-8f37-39cd0c0dc1c&title=&width=678)
### 11. 自然连接（**别用**）
Natural Joins (1:21)
**小结**
NATURAL JOIN 就是让MySQL自动检索同名列作为合并条件。
**注意**
最好别用，因为不确定合并条件是否找对了，有时会造成无法预料的问题，编程时保持对结果的**控制**是非常重要的
但也要知道有这个东西，混个脸熟，不要别人用了看不懂。
### 12. 交叉连接（没有 on 了，没有对应的列，就是为了找到所有组合）
Cross Joins (3:14)
**小结**
得到名字和产品的**所有组合**，因此**不需要合并条件**。 实际运用如：要得到尺寸和颜色的全部组合
**实例**
得到顾客和产品的全部组合（毫无意义，纯粹为了展示交叉连接）
USE sql_store; SELECT      c.first_name AS customer,     p.name AS product FROM customers c CROSS JOIN products p ORDER BY c.first_name
上面是显性语法，还有隐式语法，之前讲过，其实就是隐式内合并忽略WHERE子句（即合并条件）的情况，，即 FROM A CROSS JOIN B 等效于 FROM A, B，Mosh更推荐显式语法，因为更清晰
USE sql_store; SELECT      c.first_name,     p.name FROM customers c, products p ORDER BY c.first_name
**练习**
交叉合并shippers和products，分别用**显式和隐式语法，一样，**也就是把 CROSS JOIN 改为逗号，**推荐显示**
SELECT      sh.name AS shippers,     p.name AS product
 FROM shippers sh 
**CROSS JOIN products p **
ORDER BY sh.name
或
SELECT      sh.name AS shippers,     p.name AS product 
**FROM shippers sh, products p **
ORDER BY sh.name
### 13. 联合（union两次select，这是独特点，和交叉连接一样也没有on什么的）
Unions (8:29)
**小结**
FROM …… JOIN …… 可对多张表进行横向列合并，而 …… UNION …… 可用来按行纵向合并多个查询结果，这些查询结果可能来自相同或不同的表
- 同一张表可通过UNION添加新的分类字段，即先通过分类查询并添加新的分类字段再UNION合并为带分类字段的新表。
- 不同表通过UNION合并的情况如：将一张18年的订单表和19年的订单表纵向合并起来在一张表里展示
**注意**
- **合并的查询结果必须列数相等，否则会报错
**
- **合并表里的列名由排在 UNION 前面的决定**
**案例1**
**给订单表增加一个新字段——status**，用以区分今年的订单和今年以前的订单
USE sql_store;     
SELECT          order_id,         order_date,        ** 'Active' AS status  （列名为status）  ** 
FROM orders     
WHERE order_date >= '2019-01-01' 
UNION     
SELECT          order_id,         order_date,         'Archived' AS status  -- Archived 归档    
 FROM orders     
WHERE order_date < '2019-01-01';
**案例2**
合并不同表的例子——在同一列里显示所有顾客名以及所有商品名
USE sql_store;     
SELECT first_name AS name_of_all     -- **新列名由排UNION前面的决定  **   
FROM customers 
UNION     
SELECT name     FROM products
**练习**
给顾客按积分大小分类，添加新字段type，并按顾客id排序，分类标准如下

| **points** | **type** |
| --- | --- |
| <2000 | Bronze |
| 2000~3000 | Silver |
| >3000 | Gold |
    SELECT          customer_id,         first_name,         points,         'Bronze' AS type     FROM customers      WHERE points < 2000 UNION     SELECT          customer_id,         first_name,         points,         'Silver' AS type     FROM customers      WHERE points BETWEEN 2000 and 3000 UNION     SELECT          customer_id,         first_name,         points,         'Gold' AS type     FROM customers      WHERE points > 3000 ORDER BY customer_id
可以看出ORDER BY的优先级在UNION之后，应该是排序和限制语句的执行优先级比较靠后，不知能否用括号调整执行顺序让这个ORDER BY只作用于最后一个子查询？（估计实际中很少有这种需求，一般都是最后统一排序）。另外，这里如果没有 ORDER BY 的话就会按3个 query 的先后来排序。
**总结**
感觉本质上可以将查询语句的任何一步和任何一个层次，包括：
1. 横纵筛选 SELECT ……WHERE ……
2. 选表 FROM ……
3. 横纵连接 …… JOIN ………… UNION ……
4. 排序、限制ORDER BY ……LIMIT ……
都看作暂时生成了一张新表（虚拟表），将后续步骤都看作是在对这些新表进行进一步的操作， 这样，层次步骤就能理清，就好理解了，也才真的能从本质上掌握并灵活运用
## 【第四章】插入、更新和删除数据
**导航**
第一章是课程简要介绍
第二、三章讲如何 “查询”，其中第二章讲单个表里如何“查询”，第三章讲如何使用多张表“查询”（通过横纵向连接）
这一章讲如何 “增、改、删”
前四章构成了**SQL的基础 “增删改查”**
### 1. 列属性
### 2. 插入单行
Inserting a Row (5:46)
**小结**
**INSERT INTO 目标表 （目标列，可选，逗号隔开） VALUES (目标值，逗号隔开)**
**案例**
在顾客表里插入一个新顾客的信息
法1. 若不指明列名，则插入的值必须按所有字段的顺序完整插入
USE sql_store; 
INSERT INTO customers -- 目标表 
VALUES (     DEFAULT,     'Michael',     'Jackson',     '1958-08-29', '     DEFAULT,     '5225 Figueroa Mountain Rd',      'Los Olivos',     'CA',     DEFAULT     );
法2. 指明列名，可跳过取默认值的列且可更改顺序，一般用这种，更清晰
INSERT INTO customers (     address,     city,     state,     last_name,     first_name,     birth_date,     ) 
VALUES (     '5225 Figueroa Mountain Rd',     'Los Olivos',     'CA',     'Jackson',     'Michael',         '1958-08-29',       ) ```
### 3. 插入多行
Inserting Multiple Rows (3:18)
**小结**
VALUES …… 里一行内数据用**括号内逗号**隔开，而多行数据用**括号间逗号**隔开
**案例**
插入多条运货商信息
USE sql_store INSERT INTO shippers (name) VALUES ('shipper1'),        ('shipper2'),        ('shipper3');
**练习**
插入多条产品信息
USE sql_store; INSERT INTO products  VALUES (DEFAULT, 'product1', 1, 10),        (DEFAULT, 'product2', 2, 20),        (DEFAULT, 'product3', 3, 30)
或
INSERT INTO products (name, quantity_in_stock, unit_price) VALUES ('product1', 1, 10),        ('product2', 2, 20),        ('product3', 3, 30)
还是感觉后面这种指明列名的要清晰一点
**注意**
对于AI (Auto Incremental 自动递增) 的id字段，MySQL会记住删除的/用过的id，并在此基础上递增
### 4. 插入分级行
Inserting Hierarchical Rows (5:53)
**小结**
订单表（orders表）里的一条记录对应订单项目表（order_items表）里的多条记录，一对多，是相互关联的父子表（一个订单多个商品）。
通过添加一条订单记录和对应的多条订单项目记录，学习如何向父子表插入分级（层）/耦合数据（insert hierarchical data）：
- 关键：在插入子表记录时，需要用**内建函数 LAST_INSERT_ID()** 获取相关表记录的自增ID（这个例子中就是 order_id)
- 内建函数：MySQL里有很多可用的内置函数，也就是可复用的代码块，各有不同的功能，注意函数名的单词之间用下划线连接
- LAST_INSERT_ID()：获取最新的成功的 INSERT 语句 中的自增id（往往是primary key），在这个例子中就是order_id.
**案例**
新增一个订单（order），里面包含两个订单项目/两种商品（order_items），请**同时更新**订单表和订单项目表
 INSERT INTO orders (customer_id, order_date, status) 
VALUES (1, '2019-01-01', 1);      -- 可以先试一下用 SELECT last_insert_id() 看能否成功获取到的最新的 order_id 
 INSERT INTO order_items  -- 全是必须字段，就不用指定了 
VALUES      (last_insert_id(), 1, 2, 2.5),    
                     (last_insert_id(), 2, 5, 1.5)
### 5. 创建表的副本（复制一个实体表的东西到另一个表）
### （子查询 ）（后面也有把一个虚拟表变成实体）
Creating a Copy of a Table (8:47)
**小结**
DROP TABLE 要删的表名、CREATE TABLE 新表名 AS 子查询
TRUCATE '要清空的表名'、INSERT INTO 表名 子查询
子查询里当然也可以用WHERE语句进行筛选
**案例 1**
运用 CREAT TABLE 新表名 AS 子查询 快速创建表 orders 的副本表 orders_archived
USE sql_store; 
**CREATE TABLE orders_archived **
**AS     **
**（SELECT * FROM orders  -- 子查询**
**SELECT * FROM orders ）**
选择了 oders 中所有数据，作为AS的内容，是一个子查询
- **子查询： **任何一个充当另一个SQL语句的一部分的 SELECT…… 查询语句都是子查询，**子查询是一个很有用的技巧。**
**注意**
创建已有的表或删除不存在的表的话都会报错，所以建表和删表语句都最好加上条件语句（后面会讲）
**案例 2**
不再用全部数据，而选用原表中部分数据创建副本表，如，用今年以前的 orders 创建一个副本表 orders_archived，其实就是在子查询里增加了一个WHERE语句进行筛选。注意要先 drop 删掉 或 truncate 清空掉之前建的 orders_archived 表再重建或重新插入数据。
法1. DROP TABLE 要删的表名、CREATE TABLE 新表名 AS 子查询
USE sql_store;
（ DROP TABLE orders_archived;  -- 也可右键该表点击 drop）
** CREATE TABLE orders_archived AS     **
**（SELECT * FROM orders     **
**WHERE order_date < '2019-01-01'）**
法2. INSERT INTO 表名 子查询
INSERT INTO 表名 子查询 很常用，子查询替代原先插入语句中 VALUES(……,……),(……,……),…… 的部分
**INSERT INTO orders_archived   -- 不用指明列名，会直接用子查询表里的列名     **
**SELECT * FROM orders       -- 子查询，替代原先插入语句中VALUES(……,……),(……,……),…… 的部分     **
**WHERE order_date < '2019-01-01'**
```sql
use sql_invoicing;
CREATE table invoices_clients_name AS
select invoice_id,number,name as client,invoice_total,payment_date
from invoices i
join clients c
using (client_id)
where payment_date is not null;
先join 在where 再 选列 再 create
```
### 6. 更新单行
### 7. 更新多行
Updating Multiple Rows (3:14)
**小结**
语法一样的，就是让 WHERE…… 的条件包含更多记录，就会同时更改多条记录了
**注意**
Workbench默认开启了Safe Updates功能，不允许同时更改多条记录，要先关闭该功能（在 Edit-Preferences-SQL Editor-Safe Updates）
USE sql_invoicing; UPDATE invoices SET payment_total = 233, payment_date = due_date WHERE client_id = 3   -- 该客户的发票记录不止一条，将同时更改 /WHERE client_id IN (3, 4)  -- 第二章 4~9 讲的那些写 WHERE 条件的方法均可用 -- 甚至可以直接省略 WHERE 语句，会直接更改整个表的全部记录
**练习**
让所有非90后顾客的积分增加50点
USE sql_store; UPDATE customers SET points = points + 50 WHERE birth_date < '1990-01-01'
### 8. 在Updates中用子查询
Using Subqueries in Updates (5:36)
**小结**
非常有用，其实**本质上是将子查询用在UPDATE 的 WHERE…… 行筛选条件中**
**注意**
1. 括号的使用
2. IN …… 后除了可接 （……, ……） 也可接由子查询得到的多个数据（一列多条数据），感觉和前面 VALUES 后可接子查询道理是相通的
**案例**
更改发票记录表中名字叫 Yadel 的记录，但该表只有 client_id，故先要从另一个顾客表中查询叫 Yadel 人的 client_id
实际中这是很可能的情形，比如一个App是通过搜索**名字，但是他那个表里面只有id，这个时候没必要join，**来更改发票记录的
**USE sql_invoicing; **
**UPDATE invoices **
**SET payment_total = 567, payment_date = due_date **
**WHERE client_id =      **
**(SELECT client_id     **
** FROM clients     **
**WHERE name = 'Yadel');     **
**-- 放入括号，确保先执行  -- 若子查询返回多个数据（一列多条数据）时就不能用等号而要用 IN 了： **
**/**
**WHERE client_id  IN     **
** (SELECT client_id     **
** FROM clients    **
**  WHERE state IN ('CA', 'NY'))**
**解释，住在ca和ny两个州的人的id，在另一个表里更改数据**
**最佳实践**
Update 前，最好先验证看一看子查询以及WHERE行筛选条件是不是准确的，筛选出的是不是我们的修改目标， 确保不会改错记录，再套入 UPDATE SET 语句更新，如上面那个就可以先验证子查询：
SELECT client_id  FROM clients WHERE state IN ('CA', 'NY')
以及验证WHERE行筛选条件（即先不UPDATE，先SELECT，改之前，先看一看要改的目标选对了没）
确保WHERE行筛选条件准确准确无误后，再放到修改语句后执行修改：
**练习**
将 orders 表里那些 分数>3k 的用户的订单 comments 改为 'gold customer'
思考步骤：
3. WHERE 行筛选出要求的顾客
4. SELECT 列筛选他们的id
5. 将前两步 作为子查询 用在修改语句中的 WHERE 条件中，执行修改
USE sql_store; UPDATE orders SET comments = 'gold customer' WHERE customer_id IN     (SELECT customer_id     FROM customers     WHERE points > 3000)
### 9. 删除行(也可以子查询)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666578078835-9f25d415-fb95-43c4-8931-a5c2deb79dfc.png#averageHue=%23eaeae9&clientId=u2cfa0d26-7ee5-4&errorMessage=unknown%20error&from=paste&height=269&id=u24d16848&originHeight=269&originWidth=541&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61134&status=error&style=none&taskId=ubae9d1cd-1a29-439a-97b6-1f851500cf5&title=&width=541)
### 10. 恢复数据库
Restoring the Databases (1:06)
就是重新运行那个 create-databases.sql 文件以重置数据库
## 【第五章】汇总数据
Summarizing Data (时长33分钟)
汇总统计型查询非常有用，甚至可能常常是你的主要工作内容
### 1. 聚合函数（往往命名新列AS）
**练习**
目标：

| **date_range** | **total_sales** | **total_payments** | **what_we_expect (the difference)** |
| --- | --- | --- | --- |
| **1st_half_of_2019** |  |  |  |
| **2nd_half_of_2019** |  |  |  |
| **Total** |  |  |  |
```
SELECT 
        'First half of 2019' as date_range,
        sum(invoice_total) as total_sales,
        sum(payment_total) as total_payment,
        sum(invoice_total-payment_total) as what_we_expect
from invoices
where invoice_date BETWEEN '2019-01-01' and '2019-6-30'
UNION
SELECT 
        '2nd_half_of_2019' as date_range,
        sum(invoice_total) as total_sales,
        sum(payment_total) as total_payment,
        sum(invoice_total-payment_total) as what_we_expect
from invoices
where invoice_date BETWEEN '2019-07-01' and '2019-12-31'
UNION 
。。。
```
### 2. GROUP BY子句
The GROUP BY Clause (7:21)
**小结**
按一列或多列分组，注意语句的位置。
**案例1：按一个字段分组**
在发票记录表中**按不同顾客分组统计**下半年总销售额并降序排列
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666582908811-1af6e1d4-7421-44d4-8c68-f8261a84d7e5.png#averageHue=%23e7e7e7&clientId=u2cfa0d26-7ee5-4&errorMessage=unknown%20error&from=paste&height=458&id=u5f69c736&originHeight=458&originWidth=682&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108044&status=error&style=none&taskId=u9a39d16a-b3cf-4271-8042-5dc3e425121&title=&width=682)
** WHERE invoice_date >= '2019-07-01'  -- 筛选，过滤器 **
**GROUP BY client_id  -- 分组 **
**ORDER BY invoice_total DESC**
**（**
**select sum()**
**from**
**join **
**where**
**group by**
**having**
**order by）**
只有聚合函数是按 client_id 分组时，这里选择 client_id 列才有意义（**分组统计语句里SELECT通常都是选择分组依据列+目标统计列的聚合函数，选别的列没意义**）。若未分类，结果会是一条总 total_sales 和一条 client_id（该client_id无意义），即 client_id 会被压缩为只显示一条而非 SUM 广播为多条，可以理解为聚合函数比较强势吧。
**记住语句顺序很重要 WHERE GROUP BY ORDER BY，分组语句在排序语句之前，调换顺序会报错**
**案例2：按多个字段分组(交叉组合)**
算各州各城市的总销售额
如前所述，一般分组依据字段也正是 SELECT …… 里的选择字段，如下面例子里的 state 和 city
SELECT      state,     city,     SUM(invoice_total) 
AS total_sales 
FROM invoices 
JOIN clients 
USING (client_id)  -- 别忘了USING之后是括号，太容易忘了 
GROUP BY state, city   -- 逗号分隔就行 -- 这个例子里 GROUP BY 里去掉 state 结果一样 ORDER BY state
其实上面的例子里一个城市只能属于一个州中，所有归根结底还是算的各城市的销售额，GROUP BY …… 里去掉 state 只写 city （但 SELECT 和 ORDER BY 里保留 state）结果是完全一样的（包括结果里的 state 列），下面这个例子更能说明以多个字段为分组依据进行分组统计的意义
**练习**
在 payments 表中，按日期和支付方式分组统计总付款额
每个分组显示一个日期和支付方式的独立组合，可以看到某特定日期特定支付方式的总付款额。这个例子里每一种支付方式可以在不同日子里出现，每一天也可以出现多种支付方式，这种情况，才叫真·多字段分组。不过上一个例子里那种假·多字段分组，把 state 加在分组依据里也没坏处还能落个心安，也还是加上别省比较好
```
SELECT date,pm.name AS payment_method,SUM(amount) AS total_payments
FROM payments p
JOIN payment_methods pm
ON p.payment_method = pm.payment_method_id
GROUP BY date,payment_method
ORDER BY date
```
**思想**
解答复杂问题时，学会先分解拆分为简单的小问题或小步骤逐个击破。合理运用分解组合和IPO（input-process-output 输入-过程-输出）思想。
**注意**
**group by 往往喜欢直接复制select几个的做交叉**
**group by 后面不能使用列别名，现在就having可以**
### 3. HAVING子句（类似where，goupby之后用，注意having的列在select需要包括，往往是as重命名之后的）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666592494508-6566a4cb-455d-4ba6-9134-6788abd0e9c6.png#averageHue=%23dfdfdf&clientId=u2cfa0d26-7ee5-4&errorMessage=unknown%20error&from=paste&height=506&id=u011cadb4&originHeight=506&originWidth=700&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124811&status=error&style=none&taskId=ucbfc91f3-52f3-4e12-9ba1-c97f2cc6670&title=&width=700)
因为where在group by之前用，还没group，没有列）
**小结**
**HAVING 和 WHERE** 都是是条件筛选语句，WHERE的那一套都可以用，
两者本质区别:
- WHERE 是对 FROM JOIN 里原表中的列进行 **事前**筛选，所以WHERE可以对没选择的列进行筛选，但必须用原表列名而不能用SELECT中确定的列别名
- 相反 HAVING …… 对 SELECT …… 查询后（通常是分组并聚合查询后）的结果列进行 事后筛选，若SELECT里起了别名的字段则必须用别名进行筛选，且不能对SELECT里未选择的字段进行筛选。唯一特殊情况是，当HAVING筛选的是聚合函数时，该聚合函数可以不在SELECT里显性出现，见最后补充。注意having的列在select需要包括，往往是as重命名之后的
**案例**
筛选出总发票金额大于500且总发票数量大于5的顾客
USE sql_invoicing; SELECT      client_id,     SUM(invoice_total) AS total_sales,     COUNT(*/invoice_total/invoice_date) AS number_of_invoices FROM invoices GROUP BY client_id HAVING total_sales > 500 AND number_of_invoices > 5 -- 均为 SELECT 里的列别名
若写：WHERE total_sales > 500 AND number_of_invoices > 5，会报错：Error Code: 1054. Unknown column 'total_sales' in 'where clause'
**练习**
在 sql_store 数据库（有顾客表、订单表、订单项目表等）中，找出在 'VA' 州且消费总额超过100美元的顾客（这是一个面试级的问题，还很常见）
思路：
1. 需要的信息在顾客表、订单表、订单项目表三张表中，先将三张表合并
2. WHERE 事前筛选 'VA' 州的
3. 按顾客分组，并选取所需的列并聚合得到每位顾客的付款总额
4. HAVING 事后筛选超过 100美元 的
```sql
select c.customer_id,c.first_name,c.last_name,sum(ot.quantity*ot.unit_price) as total_scales
from order_items ot
join orders o
using (order_id)
join customers c
using (customer_id)
where state in ('VA','MA');
GROUP BY c.customer_id,c.first_name,c.last_name
having total_scales>1000;
```
**注意：解决问题时一点点来，最后在聚合起来**
**group by 往往喜欢直接复制select几个的做交叉**
**补充**
**学第六章第6节时发现，当 HAVING 筛选的是聚合函数时，该聚合函数可以不在SELECT里显性出现。（作为一种需要记住的特殊情况）**如：下面这两种写法都能筛选出总点数大于3k的州，如果不要求显示总点数，应该用后一种
SELECT state, SUM(points) FROM customers GROUP BY state HAVING SUM(points) > 3000 或 SELECT state FROM customers GROUP BY state HAVING SUM(points) > 3000
### 4. ROLLUP运算符
The ROLLUP Operator (5:05)
**GROUP BY …… WITH ROLL UP **自动汇总型分组，若是多字段分组的话汇总也会是多层次的，注意这是**MySQL扩展语法**，不是SQL标准语法
**案例**
分组查询各客户的发票总额**以及所有人的总发票额**
USE sql_invoicing; 
SELECT      client_id,    SUM(invoice_total) 
FROM invoices 
GROUP BY client_id WITH ROLLUP
多字段分组 
 例1：分组查询各州、市的总销售额（发票总额）以及州层次和全国层次的**两个层次的汇总额（总的和各州总的）**
SELECT      state,     city,     SUM(invoice_total) AS total_sales 
FROM invoices JOIN clients USING (client_id)  GROUP BY state, city WITH ROLLUP
这个时候会计算多次
**练习**
分组计算各个付款方式的总付款 并汇总
```
select pm.name as payment_method,sum(amount) as total
from payment_methods pm
join payments p
on p.payment_method = pm.payment_method_id
group by pm.name with ROLLUP
```
★总结
根据之后三篇参考文章，据说标准的 SQL 查询语句的执行顺序应该是下面这样的：
**1. FROM JOIN 选择和连接本次查询所需的表
2. ON/USING WHERE 按条件筛选行
3. GROUP BY 分组
4. HAVING （事后/分组后）筛选行
5. SELECT 筛选列
注意1：若进行了分组，这一步常常要聚合）
注意2：SELECT 和 HAVING 在 MySQL 里的执行顺序我还有点疑问，见后面的叙述
6. DISTINCT 去重
7. UNION 纵向合并
8. ORDER BY 排序
9. LIMIT 限制**
**"SELECT 是在大部分语句执行了之后才执行的，严格的说是在 FROM、WHERE 和 GROUP BY （以及 HAVING）之后执行的。理解这一点是非常重要的，这就是你不能在 WHERE 中使用在 SELECT 中设定别名的字段作为判断条件的原因。"**
这个顺序可以由下面这个例子的缩进表现出来（出右往左）（注意 DISTINCT 放不进去了只有以注释的形式展示出来，另外 SELECT 还是选择放在了 HAVING 之前）
                    SELECT name, SUM(invoice_total) AS total_sales          -- DISTINCT                                 FROM invoices JOIN clients USING (client_id)                              WHERE due_date < '2019-07-01'                         GROUP BY name                   HAVING total_sales > 150         UNION                     SELECT name, SUM(invoice_total) AS total_sales          -- DISTINCT                                 FROM invoices JOIN clients USING (client_id)                              WHERE due_date > '2019-07-01'                         GROUP BY name                   HAVING total_sales > 150     ORDER BY total_sales LIMIT 2
**关于 SELECT 的位置**
10. 如后面几篇参考文章所说，**按标准 SQL 的执行顺序， SELECT 是在 HAVING 之后**
11. 但根据前面的内容，**似乎在 MySQL 里，SELECT 的执行顺序是在 WHERE GROUP BY 之后，而在 HAVING 之前 —— 因而 WHERE GROUP BY 要用原列名（后来发现只有 WHERE 里必须用原列名，GROUP BY 是原列名或列别名都可用（甚至可以用1，2来指代 SELECT 中的列，不过 Mosh 不建议这样做））而 HAVING 必须用 SELECT 里的列别名（聚合函数除外）**
**按实践经验来看，就按 2 来记忆和理解是可行的**，但之后最好还是要去看书看资料把这个执行顺序的疑惑彻底搞清楚，这个还挺重要的。
## 【第六章】编写复杂查询（子查询）
Writing Complex Query (时长45分钟)
### 1. 介绍
之前：复制新表、删除、update用过
下面：select、from、where都可以用
### 2. 子查询(返回的是一个值)
Subqueries (2:29)
**回顾**
子查询： 任何一个充当另一个SQL语句的一部分的 SELECT…… 查询语句都是子查询，子查询是一个很有用的技巧。子查询的层级用括号实现。
**注意**
另外发现各种语言，各种语句，各种逻辑结构，各种情形下一般好像多加括号都不会有问题，只有少加括号才会出问题，所以不确定执行顺序时最好加上括号确保万无一失。
**案例**
在 products 中，找到所有比生菜（id = 3）价格高的
关键：**用子查询找到生菜价格**
USE sql_store; SELECT * FROM products WHERE unit_price > (     SELECT unit_price     FROM products     WHERE product_id = 3 )
MySQL执行时会先执行括号内的子查询（内查询），将获得的生菜价格作为结果返回给外查询
子查询不仅可用在 WHERE …… 中，也可用在 SELECT …… 或 FROM …… 等子句中，本章后面会讲
**练习**
在 sql_hr 库 employees 表里，选择所有工资超过平均工资的雇员
关键：**由子查询得到平均工资**
USE sql_hr; SELECT * FROM emp loyees WHERE salary > (     SELECT AVG(salary)     FROM employees )
### 3. IN运算符（也是where里）（子查询返回table）
The IN Operator (3:39)
**案例**
在 sql_store 库 products 表中找出那些从未被订购过的产品
思路：
1. order_items 表里有所有产品被订购的记录，用 DISTINCT 去重，得到所有被订购过的产品列表
2. 不在这列表里（NOT IN 的使用）的产品即为从未被订购过的产品
USE sql_store; SELECT * FROM products WHERE product_id NOT IN (     SELECT DISTINCT product_id     FROM order_items )
上一节是子查询返回一个值（平均工资），这一节是返回一列数据（被订购过的产品id列表），之后还会用子查询返回一个多列的表
**练习**
在 sql_invoicing 库 clients 表中找到那些没有过发票记录的客户
思路：和上一个例子完全一致，在invoices里用**DISTINCT**找到所有有过发票记录的客户列表，再用NOT IN来筛选
```
select name
from clients
where client_id not in (
        select distinct client_id from invoices
)
```
### 4. 子查询vs连接
上接练习
**小结**
子查询（Subquery）是将一张表的查询结果作为另一张表的查询依据并层层嵌套，其实也可以先将这些表链接（Join）合并成一个包含所需全部信息的详情表再直接在详情表里筛选查询。两种方法一般是可互换的，具体用哪一种取决于 **效率/性能（Performance） 和 可读性（readability）**，之后会学习 执行计划，到时候就知道怎样编写并更快速地执行查询，现在主要考虑可读性
**案例**
上节课的案例，找出从未订购（没有invoices）的顾客：
法1. 子查询
先用子查询查出有过发票记录的顾客名单，作为筛选依据
USE sql_invoicing; SELECT * FROM clients WHERE client_id NOT IN (     SELECT DISTINCT client_id     /*其实这里加不加DISTINCT对子查询返回的结果有影响     但对最后的结果其实没有影响*/     FROM invoices )
法2. 链接表
用顾客表 LEFT JOIN 发票记录表，再直接在这个合并详情表中筛选出没有发票记录的顾客
USE sql_invoicing; SELECT DISTINCT client_id, name ……  -- 不能SELECT DISTINCT * FROM clients LEFT JOIN invoices USING (client_id) -- 注意不能用内链接，否则没有发票记录的顾客（我们的目标）直接就被筛掉了 WHERE invoice_id IS NULL
就上面这个案例而言，子查询可读性更好，但有时子查询会过于复杂（嵌套层数过多），用链接表更好（下面的练习就是）。总之在选择方法时，可读性是很重要的考虑因素
**练习**
在 sql_store 中，选出买过生菜（id = 3）的顾客的id、姓和名
分别用子查询法和链接表法实现并比较可读性
法1. 完全子查询
USE sql_store; SELECT customer_id, first_name, last_name FROM customers WHERE customer_id IN (       -- 子查询2：从订单表中找出哪些顾客买过生菜     SELECT customer_id     FROM orders     WHERE order_id IN (           -- 子查询1：从订单项目表中找出哪些订单包含生菜         SELECT DISTINCT order_id         FROM order_items         WHERE product_id = 3     ) )
法2. 混合：子查询 + 表连接
USE sql_store; SELECT customer_id, first_name, last_name FROM customers WHERE customer_id IN (       -- 子查询：哪些顾客买过生菜     SELECT customer_id     FROM orders     JOIN order_items USING (order_id)       -- 表连接：合并订单和订单项目表得到 订单详情表     WHERE product_id = 3 )
法3. 完全表连接
直接链接合并3张表（顾客表、订单表和订单项目表）得到 带顾客信息的订单详情表，该合并表包含我们所需的所有信息，可直接在合并表中用WHERE筛选买过生菜的顾客（注意 DISTINCT 关键字的运用）。
USE sql_store; SELECT DISTINCT customer_id, first_name, last_name FROM customers LEFT JOIN orders USING (customer_id) LEFT JOIN order_items USING (order_id) WHERE product_id = 3
这个案例中，先将所需信息所在的几张表全部连接合并成一张大表再来查询筛选明显比层层嵌套的多重子查询更加清晰明了（因为此时子查询嵌套）
### 5. ALL关键字（后面是子查询返回table，不用max了）（大小比较时）
The ALL Keyword (4:52)
**小结**
> (MAX (……)) 和 > ALL(……) 等效可互换
“比这里面最大的还大” = “比这里面的所有的都大”
**案例**
sql_invoicing 库中，选出金额大于3号顾客所有发票金额（或3号顾客最大发票金额） 的发票
法1. 用MAX关键字
USE sql_invoicing; SELECT * FROM invoices WHERE invoice_total > (     SELECT MAX(invoice_total)     FROM invoices     WHERE client_id = 3 )
法2. 用ALL关键字
USE sql_invoicing; SELECT * FROM invoices WHERE invoice_total > ALL (     SELECT invoice_total     FROM invoices     WHERE client_id = 3 )
其实就是把内层括号的MAX拿到了外层括号变成ALL：
MAX法是用MAX()返回一个顾客3的最大订单金额，再判断哪些发票的金额比这个值大；
ALL法是先返回顾客3的所有订单金额，是一列值，再用ALL()判断比所有这些金额都大的发票有哪些。
两种方法是完全等效的
### 6. ANY/SOME关键字
The ANY Keyword (2:36)
**小结**
**> ANY/SOME (……) 与 > (MIN (……)) 等效**
**= ANY/SOME (……) 与 IN (……) 等效**
**案例1**
> ANY (……) 与 > (MIN (……)) 等效的例子：
sql_invoicing 库中，选出金额大于3号顾客任何发票金额（或最小发票金额） 的发票
USE sql_invoicing; SELECT * FROM invoices WHERE invoice_total > ANY (     SELECT invoice_total     FROM invoices     WHERE client_id = 3 ) 或 WHERE invoice_total > (  SELECT MIN(invoice_total)     FROM invoices     WHERE client_id = 3 )
**案例2**
= ANY (……) 与 IN (……) 等效的例子:
选出至少有两次发票记录的顾客
USE sql_invoicing; SELECT * FROM clients WHERE client_id IN (  -- 或 = ANY (      -- 子查询：有2次以上发票记录的顾客     SELECT client_id     FROM invoices     GROUP BY client_id     HAVING COUNT(*) >= 2 )
### 7. 相关子查询（别名）   和sum等函数一起用有groupby的作用
Correlated Subqueries (5:36)
**小结**
**引用了外面主查询的from的别名**
之前都是非关联主/子（外/内）查询，比如子查询先查出整体的某平均值或满足某些条件的一列id，作为主查询的筛选依据，这种子查询与主查询无关，会先一次性得出查询结果再返回给主查询供其使用。
而下面这种相关联子查询例子里，子查询要查询的是某员工所在办公室的平均值，子查询是依赖主查询的，**注意这种关联查询是在主查询的每一行/每一条记录层面上依次进行的**，这一点可以为我们写关联子查询提供线索（注意表别名的使用），另外也正因为这一点，相关子查询会比非关联查询执行起来慢一些。
**案例**
选出 sql_hr.employees 里那些工资超过**他所在**办公室平均工资（而不是整体平均工资）的员工
关键：如何查询目前主查询员工的所在办公室的平均工资而不是整体的平均工资？
思路：给主查询 employees表 设置别名 e，这样在子查询查询平均工资时加上 WHERE office_id = e.office_id 筛选条件即可相关联地查询到目前员工所在地办公室的平均工资
USE sql_hr;
SELECT * FROM employees e  -- 关键 1 WHERE salary > (     
SELECT AVG(salary)    
	 FROM employees     
WHERE office_id = e.office_id  -- 关键 2     -- 【子查询表字段不用加前缀，主查询表的字段要加前缀，以此区分】 )
相关子查询很慢，但很强大，也有很多实际运用
**注意**
后面select也用到了
**练习**
在 sql_invoicing 库 invoices 表中，找出高于每位顾客平均发票金额的发票
USE sql_invoicing; SELECT * FROM invoices i WHERE  invoice_total > (     -- 子查询：目前客户的平均发票额     SELECT AVG(invoice_total)     FROM invoices     WHERE client_id = i.client_id )
### 8. EXISTS运算符（别名）  IN  join 
The EXISTS Operator (5:39)
**小结**
IN + 子查询 等效于 EXIST + 相关子查询，如果前者子查询的结果集过大占用内存，用后者逐条验证更有效率。另外 EXIST() 本质上是根据是否为空返回 TRUE 和 FALSE，所以也可以加 NOT 取反。
**案例**
找出有过发票记录的客户，第4节学过用子查询或表连接来实现
法1. 子查询
USE sql_invoicing;
SELECT * 
FROM clients 
WHERE client_id IN (     SELECT DISTINCT client_id     FROM invoices )
法2. 链接表
USE sql_invoicing; SELECT DISTINCT client_id, name ……  FROM clients JOIN invoices USING (client_id) -- 内链接，只留下有过发票记录的客户
第3种方法是用EXISTS运算符实现
USE sql_invoicing; 
SELECT * FROM clients c 
WHERE EXISTS (     
SELECT */client_id       /* 就这个子查询的目的来说，SELECT的选择不影响结果，     因为EXISTS()函数只根据是否为空返回 TRUE 和 FALSE */     FROM invoices     
WHERE client_id = c.client_id )
这还是个相关子查询，因为在其中引用了主查询的 clients 表。这同样是按照主查询的记录一条条验证执行的。具体说来，对于 clients 表（设置别名为 c）里的每一个顾客，子查询在 invoices 表查找这个人的发票记录（ 即 client_id = c.client_id 的发票记录），有就返回相关记录否者返回空，然后 EXISTS() 根据是否为空得到 TRUE 和 FALSE（表示此人有无发票记录），然后主查询凭此确定是否保留此条记录。
对比一下，**法1是用子查询返回一个有发票记录的顾客id列表，如（1，3，8 ……），然后用IN运算符来判断，如果子查询表太大，可能返回一个上百万千万甚至上亿的id列表，这个id列表就会很占内存非常影响性能，对于这种子查询会返回一个很大的结果集的情况，用这里的EXIST+相关子查询逐条筛选会更有效率**
**另外，因为 SELECT() 返回的是 TRUE/FALSE，所以自然也可以加上NOT取反，见下面的练习**
**in join exists any/some:几个都可以的方法**
**练习**
在sql_store中，找出从来没有被订购过的产品。
USE sql_store; SELECT * FROM products  WHERE product_id NOT IN (     SELECT product_id      -- 加不加DISTINCT对最终结果无影响     FROM order_items )
或
SELECT * FROM products p WHERE NOT EXISTS (     SELECT *     FROM order_items     WHERE product_id = p.product_id )
对于亚马逊这样的大电商来说，如果用IN+子查询法，子查询可能会返回一个百万量级的产品id列表，这种情况还是用EXIST+相关子查询逐条验证法更有效率
### 9. SELECT子句的子查询（新的列的每一个值都一样 ）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666601815849-8bbd30e7-8615-49a5-8680-737a58bda576.png#averageHue=%23e1e1e1&clientId=ud751265d-3106-4&errorMessage=unknown%20error&from=paste&height=546&id=u96842a70&originHeight=546&originWidth=1114&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226976&status=error&style=none&taskId=u3579a0cd-d557-4eae-bdb2-27ffefe7a62&title=&width=1114)
**小结**
不仅 WHERE 筛选条件里可以用子查询，SELECT 选择子句和 FROM 来源表子句也能用子查询，这节课讲 SELECT 子句里的子查询
简单讲就是，SELECT选择语句是用来确定查询结果选择包含哪些字段，每个字段都可以是一个表达式，而每个字段表达式里的元素除了可以是原始的列，具体的数值，也同样可以是其它各种花里胡哨的子查询的结果
任何子查询都是简单查询的嵌套，没什么新东西，只是多了一个层级而已，由内向外地一层层梳理就很清楚
**要特别注意记住以子查询方式实现在SELECT中使用同级列别名的方法，需要用select不能直接使用**
**案例**
得到一个有如下列的表格：invoice_id, invoice_total, avarege（总平均发票额）, difference（前两个值的差）
**USE sql_invoicing; **
**SELECT      invoice_id,     invoice_total,     (SELECT AVG(invoice_total) FROM invoices) AS invoice_average,  ** 
  /*不能直接用聚合函数，因为“比较强势”，会压缩聚合结果为一条     用括号+子查询
将其作为一个数值结果 152.388235 加入主查询语句*/     
后面也有 (select avg(invoice_total) from invoices) as average,
**invoice_total - (SELECT invoice_average) AS difference  **  
 /*SELECT表达式里要用原列名，不能直接用别名invoice_average     要用列别名的话用子查询（SELECT +同级的列别名）即可    
**练习**
得到一个有如下列的表格：client_id, name, total_sales（各个客户的发票总额）, average（总平均发票额）, difference（前两个值的差）
```
use sql_invoicing;
select client_id,
        name,
        (select sum(invoice_total) from invoices 
         where client_id = c.client_id) as total_sales,
        (select avg(invoice_total) from invoices) as average,
        (select total_sales - average) as difference
from clients c;
```
注意第四个客户的 total_sales 和 difference 都是空值 null，之前用groupby列数不对
### 10. FROM子句的子查询（保存虚拟表）
直接把虚拟表的代码弄到from里即可
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666604339675-bf2cc4a4-c62c-411a-bb43-344eba8a9938.png#averageHue=%23eef0ee&clientId=ud751265d-3106-4&errorMessage=unknown%20error&from=paste&height=544&id=ub4004138&originHeight=544&originWidth=1037&originalType=binary&ratio=1&rotation=0&showTitle=false&size=279656&status=error&style=none&taskId=ud3bf15e7-0400-49e2-bc9c-2c976fae558&title=&width=1037)
过于复杂，注意和前面复制一个表一样都需要AS起名字
**小结**
子查询的结果同样可以充当一个“虚拟表”作为FROM语句中的来源表，即将筛选查询结果作为来源再进行进一步的筛选查询。但注意只有在子查询不太复杂时进行这样的嵌套，否则最好用后面讲的视图先把子查询结果储存起来再使用。
复杂的子查询再嵌套进 FROM 里会让整个查询看起来过于复杂，上面这个最好是将子查询结果储存为叫 sales_summury 的视图，然后再直接使用该视图作为来源表，之后会讲。
## 【第七章】MySQL的基本函数
### 1. 数值函数
Numeric Functions (2:54)
**小结**
主要介绍最常用的几个数值函数：
**ROUND（四舍五入，位数）、**
**TRUNCATE（截断）、**
**CEILING（大于等于的最大整数）、**
**FLOOR（小于等于）、**
**ABS、**
**RAND（生成0-1浮点数）**
查看MySQL全部数值函数可**谷歌 'mysql numeric function'**，第一个就是官方文档。
### 2. 字符串函数
String Functions (5:47)
**小结**
依然介绍最常用的字符串函数：
1. LENGTH, UPPER, LOWER
2. TRIM, LTRIM, RTRIM
3. LEFT, RIGHT, SUBSTRING
4. LOCATE, REPLACE, 【CONCAT】
查看全部搜索关键词 **'mysql string functions'**
**长度、转大小写：**
**SELECT LENGTH('sky')  **-- 字符串字符个数/长度（LENGTH）
** SELECT UPPER('sky')  **-- 转大写 
**SELECT LOWER('Sky')  **-- 转小写
**用户输入时时常多打空格，下面三个函数用于处理/修剪（trim）字符串前后的空格，L、R 表示 LEFT、RIGHT：**
**SELECT LTRIM('  Sky') **
**SELECT RTRIM('Sky  ') **
**SELECT TRIM(' Sky ')**
**切片：**
**-- 取左边，取右边，取中间**
** SELECT LEFT('Kindergarden', 4)  **-- 取左边（LEFT）4个字符 
**SELECT RIGHT('Kindergarden', 6)  **-- 取右边（RIGHT）6个字符 
**SELECT SUBSTRING('Kindergarden', 7, 6)  ** -- 取中间从第7个开始的长度为6的子串（SUBSTRING） -- 注意是从第1个（而非第0个）开始计数的 -- 省略第3参数（子串长度）则一直截取到最后
**定位：**
**SELECT LOCATE('gar', 'Kindergarden')  **
-- 定位（LOCATE）首次出现的位置（从1开始数） -- 没有的话返回0（其他编程语言大多返回-1，可能因为索引是从0开始的） -- 这个定位/查找函数依然是不区分大小写的
**替换：**
**SELECT REPLACE('Kindergarten', 'garten', 'garden')**
**连接：**
**SELECT CONCAT(first_name, ' ', last_name) AS full_name -- concatenate v. 连接 FROM customers**
### 3. MySQL中的日期函数
Date Functions in MySQL (4:08)
**小结**
本节学基本的处理时间日期的函数，下节课学日期时间的格式化
1. NOW, CURDATE, CURTIME
2. YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, DAYNAME, MONTHNAME
3. EXTRACT(单位 FROM 日期时间对象)， 如 EXTRACT(YEAR FROM NOW())
**实例**
当前时间
**SELECT NOW() ** -- 2020-09-12 08:50:46 
**SELECT CURDATE()  **-- - current date, 2020-09-12 SELECT
** CURTIME()**  -- current time, 08:50:46
以上函数将返回时间日期对象
提取时间日期对象中的元素：
**SELECT YEAR(NOW())**  -- 2020
**还有MONTH, DAY, HOUR, MINUTE, SECOND。**
以上函数均返回整数，还有另外两个返回字符串的：
**SELECT DAYNAME(NOW())**  -- Saturday SELECT **MONTHNAME(NOW()) ** -- September
**标准SQL语句**有一个类似的函数 EXTRACT()，若需要在不同DBMS中录入代码，最好用EXTRACT()：
**SELECT EXTRACT(YEAR FROM NOW())**
当然第一参数也可以是MONTH, DAY, HOUR ……
总之就是：EXTRACT(单位 FROM 日期时间对象)
select
from
**where year(order_date) = year(now())**
### 4. 格式化日期和时间
Formatting Dates and Times (2:14)
**小结**
**DATE_FORMAT(date/NOW(), format) **将 date 根据 format 字符串进行格式化。
**TIME_FORMAT(time, format) **类似于 DATE_FORMAT 函数，但这里 format 字符串只能包含用于小时，分钟，秒和微秒的格式说明符。其他说明符产生一个 NULL 值或0。
**方法**
很多像这种完全不需要记也不可能记得完，重要的是知道有这么个可以实现这个功能的函数，具体的**格式说明符（Specifiers）**可以需要的时候去查，至少有两种方法：
1. 直接谷歌关键词 如 **mysql date format functions**, 其实是在官方文档的 12.7 Date and Time Functions 小结里，有两个函数的说明和 specifiers 表
2. 用软件里的帮助功能，如 workbench 里的 HELP INDEX 打开官方文档查询或者右侧栏的 automatic comtext help (其是也是查官方文档，不过是自动的)
**实例**
SELECT DATE_FORMAT(NOW(), '%M %d, %Y')  -- September 12, 2020 -- 格式说明符里，大小写是不同的，这是目前SQL里第一次出现大小写不同的情况 ,注意如果只输入一个%就只显示对应的 
SELECT TIME_FORMAT(NOW(), '%H : %i %p')  -- 11:07 AM
### 5. 计算日期和时间
Calculating Dates and Times (3:08)
**小结**
有时需要对日期事件对象进行运算，如增加一天或算两个时间的差值之类，介绍一些最有用的日期时间计算函数：
1. DATE_ADD, DATE_SUB
2. DATEDIFF
3. TIME_TO_SEC
增加或减少一定的天数、月数、年数、小时数等等
SELECT DATE_ADD(NOW(), INTERVAL -1 DAY)    减少一天
 SELECT DATE_SUB(NOW(), INTERVAL 1 YEAR) +一年
但其实不用函数，直接加减更简洁：
NOW() - INTERVAL 1 DAY                 NOW() - INTERVAL 1 YEAR 
计算日期差异
**SELECT DATEDIFF('2019-01-01 09:00', '2019-01-05') ** 注意前后顺序
 -- -4 -- 会忽略时间部分，只算日期差异  
**SELECT  TIME_TO_SEC('09:00 ')**：计算从 00:00 到某时间经历的秒数 ```
sql SELECT TIME_TO_SEC('09:00')  -- 32400 SELECT TIME_TO_SEC('09:00') - TIME_TO_SEC('09:02')  -- -120
### 6. IFNULL和COALESCE函数
The IFNULL and COALESCE Functions (3:29)
**导航**
之前讲了基本的处理**数值、文本、日期时间**的函数，再介绍几个其它的有用的MySQL函数
**小结**
两个用来替换空值的函数：IFNULL, COALESCE. 后者更灵活
**案例**
将 orders 里 [shipper.id](https://link.zhihu.com/?target=http%3A//shipper.id/) 中的空值替换为 'Not Assigned'（未分配）
SELECT      order_id,     IFNULL(shipper_id, 'Not Assigned')AS shipper     FROM orders
将 orders 里 [shipper.id](https://link.zhihu.com/?target=http%3A//shipper.id/) 中的空值替换为 'Not Assigned，若 comments 也为空则替换为 'Not Assigned'（未分配）
SELECT     
 order_id,     
COALESCE(shipper_id, comments, 'Not Assigned') AS shipper FROM orders
COALESCE 函数是返回一系列值中的首个非空值，更灵活
（coalesce vi. 合并；结合；联合）
### 7. IF函数
The IF Function (4:54)
**小结**
根据是否满足条件返回不同的值:
IF(条件表达式, 返回值1, 返回值2) 返回值可以是任何东西，数值 文本 日期时间 空值null 均可
**案例**
将订单表中订单按是否是今年的订单分类为active（活跃）和archived（存档），之前讲过用UNION法，即用两次查询分别得到今年的和今年以前的订单，添加上分类列再用UNION合并，这里直接在SELECT里运用IF函数可以更容易地得到相同的结果
```
select order_id,order_date,
	if(year(order_date) = 2019, 'Active','Archived')as cat
from orders
```
**练习**
得到包含如下字段的表：
1. product_id
2. name (产品名称)
3. orders (该产品出现在订单中的次数)
4. frequency (根据是否多于一次而分类为'Once'或'Many times')
```
SELECT p.product_id,
        name,
        count(*),
        if(count(*)>1,'once','many')as times
from products p
join order_items using (product_id)
GROUP BY p.product_id,name
```
### 8.case
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666665547254-99a7f0f7-7677-4f9d-89ad-2adf4ca43847.png#averageHue=%23f7f6f4&clientId=ud751265d-3106-4&errorMessage=unknown%20error&from=paste&height=363&id=ude2bb141&originHeight=363&originWidth=1117&originalType=binary&ratio=1&rotation=0&showTitle=false&size=181307&status=error&style=none&taskId=ua9b04f95-ea10-4d09-b4f4-e0f1dcdebc0&title=&width=1117)
The CASE Operator (5:23)
**小结**
当分类多余两种时，可以用IF嵌套，也可以用CASE语句，后者可读性更好
CASE语句结构：
CASE      WHEN …… THEN ……     WHEN …… THEN ……     WHEN …… THEN ……     ……     [ELSE ……] （ELSE子句是可选的） END
## 【第八章】视图
有点类似前面把虚拟表变成一个独立的表格，这里是 变成视图，都是为了以后再根据这个虚拟表提取信息，用的时候直接再from后面用，和table一样
- 注意还是临时窗口，不占用内存，数据还是再table里
- view会自动更新（从table里），table不会
### 1. 创建视图
**小结**
就是创建虚拟表，自动化一些重复性的查询模块，简化各种复杂操作（包括复杂的子查询和连接等）
注意视图虽然可以像一张表一样进行各种操作，但**并没有真正储存数据**，数据仍然储存在原始表中，视图**只是储存起来的模块化的查询结果**，是为了方便和简化后续进一步操作而储存起来的虚拟表。
**案例**
创建 sales_by_client 视图
```sql
CREATE VIEW sales_by_client AS     
SELECT          
client_id,         
name,         
SUM(invoice_total) AS total_sales     
FROM clients c     
JOIN invoices i
USING(client_id)     
GROUP BY client_id, name;     -- 虽然实际上这里加不加上name都一样
```
若要删掉该视图用 DROP VIEW sales_by_client 或通过右键菜单
创建视图后可就当作 sql_invoicing 库下一张表一样进行各种操作
**练习**
创建一个客户差额表视图，可以看到客户的id，名字以及**差额（发票总额-支付总额）**
USE sql_invoicing; CREATE VIEW clients_balance AS     SELECT          client_id,         c.name,         SUM(invoice_total - payment_total) AS balance     FROM clients c     JOIN invoices USING(client_id)     GROUP BY client_id
### 2. 更新或删除视图、保存视图语句
Altering or Dropping Views (2:52)
**小结**
**修改视图可以先DROP VIEW 在 CREATE VIEW（推荐用CREATE OR REPLACE）**
视图的查询语句可以在编辑模式下查看和修改，但最好是保存为sql文件并放在源码控制妥善管理
**案例**
想在上一节的顾客差额视图的查询语句最后加上按差额降序排列
法1. 先删除再重建
USE sql_invoicing; DROP VIEW IF EXISTS clients_balance; -- 若不存在这个视图，直接 DROP 会报错，所以要加上 IF EXISTS 先检测有没有这个视图  CREATE VIEW clients_balance AS      ……     ORDER BY balance DESC
法2. 用REPLACE关键字，即用 CREATE OR REPLACE VIEW clients_balance AS，和上面等效，不过上面那种分成两个语句的方式要用的多一点
USE sql_invoicing; CREATE OR REPLACE VIEW clients_balance AS     ……     ORDER BY balance DESC
如何保存视图的原始查询语句？
法1.
（推荐方法） 将原始查询语句保存为 views 文件夹下的和与视图同名的 clients_balance.sql 文件，然后将这个文件夹放在源码控制下（put these files under source control）, 通常放在 git repository（仓库）里与其它人共享，团队其他人因此能在自己的电脑上重建这个数据库
法2.
若丢失了原始查询语句，要修改的话可点击视图的扳手按钮打开**编辑模式**，可看到如下被MySQL处理了的查询语句
MySQL在前面加了些莫名其妙的东西并且在所有库名表名字段名外套上反引号防止名称冲突（当对象名和MySQL里的关键字相同时确保被当作对象名而不是关键字），但这都不影响
直接做我们需要的修改，如加上ORDER BY balance DESC 然后点apply就行了
CREATE      ALGORITHM = UNDEFINED      DEFINER = `root`@`localhost`      SQL SECURITY DEFINER VIEW `clients_balance` AS     SELECT          `c`.`client_id` AS `client_id`,         `c`.`name` AS `name`,         SUM((`invoices`.`invoice_total` - `invoices`.`payment_total`)) AS `balance`     FROM         (`clients` `c`         JOIN `invoices` ON ((`c`.`client_id` = `invoices`.`client_id`)))     GROUP BY `c`.`client_id`     ORDER BY balance DESC
**法2是没有办法的办法，当然最好还是将 views 保存为 sql 文件并放入源码控制**
### 3. 可更新视图
Updatable Views (5:12)
**小结**
视图作为虚拟表/衍生表，除了可用在查询语句SELECT中，也可以用在增删改（INSERT DELETE UPDATE）语句中，但后者有一定的前提条件。
如果一个视图的原始查询语句中没有如下元素：
**1. DISTINCT 去重
2. GROUP BY/HAVING/聚合函数 (后两个通常是伴随着 GROUP BY 分组出现的)
3. UNION 纵向连接**
则该视图是可更新视图（Updatable Views），可以增删改，否则只能查。
另外，增（INSERT）还要满足附加条件：视图必须包含底层原表的所有必须字段
**总之，一般通过原表修改数据，但当出于安全考虑或其他原因没有某表的直接权限时，可以通过视图来修改底层数据（？），前提是视图是可更新的。**
之后会将关于安全和权限的内容
**案例**
4. 删：
删掉id为1的发票记录
DELETE FROM invoices_with_balance WHERE invoice_id = 1
5. 改：
将2号发票记录的期限延后两天
UPDATE invoices_with_balance SET due_date = DATE_ADD(due_date, INTERVAL 2 DAY) WHERE invoice_id = 2
6. 增：
**在视图中用INSERT新增记录的话还有另一个前提，即视图必须包含其底层所有原始表的所有必须字段**
例如，若这个 invoices_with_balance 视图里没有 invoice_date 字段（invoices 中的必须字段），那就无法通过该视图向 invoices 表新增记录，因为 invoices 表不会接受 invoice_date 字段为空的记录
### 4. WITH CHECK OPTION 子句
THE WITH CHECK OPTION Clause (2:18)
**小结**
在视图的原始查询语句最后加上** WITH CHECK OPTION** 可以防止执行那些会让视图中某些行（记录）消失的修改语句。
### 5. 视图的其他优点
Other Benefits of Views (2:37)
**小结**
三大优点：
简化查询、增加抽象层和减少变化的影响、数据安全性
具体来讲：
1. （首要优点）简化查询 simplify queries
2. 增加抽象层，减少变化的影响 Reduce the impact of changes：视图给表增加了一个抽象层（模块化），这样如果数据库设计改变了（如一个字段从一个表转移到了另一个表），只需修改视图的查询语句使其能保持原有查询结果即可，不需要修改使用这个视图的那几十个查询。相反，如果没有视图这一层的话，所有查询将直接使用指向原表的原始查询语句，这样一旦更改原表设计，就要相应地更改所有的这些查询。
3. 限制对原数据的访问权限 Restrict access to the data：在视图中可以对原表的行和列进行筛选，这样如果你禁止了对原始表的访问权限，用户只能通过视图来修改数据，他们就无法修改视图中未返回的那些字段和记录。但注意这通常并不简单，需要良好的规划，否则最后可能搞得一团乱。
了解这些优点，但不要盲目将他们运用在所有的情形中。
修改视图，原表数据也会变（改：只能是可更新视图，可以with check option进行限制）
修改原表，视图数据会不会变：会
## 【第九章】存储过程
Stored Procedures (时长48分钟)
### 1. 什么是存储过程
What are Stored Procedures (2:18)
**小结**
存储过程三大作用：
1. 储存和管理SQL代码 Store and organize SQL
2. 性能优化 Faster execution
3. 数据安全 Data security
**导航**
之前学了增删改查，包括复杂查询以及如何运用视图来简化查询。
假设你要开发一个使用数据库的应用程序，你应该将SQL语句写在哪里呢？
如果将SQL语句内嵌在应用程序的代码里，将使其混乱且难以维护，所以应该将SQL代码和应用程序代码分开，将SQL代码储存在所属的数据库中，具体来说，是放在储存过程（stored procedure）和函数中。
储存过程是一个包含SQL代码模块的数据库对象，在应用程序代码中，我们调用储存过程来获取和保存数据（get and save the data）。也就是说，我们使用储存过程来储存和管理SQL代码。
使用储存程序还有另外两个好处。首先，大部分DBMS会对储存过程中的代码进行一些优化，因此有时储存过中的SQL代码执行起来会更快。
此外，就像视图一样，储存过程能加强数据安全。比如，我们可以移除对所有原始表的访问权限，让各种增删改的操作都通过储存过程来完成，然后就可以决定谁可以执行何种储存过程，用以限制用户对我们数据的操作范围，例如，防止特定的用户删除数据。
所以，储存过程很有用，本章将学习如何创建和使用它。
### 2. 创建一个存储过程
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666683935903-53ebbaf6-d121-4fc3-b379-3cbe07a1fdfc.png#averageHue=%23f8f8f8&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=370&id=u38f93a36&originHeight=370&originWidth=685&originalType=binary&ratio=1&rotation=0&showTitle=false&size=105536&status=error&style=none&taskId=u2b3e77d1-dce3-4718-b38d-6b1cc7ed033&title=&width=685)
**小结**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666684055968-a7157f23-35b9-41ef-b8d3-9e642adb61e4.png#averageHue=%23f2f1f0&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=187&id=u38a3d3f3&originHeight=187&originWidth=356&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5705&status=error&style=none&taskId=u364aa3d5-2529-4471-a779-b5d936f3883&title=&width=356)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666684004884-37703b4c-6807-48ae-858a-fb83a1cbadde.png#averageHue=%23f2f1f0&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=138&id=u25b08359&originHeight=138&originWidth=274&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4266&status=error&style=none&taskId=u0634bfb0-f3c3-47da-a528-d157ca72eda&title=&width=274)
**实例**
创造一个**get_clients()**过程
BEGIN 和 END 之间包裹的是此过程（PROCEDURE）的内容（body），内容里可以有多个语句，**但每个语句都要以 ; 结束，包括最后一个。**
为了将过程内容内部的语句分隔符与SQL本身执行层面的语句分隔符 ; 区别开，要先用 DELIMITER(分隔符) 关键字暂时将SQL语句的默认分隔符改为其他符号，一般是改成双美元符号 $$ ，创建过程结束后再改回来。注意创建过程本身也是一个完整SQL语句，所以别忘了在END后要加一个暂时语句分隔符 $$
**注意**
过程内容中所有语句都要以 ; 结尾并且因此要暂时修改SQL本身的默认分隔符，这些都是MySQL地特性，在SQL Server等就不需要这样
调用此程序：
法1. 点击闪电按钮
**法2. 用CALL关键字**
**CALL get_clients() 或 CALL sql_invoicing.get_clients()**
**注意**
上面讲的是如何在SQL中调用储存过程，但更多的时候其实是要在应用程序代码（可能是 C#、JAVA 或 Python 编写的）中调用。
**练习**
创造一个储存过程 get_invoices_with_balance（取得有差额（差额不为0）的发票记录）
DROP PROCEDURE get_invoices_with_balance; -- 注意DROP语句里这个过程没有带括号  DELIMITER $$     CREATE PROCEDURE get_invoices_with_balance()         BEGIN             SELECT *             FROM invoices_with_balance              -- 这是之前创造的视图             -- 用视图好些，因为有现成的balance列             WHERE balance > 0;         END$$ DELIMITER ; CALL get_invoices_with_balance();
### 3. 使用MySQL工作台创建存储过程（推荐）
Creating Procedures Using MySQLWorkbench (1:21)
也可以用点击的方式创造过程，右键选择 Create Stored Procedure，填空，Apply。这种方式 Workbench 会帮你处理暂时修改分隔符的问题
这种方式一样可以储存SQL文件
事实证明，mosh很喜欢用这种方式，后面基本都是用这种方式创建过程（毕竟不用管改分隔符的问题，能偷懒又何必自找麻烦呢？谁还不是条懒狗呢？）
### 4. 删除存储过程
Dropping Stored Procedures (2:09)
这一节学习删除储存过程，这在发现储存过程里有错误需要重建时很有用。
**实例**
一个创建过程（get_clients）的标准模板
DROP PROCEDURE IF EXISTS get_clients; -- 注意加上【IF EXISTS
**最佳实践**
**同视图一样，最好把删除和创建每一个过程的代码也储存在不同的SQL文件中**，并把这样的文件放在 Git 这样的源码控制下，这样就能与其它团队成员共享 Git 储存库。他们就能在自己的机器上重建数据库以及该数据库下的所有的视图和储存过程
如上面那个实例，可储存在 stored_procedures 文件夹（之前已有 views 文件夹）下的** **文件。当你把所有这些脚本放进源码控制，你能随时回来查看你对数据库对象所做的改动。
### 5. 参数
Parameters (5:26)
**小结**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666685987022-b2f2d8c6-f6d1-4552-a01a-552e48cd955c.png#averageHue=%23f4f0ef&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=224&id=u6f723d78&originHeight=224&originWidth=227&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4088&status=error&style=none&taskId=u31bf1091-8167-4caa-a324-7e747967353&title=&width=227)
**导航**
学完了如何创建和删除过程，这一节学习如何给过程添加参数
通常我们使用参数来给储存过程传值，但我们也可以用参数获取调用程序的结果值，第二个我们之后再讲
**案例**
创建过程 get_clients_by_state，可返回特定州的顾客
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666686004389-ea9a0091-1916-4422-84d6-2e4597789789.png#averageHue=%23f2f2f1&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=378&id=u7235bcaf&originHeight=378&originWidth=398&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13165&status=error&style=none&taskId=u9372c399-d18b-4182-90ae-e3257afe7f8&title=&width=398)
- 参数类型一般设定为 VARCHAR，除非能确定参数的字符数
- 多个参数可用逗号隔开
- 参数名可以和属性名一样，这个时候表名需要简写一下加点
**CALL get_clients_by_state('CA')**
不传入'CA'会报错，因为MySQL里所有参数都是必须参数
### 6. 带默认值的参数（IF-END IF）
Parameters with Default Value (8:18)
**小结**
给参数设置默认值，主要是运用条件语句块和替换空值函数
**回顾**
SQL中的条件类语句：
1. 替换空值 IFNULL(值1，值2)
2. 条件函数 IF(条件表达式, 返回值1, 返回值2)
3. 条件语句块
IF 条件表达式 THEN     语句1;     语句2;     ……; [ELSE]（可选）     语句1;     语句2;     ……; END IF; -- 别忘了【END IF】
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666688153690-65cff12b-e05c-447d-aa31-2dc1d7024dce.png#averageHue=%23f5f5f5&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=565&id=ud57d6ffc&originHeight=565&originWidth=943&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176747&status=error&style=none&taskId=u28133299-74b8-4b71-a1f4-cdc2c5607b6&title=&width=943)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666688167090-8e938f80-85ab-41f5-ad3f-8fb2b3482328.png#averageHue=%23f4f4f4&clientId=ua4e644cb-84db-4&errorMessage=unknown%20error&from=paste&height=558&id=ub48b6425&originHeight=558&originWidth=819&originalType=binary&ratio=1&rotation=0&showTitle=false&size=171325&status=error&style=none&taskId=ue0be86c2-4b44-4a48-94fd-235683f7640&title=&width=819) 
**案例1**
把 get_clients_by_state 过程的默认参数设为'CA'，即默认查询加州的客户
USE sql_invoicing; DROP PROCEDURE IF EXISTS get_clients_by_state; DELIMITER $$ CREATE PROCEDURE get_clients_by_state (     state CHAR(2)   ) BEGIN     IF state IS NULL THEN          SET state = 'CA';           /* 注意别忽略SET，         SQL 里单个等号 '=' 是比较操作符而非赋值操作符         '=' 与 SET 配合才是赋值 */     END IF;     SELECT * FROM clients c     WHERE c.state = state; END$$ DELIMITER ;
调用
CALL get_clients_by_state(NULL)
注意要调用过程并使用其默认值时时要传入参数 NULL ，MySQL不允许不传参数。
**案例2**
将 get_clients_by_state 过程设置为默认选取所有顾客
法1. 用IF条件语句块实现
…… BEGIN     IF state IS NULL THEN          SELECT * FROM clients c;     ELSE         SELECT * FROM clients c         WHERE c.state = state;     END IF;     END$$ ……
法2. 用IFNULL替换空值函数实现
…… BEGIN     SELECT * FROM clients c     WHERE c.state = IFNULL(state, c.state) END$$ ……
若参数为NULL，则返回c.state，利用 c.state = c.state 永远成立来返回所有顾客，思路很巧妙。
**练习**
创建一个叫 get_payments 的过程，包含 client_id 和 payment_method_id 两个参数，数据类型分别为 INT(4) 和 TINYINT(1) (1个字节，能存0~255，之后会讲数据类型，好奇可以谷歌 'mysql int size')，默认参数设置为返回所有记录
这是一个为你的工作预热的练习
USE sql_invoicing; DROP PROCEDURE IF EXISTS get_payments; DELIMITER $$ CREATE PROCEDURE get_payments (     client_id INT,  -- 不用写成INT(4)     payment_method_id TINYINT ) BEGIN     SELECT * FROM payments p     WHERE          p.client_id = IFNULL(client_id, p.client_id) AND         p.payment_method = IFNULL(payment_method_id, p.payment_method);         -- 再次小心这种实际工作中各表相同字段名称不同的情况 END$$ DELIMITER ;
调用：
所有支付记录
CALL get_payments(NULL, NULL)
1号顾客的所有记录
CALL get_payments(1, NULL)
3号支付方式的所有记录
CALL get_payments(NULL, 3)
5号顾客用2号支付方式的所有记录
CALL get_payments(5, 2)
**注意**
注意一个区别：
4. Parameter 形参（形式参数）：创建过程中用的占位符，如 client_id、payment_method_id
5. Argument 实参（实际参数）：调用时实际传入的值，如 1、3、5、NULL
### 7. 参数验证
Parameter Validation (6:40)
**小结**
过程除了可以**查**，也可以**增删改**，但修改数据前最好先进行**参数验证以防止不合理的修改**
主要利用条件语句块和 SIGNAL SQLSTATE MESSAGE_TEXT 关键字
具体来说是在过程的内容开头加上这样的语句：
IF 错误参数条件表达式 THEN     SIGNAL SQLSTATE '错误类型'         [SET MESSAGE_TEXT = '关于错误的补充信息']（可选）
**案例**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666768775197-1141766a-f93c-41ba-979b-2589b4e96690.png#averageHue=%23f9f8f7&clientId=u446f5046-b184-4&from=paste&height=574&id=u92c4f018&originHeight=574&originWidth=1044&originalType=binary&ratio=1&rotation=0&showTitle=false&size=243048&status=done&style=none&taskId=u671bde21-2e5d-4dcd-bf6f-4c8c3523f16&title=&width=1044)
创建一个 make_payment 过程，含 invoice_id, payment_amount, payment_date 三个参数
（Mosh还是喜欢通过右键 Create Stored Procedure 地方式创建，不必考虑暂时改分隔符的问题，更简便）
CREATE DEFINER=`root`@`localhost` PROCEDURE `make_payment`(     invoice_id INT,     payment_amount DECIMAL(9, 2),     /*     9是精度， 2是小数位数。     精度表示值存储的有效位数，     小数位数表示小数点后可以存储的位数     见：     https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html      */     payment_date DATE     ) BEGIN        UPDATE invoices i     SET          i.payment_total = payment_amount,         i.payment_date = payment_date     WHERE i.invoice_id = invoice_id; END
为了防止传入像 -100 的 payment_total 这样不合理的参数，要在增加一段参数验证语句，利用的是条件语句块加SIGNAL关键字，和其他编程语言中的抛出异常等类似
具体的错误类型可通过谷歌 "sqlstate error" 查阅（推荐使用IBM的那个表），这里是 '22 Data Exception' 大类中的 '22003 A numeric value is out of range.' 类型
注意还添加了 MESSAGE_TEXT 以提供给用户参数错误的更具体信息。现在传入 负数的 payment_amount 就会报错 'Error Code: 1644. Invalid payment amount '
…… BEGIN     IF payment_amount <= 0 THEN         SIGNAL SQLSTATE '22003'              SET MESSAGE_TEXT = 'Invalid payment amount';         END IF;     UPDATE invoices i     …… END
**注意**
过犹不及（"Too much of a good thing is a bad thing"），加入过多的参数验证会让代码过于复杂难以维护，像 payment_amount 非空这样的验证就不需要添加因为 payment_amount 字段本身就不允许空值因此MySQL会自动报错，。
参数验证工作更多的应该在应用程序端接受用户输入数据时就检测和报告，那样更快也更有效。储存过程里的参数验证只是在有人越过应用程序直接访问储存过程时作为最后的防线。这里只应该写那些**最关键和必要**的参数验证。
### 8. 输出参数(尽量不使用，in和out变量)
Output Parameters (3:55)
**小结**
输入参数是使用者用来给过程传入值的（cin），我们也可以用**输出参数来获取过程的结果值（cout）**
具体是在参数的前面加上 OUT 关键字，然后再 SELECT 后加上 INTO……
**调用麻烦，如无需要，不要多此一举**
**案例**
创造 get_unpaid_invoices_for_client 过程，获取特定顾客所有未支付过的发票记录（即 payment_total = 0 的发票记录）
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_unpaid_invoices_for_client`(         client_id INT ) BEGIN     SELECT COUNT(*), SUM(invoice_total)     FROM invoices i     WHERE          i.client_id = client_id AND         payment_total = 0; END
调用
call sql_invoicing.get_unpaid_invoices_for_client(3);
得到3号顾客的 COUNT(*) 和 SUM(invoice_total) （未支付过的发票数量和总金额）分别为2和286
我们也可以通过输出参数（变量）来获取这两个结果值，修改过程，添加两个输出参数 invoice_count 和 invoice_total：
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_unpaid_invoices_for_client`(         client_id INT,         OUT invoice_count INT,         OUT invoice_total DECIMAL(9, 2)         -- 默认是输入参数，输出参数要加【OUT】前缀 ) BEGIN     SELECT COUNT(*), SUM(invoice_total)     INTO invoice_count, invoice_total     -- SELECT后跟上INTO语句将SELECT选出的值传入输出参数（输出变量）中     FROM invoices i     WHERE          i.client_id = client_id AND         payment_total = 0; END
调用：单击闪电按钮调用，只用输入client_id，得到如下语句结果
set @invoice_count = 0; set @invoice_total = 0; call sql_invoicing.get_unpaid_invoices_for_client(3, @invoice_count, @invoice_total); select @invoice_count, @invoice_total;
先定义以@前缀表示用户变量，将初始值设为0。（变量（variable）简单讲就是储存单一值的对象）再调用过程，将过程结果赋值给这两个输出参数，最后再用SELECT查看。
很明显，通过输出参数获取并读取数据有些麻烦，若无充足的原因，不要多此一举。
### 9. 变量（全局变量和局部变量）
Variables (4:33)
**小结**
两种变量:
1. 用户或会话变量 SET @变量名 = ……（全局变量）
2. 本地变量 DECLARE 变量名 数据类型 [DEFAULT 默认值]（局部变量（过程或函数里面））
**用户或会话变量（User or session variable）：**
上节课讲过，用 SET 语句并在变量名前加 @ 前缀来定义，将在整个用户会话期间存续，在会话结束断开MySQL链接时才被清空，这种变量主要在调用带输出的储存过程时，作为输出参数来获取结果值。
**实例**
set @invoice_count = 0; set @invoice_total = 0; call sql_invoicing.get_unpaid_invoices_for_client(3, @invoice_count, @invoice_total); select @invoice_count, @invoice_total;
**本地变量（Local variable）**
在储存过程或函数中通过 DECLARE 声明并使用，在函数或储存过程执行结束时就被清空，常用来执行过程（或函数）中的计算
**案例（主要是局部变量，需要delcare，into代表=了）**
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666769891294-37b9d699-dc4e-4135-b3c6-85dae01fb4e4.png#averageHue=%23f6f6f5&clientId=u446f5046-b184-4&from=paste&height=570&id=uf6b54778&originHeight=570&originWidth=1044&originalType=binary&ratio=1&rotation=0&showTitle=false&size=269785&status=done&style=none&taskId=u339ae486-32dd-466f-9270-5f841e4f1e0&title=&width=1044)
### 10. 函数
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666771045660-5a724b76-eec9-4deb-9b53-6309eef9881b.png#averageHue=%23fafafa&clientId=u446f5046-b184-4&from=paste&height=504&id=uc1440574&originHeight=504&originWidth=606&originalType=binary&ratio=1&rotation=0&showTitle=false&size=151818&status=done&style=none&taskId=u11418a1d-d06a-48ce-ad5d-b35768ee069&title=&width=606)
**return后面是类型，例如int，然后再加几个函数属性**
另外，关于函数属性的说明：
1. **DETERMINISTIC** 决定性的：唯一输入决定唯一输出，和数据的改动更新无关，比如税收是订单总额的10%，则以订单总额为输入税收为输出的函数就是决定性的（？），但这里每个顾客的 risk_factor 会随着其发票记录的增加更新而改变，所以不是DETERMINISTIC的
2. **READS SQL DATA：**需要用到 SELECT 语句进行数据读取的函数，几乎所有函数都满足
3. **MODIFIES SQL DATA：**函数中有 增删改 或者说有 INSERT DELETE UPDATE 语句，这个例子不满足
**小结**
创建函数和创建过程的3点不同
4. **参数设置和body内容之间，有一段确定返回值类型以及函数属性的语句段。**参数设置和body内容之间，有一段确定返回值类型以及函数属性的语句段 RETURNS INTEGER DETERMINISTIC READS SQL DATA MODIFIES SQL DATA …… 
5. **最后是返回（RETURN）值而不是查询（SELECT）值。**最后是返回（RETURN）值而不是查询（SELECT）值 RETURN IFNULL(risk_factor, 0);**begin后面其实挺像的**
**3、函数只能返回单一值而不能返回多行多列的结果集，当你只需要返回一个值时就可以创建函数。**
相似，
新建：还是用右键 Create Function 来简化创
删除：DROP FUNCTION [IF EXISTS] 函数名
调用：
SELECT      client_id,     name,     get_risk_factor_for_client(client_id) AS risk_factor     **直接对一列数据传入函数进行处理**
**关于NULL**![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666770760619-22f9a217-0951-45b5-b288-b3fc9ea162f3.png#averageHue=%23cfcdc2&clientId=u446f5046-b184-4&from=paste&height=52&id=u9afd1115&originHeight=52&originWidth=722&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35082&status=done&style=none&taskId=u7808fe6a-e074-458e-86a4-a7e64d592e4&title=&width=722)
**删除，还是用DROP**
DROP FUNCTION [IF EXISTS] get_risk_factor_for_client
**注意**
和视图和过程一样，也最好存入SQL文件并加入源码控制，老生常谈了。
### 11. 其他约定
Other Conventions (1:51)
有各种各样的命名习惯（包括对函数过程的命名习惯以及对更改分隔符的习惯），没有明显的好坏之分，重要的是在一个项目或团队中保持恒定不变，学会入乡随俗
## 【第十章】触发器和事件    CREATE TRIGGER
Triggers and Events (时长22分钟)
### 1. 触发器
Triggers (7:31)
**小结**
触发器是在插入、更新或删除语句前后**自动执行的一段SQL代码**
通常我们使用触发器来**保持数据的一致性**
创建触发器的语法要点：**命名三要素，触发条件语句和触发频率语句，主体中 OLD/NEW 的使用**
**案例**
在 sql_invoicing 库中，发票表中同一个发票记录可以对应付款表中的多次付款记录，**发票表中的付款总额应该等于这张发票所有付款记录之和**，为了保持数据一致性**（同步更新）**，可以通过触发器让每一次付款表中新增付款记录时，发票表中相应发票的付款总额（payement_total）自动增加相应数额
语法上，和创建储存过程等类似，要暂时更改分隔符，用 CREATE 关键字，用 BEGIN 和 END 包裹的主体
几个关键点：
1. 命名习惯（三要素）：表名字_before/after(SQL语句执行之前或之后触发)_触发的SQL语句类型
2. 触发条件语句：BEFORE/AFTER     + INSERT/UPDATE/DELETE+ ON+ 触发表名字
3. 触发频率语句：这里** FOR EACH ROW** 表明每一个受影响的行都会启动一次触发器。其它有的DBMS还支持表级别的触发器，即不管插入一行还是五行都只启动一次触发器，到Mosh录制为止MySQL还不支持这样的功能
4. 主体：主体里可以对各种表的数据进行修改以保持数据一致性，但注意唯一不能修改的表是触发表**（after insert on payment 那么下面就不能对payment修改了）**，否则会引发无限循环（“触发器自燃”），主体中最关键的是使用 **NEW/OLD **关键字来指代受影响的新/旧行（若**INSERT用NEW，若DELETE用OLD**，若UPDATE似乎两个都可以用？）并可跟 '点+字段' 以引用这些行的相应属性
测试：往 payments 里新增付款记录，发现 invoices 表对应发票的付款总额确实相应更新
INSERT INTO payments VALUES (DEFAULT, 5, 3, '2019-01-01', 10, 1)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666774540481-1a708ba4-00af-462f-9db8-39d4fe69fedf.png#averageHue=%23f3f3f3&clientId=u446f5046-b184-4&from=paste&height=608&id=uf7fa668e&originHeight=608&originWidth=1092&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303236&status=done&style=none&taskId=u80596152-f497-471a-9716-3e1b4b23a67&title=&width=1092)
**练习**
创建一个和刚刚的触发器作用刚好相反的触发器，每当有付款记录被删除时，自动减少发票表中对应发票的付款总额
DELIMITER $$ CREATE TRIGGER payments_after_delete     AFTER DELETE ON payments     FOR EACH ROW BEGIN     UPDATE invoices     SET payment_total = payment_total - OLD.amount     WHERE invoice_id = OLD.invoice_id; END$$ DELIMITER ;
测试：删掉付款表里刚刚的那个给3号发票支付10美元的付款记录，则果然发票表里3号发票的付款总额相应减少10美元.
DELETE FROM payments WHERE payment_id = 9
### 2. 查看触发器（）
Viewing Triggers (1:20)
用以下命令来查看已存在的触发器及其各要素
**SHOW TRIGGER**S
如果之前创建时遵行了三要素命名习惯，这里也可以用 LIKE 关键字来筛选特定表的触发器
**SHOW TRIGGERS LIKE 'payments%'**
### 3. 删除触发器
和删除储存过程的语句一样
**DROP TRIGGER [IF EXISTS] payments_after_insert -- IF EXISTS 是可选的，但一般最好加上**
**最佳实践**
**最好将删除和创建数据库/视图/储存过程/触发器的语句放在同一个脚本中（即将删除语句放在创建语句前，DROP IF EXISTS + CREATE，用于创建或更新数据库/视图/储存过程/触发器，等效于 CREATE OR REPLACE）并将脚本录入源码库中，这样不仅团队都可以创建相同的数据库，还都能查看数据库的所有修改历史**
### 4. 使用触发器进行审核
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666775409761-3e656913-2927-44d7-a76e-9a5cf0bf1e0b.png#averageHue=%23f0efef&clientId=u446f5046-b184-4&from=paste&height=621&id=u9a86c7a6&originHeight=621&originWidth=1181&originalType=binary&ratio=1&rotation=0&showTitle=false&size=286465&status=done&style=none&taskId=uf91d7aec-bf60-44b8-958c-6434ca0a6eb&title=&width=1181)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666775497059-8fbc2a5d-e9e0-47d3-9413-5b7da183f0e4.png#averageHue=%23f7f7f7&clientId=u446f5046-b184-4&from=paste&height=636&id=u4e69acd4&originHeight=636&originWidth=1176&originalType=binary&ratio=1&rotation=0&showTitle=false&size=264543&status=done&style=none&taskId=u4a181a09-45e4-4d73-a722-2b70ac3ea92&title=&width=1176)
**导航**
之前已经学习了如何用触发器来保持数据一致性，触发器的另一个常见用途是为了审核的目的将修改数据的操作记录在日志里。
**小结**
建立一个**审核表（日志表）以记录谁在什么时间做了什么修改**，实现方法就是在**触发器里加上创建日志记录的语句**，日志记录应包含**修改内容信息和操作信息**两部分。
**案例**
用 create-payments-table.sql 创建 payments_audit 表，记录所有对 payements 表的增删操作，注意该表包含 client_id, date, amount 字段来记录修改的内容信息（方便之后恢复操作，如果需要的话）和 action_type, action_date 字段来记录操作信息。注意这是个简化了的 audit 表以方便理解。
具体实现方法是，重建在 payments 表里的的增删触发器 payments_after_insert 和 payments_after_delete，在触发器里加上往 payments_audit 表里添加日志记录的语句
具体而言：
往 payments_after_insert 的主体里加上这样的语句：
INSERT INTO payments_audit VALUES (NEW.client_id, NEW.date, NEW.amount, 'insert', NOW());
往 payments_after_delete 的主体里加上这样的语句：
INSERT INTO payments_audit VALUES (OLD.client_id, OLD.date, OLD.amount, 'delete', NOW());
测试：
-- 增： INSERT INTO payments VALUES (DEFAULT, 5, 3, '2019-01-01', 10, 1);
 -- 删： DELETE FROM payments WHERE payment_id = 10
发现 payments_audit 表里果然多了两条记录以记录这两次增和删的操作
**注意**
实际运用中不会为数据库中的每张表建立一个审核表，相反，会有一个整体架构，通过一个总审核表来记录，这在之后设计数据库中会讲到。
**导航**
下节课学习事件
### 5. 事件
Events (4:33)
事件是一段根据计划执行的代码，可以执行一次，或者按某种规律执行，比如每天早上10点或每月一次
通过事件我们可以自动化数据库维护任务，比如删除过期数据、将数据从一张表复制到存档表 或者 汇总数据生成报告，所以事件十分有用。
首先，需要打开MySQL事件调度器（event_scheduler），这是一个时刻寻找需要执行的事件的后台程序
查看MySQL所有系统变量：
**SHOW VARIABLES; **
**SHOW VARIABLES LIKE 'event%'; **-- 使用 LIKE 操作符查找以event开头的系统变量 -- 通常为了节约系统资源而默认关闭
用SET语句开启或关闭,不想用事件时可关闭以节省资源，这样就不会有一个不停寻找需要执行的事件的后台程序
**SET GLOBAL event_scheduler = ON/OFF**
**案例**
创建这样一个 yearly_delete_stale_audit_row 事件，每年删除过期的（超过一年的）日志记录（stale adj. 陈腐的；不新鲜的）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21688751/1666776149806-646053eb-553e-4e9a-b780-989187498a73.png#averageHue=%23f6f5f5&clientId=u446f5046-b184-4&from=paste&height=569&id=u3f4c7f8c&originHeight=569&originWidth=1110&originalType=binary&ratio=1&rotation=0&showTitle=false&size=233378&status=done&style=none&taskId=uee817945-cda5-4f37-9abd-00c36dcacbc&title=&width=1110)
关键点：
1. 命名：用时间间隔（频率）开头，可以方便之后分类检索，时间间隔（频率）包括 【once】/hourly/daily/monthly/yearly 等等
2. 执行计划：
- 规律性周期性执行用 EVERY 关键字，可以是 EVERY 1 HOUR / EVERY 2 DAY 等等
- 若只执行一次就用 AT 关键字，如：AT '2019-05-01'
- 开始 STARTS 和结束 ENDS 时间都是可选的
另外：
NOW() - INTERVAL 1 YEAR 等效于 DATE_ADD(NOW(), INTERVAL -1 YEAR) 或 DATE_SUB(NOW(), INTERVAL 1 YEAR)，但感觉不用DATEADD/DATESUB函数，直接相加减（但INTERVAL关键字还是要用）还简单直白点
**小结**
查看和开启/关闭事件调度器（event_scheduler）：
SHOW VARIABLES LIKE 'event%'; SET GLOBAL event_scheduler = ON/OFF
创建事件：
…… CREATE EVENT 以频率打头的命名 ON SCHEDULE     EVERY 时间间隔 / AT 特定时间 [STARTS 开始时间][ENDS 结束时间] DO BEGIN …… END$$ ……
### 6. 查看、删除和更改事件
**导航**
上节课讲的是创建事件，即“增”，这节课讲如何对事件进行“查、删、改”，说来说去其实任何对象都是这四种操作
查（SHOW）和删（DROP）和之前的类似：
SHOW EVENTS  -- 可看到各个数据库的事件 SHOW EVENTS [LIKE 'yearly%'];   -- 之前命名以时间间隔开头这里才能这样筛选 DROP EVENT IF EXISTS yearly_delete_stale_audit_row;
“改” 要特殊一些，这里首次用到 ALTER 关键字，而且有两种用法：
1. 如果要修改事件内容（包括执行计划和主体内容），直接把 ALTER 当 CREATE 用（或者说更像是REPLACE）直接重建语句
2. 暂时地启用或停用事件（用 DISABLE 和 ENABLE 关键字）
ALTER EVENT yearly_delete_stale_audit_row DISABLE/ENABLE
**小结**
SHOW、DROP、ALTER、ENABLE、DISABLE
## 【十一章】事务和并发
Transactions and Concurrency (时长49分钟)
### 1. 事务
Transactions (2:44)
**事务**
事务（trasaction）是**完成一个完整事件的一系列SQL语句**。这一组SQL语句是**一条船上的蚂蚱**，要不然都成功，要不然都失败，如果一部分执行成功一部分执行失败那成功的那一部分就会复原（revert）以保持数据的一致性。
**例子1**
银行交易：你给朋友转账包含从你账户转出和往他账户转入两个步骤，两步必须同时成功，如果转出成功但转入不成功则转出的金额会返还
**例子2**
订单记录：之前学过向父子表插入分级（层）/耦合数据，一个订单 (order) 记录对应多个订单项目 (order_items) 记录，如果在记录一个新订单时，订单记录录入成功但对应的订单项目记录录一半系统就崩了，那这个订单的信息就是不完整的，我们的数据库将失去数据一致性
**ACID 特性**
事务有四大特性，总结为 ACID（刚好是英文单词“酸的”）：
1. Atomicity 原子性，即整体性，不可拆分行（unbreakable），所有语句必须都执行成功事务才算完成，否则只要有语句执行失败，已执行的语句也会被复原
2. Consistency 一致性，指的是通过事务我们的数据库将永远保持一致性状态，比如不会出现没有完整订单项目的订单
3. Isolation 隔离性，指事务间是相互隔离互不影响的，尤其是需要访问相同数据时。具体而言，如果多个事务要修改相同数据，该数据会被锁定，每次只能被一个事务有权修改，其它事务必须等这个事务执行结束后才能进行
4. Durability 持久性，指的是一旦事务执行完毕，这种修改就是永久的，任何停电或系统死机都不会影响这种数据修改
**导航**
下节课将学习如何创建事务
### 2. 创建事务
Creating Transactions (5:11)
**准备**
先用 create-databases.sql 恢复一下数据库
**案例**
创建一个事务来储存订单及其订单项目（为了简化，这个订单只有一个项目）
用 START TRANSACTION 来开始创建事务，用 COMMIT 来关闭事务
USE sql_store; START TRANSACTION; INSERT INTO orders (customer_id, order_date, status) VALUES (1, '2019-01-01', 1); -- 只需明确声明并插入这三个非自增必须（不可为空）字段  INSERT INTO order_items  -- 所有字段都是必须的，就不必申明了 VALUES (last_insert_id(), 1, 2, 3); COMMIT;
执行，会看到最新的订单和订单项目记录
当 MySQL 看到上面这样的事务语句组，会把所有这些更改写入数据库，如果有任何一个更改失败，会自动撤销之前的修改，这种情况被称为事务被退回（回滚）（is rolled back）
为了模拟退回的情况，可以用 Ctrl + Enter 逐条执行语句，执行一半，即录入了订单但还没录入订单项目时断开连接（模拟客户端或服务器崩溃或断网之类的情况），重连后会发现订单和订单项目都没有录入
**手动退回**
多数时候是用上面的 START TRANSACTION + COMMIT 来创建事务，但当我们想先进行一下事务里语句的测试/错误检查并因此想在执行结束后手动退回时，可以将最后的 COMMIT; 换成 ROLLBACK;，这会退回事务并撤销所有的更改
**autocommit**
？ 我们执行的每一个语句（可以是增删查改 SELECT、INSERT、UPDATE 或 DELETE 语句），就算没有 START TRANSACTION + COMMIT，也都会被 MySQL 包装（wrap）成事务并在没有错误的前提下自动提交，这个过程由一个叫做 autocommit 的系统变量控制，默认开启
因为有 autocommit 的存在，当事务只有一个语句时，用不用 START TRANSACTION + COMMIT 都一样，但要将多个语句作为一个事务时就必须要加 START TRANSACTION + COMMIT 来手动包装了
SHOW VARIABLES LIKE 'autocommit';
**小结**
START TRANSACTION; ……; COMMIT / ROLLBACK; SHOW VARIABLES LIKE 'autocommit';
### 3. 并发和锁定
Concurrency and Locking (4:07)
**并发**
之前都只有一个用户访问数据，现实中常出现多个用户访问相同数据的情况，这被称为“并发”（concurrency），当一个用户企图修改另一个用户正在检索或修改的数据时，并发会成为一个问题
**导航**
本节介绍默认情况下MySQL是如何处理并发问题的，接下来几节课将介绍如何最小化并发问题
**案例**
假设要通过如下事务语句给1号顾客的积分增加10分
USE sql_store; START TRANSACTION; UPDATE customers SET points = points + 10 WHERE customer_id = 1; COMMIT;
现在有两个会话（注意是两个链接（connection），而不是同一个会话下的两个SQL标签，这两个链接相当于是在模拟两个用户）都要执行这段语句，用 Ctrl+Enter 逐句执行， 当第一个执行到UPDATE 而还没有 COMMIT 提交时，转到第二个会话，执行到UPDATE语句时会出现旋转指针表示在等待执行（若等的时间太久会超时而放弃执行），这时跳回第一个对话 COMMIT 提交，第二个会话的 UDDATE 才不再转圈而得以执行，最后将第二段对话的事务也COMMIT提交，此时刷新顾客表会发现1号顾客的积分多了20分
**上锁**
所以，可以看到，当一个事务修改一行或多行时，会给这些行上锁，这些锁会阻止其他事务修改这些行，直到前一个事务完成（不管是提交还是退回）为止，由于上述MySQL默认状态下的锁定行为，多数时候不需要担心并发问题，但在一些特殊情况下，默认行为不足以满足你应用里的特定场景，这时你可以修改默认行为，这正是我们接下要学习的
**导航**
我们接下来会学习常见并发问题以及如何解决他们
### 4. 并发问题
Concurrency Problems (7:25)
现在已经知道什么是并发了，我们来看看它带来的常见问题：
**1. Lost Updates 丢失更新**
例如，当事务A要更新john的所在州而事务B要更新john的积分时，若两个事务都读取了john的记录，在A跟新了州且尚未提交时，B更新了积分，那后执行的B的更新会覆盖先执行的A的更新，州的更新将会丢失。
解决方法就是前面说的锁定机制，锁定会防止多个事务同时更新同一个数据，必须一个完成的再执行另一个
**2. Dirty Reads 脏读**
例如，事务A将某顾客的积分从10分增加为20分，但在提交前就被事务B读取了，事务B按照这个尚未提交的顾客积分确定了折扣数额，可之后事务A被退回了，所以该顾客的积分其实仍然是10分，因此事务B等于是读取了一个数据库中从未提交的数据并以此做决定，这被称作为脏读
解决办法是设定事务的隔离等级，例如让一个事务无法看见其它事务尚未提交的更新数据，这个下节课会学习。标准SQL有四个隔离等级，比如，我们可以把事务B设为 READ COMMITED 等级，它将只能读取提交后的数据
积分提交完之后，B事务依此做决定，如果之后积分再修改，这就不是我们考虑的问题了，我们只需要保证B事务读取的是提交后的数据就行了
**3. Non-repeating Reads 不可重复读取 （或 Inconsistent Read 不一致读取）**
上面的隔离能保证只读取提交过的数据，但有时会发生一个事务读取同一个数据两次但两次结果不一致的情况
例如，事务A的语句里需要读取两次某顾客的积分数据，读取第一次时是10分，此时事务B把该积分更新为0分并提交，然后事务A第二次读取积分为0分，这就发生了不可重复读取 或 不一致读取
一种说法是，我们应该总是依照最新的数据做决定，所以这不是个问题。在商务场景中，我们一般不用担心这个问题
另一种说法是，我们应该保持数据一致性，以事务A在开始执行时的数据初始状态为依据来做决定，如果这是我们想要的话，就要增加事务A的隔离等级，让它在执行过程中看不见其它事务的数据更改（即便是提交过的），SQL有个标准隔离等级叫 Repeatable Read 可重复读取，可以保证读取的数据是可重复和一致的，无论过程中其它事务对数据做了何种更改，读取到的都是数据的**初始状态**
**4. Phantom Reads 幻读 （n. 幽灵；幻影，幻觉）**
最后一个并发问题是幻读
例如，事务A要查询所有积分超过10的顾客并向他们发送带折扣码的E-mail，查询后执行结束前，事务B更新了（可能是增删改）数据，然后多了一个满足条件的顾客，事务A执行结束后就会有这么一个满足条件的顾客没有收到折扣码，这就是幻读，Phantom是幽灵的意思，这种突然出现的数据就像幽灵一样，我们在查询中错过了它因为它是在我们查询语句后才更新的
解决办法取决于想解决的商业问题具体是什么样的以及把这个顾客包括进事务中有多重要
我们总可以再次执行事务A来让这顾客包含进去
但如果确保我们总是包含了最新的所有满足条件的顾客是至关重要的，我们就要保证查询过程中没有任何其他可能影响查询结果的事务在进行，为此，我们建立另一个隔离等级叫 Serializable 序列化，它让事务能够知晓是否有其它事务正在进行可能影响查询结果的数据更改，并会等待这些事务执行完毕后再执行，这是最高的隔离等级，为我们提供了最高的操作确定性。但 Serializable 序列化 等级是有代价的，当用户和并发增加时，等待的时间会变长，系统会变慢，所以这个隔离等级会影响性能和可扩展性，出于这个原因，我们只要在避免幻读确实必要的情形下才使用这个隔离等级
**导航**
这里只是先总体介绍，之后的课程会详细讲解每个并发问题以及如何用相应的隔离等级来解决它们
### 5. 事务隔离级别
Transaction Isolation Levels (5:42)
**总结：并发问题与隔离等级**
其实我觉得这个表里其它都好理解，最需要记忆的是解决 丢失更新 问题
![](https://cdn.nlark.com/yuque/0/2022/webp/21688751/1666776677503-42528a4f-47e1-467f-a49c-9ae45c796d21.webp#averageHue=%23b0b5ae&clientId=u446f5046-b184-4&from=paste&id=u315ef3a7&originHeight=350&originWidth=720&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u69309890-6dcc-4bf0-af83-3ef62b78434&title=)
Transaction Isolation Levels
**四个并发问题：**
1. Lost Updates 丢失更新：两个事务更新同一行，最后提交的事务将覆盖先前所做的更改
2. Dirty Reads 脏读：读取了未提交的数据
3. Non-repeating Reads 不可重复读取 （或 Inconsistent Read 不一致读取）：在事务中读取了相同的数据两次，但得到了不同的结果
4. Phantom Reads 幻读：在查询中缺失了一行或多行，因为另一个事务正在修改数据而我们没有意识到事务的修改，我们就像遇见了鬼或者幽灵
**为了解决这些问题，我们有四个标准的事务隔离等级：**
5. Read Uncommitted 读取未提交：无法解决任何一个问题，因为事务间并没有任何隔离，他们甚至可以读取彼此未提交的更改
6. Read Committed 读取已提交：给予事务一定的隔离，这样我们只能读取已提交的数据，这防止了Dirty Reads 脏读，但在这个级别下，事务仍可能读取同个内容两次而得到不同的结果，因为另一个事务可能在两次读取之间更新并提交了数据，也就是它不能防止Non-repeating Reads 不可重复读取 （或 Inconsistent Read 不一致读取）
7. Repeatable Read 可重复读取：在这一级别下，我们可以确信不同的读取会返回相同的结果，即便数据在这期间被更改和提交
8. Serializable 序列化：可以防止以上所有问题，这一级别还能防止幻读，如果数据在我们执行过程中改变了，我们的事务会等待以获取最新的数据，但这很明显会给服务器增加负担，因为管理等待的事务需要消耗额外的储存和CPU资源
**并发问题 VS 性能和可扩展性：**
更低的隔离级别更容易并发，会有更多用户能在相同时间接触到相同数据，但也因此会有更多的并发问题，另一方面因为用以隔离的锁定更少，性能会更高
相反，更高的隔离等级限制了并发并减少了并发问题，但代价是性能和可扩展性的降低，因为我们需要更多的锁定和资源
MySQL的默认等级是 Repeatable Read 可重复读取，它可以防止除幻读外的所有并发问题并且比序列化更快，多数情况下应该保持这个默认等级。
如果对于某个特定的事务，防止幻读至关重要，可以改为 Serializable 序列化
对于某些对数据一致性要求不高的批量报告或者对于数据很少更新的情况，同时又想获得更好性能时，可考虑前两种等级
总的来说，一般保持默认隔离等级，只在特别需要时才做改变
**设定隔离等级的方法**
读取隔离等级
SHOW VARIABLES LIKE 'transaction_isolation'; --？为什么我的客户端没有这个变量？
显示默认隔离等级为 'REPEATABLE READ'
改变隔离等级：
SET [SESSION]/[GLOBAL] TRANSACTION ISOLATION LEVEL SERIALIZABLE;
默认设定的是下一次事务的隔离等级，加上 SESSION 就是设置本次会话（链接）之后所有事务的隔离等级，加上 GLOBAL 就是设置之后所有对话的所有事务的隔离等级
如果你是个应用开发人员，你的应用内有一个功能或函数可以链接数据库来执行某一事务（可能是利用对象关系映射或是直接连接MySQL），你就可以连接数据库，用 SESSION 关键词设置本次链接的事务的隔离等级，然后执行事务，最后断开连接，这样数据库的其它事务就不会受影响
**导航**
接下来讲逐一讲解各个隔离级别
### 6. 读取未提交隔离级别
READ UNCOMMITTED Isolation Level (3:26)
**小结**
主要通过模拟脏读来表明 Read Uncommitted（读取未提交）是最低的隔离等级并会遇到所有并发问题
**案例**
建立链接1和链接2，模拟用户1和用户2，分别执行如下语句：
链接1：
查询顾客1的积分，用于之后的商业决策（如确定折扣等级）
注意里面的 SELECT 查询语句虽然没被 START TRANSACTION + COMMIT 包裹，但由于 autucommit，MySQL会把执行的每一条没错误的语句包装在事务中并自动提交，所以这个查询语句也是一个事务，隔离等级为上一句设定的 READ UNCOMMITTED（读取未提交）
USE sql_store; SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; SELECT points FROM customers WHERE customer_id = 1
链接2：
建立事务，将顾客1的积分（由原本的2293）改为20
USE sql_store; START TRANSACTION; UPDATE customers SET points = 20 WHERE customer_id = 1; ROLLBACK;
模拟过程:
链接1将下一次事务（感觉是针对本对话的下一次事务）的隔离等级设定为 READ UNCOMMITTED 读取未提交
→ 链接2执行了更新但尚未提交
→ 链接1执行了查询，得到结果为尚未提交的数据，即查询结果为20分而非原本的2293分
→ 链接2的更新事务被中断退回（可能是手动退回也可能是因故障中断）
这样我们的对话1就使用了一个数据库中从未存在过的值，这就是脏读问题，总之，READ UNCOMMITTED 读取未提交 是最低的隔离等级，在这一级别我们会遇到所有的并发问题
### 7. 读取已提交隔离级别
READ COMMITTED Isolation Level (3:01)
**小结**
Read Committed 读取已提交 等级只会读取别人已提交的数据，所以不会发生脏读，但因为能够读取到执行过程中别人已提交的更改，所以还是会发生不可重复读取（不一致读取）的问题
另外（Mosh没讲，自己从第5节的表里想到的），因为这一等级对于在执行更改型的事务语句时不会锁定正在操作的行，所以同时执行的更改型事务可能发生后面的覆盖前面的情况，所以也不能避免更新丢失的问题
**案例1：不会发生脏读**
就是把上一节链接1的设置隔离级别语句改为 READ COMMITTED 读取已提交 等级，就会发现链接1不会读取到链接2未提交的更改，只有当改为20分的事务提交以后才能被链接1的查询语句读取到
**案例2：可能会发生不可重复读取（不一致读取）**
虽然不会存在脏读，但会出现其他的并发问题，如 Non-repeating Reads 不可重复读取，即在一个事务中你会两次读取相同的内容，但每次都得到不同的值
为模拟该问题，将顾客1的分数还原为2293，将上面的连接1里的语句变为两次相同的查询（查询1号顾客的积分），连接2里的UPDATE语句不变，还是将1号顾客的积分（由原本的2293）更改为20
USE sql_store; SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; START TRANSACTION; SELECT points FROM customers WHERE customer_id = 1; SELECT points FROM customers WHERE customer_id = 1; COMMIT;
注意虽然案例1里已经执行过一次 SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; 但这里还是要再执行一次，因为该语句是设定（本对话内）【下一次（next）】事务的隔离等级，如果这里不执行，事务就会恢复为MySQL默认隔离等级，即 Repeatable Read 可重复读取
还有因为这里事务里有两个语句，所以必须手动添加 START TRANSACTION + COMMIT 包装成一个事务，否则autocommit会把它们分别包装形成 两个事务
模拟过程：
再次设定隔离等级为 READ COMMITTED，启动事务，执行第一次查询，得到分数为2293
→ 执行链接2的 UPDATE 语句并提交
→ 再执行链接1的第二次查询，得到分数为20，同一个事务里的两次查询得到不同的结果，发生了 Non-repeating Reads 不可重复读取 （或 Inconsistent Read 不一致读取）
**导航**
为了解决 Non-repeating Reads 不可重复读取 的问题，我们需要提高隔离等级，这正是接下来要学习的
### 8. 重复读取隔离级别
REPEATABLE READ Isolation Level (3:29)
**小结**
在这一默认级别上，不仅只会读取已提交的更改，而且同一个事物内读取会始终保持一致性，但因为可能会忽视正在进行但未提交的可能影响查询结果的更改而漏掉一些结果，即发生幻读
Mosh没讲但从第3节以及第5节的表格可以看得出来，这个默认级别还能避免更新丢失问题
之前说了MySQL默认等级正是 REPEATABLE READ（重复读取）而且MySQL默认会在执行事务内的增删改语句时锁定相关行，所以可以判断 **REPEATABLE READ（重复读取）正是通过执行修改语句时锁定相关行来避免更新丢失问题的**（不过执行查询语句时应该不是通过锁定而只是是通过记忆原始值来保证一致读取的，因为查询语句中途并不会阻止别人更改相关行）
**案例1：不会发生不可重复读取（不一致读取）**
（注意，先要将上一节最后的事务COMMIT提交了，才能执行新的，设定下一次事务隔离等级的语句）
此案例和上一个案例完全一样，只是把隔离等级的设定语句改为了 REPEATABLE READ 可重复读取，然后发现两次查询中途别人把积分从2293改为20不会影响两次查询的结果，都是初始状态的20分，不会发生不可重复读取（不一致读取）
**案例2：可能发生幻读**
但这一级别还是会发生幻读的问题，一个模拟情形如下：
用户1：查询在 'VA' 州的顾客
USE sql_store; SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; START TRANSACTION; SELECT * FROM customers WHERE state = 'VA'; SELECT points FROM customers WHERE customer_id = 1; COMMIT;
用户2：将1号顾客所在州更改为 'VA'
USE sql_store; START TRANSACTION; UPDATE customers SET state = 'VA' WHERE customer_id = 1; COMMIT;
假设customer表中原原本只有2号顾客在维州（'VA'）
→ 用户2现在正要将1号顾客也改为VA州，已执行UPDATE语句但还没有提交，所以这个更改技术上讲还在内存里
→ 此时用户1查询身处VA州的顾客，只会查到2号顾客
→ 用户2提交更改
→ 若1号用户未提交，再执行一次事务中的查询语句会还是只有2号顾客，因为在 REPEATABLE READ 可重复读取 隔离级别，我们的读取会保持一致性
→ 若1号用户提交后再执行一次查询，会得到1号和2号两个顾客的结果，我们之前的查询遗漏了2号顾客，这被称作为幻读
简单讲就是在这一等级下1号用户的事务只顾读取当前已提交的数据，不能察觉现在正在进行但还未提交的可能对查询结果造成影响的更改，导致遗漏这些新的“幽灵”结果
下节课讲如何用序列化隔离级别来解决幻读问题
### 9. 序列化隔离级别
SERIALIZABLE Isolation Level (2:18)
**案例**
和上面那个案例一摸一样，只是把用户1事务的隔离等级设置为 SERIALIZABLE 序列化，模拟场景如下：
→ 用户2现在正要将1号顾客也改为VA州，已执行UPDATE语句但还没有提交，所以这个更改技术上讲还在内存里
→ 此时用户1查询身处VA州的顾客，会**察觉**到用户2的事务正在进行，因而会出现旋转指针等待用户2的完成
→ 用户2提交更改
→ 用户1的查询语句执行并返回最新结果：顾客1和顾客2
**区别**
我感觉 REPEATABLE READ（重复读取）和 SERIALIZABLE（序列化）的区别在于，前者是修改时自己优先（锁定相关行）查询时自以为是（记忆相关行），后者修改时可能是一样的（不确定），但查询时若**察觉**到别人在进行的更改可能对自己的查询结果有影响会让别人优先——“你要改你先来，你改完了我再查”
**小结**
SERIALIZABLE（序列化）是最高隔离等级，它等于是把系统变成了一个单用户系统，事务只能一个接一个依次进行，所以所有并发问题（更新丢失、脏读、不一致读取、幻读）都从从根本上解决了，但用户和事务越多等待时间就会越漫长，所以，只对那些避免幻读至关重要的事务使用这个隔离等级。默认的可重复读取等级对大多数场景都有效，最好保持这个默认等级，除非你知道你在干什么（Stick to that, unless you know what you are doing）
### 10. 死锁
Deadlocks (6:11)
**小结**
不管什么隔离等级，事务里的增删改语句都会锁定相关行（我怎么觉得前两个等级不会呢？不然也不会有更新丢失的问题了……），如果两个同时在进行的事务分别锁定了对方下一步要使用的行，就会发生死锁，死锁不能完全避免但有一些方法能减少其发生的可能性
**案例**
用户1：将1号顾客的州改为'VA'，再将1号订单的状态改为1
USE sql_store; START TRANSACTION; UPDATE customers SET state = 'VA' WHERE customer_id = 1; UPDATE orders SET status = 1 WHERE order_id = 1; COMMIT;
用户2：和用户1完全相同的两次更改，只是顺序颠倒
USE sql_store; START TRANSACTION; UPDATE orders SET status = 1 WHERE order_id = 1; UPDATE customers SET state = 'VA' WHERE customer_id = 1; COMMIT;
模拟场景：
用户1和2均执行完各自的第一个更改
→ 用户2执行第二个更改，出现旋转指针
→ 用户1执行第二个更改，出现死锁，报错：Error Code: 1213. Deadlock found ……
**缓解方法**
死锁如果只是偶尔发生一般不是什么问题，重新尝试或提醒用户重新尝试即可，死锁不可能完全避免，但有一些方法可以最小化其发生的概率：
1. 注意语句顺序：如果检测到两个事务总是发生死锁，检查它们的代码，这些事务可能是储存过程的一部分，看一下事务里的语句顺序，如果这些事务以相反的顺序更新记录，就很可能出现死锁，为了减少死锁，我们在**更新多条记录时可以遵循相同的顺序**
2. 尽量让你的事务小一些，持续时间短一些，这样就不太容易和其他事务相冲突
3. 如果你的事务要操作非常大的表，运行时间可能会很长，冲突的风险就会很高，看看能不能让这样的事物避开高峰期运行，以避开大量活跃用户
**导航**
如果觉得这一章很难是正常的，并发算是很高级的内容了，Mosh当年为了真正理解并发在各处查阅了大量资料，可能没有任何资料能像这一章的视频这样能把并发的概念掰开揉碎并讲的这样简单清晰了，难理解的话认真多看几遍就一定能理解的。
