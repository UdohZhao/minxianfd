<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // +----------------------------------------------------------------------
    // | 应用设置
    // +----------------------------------------------------------------------

    // 应用命名空间
    'app_namespace'          => 'app',
    // 应用调试模式
    'app_debug'              => true,
    // 应用Trace
    'app_trace'              => true,
    // 应用模式状态
    'app_status'             => '',
    // 是否支持多模块
    'app_multi_module'       => true,
    // 入口自动绑定模块
    'auto_bind_module'       => false,
    // 注册的根命名空间
    'root_namespace'         => [],
    // 扩展函数文件
    'extra_file_list'        => [THINK_PATH . 'helper' . EXT],
    // 默认输出类型
    'default_return_type'    => 'html',
    // 默认AJAX 数据返回格式,可选json xml ...
    'default_ajax_return'    => 'json',
    // 默认JSONP格式返回的处理方法
    'default_jsonp_handler'  => 'jsonpReturn',
    // 默认JSONP处理方法
    'var_jsonp_handler'      => 'callback',
    // 默认时区
    'default_timezone'       => 'PRC',
    // 是否开启多语言
    'lang_switch_on'         => false,
    // 默认全局过滤方法 用逗号分隔多个
    'default_filter'         => '',
    // 默认语言
    'default_lang'           => 'zh-cn',
    // 应用类库后缀
    'class_suffix'           => false,
    // 控制器类后缀
    'controller_suffix'      => false,

    // +----------------------------------------------------------------------
    // | 模块设置
    // +----------------------------------------------------------------------

    // 默认模块名
    'default_module'         => 'index',
    // 禁止访问模块
    'deny_module_list'       => ['common'],
    // 默认控制器名
    'default_controller'     => 'Index',
    // 默认操作名
    'default_action'         => 'index',
    // 默认验证器
    'default_validate'       => '',
    // 默认的空控制器名
    'empty_controller'       => 'Error',
    // 操作方法后缀
    'action_suffix'          => '',
    // 自动搜索控制器
    'controller_auto_search' => false,

    // +----------------------------------------------------------------------
    // | URL设置
    // +----------------------------------------------------------------------

    // PATHINFO变量名 用于兼容模式
    'var_pathinfo'           => 's',
    // 兼容PATH_INFO获取
    'pathinfo_fetch'         => ['ORIG_PATH_INFO', 'REDIRECT_PATH_INFO', 'REDIRECT_URL'],
    // pathinfo分隔符
    'pathinfo_depr'          => '/',
    // URL伪静态后缀
    'url_html_suffix'        => 'html',
    // URL普通方式参数 用于自动生成
    'url_common_param'       => false,
    // URL参数方式 0 按名称成对解析 1 按顺序解析
    'url_param_type'         => 0,
    // 是否开启路由
    'url_route_on'           => true,
    // 路由使用完整匹配
    'route_complete_match'   => false,
    // 路由配置文件（支持配置多个）
    'route_config_file'      => ['route'],
    // 是否强制使用路由
    'url_route_must'         => false,
    // 域名部署
    'url_domain_deploy'      => false,
    // 域名根，如thinkphp.cn
    'url_domain_root'        => '',
    // 是否自动转换URL中的控制器和操作名
    'url_convert'            => false,
    // 默认的访问控制器层
    'url_controller_layer'   => 'controller',
    // 表单请求类型伪装变量
    'var_method'             => '_method',
    // 表单ajax伪装变量
    'var_ajax'               => '_ajax',
    // 表单pjax伪装变量
    'var_pjax'               => '_pjax',
    // 是否开启请求缓存 true自动缓存 支持设置请求缓存规则
    'request_cache'          => false,
    // 请求缓存有效期
    'request_cache_expire'   => null,
    // 全局请求缓存排除规则
    'request_cache_except'   => [],

    // +----------------------------------------------------------------------
    // | 模板设置
    // +----------------------------------------------------------------------

    'template'               => [
        // 模板引擎类型 支持 php think 支持扩展
        'type'         => 'Think',
        // 模板路径
        'view_path'    => '',
        // 模板后缀
        'view_suffix'  => 'html',
        // 模板文件名分隔符
        'view_depr'    => DS,
        // 模板引擎普通标签开始标记
        'tpl_begin'    => '{',
        // 模板引擎普通标签结束标记
        'tpl_end'      => '}',
        // 标签库标签开始标记
        'taglib_begin' => '{',
        // 标签库标签结束标记
        'taglib_end'   => '}',
    ],

    // 视图输出字符串内容替换
    'view_replace_str'       => [],
    // 默认跳转页面对应的模板文件
    'dispatch_success_tmpl'  => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',
    'dispatch_error_tmpl'    => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',

    // +----------------------------------------------------------------------
    // | 异常及错误设置
    // +----------------------------------------------------------------------

    // 异常页面的模板文件
    'exception_tmpl'         => THINK_PATH . 'tpl' . DS . 'think_exception.tpl',

    // 错误显示信息,非调试模式有效
    'error_message'          => '页面错误！请稍后再试～',
    // 显示错误信息
    'show_error_msg'         => false,
    // 异常处理handle类 留空使用 \think\exception\Handle
    'exception_handle'       => '',
    'tpl_cache'          => false, // 是否开启模板编译缓存,设为false则每次都会重新编译

    // +----------------------------------------------------------------------
    // | 日志设置
    // +----------------------------------------------------------------------

    'log'                    => [
        // 日志记录方式，内置 file socket 支持扩展
        'type'  => 'File',
        // 日志保存目录
        'path'  => LOG_PATH,
        // 日志记录级别
        'level' => [],
    ],

    // +----------------------------------------------------------------------
    // | Trace设置 开启 app_trace 后 有效
    // +----------------------------------------------------------------------
    'trace'                  => [
        // 内置Html Console 支持扩展
        'type' => 'Html',
    ],

    // +----------------------------------------------------------------------
    // | 缓存设置
    // +----------------------------------------------------------------------

    'cache'                  => [
        // 驱动方式
        'type'   => 'File',
        // 缓存保存目录
        'path'   => CACHE_PATH,
        // 缓存前缀
        'prefix' => '',
        // 缓存有效期 0表示永久缓存
        'expire' => 0,
    ],

    // redis
    'redis'                 => [
        'host'       => '192.168.199.101',
        'port'       => 6379,
        'password'   => '123456',
        'select'     => 0,
        'timeout'    => 0,
        'expire'     => 0,
        'persistent' => false,
        'prefix'     => '',
    ],


    // +----------------------------------------------------------------------
    // | 会话设置
    // +----------------------------------------------------------------------

    'session'                => [
        'id'             => '',
        // SESSION_ID的提交变量,解决flash上传跨域
        'var_session_id' => '',
        // SESSION 前缀
        'prefix'         => 'think',
        // 驱动方式 支持redis memcache memcached
        'type'           => '',
        // 是否自动开启 SESSION
        'auto_start'     => true,
    ],

    // +----------------------------------------------------------------------
    // | Cookie设置
    // +----------------------------------------------------------------------
    'cookie'                 => [
        // cookie 名称前缀
        'prefix'    => '',
        // cookie 保存时间
        'expire'    => 0,
        // cookie 保存路径
        'path'      => '/',
        // cookie 有效域名
        'domain'    => '',
        //  cookie 启用安全传输
        'secure'    => false,
        // httponly设置
        'httponly'  => '',
        // 是否使用 setcookie
        'setcookie' => true,
    ],

    //分页配置
    'paginate'               => [
        'type'      => 'bootstrap',
        'var_page'  => 'page',
        'list_rows' => 15,
    ],

    // SocketLog ip
    'socketlogip'   => '114.115.164.141',

    // 分页数
    'pages'         =>  '25',

    // 后台标题
    'admin_title'   =>  '岷县房东',

    // 小程序配置
    'appid'         =>  'wxd339d7d69ccc1651',
    'secret'        =>  '4b2d7be54ec5c99a2da413e4f8dde2e0',

    // 商户
    'mch_id'        =>  '1493333442',
    'key'           =>  'WaUM7PuMicM3UFKtZIKrc9GrJNORkXCZ',

    // 云片网
    'apikey'        =>  '407405cb91501f840ca121ea0d65d457',

    // 租金
    'rent'          =>  [
        '0'         =>  ['key'=>'不限','start'=>'0','end'=>'1000000'],
        '1'         =>  ['key'=>'600元以下','start'=>'0','end'=>'600'],
        '2'         =>  ['key'=>'600-1000元','start'=>'600','end'=>'1000'],
        '3'         =>  ['key'=>'1000-2000元','start'=>'1000','end'=>'2000'],
        '4'         =>  ['key'=>'2000-3000元','start'=>'2000','end'=>'3000'],
        '5'         =>  ['key'=>'3000-5000元','start'=>'3000','end'=>'5000'],
        '6'         =>  ['key'=>'5000-8000元','start'=>'5000','end'=>'8000'],
        '7'         =>  ['key'=>'8000元以上','start'=>'8000','end'=>'1000000']
    ],

    // 卧室
    'bedroom'       =>  [
        '0'         =>  ['key'=>'一室','start'=>'1','end'=>'1'],
        '1'         =>  ['key'=>'二室','start'=>'2','end'=>'2'],
        '2'         =>  ['key'=>'三室','start'=>'3','end'=>'3'],
        '3'         =>  ['key'=>'四室','start'=>'4','end'=>'4'],
        '4'         =>  ['key'=>'五室','start'=>'5','end'=>'5'],
        '5'         =>  ['key'=>'五室以上','start'=>'5','end'=>'1000000'],
    ],

    // 卫生间
    'toilet'        =>  [
        '0'         =>  ['key'=>'独卫','start'=>'1','end'=>'1'],
        '1'         =>  ['key'=>'两卫','start'=>'2','end'=>'2'],
        '2'         =>  ['key'=>'三卫','start'=>'3','end'=>'3'],
        '3'         =>  ['key'=>'三卫以上','start'=>'3','end'=>'1000000']
    ],

    // 建筑面积（平方米）
    'covered_area'  =>  [
        '0'         =>  ['key'=>'30㎡以下','start'=>'0','end'=>'30'],
        '1'         =>  ['key'=>'30-50㎡','start'=>'30','end'=>'50'],
        '2'         =>  ['key'=>'50-70㎡','start'=>'50','end'=>'70'],
        '3'         =>  ['key'=>'70-90㎡','start'=>'70','end'=>'90'],
        '4'         =>  ['key'=>'90-120㎡','start'=>'90','end'=>'120'],
        '5'         =>  ['key'=>'120-150㎡','start'=>'120','end'=>'150'],
        '6'         =>  ['key'=>'150-200㎡','start'=>'150','end'=>'200'],
        '7'         =>  ['key'=>'200-300㎡','start'=>'200','end'=>'300'],
        '8'         =>  ['key'=>'300㎡以上','start'=>'300','end'=>'1000000'],
    ],

    // 楼层
    'floor'         =>  [
        '0'         =>  ['key'=>'低楼层','start'=>'1','end'=>'10'],
        '1'         =>  ['key'=>'中楼层','start'=>'10','end'=>'20'],
        '2'         =>  ['key'=>'高楼层','start'=>'20','end'=>'100'],
    ],

    // 房源类型
    'housing_resource_genre'    =>  [
        '0'         =>  ['key'=>'其他','value'=>'0'],
        '1'         =>  ['key'=>'住宅','value'=>'1'],
        '2'         =>  ['key'=>'别野','value'=>'2'],
        '3'         =>  ['key'=>'写字楼','value'=>'3'],
        '4'         =>  ['key'=>'商铺','value'=>'4'],

    ],

    // 装修
    'upfitter'      =>  [
        '0'         =>  ['key'=>'其他','value'=>'0'],
        '1'         =>  ['key'=>'豪华装修','value'=>'1'],
        '2'         =>  ['key'=>'精装修','value'=>'2'],
        '3'         =>  ['key'=>'中等装修','value'=>'3'],
        '4'         =>  ['key'=>'简装修','value'=>'4'],
        '5'         =>  ['key'=>'毛坯','value'=>'5'],
    ],

    // 朝向
    'orientation'   =>  [
        '0'         =>  ['key'=>'南北','value'=>'0'],
        '1'         =>  ['key'=>'南','value'=>'1'],
        '2'         =>  ['key'=>'东南','value'=>'2'],
        '3'         =>  ['key'=>'东','value'=>'3'],
        '4'         =>  ['key'=>'西南','value'=>'4'],
        '5'         =>  ['key'=>'北','value'=>'5'],
        '6'         =>  ['key'=>'西','value'=>'6'],
        '7'         =>  ['key'=>'东西','value'=>'7'],
        '8'         =>  ['key'=>'东北','value'=>'8'],
        '9'         =>  ['key'=>'西北','value'=>'9'],
    ],


];
