<?php
namespace app\admin\controller;
class AdminUser extends Base
{
    public $id;
    /**
     * 构造方法
     */
    public function _auto()
    {
        $this->id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        $this->assign('id',$this->id);
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
                $data = db('admin_user')->where('id',$this->id)->find();
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
            if (db('admin_user')->where('username',$data['username'])->count() && $this->id == 0)
            {
                return Rs(2,'请勿重复添加管理员！',false);
            }
            // id
            if ($this->id)
            {
                // 更新数据表
                $result = db('admin_user')->where('id',$this->id)->update($data);
            }
            else
            {
                // 写入数据表
                $result = db('admin_user')->insert($data);
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
        $data['username'] = input('post.username');
        $data['password'] = enPassword(input('post.password'));
        $data['type'] = 1;
        $data['status'] = 0;
        $data['ctime'] = time();
        return $data;
    }

    // 用户列表页面
    public function index()
    {
        // search
        $search = "%%";
        if (input('?post.search')) $search = "%".input('post.search')."%";
        // 读取数据表
        $data = db('admin_user')->where('username','like',$search)->paginate(config('pages'),false,['query' => request()->param()]);
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
            if (db('admin_user')->where('id',$this->id)->delete())
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
            if (db('admin_user')->where('id',$this->id)->update($data))
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
