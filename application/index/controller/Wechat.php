<?php
namespace app\index\controller;
define('TOKEN', 'cunjiweapp');
class Wechat extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 校验服务器地址URL
    public function index()
    {
        if (isset($_GET['echostr']))
        {
            // 签名验证
            $this->valid();
        }
        else
        {
            // 用户交互
            $this->responseMsg();
        }
    }

    // 对接小程序
    public function valid()
    {
        $echoStr = $_GET["echostr"];
        if ($this->checkSignature())
        {
            echo $echoStr;
            die;
        }
        else
        {
            echo $echoStr.'+++'.TOKEN;
            die;
        }
    }

    // 签名验证
    private function checkSignature()
    {
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];

        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);
        sort($tmpArr, SORT_STRING);
        $tmpStr = implode( $tmpArr );
        $tmpStr = sha1( $tmpStr );

        if ( $tmpStr == $signature )
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    // 用户交互
    public function responseMsg()
    {
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
        //$postStr = file_get_contents("php://input");
        slog($postStr);
        if (!empty($postStr) && is_string($postStr))
        {
            $postArr = json_decode($postStr,true);
            slog($postArr);
            if(!empty($postArr['MsgType']) && $postArr['MsgType'] == 'text')
            {   //文本消息
                $fromUsername = $postArr['FromUserName'];   //发送者openid
                $toUserName = $postArr['ToUserName'];       //小程序id
                $textTpl = array(
                    "ToUserName"=>$fromUsername,
                    "FromUserName"=>$toUserName,
                    "CreateTime"=>time(),
                    "MsgType"=>"transfer_customer_service",
                );
                exit(json_encode($textTpl));
            }
        }
        else
        {
          slog('444');
        }
    }




}
