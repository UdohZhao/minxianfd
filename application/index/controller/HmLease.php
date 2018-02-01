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
        // dataHml
        $dataHml = $this->getHmlData();
        // dataHmlr
        $dataHmlr = $this->getHmlrData(db('hm_lease')->insertGetId($dataHml));
        $result = db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
        if ($result)
        {
            return ajaxReturn(Rs(0,'受影响的操作！',$this->hmlrid));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 初始化房源租赁数据
    private function getHmlData()
    {
        $dataHml['hm_lease_manner_id'] = input('post.hm_lease_manner_id');
        $dataHml['hm_payment_method_id'] = input('post.hm_payment_method_id');
        $dataHml['hm_ancillary_facility'] = input('post.hm_ancillary_facility');
        $dataHml['rent'] = input('post.rent');
        return $dataHml;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_lease_id)
    {
        $dataHmlr['hm_lease_id'] = $hm_lease_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }

    // 读取房源租赁数据
    public function index()
    {
        // 租赁方式
        $data['hm_lease_manner']['cname'] = db('hm_lease_manner')->order('sort asc')->column('cname');
        $data['hm_lease_manner']['id'] = db('hm_lease_manner')->order('sort asc')->column('id');
        // 付款方式
        $data['hm_payment_method']['cname'] = db('hm_payment_method')->order('sort asc')->column('cname');
        $data['hm_payment_method']['id'] = db('hm_payment_method')->order('sort asc')->column('id');
        // 房屋配套
        $data['hm_ancillary_facility'] = db('hm_ancillary_facility')->order('sort asc')->select();
        // if
        if ($data['hm_lease_manner']['id'] && $data['hm_payment_method']['id'] && $data['hm_ancillary_facility'])
        {
            return ajaxReturn(Rs(0,'受影响的操作！',$data));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

}
