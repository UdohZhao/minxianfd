<?php
namespace app\index\controller;
class HmHousingResource extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加房源信息数据
    public function add()
    {
        slog(input('post.'));
    }

}
