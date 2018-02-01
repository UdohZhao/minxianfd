<?php
namespace app\index\controller;
class HmLease extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加房源租赁数据
    public function add()
    {
        slog(input('get.'));
        slog(input('post.'));
    }

    // 读取房源租赁数据
    public function index()
    {
        // 租赁方式
        $data['hm_lease_manner'] = db('hm_lease_manner')->order('sort asc')->select();
        // 付款方式
        $data['hm_payment_method'] = db('hm_payment_method')->order('sort asc')->select();
        slog($data);
    }

}
