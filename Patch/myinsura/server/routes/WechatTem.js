var express = require('express');
var router = express.Router();

import Insurance_template from '../public/js/insurance_template';
import ContractInfo from '../public/js/ContractInfo';

const temAbi = ContractInfo.temAbi;
const temAddress = ContractInfo.temAddress;

const account = "";
const accountkey = "";

router.get('/size', function (req, res) {
    let insurance_template = new Insurance_template(temAbi,temAddress);
    insurance_template.size(function(error, result) {
        if(error) {
            res.json({
                status:"error",
                code:"-9",
                msg:"交易报错",
                error:error.toString(10)
            })
        } else {
            res.json({
                status:"success",
                code:"0",
                msg:"获取成功",
                data:result
            })
        }
    })
})
   