<?php
namespace app\index\controller;
class Sms extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    /**
     * 发送短信验证码
     */
    public function send()
    {
        $url = 'https://sms.yunpian.com/v2/sms/single_send.json';
        $rand = rand(100000,999999);
        $data['apikey'] = config('apikey');
        $data['mobile'] = input('post.phone');
        $data['text'] = '【岷县海晟商贸】您的验证码是'.$rand.'。如非本人操作，请忽略本短信 ';
        $result = json_decode(httpRequest($url,'POST',$data),true);
        // if
        if ($result['code'] == 0)
        {
            return ajaxReturn(Rs(0,'短信验证码发送成功！',$rand));
        }
        else
        {
            return ajaxReturn(Rs(1,$result['detail'],false));
        }
    }

}
