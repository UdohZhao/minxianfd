<?php
namespace app\index\controller;
class Index extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    /**
     * 默认方法
     */
    public function index()
    {
        // Get
        if ($this->request->isGet())
        {
            // 渲染模板输出
            return $this->fetch('index');
        }

    }

    public function indexDemo()
    {
        if ($this->request->isGet())
        {
            // 读取朝向，房屋出租类型等
            $this->data['hm_basics'] = db('hm_basics')->order('ctime desc')->select();
            // 读取房屋户型类型等
            $this->data['hm_house_type'] = db('hm_house_type')->select();
            // 模板变量赋值
            $this->assign('data',$this->data);    
            // var_dump($this->data);
            // die;
            // 渲染模板输出
            return ajaxReturn($this->data);
        }
    }


}
