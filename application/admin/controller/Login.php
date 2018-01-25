<?php
namespace app\admin\controller;
use think\Controller;
use think\captcha\Captcha;
/**
 * admin模块基础控制器Base
 */
class Login extends Controller
{
    public $cdb;
    /**
     * 构造方法
     */
    public function _initialize()
    {
      // 初始化构造方法
      if(method_exists($this,'_auto'))
      {
        $this->_auto();
      }
      // 实例化验证码类
      $this->cdb = new Captcha();
      // 已登录
      if (session('?au'))
      {
        header('Location:/admin/Index/index');
        die;
      }
    }

    /**
     * 登录页面
     */
    public function index()
    {
      // Get
      if ($this->request->isGet())
      {
          // 渲染模板输出
          return $this->fetch('index');
      }
      // Ajax
      if ($this->request->isAjax())
      {
        // data
        $data = $this->getData();
        $result = db('admin_user')->where('username',$data['username'])->where('password',$data['password'])->find();
        if ($result)
        {
            if ($result['status'] == 1)
            {
                return Rs(3,'该账号已被冻结，请自行联系管理员！',false);
            }
            // 用户信息存入session
            session('au',$result);
            return Rs(0,'用户信息存入session成功！',session('au'));
        }
        else
        {
            return Rs(2,'账号或者密码错误！',false);
        }
      }
    }

    // 初始化数据
    private function getData()
    {
        // data
        $data['username'] = input('post.username');
        $data['password'] = enPassword(input('post.password'));
        return $data;
    }

    /**
     * 生成验证码
     */
    public function captcha()
    {
      // Get
      if ($this->request->isGet())
      {
        return $this->cdb->entry();
      }
      // Ajax
      if ($this->request->isAjax())
      {
        if ($this->cdb->check(input('post.code'), ''))
        {
          return ['valid'=>true];
        }
        else
        {
          return ['valid'=>false];
        }
      }
    }
}
