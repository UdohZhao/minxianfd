<?php
namespace app\index\controller;
class HmLandlordRent extends Base
{
    public $id;
    public $status;
    public $type;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $this->status = isset($_GET['status']) ? intval($_GET['status']) : 0;
        $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
    }

    // 请求房源发布数据
    public function index()
    {
        // status type 首页展示
        if ($this->status == 2 && $this->type == 1)
        {
            // 读取房源模块房东出租表 -> 普通用户
            $data['hm_landlord_rent'] = db('hm_landlord_rent')->where('status',$this->status)->where('type',$this->type)->order('ctime desc')->select();
            // 读取区域
            $data['hm_min_xian']['town'] = db('hm_min_xian')->where('type',0)->order('sort asc')->select();
            $data['hm_min_xian']['village'] = db('hm_min_xian')->where('type',1)->order('sort asc')->select();
            // 读取租金
            $data['rent'] = config('rent');
            // 读取卧室
        }
        else
        {
            // 读取房源模块房东出租表 -> 房东用户
            $data['hm_landlord_rent'] = db('hm_landlord_rent')->where('weapp_user_id',$this->wuid)->order('ctime desc')->select();
        }
        // if
        if ($data['hm_landlord_rent'])
        {
            foreach ($data['hm_landlord_rent'] AS $k => $v)
            {
                // 读取房源基础数据
                $data['hm_landlord_rent'][$k]['hm_basics_id'] = db('hm_basics')->where('id',$v['hm_basics_id'])->find();
                $data['hm_landlord_rent'][$k]['hm_basics_id']['hm_house_type_id'] = db('hm_house_type')->where('id',$data['hm_landlord_rent'][$k]['hm_basics_id']['hm_house_type_id'])->find();
                // 读取房源小区数据
                $data['hm_landlord_rent'][$k]['hm_community_id'] = db('hm_community')->where('id',$v['hm_community_id'])->find();
                // 读取房源租赁数据
                $data['hm_landlord_rent'][$k]['hm_lease_id'] = db('hm_lease')->where('id',$v['hm_lease_id'])->find();
                // 读取房源数据
                $data['hm_landlord_rent'][$k]['hm_housing_resource_id'] = db('hm_housing_resource')->where('id',$v['hm_housing_resource_id'])->find();
                $data['hm_landlord_rent'][$k]['hm_housing_resource_id']['trait'] = explode(',', $data['hm_landlord_rent'][$k]['hm_housing_resource_id']['trait']);
                // 读取房源环景图片数据
                $data['hm_landlord_rent'][$k]['hm_housing_resource_id']['hm_view_images'] = db('hm_view_images')->where('hm_housing_resource_id',$v['hm_housing_resource_id'])->find();
                // 读取房源置顶推广数据
                $data['hm_landlord_rent'][$k]['hm_promotion_id'] = db('hm_promotion')->where('id',$v['hm_promotion_id'])->find();
            }
            slog($data);
            return ajaxReturn(Rs(0,'受影响的操作！',$data));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 查看详情
    public function viewDetails()
    {
        // 读取房源模块房东出租详细数据
        $data = db('hm_landlord_rent')->where('id',$this->id)->find();
        // 读取小程序用户数据
        $data['weapp_user_id'] = db('weapp_user')->where('id',$data['weapp_user_id'])->find();
        // 读取房源基础数据
        $data['hm_basics_id'] = db('hm_basics')->where('id',$data['hm_basics_id'])->find();
        $data['hm_basics_id']['hm_house_type_id'] = db('hm_house_type')->where('id',$data['hm_basics_id']['hm_house_type_id'])->find();
        // 读取房源区域数据
        $data['hm_area_id'] = db('hm_area')->where('id',$data['hm_area_id'])->find();
        $data['hm_area_id']['hm_min_xian_id'] = db('hm_min_xian')->where('id',$data['hm_area_id']['hm_min_xian_id'])->find();
        // 读取房源小区数据
        $data['hm_community_id'] = db('hm_community')->where('id',$data['hm_community_id'])->find();
        $data['hm_community_id']['hm_floor_id'] = db('hm_floor')->where('id',$data['hm_community_id']['hm_floor_id'])->find();
        $data['hm_community_id']['hm_doorplate_id'] = db('hm_doorplate')->where('id',$data['hm_community_id']['hm_doorplate_id'])->find();
        // 读取房源租赁数据
        $data['hm_lease_id'] = db('hm_lease')->where('id',$data['hm_lease_id'])->find();
        $data['hm_lease_id']['hm_ancillary_facility'] = explode(',', $data['hm_lease_id']['hm_ancillary_facility']);
        // 读取房源数据
        $data['hm_housing_resource_id'] = db('hm_housing_resource')->where('id',$data['hm_housing_resource_id'])->find();
        $data['hm_housing_resource_id']['trait'] = explode(',', $data['hm_housing_resource_id']['trait']);
        // 读取房源环景图片数据
        $data['hm_housing_resource_id']['hm_view_images'] = db('hm_view_images')->where('hm_housing_resource_id',$data['hm_housing_resource_id']['id'])->select();
        // 读取房源业主数据
        $data['hm_owner_id'] = db('hm_owner')->where('id',$data['hm_owner_id'])->find();
        // 读取房源房东数据
        $data['hm_landlord_id'] = db('hm_landlord')->where('id',$data['hm_landlord_id'])->find();
        // 读取房源置顶推广数据
        $data['hm_promotion_id'] = db('hm_promotion')->where('id',$data['hm_promotion_id'])->find();
        // 读取房源租房顾问数据
        $data['hm_counselor_id'] = db('hm_counselor')->where('id',$data['hm_counselor_id'])->find();
        slog($data);

        return ajaxReturn(Rs(0,'受影响的操作！',$data));

    }

}
