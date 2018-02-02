<?php
namespace app\index\controller;
class HmArea extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加区域数据
    public function add()
    {
        // dataHmarea
        $dataHmarea = $this->getHmareaData();
        $hm_area_id = db('hm_area')->insertGetId($dataHmarea);
        // dataHmlr
        $dataHmlr = $this->getHmlrData($hm_area_id);
        $result = db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
        // if
        if ($result)
        {
            return ajaxReturn(Rs(0,'受影响的操作！',$this->hmlrid));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 初始化区域数据
    private function getHmareaData()
    {
        $data['hm_min_xian_id'] = input('post.hm_min_xian_id');
        $data['address'] = input('post.address');
        $data['ctime'] = time();
        return $data;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_area_id)
    {
        $dataHmlr['hm_area_id'] = $hm_area_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }

    // 返回岷县数据
    public function index()
    {
        $town = db('hm_min_xian')->where('type',0)->order('sort asc')->select();
        $country = db('hm_min_xian')->where('type',1)->order('sort asc')->select();
        if ($town || $country)
        {
          $data = array_merge($town,$country);
          foreach ($data AS $k => $v)
          {
              $dataHmmx['town_village'][] = $v['town_village'];
              $dataHmmx['hm_min_xian_id_arr'][] = $v['id'];
          }
          return ajaxReturn(Rs(0,'受影响的操作！',$dataHmmx));
        }
        else
        {
          return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

}
