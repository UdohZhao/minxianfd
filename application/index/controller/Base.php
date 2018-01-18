<?php
namespace app\index\controller;
use think\Controller;
/**
 * index模块基础控制器Base
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
    }
}
