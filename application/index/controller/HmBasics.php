<?php
namespace app\index\controller;
class HmBasics extends Base
{

    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加基础信息
    public function add()
    {
        // 房源基础信息户型表
        $dataHmht = $this->getHmhtData();
        // 房源基础信息表
        $dataHmb = $this->getHmbData(db('hm_house_type')->insertGetId($dataHmht));
        // 房源模块房东出租表
        $dataHmlr = $this->getHmlrData(db('hm_basics')->insertGetId($dataHmb));
        $hm_landlord_rent_id = db('hm_landlord_rent')->insertGetId($dataHmlr);
        // if
        if ($hm_landlord_rent_id)
        {
            return ajaxReturn(Rs(0,'受影响的操作！',$hm_landlord_rent_id));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 初始化户型数据
    private function getHmhtData()
    {
        $dataHmht['habitable_room'] = input('post.habitable_room');
        $dataHmht['living_room'] = input('post.living_room');
        $dataHmht['shower_room'] = input('post.shower_room');
        return $dataHmht;
    }

    // 初始化基础数据
    private function getHmbData($hm_house_type_id)
    {
        $dataHmb['housing_resource_genre'] = input('post.housing_resource_genre');
        $dataHmb['decorate_degree'] = input('post.decorate_degree');
        $dataHmb['orientation'] = input('post.orientation');
        $dataHmb['hm_house_type_id'] = $hm_house_type_id;
        $dataHmb['area'] = input('post.area');
        $dataHmb['ctime'] = time();
        return $dataHmb;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_basics_id)
    {
        $dataHmlr['weapp_user_id'] = $this->wuid;
        $dataHmlr['hm_basics_id'] = $hm_basics_id;
        $dataHmlr['ctime'] = time();
        $dataHmlr['status'] = 1;
        return $dataHmlr;
    }

}
