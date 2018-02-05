<?php
namespace app\index\controller;
class HmPromotionCost extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 请求房源置顶推广费用数据
    public function index()
    {
        // dataHmpc
        $dataHmpc = db('hm_promotion_cost')->order('sort asc')->select();
        slog($dataHmpc);
        // if
        if ($dataHmpc)
        {
            return ajaxReturn(Rs(0,'受影响的操作！',$dataHmpc));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

}
