<?php
namespace app\index\controller;
class WxPay extends Base
{
    public $total_fee;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->total_fee = isset($_GET['total_fee']) ? input('get.total_fee') : 0;
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
        $param['attach'] = '111';
        $param['total_fee'] = bcmul($this->total_fee, 100, 0);
        $param['spbill_create_ip'] = $_SERVER['REMOTE_ADDR'];
        $param['notify_url'] = 'https://ngrok.getcunji.com/WxPay/notify';
        $param['trade_type'] = 'JSAPI';
        $param['openid'] = db('weapp_user')->where('id',$this->wuid)->value('openid');
        $param['sign_type'] = 'MD5';
        $param['sign'] = ToUrlParams($param);
        $xmlParam = ToXml($param);
        $arrParam = FromXml(httpRequest($url,'POST',$xmlParam));

        slog($arrParam);

        // wx20180127120403b717bdb7450617460919
        // wx201801271207124452c7a0120194614820

        // 小程序调起支付数据签名字段
        $weappParam['appId'] = config('appid');
        $weappParam['timeStamp'] = (string) time();
        $weappParam['nonceStr'] = get_rand_str();
        $weappParam['package'] = 'prepay_id='.$arrParam['prepay_id'];
        $weappParam['signType'] = 'MD5';
        $weappParam['paySign'] = ToUrlParams($weappParam);

        slog($weappParam);

        return ajaxReturn(Rs(0,'',$weappParam));

    }

    // 异步通知
    public function notify()
    {

        $xml = file_get_contents("php://input");
        $data = FromXml($xml);

        slog($data);

        // 签名验证
        $sign = ToUrlParams($data);
        if ($sign == $data['sign'])
        {
            slog('签名验证成功！');
        }
        else
        {
            slog('签名验证失败！');
        }

        // 同步返回给微信
        $reex['return_code'] = 'SUCCESS';
        $reex['return_msg'] = '';
        $reex = ToXml($reex);
        slog($reex);
        return $reex;

    }

}
