<?php
namespace app\index\controller;
use think\cache\driver\Redis;
class WxLogin extends Base
{
    public $code;
    public $redis;
    /**
     * 构造方法
     */
    public function _auto()
    {
        // redis 缓存
        $this->redis = new Redis(config('redis'));
        $this->code = isset($_GET['code']) ? input('get.code') : '';
    }

    // 登录
    public function login()
    {
       // code
       if ($this->code)
       {
          // 登录凭证 code 获取 session_key 和 openid
          $url = "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code";
          $urlArr = parse_url($url);
          parse_str($urlArr['query'],$queryArr);
          $queryArr['appid'] = config('appid');
          $queryArr['secret'] = config('secret');
          $queryArr['js_code'] = $this->code;
          $queryStr = http_build_query($queryArr);
          $urlArr['query'] = $queryStr;
          $url = http_build_url($urlArr);

          // 请求
          $result = json_decode(httpRequest($url),true);
          if (isset($result['errcode'])) {
              return Rs(1,$result['errcode'],false);
          }

          // 生成3rd_session
          $result['randomFromDev'] = randomFromDev(16);

          // 写入数据表 data
          $data = $this->getData($result['openid']);

          // 读取数据表
          if (!db('weapp_user')->where('openid',$result['openid'])->count())
          {
            if (!db('weapp_user')->insert($data))
            {
                return Rs(2,'写入数据表失败！',false);
            }
          }

          // 存入redis
          $this->redis->set($result['randomFromDev'],$result['session_key'].$result['openid'],1296000);

          // 返回3rd_session到小程序客户端
          return ajaxReturn(Rs(0,'3rd_session',$result['randomFromDev']));

       }
    }

    // 初始化数据
    private function getData($openid)
    {
        // data
        $data['openid'] = $openid;
        $data['ctime'] = time();
        return $data;
    }

    // 3rd_session
    public function checkRedis()
    {
        $threerd_session = input('get.threerd_session');
        $result = $this->redis->get($threerd_session);
        if ($result)
        {
            // openid
            $openid = substr($result, -28);
            // 读取小程序用户主键id
            $id = db('weapp_user')->where('openid',$openid)->value('id');
            return ajaxReturn(Rs(0,'登录态未过期！',$id));
        }
        else
        {
            return ajaxReturn(Rs(1,'登录态过期！',false));
        }
    }

}
