<?php
namespace app\admin\controller;
class HmMinXian extends Base
{
    public $id;
    public $type;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $this->type = isset($_GET['type']) ? intval($_GET['type']) : 0;
        $this->assign('id',$this->id);
        $this->assign('type',$this->type);
    }

    // 添加用户页面
    public function add()
    {
        // Get
        if ($this->request->isGet())
        {
            // id
            if ($this->id)
            {
                // 读取数据
                $data = db('hm_min_xian')->where('id',$this->id)->find();
            }
            else
            {
                $data = '';
            }
            // assign
            $this->assign('data',$data);
            // 渲染模板输出
            return $this->fetch('add');
        }
        // Ajax
        if ($this->request->isAjax())
        {
            // data
            $data = $this->getData();
            // 防止重复添加
            if (db('hm_min_xian')->where('town_village',$data['town_village'])->count() && $this->id == 0)
            {
                return Rs(2,'请勿重复添加城镇或者乡村！',false);
            }
            // id
            if ($this->id)
            {
                // 更新数据表
                $result = db('hm_min_xian')->where('id',$this->id)->update($data);
            }
            else
            {
                // 写入数据表
                $result = db('hm_min_xian')->insert($data);
            }
            if ($result)
            {
                return Rs(0,'受影响的操作！',true);
            }
            else
            {
                return Rs(1,'不受影响的操作！',false);
            }
        }
    }

    // 初始化数据
    private function getData()
    {
        // data
        $data['town_village'] = input('post.town_village');
        $data['sort'] = input('post.sort');
        $data['type'] = input('post.type');
        return $data;
    }

    // 用户列表页面
    public function index()
    {
        // search
        $search = "%%";
        if (input('?post.search')) $search = "%".input('post.search')."%";
        // 读取数据表
        $data = db('hm_min_xian')->where('town_village','like',$search)->where('type',$this->type)->order('sort asc')->paginate(config('pages'),false,['query' => request()->param()]);
        // assign
        $this->assign('data',$data);
        // 渲染模板输出
        return $this->fetch('index');
    }

    // 删除数据
    public function del()
    {
        // Ajax
        if ($this->request->isAjax())
        {
            // 删除数据
            if (db('hm_min_xian')->where('id',$this->id)->delete())
            {
              return Rs(0,'受影响的操作！',true);
            }
            else
            {
              return Rs(1,'不受影响的操作！',false);
            }
        }
    }

    // 冻结||正常
    public function freeze()
    {
        // Ajax
        if ($this->request->isAjax())
        {
            // status
            $data['status'] = input('get.status');
            if (db('hm_min_xian')->where('id',$this->id)->update($data))
            {
                return Rs(0,'受影响的操作！',true);
            }
            else
            {
                return Rs(1,'不受影响的操作！',false);
            }
        }
    }

}
