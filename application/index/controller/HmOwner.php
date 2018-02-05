<?php
namespace app\index\controller;
class HmOwner extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {


    }

    // 添加房源业主数据
    public function add()
    {
        // dataHmo
        $dataHmo = $this->getHmoData();
        $hm_owner_id = db('hm_owner')->insertGetId($dataHmo);
        if ($hm_owner_id)
        {
            // dataHmlr
            $dataHmlr = $this->getHmlrData($hm_owner_id);
            db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
            return ajaxReturn(Rs(0,'受影响的操作！',$this->hmlrid));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 初始化房源业主数据
    private function getHmoData()
    {
        $dataHmo['demand'] = input('post.demand');
        $dataHmo['description'] = input('post.description');
        return $dataHmo;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_owner_id)
    {
        $dataHmlr['hm_owner_id'] = $hm_owner_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }

}
