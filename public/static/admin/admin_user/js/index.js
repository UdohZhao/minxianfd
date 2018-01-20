$(function(){

})

// 修改
function modif(id)
{
    window.location.href = '/admin/AdminUser/add?id='+id;
}

// 删除
function del(id)
{
    swal({
      title: '确认删除吗？',
      text: '你将无法恢复它！',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
    }).then(function(){
      // Ajax
      $.ajax({
        type: 'GET',
        url: '/admin/AdminUser/del',
        data: {id:id},
        dataType: 'json',
        success: function(res)
        {
            // if
            if (res.status == 0)
            {
                swal('成功提示',res.msg,'success');
                setTimeout('window.location.reload();',2000);
            }
            else
            {
                swal('错误提示',res.msg,'error');
            }
        },
        error: function(e)
        {
          console.log(e);
        }
      });
    })
}

// 冻结||解冻
function freeze(id,status)
{
    // status
    var title = '';
    var text = '';
    if (status == 1)
    {
        title = '确认冻结吗？';
        text = '冻结后管理员无法正常登录！';
    }
    else
    {
        title = '确认恢复正常吗？';
        text = '恢复正常后管理员将正常登录！';
    }
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
    }).then(function(){
      // Ajax
      $.ajax({
        type: 'GET',
        url: '/admin/AdminUser/freeze',
        data: {id:id,status:status},
        dataType: 'json',
        success: function(res)
        {
            // if
            if (res.status == 0)
            {
                swal('成功提示',res.msg,'success');
                setTimeout('window.location.reload();',2000);
            }
            else
            {
                swal('错误提示',res.msg,'error');
            }
        },
        error: function(e)
        {
          console.log(e);
        }
      });
    })
}

