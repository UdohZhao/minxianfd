<?php
namespace app\index\controller;
class HmLandlordRent extends Base
{
    public $id;
    public $status;
    public $type;
    public $retype;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $this->status = isset($_GET['status']) ? intval($_GET['status']) : 0;
        $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
        $this->retype = isset($_GET['retype']) ? intval($_GET['retype']) : 0;
    }

    // 请求房源发布数据
    public function index()
    {
        // status type 首页展示
        if ($this->status == 2 && $this->type == 1)
        {
            // 读取房源模块房东出租表 -> 普通用户
            if ($this->retype == 1)
            {
                $data['hm_landlord_rent'] = db('hm_landlord_rent')->where('status',$this->status)->where('type',$this->type)->where('hm_promotion_id != 0')->order('ctime desc')->select();
            }
            else
            {
                $data['hm_landlord_rent'] = db('hm_landlord_rent')->where('status',$this->status)->where('type',$this->type)->where('hm_promotion_id',0)->order('ctime desc')->select();
                // 读取区域
                $data['hm_min_xian']['town'] = db('hm_min_xian')->where('type',0)->order('sort asc')->select();
                $data['hm_min_xian']['village'] = db('hm_min_xian')->where('type',1)->order('sort asc')->select();
                // 读取出租方式
                $data['hm_lease_manner'] = db('hm_lease_manner')->order('sort asc')->select();
                if ($data['hm_lease_manner'])
                {
                    foreach($data['hm_lease_manner'] AS $k => $v)
                    {
                        $data['hm_lease_manner'][$k]['checked'] = false;
                    }
                }
                // 读取租金
                $data['rent'] = config('rent');
                // 读取卧室
                $data['bedroom'] = config('bedroom');
                // 读取卫生间
                $data['toilet'] = config('toilet');
                // 读取建筑面积（平方米）
                $data['covered_area'] = config('covered_area');
                // 读取楼层
                $data['floor'] = config('floor');
                // 读取房源类型
                $data['housing_resource_genre'] = config('housing_resource_genre');
                // 读取装修
                $data['upfitter'] = config('upfitter');
                // 读取朝向
                $data['orientation'] = config('orientation');
            }
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
                //  POST 条件搜索
                if ($this->request->isPost())
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

                    /*** 条件检测区域 ***/

                    // 获取区域岷县id
                    $hm_min_xian_id = input('post.hm_min_xian_id');
                    if ($hm_min_xian_id)
                    {
                        // 读取房源区域数据
                        $data['hm_landlord_rent'][$k]['hm_area_id'] = db('hm_area')->where('id',$v['hm_area_id'])->find();
                        // if
                        if ($data['hm_landlord_rent'][$k]['hm_area_id']['hm_min_xian_id'] == $hm_min_xian_id)
                        {
                             unset($data['hm_landlord_rent'][$k]['hm_area_id']);
                        }
                        else
                        {
                            unset($data['hm_landlord_rent'][$k]);
                        }
                    }

                    // 租金
                    $rentStart = input('post.rentStart');
                    $rentEnd = input('post.rentEnd');
                    if ($rentStart != null && $rentEnd != null)
                    {
                        $rentStart = intval($rentStart);
                        $rentEnd = intval($rentEnd);
                        if ($data['hm_landlord_rent'][$k]['hm_lease_id']['rent'] >= $rentStart && $data['hm_landlord_rent'][$k]['hm_lease_id']['rent'] <= $rentEnd) {} else
                        {
                            unset($data['hm_landlord_rent'][$k]);
                        }
                    }

                    // 户型
                    $bedroomCheckedValue = input('post.bedroomCheckedValue');
                    $toiletCheckedValue = input('post.toiletCheckedValue');
                    if ($bedroomCheckedValue && $toiletCheckedValue)
                    {
                        // 字符串转数组
                        $bedroomCheckedValue = explode(',', $bedroomCheckedValue);
                        $toiletCheckedValue = explode(',', $toiletCheckedValue);

                        // if
                        if (in_array($data['hm_landlord_rent'][$k]['hm_basics_id']['hm_house_type_id']['habitable_room'], $bedroomCheckedValue) && in_array($data['hm_landlord_rent'][$k]['hm_basics_id']['hm_house_type_id']['shower_room'], $toiletCheckedValue)) {} else
                        {
                            unset($data['hm_landlord_rent'][$k]);
                        }
                    }
                    else if ($bedroomCheckedValue)
                    {
                        // 字符串转数组
                        $bedroomCheckedValue = explode(',', $bedroomCheckedValue);
                        if (!in_array($data['hm_landlord_rent'][$k]['hm_basics_id']['hm_house_type_id']['habitable_room'], $bedroomCheckedValue))
                        {
                            unset($data['hm_landlord_rent'][$k]);
                        }

                    }
                    else if ($toiletCheckedValue)
                    {
                        // 字符串转数组
                        $toiletCheckedValue = explode(',', $toiletCheckedValue);
                        if (!in_array($data['hm_landlord_rent'][$k]['hm_basics_id']['hm_house_type_id']['shower_room'], $toiletCheckedValue))
                        {
                            unset($data['hm_landlord_rent'][$k]);
                        }
                    }

                    // 更多
                    $orientationCheckedValue = input('post.orientationCheckedValue');// 获取朝向选中值
                    $coveredAreaCheckedValue = input('post.coveredAreaCheckedValue');// 获取建筑面积选中值
                    $floorCheckedValue = input('post.floorCheckedValue');// 获取楼层选中值
                    $upfitterCheckedValue = input('post.upfitterCheckedValue');// 获取装修选中值
                    $hmLeaseMannerCheckedValue = input('post.hmLeaseMannerCheckedValue');// 获取出租方式选中值

                    // if
                    if ($orientationCheckedValue && $coveredAreaCheckedValue && $floorCheckedValue && $upfitterCheckedValue && $hmLeaseMannerCheckedValue)
                    {
                        $orientationCheckedValue = explode(',', $orientationCheckedValue);
                        $coveredAreaCheckedValue = explode(',', $coveredAreaCheckedValue);
                        $floorCheckedValue = explode(',', $floorCheckedValue);
                        $upfitterCheckedValue = explode(',', $upfitterCheckedValue);
                        $hmLeaseMannerCheckedValue = explode(',', $hmLeaseMannerCheckedValue);

                        slog($orientationCheckedValue);
                        slog($coveredAreaCheckedValue);
                        slog($floorCheckedValue);
                        slog($upfitterCheckedValue);
                        slog($hmLeaseMannerCheckedValue);

                        if (in_array($data['hm_landlord_rent'][$k]['hm_basics_id']['orientation'], $orientationCheckedValue))
                        {}


                    }

                }
                else
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
            }
            // $data['hm_landlord_rent']
            if (!$data['hm_landlord_rent'])
            {
                $data['hm_landlord_rent'] = false;
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
        if ($data['hm_promotion_id'])
        {
            $data['hm_promotion_id']['start_time'] = date('Y-m-d H:i',$data['hm_promotion_id']['start_time']);
            $data['hm_promotion_id']['end_time'] = date('Y-m-d H:i',$data['hm_promotion_id']['end_time']);
            $data['hm_promotion_id']['pay_time'] = date('Y-m-d H:i',$data['hm_promotion_id']['pay_time']);
            $data['hm_promotion_id']['ctime'] = date('Y-m-d H:i',$data['hm_promotion_id']['ctime']);
        }
        // 读取房源租房顾问数据
        $data['hm_counselor_id'] = db('hm_counselor')->where('id',$data['hm_counselor_id'])->find();
        slog($data);

        return ajaxReturn(Rs(0,'受影响的操作！',$data));

    }

}
