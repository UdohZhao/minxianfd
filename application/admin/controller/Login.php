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
      if (isset($_SESSION['au']))
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
        return input('post.');
      }
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
