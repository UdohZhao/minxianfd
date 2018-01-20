<?php
namespace app\admin\controller;
class HmCounselor extends Base
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
                $data = db('hm_counselor')->where('id',$this->id)->find();
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
            // 文件上传
            $file = request()->file('head_portrait');
            if ($file)
            {
                $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
                if ($info)
                {
                    $filePath = DS . 'uploads' . DS . $info->getSaveName();
                }
                else
                {
                   return Rs(3,'头像上传失败！',false);
                }
            }
            else
            {
                if ($this->id == 0)
                {
                  return Rs(2,'请上传顾问头像！',false);
                }
                else
                {
                  $filePath = input('post.head_portrait');
                }
            }
            // data
            $data = $this->getData($filePath);
            // 防止重复添加
            if (db('hm_counselor')->where('telephone',$data['telephone'])->count() && $this->id == 0)
            {
                return Rs(4,'请勿重复添加相同的电话号码！',false);
            }
            // id
            if ($this->id)
            {
                // 更新数据表
                $result = db('hm_counselor')->where('id',$this->id)->update($data);
            }
            else
            {
                // 写入数据表
                $result = db('hm_counselor')->insert($data);
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
    private function getData($filePath)
    {
        // data
        $data['head_portrait'] = $filePath;
        $data['cname'] = input('post.cname');
        $data['telephone'] = input('post.telephone');
        $data['status'] = 0;
        return $data;
    }

    // 用户列表页面
    public function index()
    {
        // search
        $search = "%%";
        if (input('?post.search')) $search = "%".input('post.search')."%";
        // 读取数据表
        $data = db('hm_counselor')->where('cname','like',$search)->paginate(config('pages'),false,['query' => request()->param()]);
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
            if (db('hm_counselor')->where('id',$this->id)->delete())
            {
              @unlink(ROOT_PATH . 'public' . input('post.head_portrait'));
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
            if (db('hm_counselor')->where('id',$this->id)->update($data))
            {
                return Rs(0,'受影响的操作！',true);
            }
            else
            {
                return Rs(1,'不受影响的操作！',false);
            }
        }
    }

    // 删除头像
    public function delAvatar()
    {
        // Ajax
        if ($this->request->isAjax())
        {
            // 更新数据表
            $data['head_portrait'] = '';
            if (db('hm_counselor')->where('id',$this->id)->update($data))
            {
                @unlink(ROOT_PATH . 'public' . input('post.head_portrait'));
                return Rs(0,'头像删除成功！',true);
            }
            else
            {
                return Rs(1,'头像删除失败！',false);
            }
        }
    }


}
