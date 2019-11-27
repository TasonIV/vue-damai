# vue仿大麦网移动端项目
大麦网是一款移动端的演出门票购票平台。该平台为用户提供演唱会、话剧、体育比赛、儿童亲子、电影、展览等品类的选座购票服务，满足人们的观演需求。本项目使用vue框架实现。

### 技术栈：
    js、sass、vue、vue-router、vuex、axios、webpack、rem、better-scroll、swiper、viewer
    
### 项目部分截图展示：
![](https://github.com/TasonIV/damai/blob/master/showImg/01首页.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/02全选-演出.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/02全选-大咖-详情.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/02全选-大咖-详情-图片.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/03发现.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/04票夹-列表.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/04票夹-二维码.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/05我的-已登录.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/06定位.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/07搜索.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/08客服.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/10演出详情.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/10演出详情-评价.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/10演出详情-购票.png)
![](https://github.com/TasonIV/damai/blob/master/showImg/11设置.png)

### 实现功能：

__搜索：__ 根据输入的关键词，动态搜索所有相关的演出，并能通过搜索结果，点击进入查看详情

__麦小蜜客服：__ 点击常见问题，无需输入文字，实现一键自动回复。输入并发送文字，会智能回复相关问题。

__登录注册：__ 用户可实现注册账号、登录账号。某些地方需成功登录后才能成功查看，如：添加收货地址、添加观演人信息、开通VIP会员、购买门票等操作，都会有是否已登录的验证，如果没登录，会自动跳转到登录页面。登录成功后，可在设置页面退出登录。

__演出详情：__ 能查看用户点击的演出的所有详细信息，包括：演出详情介绍、用户评价页面、服务须知与观演须知、其他推荐演出、分享演出、购票。 购买成功后，可在票价查看到已购门票列表及详情介绍。可收藏演出，并在我想看的演出中查看到已收藏演出的列表。

__明星详情：__ 能查看明星的详情介绍，及用户的观演评价，通过点击图片，能查看图片列表的详情信息，并实现一些功能，如：双击放大、翻转、切换。能关注明星，并在我的关注中查看到已关注明星的列表。

__VIP会员：__ 用户在阅读先关协议并勾选已阅读后，才能进行开通。开通成功后会显示到期时间，并在我的页面会有尊贵的vip会员图标，区别于普通用户。

__收货地址：__ 用户可添加收货地址，根据正则匹配所填信息是否符合规范，如：该信息是否为空，是否符合字数要求、是否符合验证规则等。保存后会显示在收货地址列表中。用户还可设置默认的收货地址。

__购买门票：__ 用户可自行选择价位及购票数，购票成功后会显示在票夹页，并能查看对应的二维码取票。


### 命令
```
npm install
npm run serve
```
