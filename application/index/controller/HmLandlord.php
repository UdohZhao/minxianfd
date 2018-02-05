<?php
namespace app\index\controller;
class HmLandlord extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加房源房东数据
    public function add()
    {
        // dataHml
        $dataHml = $this->getHmlData();
        $hm_landlord_id = db('hm_landlord')->insertGetId($dataHml);
        // if
        if ($hm_landlord_id)
        {
            // dataHmlr
            $dataHmlr = $this->getHmlrData($hm_landlord_id);
            db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
            return ajaxReturn(Rs(0,'受影响的操作！',$this->hmlrid));
        }
        else
        {
          return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 初始化房源房东数据
    private function getHmlData()
    {
        $dataHml['cname'] = input('post.cname');
        $dataHml['phone'] = input('post.phone');
        return $dataHml;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_landlord_id)
    {
        $dataHmlr['hm_landlord_id'] = $hm_landlord_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }



}
