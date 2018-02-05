<?php
namespace app\index\controller;
class WxPay extends Base
{
    public $total_fee;
    public $day;
    public $hmpid;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->total_fee = isset($_GET['total_fee']) ? input('get.total_fee') : 0;
        $this->day = isset($_GET['day']) ? input('get.day') : 0;
        $this->hmpid = isset($_GET['hmpid']) ? input('get.hmpid') : 0;
    }

    // 微信支付
    public function pay()
    {

        // 测试金额1分钱
        $this->total_fee = '0.01';

        // hm_promotion_id 如果get参数表示为用户后续补充支付
        if ($this->hmpid)
        {
            $hm_promotion_id = $this->hmpid;
            // 读取订单编号
            // $order_number = db('hm_promotion')->where('id',$hm_promotion_id)->value('order_number');
            $order_number = build_order_no().$this->wuid;
        }
        else
        {
            /*** 生成预付推广订单 ***/
            // dataHmp
            $dataHmp = $this->getHmpData();
            // 写入房源置顶推广表
            $hm_promotion_id = db('hm_promotion')->insertGetId($dataHmp);
            $order_number = $dataHmp['order_number'];
        }
        slog($hm_promotion_id);
        // if
        if ($hm_promotion_id)
        {
            // dataHmlr
            $dataHmlr = $this->getHmlrData($hm_promotion_id);
            slog($dataHmlr);
            db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
            // 统一下单请求地址
            $url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
            // 组装请求参数
            $param['appid'] = config('appid');
            $param['mch_id'] = config('mch_id');
            $param['nonce_str'] = get_rand_str();
            $param['body'] = '岷县房东置顶推广充值';
            $param['out_trade_no'] = $order_number;
            $param['attach'] = $hm_promotion_id;
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

            return ajaxReturn(Rs(0,'受影响的操作！',$weappParam));

        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',$this->hmlrid));
        }

    }

    // 初始化房源置顶推广数据
    private function getHmpData()
    {
        $dataHmp['hm_landlord_rent_id'] = $this->hmlrid;
        $dataHmp['weapp_user_id'] = $this->wuid;
        $dataHmp['order_number'] = build_order_no().$this->wuid;
        $dataHmp['day'] = $this->day;
        $dataHmp['cost'] = $this->total_fee;
        $dataHmp['ctime'] = time();
        $dataHmp['status'] = 0;
        $dataHmp['type'] = 0;
        return $dataHmp;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_promotion_id)
    {
        $dataHmlr['hm_promotion_id'] = $hm_promotion_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }

    // 异步通知
    public function notify()
    {
        // 接收微信支付通知参数
        $xml = file_get_contents("php://input");
        $data = FromXml($xml);
        slog($data);
        // 签名验证
        $sign = ToUrlParams($data);
        // 效验
        if ($data['return_code'] == 'SUCCESS' && $data['result_code'] == 'SUCCESS' && $sign == $data['sign'])
        {
            // 订单是否处理过
            $hm_promotion_id = $data['attach'];
            $dataHmp = db('hm_promotion')->where('id',$hm_promotion_id)->find();
            slog($dataHmp);
            // 订单已经支付
            if ($dataHmp && $dataHmp['type'] == 1)
            {
                // 同步返回给微信
                $reex['return_code'] = 'SUCCESS';
                $reex['return_msg'] = '';
                $reex = ToXml($reex);
                slog($reex);
                return $reex;
            }
            else if ($dataHmp && $dataHmp['type'] == 0) // 订单补充支付
            {
                /*** 效验金额是否一致 ***/
                // 微信支付通知金额
                $wx_total_fee = $data['total_fee'];
                // 订单金额
                $order_total_fee = bcmul($dataHmp['cost'], 100, 0);
                // if
                if ($wx_total_fee == $order_total_fee)
                {
                    // 更新房源置顶推广订单
                    $upDataHmp['pay_time'] = time();
                    $upDataHmp['type'] = 1;
                    db('hm_promotion')->where('id',$hm_promotion_id)->update($upDataHmp);
                    // 读取房源模块房东出租主键id
                    $hmlrid = db('hm_promotion')->where('id',$hm_promotion_id)->value('hm_landlord_rent_id');
                    // 更新房源模块房东出租表
                    $upDataHmlr['status'] = 0;
                    $upDataHmlr['msg'] = '';
                    db('hm_landlord_rent')->where('id',$hmlrid)->update($upDataHmlr);
                    // 同步返回给微信
                    $reex['return_code'] = 'SUCCESS';
                    $reex['return_msg'] = '';
                    $reex = ToXml($reex);
                    slog($reex);
                    return $reex;
                }
                else
                {
                    // 同步返回给微信
                    $reex['return_code'] = 'FAIL';
                    $reex['return_msg'] = '支付金额不一致';
                    $reex = ToXml($reex);
                    slog($reex);
                    return $reex;
                }
            }
            else // 最新订单支付
            {
                /*** 效验金额是否一致 ***/
                // 微信支付通知金额
                $wx_total_fee = $data['total_fee'];
                // 订单金额
                $order_total_fee = bcmul($dataHmp['cost'], 100, 0);
                // if
                if ($wx_total_fee == $order_total_fee)
                {
                    // 更新房源置顶推广订单
                    $upDataHmp['pay_time'] = time();
                    $upDataHmp['type'] = 1;
                    db('hm_promotion')->where('id',$hm_promotion_id)->update($upDataHmp);
                    // 同步返回给微信
                    $reex['return_code'] = 'SUCCESS';
                    $reex['return_msg'] = '';
                    $reex = ToXml($reex);
                    slog($reex);
                    return $reex;
                }
                else
                {
                    // 同步返回给微信
                    $reex['return_code'] = 'FAIL';
                    $reex['return_msg'] = '支付金额不一致';
                    $reex = ToXml($reex);
                    slog($reex);
                    return $reex;
                }
            }
        }
        else
        {
            // 同步返回给微信
            $reex['return_code'] = 'FAIL';
            $reex['return_msg'] = '签名失败';
            $reex = ToXml($reex);
            slog($reex);
            return $reex;
        }
    }

}
