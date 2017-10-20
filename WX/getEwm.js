const express = require('express');
const request = require('request');
const qs = require('querystring');
const config = require('../WXconfig.js');
const WxToken = require('../Wxtoken.js');
var fs = require('fs')
const router = express.Router();

// 获取jsapi_ticket
function getEwmTicket() {
    const token = WxToken.Wxtoken
    // 70320462008369544552096450941619
    var idInd = getScennId()
    const reqUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=' + token;
    return new Promise((resolve, reject) => {
        let option = {
            url: reqUrl,
            method: "POST",
            json: true,
            body: {
                "expire_seconds": 1700,
                "action_name": "QR_SCENE",
                "action_info": {
                    "scene": {
                        "scene_id": idInd
                    }
                }
            }
        };
        request(option, function (err, res, body) {
            if (res) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    })
}
// 请求图片
function getEwmImg(ticket) {
    console.log(ticket)
    // ,
    // encoding: 'binary'
    // 
    var sss = encodeURI(ticket)
    console.log(sss)
    const Url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + sss
    let options = {
        method: 'get',
        url: Url
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (res) {
                resolve(body);
            } else {
                reject(err);
            }
        })
    })
}
//获取 noncestr
function getScennId() {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // console.log('32为字符:', text, '********************')
    return text;
}

module.exports = {
    getEwmTicket: getEwmTicket,
    getEwmImg: getEwmImg
}