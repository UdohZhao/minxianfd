<?php
namespace app\index\controller;
use think\Controller;
/**
 * index模块基础控制器Base
 */
class Base extends Controller
{
    public $wuid;
    public $hmlrid;
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
      // 小程序用户id
      $this->wuid = isset($_GET['wuid']) ? input('get.wuid') : 0;
      $this->hmlrid = isset($_GET['hmlrid']) ? input('get.hmlrid') : 0;
    }
}
