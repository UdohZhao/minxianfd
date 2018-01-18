<?php
namespace app\admin\controller;
use think\Controller;
/**
 * admin模块基础控制器Base
 */
class Base extends Controller
{
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

      // 请登录
      if (!isset($_SESSION['au']))
      {
        header('Location:/admin/Login/index');
        die;
      }

    }
}
