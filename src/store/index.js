import Vue from 'vue'
import VueX from 'vuex'
import formatTime from '../../public/js'

Vue.use(VueX)


const store = new VueX.Store({
    state: {
        key: "069e90c4262243bf964ad95014371384", // 图灵机器人秘钥
        showNum: 1,
        locationCity: "广州",  // 定位，当前地址
        addressList: [
            {
                id: "1",
                name: "涛涛",
                tel: "13888886666",
                address: "广东省广州市黄浦区彩频路绿地中央广场",
                def: true
            },
            {
                id: "2",
                name: "罗小黑",
                tel: "18652869102",
                address: "广东省深圳市宝安区宝安大道宝安国际机场",
                def: false
            }
        ],  // 收货地址
        peopleList: [
            {
                id: "1",
                name: "涛涛",
                numType: "身份证",
                num: "441427199903035535"
            },
            {
                id: "2",
                name: "罗小黑",
                numType: "港澳居民来往内地通行证",
                num: "H1234567800",
            }
        ],  // 观演人列表
        vipTimeStamp: null,  // vip时间戳
        vipTime: null,   // vip到期时间
        isLogin: false,    // 登录
        currentName: 123456,  // 当前用户名
        userList: [
            { name: 123456, password: 123456 }
        ],  // 用户名密码
        warning: false,  // 登录警告
        answers: [
            { num: 0, text: "亲，您可以看一下项目页右侧是否有座位参考图参考图或者在票价下方有选座购买，点开就可以看到相关的座位参考图。如果没有显示，则说明此项目暂时没有座位图提供，您可以多多关注我们滴网站更新呦~。" },
            { num: 1, text: "可以在大麦网站查询您想订购的演出，然后根据项目状态进行下单。" },
            { num: 2, text: "亲，大麦系统将根据演出性质，以及您的购买方式，来决定能否选座。具体如下：若订票页面显示“选座购买”则可以选座，请选择您要的票价，点击“选座购买”跳转到选座页面，选择有颜色的位置提交即可，灰色表示不可售。若订票方式只有“立即购买”，则表示此项目不支持选座，会按您付款先后从可售票源里择优配票哦。" },
            { num: 3, text: "亲~，一般儿童类项目都是持全票进场哦。成人类项目一般是有身高及年龄的限制，具体以项目页显示为准。如果页面有特别说明儿童免票的情况，是可以在成人的陪同下免费进场哦~" },
            { num: 4, text: "儿童剧一般为60至90分钟左右。话剧、演唱会及音乐会一般为2小时左右。具体需要以演出现场为准。" },
            { num: 5, text: "具体进场时间请以项目详情页提示为准。演唱会、音乐会及重要体育赛事在演出或比赛前一个半小时左右开始检票入场，请合理安排您的时间提前到场，不要迟到，避免错过精彩演出及比赛。温馨提示：有部分特殊项目在演出或比赛开始后到场的客户，需听从现场工作人员安排，特殊项目在演出或比赛开始后将禁止入场" },
            { num: 6, text: "您好，根据演出类型，音乐剧话剧类一般不能摄影或摄像，演唱会类型的请勿携带专业相机入场。特殊情况具体以项目详情页面提示为准哦。" },
            { num: 7, text: "亲，电子票一般都是现场进行兑换哦，大麦会在演出现场设有兑换点，具体位置您可以在对应演出的信息详情页查看。身份证电子票需要携带好订票人身份证原件兑换后入场，短信/二维码电子票请出示相应的换票码或二维码，兑换后入场。如有特殊项目会再网页进行注明，建议您可以点开演出介绍页进行查看。" },
            { num: 8, text: "您好，请到现场电子取票机取票。如有问题，建议您可以询问现场工作人员。" },
            { num: 9, text: "购买演出和赛事票时，需凭个人有效证件购买。同一场此演出或比赛，一张有效身份证件只能购买一张门票。订购多张门票需提交多个联系人及有效证件号码，即为一张票对应一张身份证号。具体需以项目要求为准。" },
            { num: 10, text: "亲，您可以关注一下对应演出的项目详情中的退换规则，会有说明退换规则哦。如果对应详情未标注是否可退，则该项目无法进行退换。毕竟因为演出票品属于特殊商品，为了不影响他人观演，若演出不支持退换，还请谅解。" },
            { num: 666, text: "好的" }
        ],  // 自动回复的内容
        chatMessages: [
            // { msg: "您吃了吗", my: true }
        ], // 聊天记录
        likePerformList: [],  // 收藏演出的列表
        likeStarList: [],   // 关注明星的列表
        bannerStar: [],  // 轮播明星列表
        listStar: [],    // 列表明星列表
        PurchasedList: [
            // {img:"",time:"",unitPrice:"",num:"",price:"",address:"",data:""}
        ],   // 已购买，演出列表
        // 所有演出的数据
        listDataAll: [],
        listData1: [],
        listData2: [],
        listData3: [],
        listData4: [],
        listData5: [],
        searchHistory: [
            "吴亦凡",
            "蔡徐坤",
            "坤坤",
            "i坤",
            "张杰",
            "林宥嘉",
            "林俊杰",
            "周杰伦",
            "巴爷"
        ]   // 搜索历史
    },
    mutations: {
        // 保存当前定位
        saveLocationCity(state, { city }) {
            state.locationCity = city
        },
        // tabbar与地址联动
        changeIcon(state, n) {
            state.showNum = n;
        },
        // 添加地址
        addAddress(state, payload) {
            let { id, name, tel, address, def } = payload
            let detail = {
                id,
                name,
                tel,
                address,
                def
            }
            state.addressList.push(detail)
        },
        // 修改默认地址
        changeDef(state, i) {
            state.addressList.map(item => {
                item.def = false
                if (item.id == i) {
                    item.def = true
                }
            })
        },
        // 添加观影人
        addPeople(state, payload) {
            let { id, name, numType, num } = payload
            let detail = {
                id,
                name,
                numType,
                num
            }
            state.peopleList.push(detail)
        },
        // 删除观影人
        removePeople(state, { id }) {
            state.peopleList.map(item => {
                if (item.id === id) {
                    let i = state.peopleList.indexOf(item)
                    state.peopleList.splice(i, 1)
                }
            })
        },
        // 开通vip 
        openVip(state) {
            if (!state.vipTime) {
                let t = new Date().getTime() + 31536000000
                state.vipTimeStamp = t
                state.vipTime = formatTime(t, 'Y-M-D h:m:s')
            } else {
                // 365（天）* 24（小时） * 60（分钟） * 60（秒）* 1000 （毫秒） = 31536000000
                state.vipTime = formatTime(state.vipTimeStamp + 31536000000, 'Y-M-D h:m:s')
                state.vipTimeStamp = state.vipTimeStamp + 31536000000
            }
        },
        // 添加用户
        addUser(state, payload) {
            let { name, password } = payload
            state.userList.push({ name, password })
        },
        // 登录验证
        testUser(state, payload) {
            let { name, password, router } = payload
            state.userList.map(item => {
                if (item.name == name && item.password == password) {
                    state.isLogin = true;
                    state.warning = false;
                    state.currentName = name;
                    // 直接调用this.$router是无效的,此处无this对象
                    router.back()  // router <=> this.$router
                } else {
                    state.warning = true;
                    setTimeout(() => {
                        state.warning = false
                    }, 1000)
                }
            })
        },
        // 退出登录
        quitUser(state) {
            state.isLogin = false;
        },
        // 客服，发送问题
        sendQuestions(state, { num, text }) {
            state.chatMessages.push({ msg: text, my: true })
            setTimeout(() => {
                state.answers.map(item => {
                    if (item.num === num) {
                        state.chatMessages.push({ msg: item.text, my: false })
                    }
                })
            }, 500)
        },
        // 收藏演出
        likePerform(state, { item }) {
            state.likePerformList.push(item)
            // Set方法对数组列表进行，去重
            state.likePerformList = [...new Set(state.likePerformList)]
        },
        // 取消收藏演出
        cancelLikePerform(state, { item }) {
            state.likePerformList.map(i => {
                if (i.id === item.id) {
                    let index = state.likePerformList.indexOf(item)
                    state.likePerformList.splice(index, 1)
                }
            })
        },
        // 关注明星
        likeStar(state, { item }) {
            state.bannerStar.map(res => {
                if (res.artistVO.bid == item.artistVO.bid) {
                    res.artistVO.bubble = true;
                    item.artistVO.bubble = true;
                }
            })
            state.listStar.map(res => {
                if (res.artistVO.bid == item.artistVO.bid) {
                    res.artistVO.bubble = true;
                    item.artistVO.bubble = true;
                }
            })
            state.likeStarList.push(item)
        },
        // 取关明星
        cancelLikeStar(state, { item }) {
            state.bannerStar.map(res => {
                if (res.artistVO.bid == item.artistVO.bid) {
                    res.artistVO.bubble = false;
                }
            })
            state.listStar.map(res => {
                if (res.artistVO.bid == item.artistVO.bid) {
                    res.artistVO.bubble = false;
                }
            })
            state.likeStarList.map(i => {
                if (i.artistVO.bid == item.artistVO.bid) {
                    let index = state.likeStarList.indexOf(i)
                    state.likeStarList.splice(index, 1)
                }
            })
        },
        // 记录已购演出
        getPurchasedPerform(state, payload) {
            let { img, title, time, unitPrice, num, price, address, data, bt } = payload
            let buyTime = formatTime(bt, 'Y-M-D h:m:s')
            let detail = {
                img,
                title,
                time,
                unitPrice,
                num,
                price,
                address,
                buyTime,
                data
            }
            state.PurchasedList.push(detail)
            console.log("PurchasedList===>", state.PurchasedList)
        },
        // 添加搜索历史
        addSearchHistory(state, {value}){
            state.searchHistory.push(value)
        },
        // 清空搜索历史
        emptySearchHistory(state){
            state.searchHistory = []
        }
    },
    actions: {
        // 请求图灵机器人
        async sendMsg({ state }, { text, axios }) {
            // 添加一条自己发送的消息
            state.chatMessages.push({ msg: text, my: true })
            // post请求
            let data = await axios.post("/robot", {
                info: text,
                key: state.key,
            })
            // 添加一条智能回复的消息
            state.chatMessages.push({ msg: data.data.text, my: false })
        },
        // 请求所有明星的数据
        async getStarData({ state }, { axios }) {
            let res = await axios("/damai/api/star");
            let { data } = res.data;
            state.bannerStar = [...data.bannerStarList];
            state.listStar = [...data.listStarList];
        },
        // 请求演出列表的数据
        async getListData({ state }, { axios }) {
            let res = await axios("/damai/api/list")
            let { data } = res.data;
            state.listData1 = data.lists.list1;
            state.listData2 = data.lists.list2;
            state.listData3 = data.lists.list3;
            state.listData4 = data.lists.list4;
            state.listData5 = data.lists.list5;
            if (!state.listDataAll.length) {
                state.listDataAll.push(
                    ...state.listData1,
                    ...state.listData2,
                    ...state.listData3,
                    ...state.listData4,
                    ...state.listData5
                );
            }
            // console.log("ALLlist", state.listDataAll);
        }
    }
})

export default store