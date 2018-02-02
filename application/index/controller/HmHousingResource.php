<?php
namespace app\index\controller;
class HmHousingResource extends Base
{
    /**
     * 构造方法
     */
    public function _auto()
    {

    }

    // 添加房源信息数据
    public function add()
    {
        // dataHmhr
        $dataHmhr = $this->getHmhrData();
        // dataHmvi
        $dataHmvi = $this->getHmviData(db('hm_housing_resource')->insertGetId($dataHmhr));
        slog($dataHmvi);
        if ($dataHmvi['hm_housing_resource_id'])
        {
            $path = $dataHmvi['path'];
            foreach ($path AS $k => $v)
            {
                $dataHmvi['path'] = $v;
                // 写入房源环景图片表
                db('hm_view_images')->insert($dataHmvi);
            }
            // 更新房源模块房东出租表
            $dataHmlr = $this->getHmlrData($dataHmvi['hm_housing_resource_id']);
            db('hm_landlord_rent')->where('id',$this->hmlrid)->update($dataHmlr);
            return ajaxReturn(Rs(0,'受影响的操作！',$this->hmlrid));
        }
        else
        {
            return ajaxReturn(Rs(1,'不受影响的操作！',false));
        }
    }

    // 初始化房源信息数据
    private function getHmhrData()
    {
        $dataHmhr['title'] = input('post.title');
        $dataHmhr['describe'] = input('post.describe');
        $dataHmhr['trait'] = input('post.trait');
        $dataHmhr['in_time'] = input('post.in_time');
        return $dataHmhr;
    }

    // 初始化房源环景图片数据
    private function getHmviData($hm_housing_resource_id)
    {
        $dataHmvi['path'] = explode(',', input('post.path'));
        $dataHmvi['ctime'] = time();
        $dataHmvi['hm_housing_resource_id'] = $hm_housing_resource_id;
        return $dataHmvi;
    }

    // 初始化房源模块房东出租数据
    private function getHmlrData($hm_housing_resource_id)
    {
        $dataHmlr['hm_housing_resource_id'] = $hm_housing_resource_id;
        $dataHmlr['ctime'] = time();
        return $dataHmlr;
    }

    // upFliles
    public function upFliles()
    {
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('file');
        // 移动到框架应用根目录/public/uploads/ 目录下
        $info = $file->validate(['ext'=>'jpg,jpeg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads');
        if($info){
            // 成功上传后 获取上传信息
            // 拼接路径
            $path = DS . 'uploads' . DS . $info->getSaveName();
            return ajaxReturn(Rs(0,'受影响的操作！',$path));
        }else{
            // 上传失败获取错误信息
            return ajaxReturn(Rs(1,$file->getError(),false));
        }
    }

}
