<?php
namespace app\admin\controller;
class HmLandlordRent extends Base
{
    public $id;
    public $status;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $this->status = isset($_GET['status']) ? intval($_GET['status']) : 0;
        $this->assign('id',$this->id);
        $this->assign('status',$this->status);
    }

    // 审核房源
    public function check()
    {
        // search
        $search = "%%";
        if (input('?post.search')) $search = "%".input('post.search')."%";
        // 读取待审核房源
        $list = db('hm_landlord_rent')->where('status',$this->status)->order('ctime desc')->paginate(config('pages'),false,['query' => request()->param()]);
        // data
        $data = $list->all();
        // if
        if ($data)
        {
            foreach ($data AS $k => $v)
            {
                // // 读取小程序用户数据
                // $data[$k]['weapp_user_id'] = db('weapp_user')->where('id',$v['weapp_user_id'])->find();
                // // 读取房源基础数据
                // $data[$k]['hm_basics_id'] = db('hm_basics')->where('id',$v['hm_basics_id'])->find();
                // $data[$k]['hm_basics_id']['hm_house_type_id'] = db('hm_house_type')->where('id',$data[$k]['hm_basics_id']['hm_house_type_id'])->find();
                // // 读取房源区域数据
                // $data[$k]['hm_area_id'] = db('hm_area')->where('id',$v['hm_area_id'])->find();
                // $data[$k]['hm_area_id']['hm_min_xian_id'] = db('hm_min_xian')->where('id',$data[$k]['hm_area_id']['hm_min_xian_id'])->find();
                // // 读取房源小区数据
                // $data[$k]['hm_community_id'] = db('hm_community')->where('id',$v['hm_community_id'])->find();
                // $data[$k]['hm_community_id']['hm_floor_id'] = db('hm_floor')->where('id',$data[$k]['hm_community_id']['hm_floor_id'])->find();
                // $data[$k]['hm_community_id']['hm_doorplate_id'] = db('hm_doorplate')->where('id',$data[$k]['hm_community_id']['hm_doorplate_id'])->find();
                // // 读取房源租赁数据
                // $data[$k]['hm_lease_id'] = db('hm_lease')->where('id',$v['hm_lease_id'])->find();
                // // 读取房源数据
                // $data[$k]['hm_housing_resource_id'] = db('hm_housing_resource')->where('id',$v['hm_housing_resource_id'])->find();
                // // 读取房源环景图片数据
                // $data[$k]['hm_housing_resource_id']['hm_view_images'] = db('hm_view_images')->where('hm_housing_resource_id',$v['hm_housing_resource_id'])->select();
                // // 读取房源业主数据
                // $data[$k]['hm_owner_id'] = db('hm_owner')->where('id',$v['hm_owner_id'])->find();
                // 读取房源房东数据
                $data[$k]['hm_landlord_id'] = db('hm_landlord')->where('id',$v['hm_landlord_id'])->where('phone','like',$search)->find();
                if (!$data[$k]['hm_landlord_id'] && $search)
                {
                    unset($data[$k]);
                }
                // // 读取房源置顶推广数据
                // $data[$k]['hm_promotion_id'] = db('hm_promotion')->where('id',$v['hm_promotion_id'])->find();
            }
        }
        slog($data);
        // 获取分页显示
        $page = $list->render();
        // assign
        $this->assign('data',$data);
        $this->assign('page', $page);
        // 渲染模板输出
        return $this->fetch('check');

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
        // assign
        $this->assign('data',$data);
        // 渲染模板输出
        return $this->fetch('viewDetails');
    }

    // 审核
    public function viewDetailsCheck()
    {

        // status
        $status = input('post.status');
        $hm_promotion_id = input('post.hm_promotion_id');
        // if
        if ($status == 2)
        {
            // dataHmlr
            $dataHmlr = $this->getHmlrData(1);

            // if
            if ($hm_promotion_id)
            {
                // dataHmp
                $dataHmp = $this->getHmpData();
                slog($dataHmp);
                // 更新房源置顶推广表
                db('hm_promotion')->where('id',$hm_promotion_id)->update($dataHmp);
            }
        }
        else
        {
            // dataHmlr
            $dataHmlr = $this->getHmlrData(0);
        }

        slog($dataHmlr);

        // 更新房源模块房东出租表
        $result = db('hm_landlord_rent')->where('id',$this->id)->update($dataHmlr);

        slog($result);

        // if
        if ($result)
        {
            return ajaxReturn(Rs(0,'受影响的操作！',true));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }


    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($type)
    {
        $dataHmlr['status'] = input('post.status');
        $dataHmlr['type'] = $type;
        $dataHmlr['msg'] = input('post.msg');
        return $dataHmlr;
    }

    // 初始化房源置顶推广数据
    private function getHmpData()
    {
        $dataHmp['start_time'] = time();
        $dataHmp['end_time'] = strtotime(date('Y-m-d H:i:s',strtotime('+'.input('post.day').' day')));
        $dataHmp['status'] = 1;
        return $dataHmp;
    }

    // flag
    public function flag()
    {
        // Ajax
        if ($this->request->isAjax())
        {
            $data['type'] = input('post.type');
            // 更新房源模块房东出租表
            if (db('hm_landlord_rent')->where('id',$this->id)->update($data))
            {
                return ajaxReturn(Rs(0,'受影响的操作！',true));
            }
            else
            {
                return ajaxReturn(Rs(1,'不受影响的操作！',false));
            }
        }
    }

    // 删除
    public function del()
    {
        // Ajax
        if ($this->request->isAjax())
        {
            // 读取房源模块房东出租详细数据
            $data = db('hm_landlord_rent')->where('id',$this->id)->find();
            // 读取房源基础数据
            $data['hm_basics_id'] = db('hm_basics')->where('id',$data['hm_basics_id'])->find();
            db('hm_house_type')->where('id',$data['hm_basics_id']['hm_house_type_id'])->delete();
            db('hm_basics')->where('id',$data['hm_basics_id']['id'])->delete();
            // 读取房源区域数据
            db('hm_area')->where('id',$data['hm_area_id'])->delete();
            // 读取房源小区数据
            $data['hm_community_id'] = db('hm_community')->where('id',$data['hm_community_id'])->find();
            db('hm_floor')->where('id',$data['hm_community_id']['hm_floor_id'])->delete();
            db('hm_doorplate')->where('id',$data['hm_community_id']['hm_doorplate_id'])->delete();
            db('hm_community')->where('id',$data['hm_community_id']['id'])->delete();
            // 读取房源租赁数据
            db('hm_lease')->where('id',$data['hm_lease_id'])->delete();
            // 读取房源数据
            $data['hm_housing_resource_id'] = db('hm_housing_resource')->where('id',$data['hm_housing_resource_id'])->find();
            // 读取房源环景图片数据
            $data['hm_housing_resource_id']['hm_view_images'] = db('hm_view_images')->where('hm_housing_resource_id',$data['hm_housing_resource_id']['id'])->select();
            if ($data['hm_housing_resource_id']['hm_view_images'])
            {
                foreach ($data['hm_housing_resource_id']['hm_view_images'] AS $k => $v)
                {
                    @unlink(ROOT_PATH . 'public' . $v['path']);
                }
            }
            db('hm_view_images')->where('hm_housing_resource_id',$data['hm_housing_resource_id']['id'])->delete();
            db('hm_housing_resource')->where('id',$data['hm_housing_resource_id']['id'])->delete();
            // 读取房源业主数据
            db('hm_owner')->where('id',$data['hm_owner_id'])->delete();
            // 读取房源房东数据
            db('hm_landlord')->where('id',$data['hm_landlord_id'])->delete();
            // 读取房源置顶推广数据
            db('hm_promotion')->where('id',$data['hm_promotion_id'])->delete();

            /*** 结束 ***/
            if (db('hm_landlord_rent')->where('id',$this->id)->delete())
            {
                return ajaxReturn(Rs(0,'受影响的操作！',true));
            }
            else
            {
                return ajaxReturn(Rs(1,'不受影响的操作！',false));
            }

        }
    }

    // 配置顾问
    public function counselor()
    {
        // Ajax
        if ($this->request->isAjax())
        {
            $data['hm_counselor_id'] = input('get.hm_counselor_id');
            if (db('hm_landlord_rent')->where('id',$this->id)->update($data))
            {
                return ajaxReturn(Rs(0,'受影响的操作！',true));
            }
            else
            {
                return ajaxReturn(Rs(1,'不受影响的操作！',false));
            }
        }
    }


}
