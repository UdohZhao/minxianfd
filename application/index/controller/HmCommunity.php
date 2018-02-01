<?php
namespace app\index\controller;
class HmCommunity extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加房源小区信息
    public function add()
    {
        // 小区楼层数据
        $dataHmf = $this->getHmfData();
        // 小区门牌数据
        $dataHmd = $this->getHmdData();
        // 小区数据
        $dataHmc = $this->getHmcData(db('hm_floor')->insertGetId($dataHmf),db('hm_doorplate')->insertGetId($dataHmd));
        // 房源小区主键id
        $hm_community_id = db('hm_community')->insertGetId($dataHmc);
        if ($hm_community_id)
        {
            // 更新房源模块房东出租数据
            $dataHmlr = $this->getHmlrData($hm_community_id);
            slog($dataHmlr);
            db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
            return ajaxReturn(Rs(0,'受影响的操作！',$this->hmlrid));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }

    }

    // 初始化小区楼层数据
    private function getHmfData()
    {
        $dataHmf['total_floor'] = input('post.total_floor');
        $dataHmf['present_floor'] = input('post.present_floor');
        return $dataHmf;
    }

    // 初始化小区门牌数据
    private function getHmdData()
    {
        $dataHmd['building'] = input('post.building');
        $dataHmd['unit'] = input('post.unit');
        $dataHmd['household'] = input('post.household');
        return $dataHmd;
    }

    // 初始化小区数据
    private function getHmcData($hm_floor_id,$hm_doorplate_id)
    {
        $dataHmc['cname'] = input('post.cname');
        $dataHmc['hm_floor_id'] = $hm_floor_id;
        $dataHmc['hm_doorplate_id'] = $hm_doorplate_id;
        return $dataHmc;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_community_id)
    {
        $dataHmlr['hm_community_id'] = $hm_community_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }

}
