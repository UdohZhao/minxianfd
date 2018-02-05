<?php
namespace app\index\controller;
class HmLandlordRent extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 请求房源发布数据
    public function index()
    {
        // 读取房源模块房东出租表
        $data = db('hm_landlord_rent')->where('weapp_user_id',$this->wuid)->order('ctime desc')->select();
        // if
        if ($data)
        {
            foreach ($data AS $k => $v)
            {
                // 读取房源基础数据
                $data[$k]['hm_basics_id'] = db('hm_basics')->where('id',$v['hm_basics_id'])->find();
                $data[$k]['hm_basics_id']['hm_house_type_id'] = db('hm_house_type')->where('id',$data[$k]['hm_basics_id']['hm_house_type_id'])->find();
                // 读取房源小区数据
                $data[$k]['hm_community_id'] = db('hm_community')->where('id',$v['hm_community_id'])->find();
                // 读取房源租赁数据
                $data[$k]['hm_lease_id'] = db('hm_lease')->where('id',$v['hm_lease_id'])->find();
                // 读取房源数据
                $data[$k]['hm_housing_resource_id'] = db('hm_housing_resource')->where('id',$v['hm_housing_resource_id'])->find();
                $data[$k]['hm_housing_resource_id']['trait'] = explode(',', $data[$k]['hm_housing_resource_id']['trait']);
                // 读取房源环景图片数据
                $data[$k]['hm_housing_resource_id']['hm_view_images'] = db('hm_view_images')->where('hm_housing_resource_id',$v['hm_housing_resource_id'])->find();
                // 读取房源置顶推广数据
                $data[$k]['hm_promotion_id'] = db('hm_promotion')->where('id',$v['hm_promotion_id'])->find();
            }
            slog($data);
            return ajaxReturn(Rs(0,'受影响的操作！',$data));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }


    }

}
