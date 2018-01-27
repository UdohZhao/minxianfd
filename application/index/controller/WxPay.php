<?php
namespace app\index\controller;
class WxPay extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 微信支付
    public function pay()
    {
        // 统一下单请求地址
        $url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        // 组装请求参数
        $param['appid'] = config('appid');
        $param['mch_id'] = config('mch_id');
        $param['nonce_str'] = get_rand_str();
        $param['body'] = '岷县房东置顶推广充值';
        $param['out_trade_no'] = get_rand_str();
        $param['total_fee'] = 1;
        $param['spbill_create_ip'] = $_SERVER['REMOTE_ADDR'];
        $param['notify_url'] = 'https://ngrok.getcunji.com/WxPay/notify';
        $param['trade_type'] = 'JSAPI';

        $param['sign'] = '';

        dump($param);
        die;

    }

    // 异步通知
    public function notify()
    {

    }

}
