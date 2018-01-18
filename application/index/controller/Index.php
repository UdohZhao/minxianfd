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

            slog('hello world!','log','color:red;font-size:20px;');

            // 渲染模板输出
            return $this->fetch('index');
        }
    }
}
