

var data1 = require("./data/Header.json")
var header = data1.header

var data2 = require("./data/Banner.json")
var bannerDetail = data2.bannerDetail

var data3 = require("./data/SevenDays.json")
var SevenDaysShow = data3.SevenDaysShow

var data4 = require("./data/Location.json")
var Location = data4.Location

var data5 = require("./data/List.json")
var List = data5.List

var data6 = require("./data/Video.json")
var videoList = data6.videos

var data7 = require("./data/Star.json")
var star = data7.star

var data8 = require("./data/Recommend.json")
var Recommend = data8.Recommend

module.exports = {
    devServer: {
        before(app) {
            app.get('/damai/api/header', function (req, res) {
                res.json({ data: header })
            });
            app.get('/damai/api/bannerdetail', function (req, res) {
                res.json({ data: bannerDetail })
            });
            app.get('/damai/api/sevendaysshow', function (req, res) {
                res.json({ data: SevenDaysShow })
            });
            app.get('/damai/api/location', function (req, res) {
                res.json({ data: Location })
            });
            app.get('/damai/api/list', function (req, res) {
                res.json({ data: List })
            });
            app.get('/damai/api/videolist', function (req, res) {
                res.json({ data: videoList })
            });
            app.get('/damai/api/star', function (req, res) {
                res.json({ data: star })
            });
            app.get('/damai/api/recommend', function (req, res) {
                res.json({ data: Recommend })
            })
        },
        proxy: {
            // 图灵机器人
            "/robot": {
                target: "http://www.tuling123.com/openapi/api",
                changeOrigin: true,
                pathRewrite: { "^/robot": "" }
            }
        }
    },

}