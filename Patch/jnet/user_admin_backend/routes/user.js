/*
*！！！！！！！！此文件内写有密码，不得上传至git！！！！！！！！！
*！！！！！！！！此文件内写有密码，不得上传至git！！！！！！！！！
*！！！！！！！！此文件内写有密码，不得上传至git！！！！！！！！！
*！！！！！！！！此文件内写有密码，不得上传至git！！！！！！！！！
*！！！！！！！！此文件内写有密码，不得上传至git！！！！！！！！！
*！！！！！！！！此文件内写有密码，不得上传至git！！！！！！！！！
*/

var express = require('express');
var router = express.Router();
const axios = require('axios');
const Order = require('./../model/Order');

router.post('/getTrack', function (req, res) {
    let para = { num: req.body.num };
    let url = `http://api2.j-net.cn/track/${para.num}`;

    axios.get(url)
        .then(response => {
            res.json({
                date: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
})

router.post('/getNums', function (req, res) {
    let para = { beginTime: req.body.beginTime , endTime: req.body.endTime };
    axios({
        url: `http://api2.j-net.cn/track/list?beginTime=${para.beginTime}&endTime=${para.endTime}`,
        method: 'get',
        auth: {
            username: '',
            password: ''
        }
        
    })
        .then(response => {
            res.json({
                date: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
})
