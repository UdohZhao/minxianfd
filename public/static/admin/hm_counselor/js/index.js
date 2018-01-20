$(function(){

})

// 修改
function modif(id)
{
    window.location.href = '/admin/HmCounselor/add?id='+id;
}

// 删除
function del(id,head_portrait)
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
        type: 'POST',
        url: '/admin/HmCounselor/del?id='+id,
        data: {head_portrait:head_portrait},
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
        title = '确认弃用吗？';
        text = '弃用后该顾问将不再显示！';
    }
    else
    {
        title = '确认启用吗？';
        text = '启用后该顾问将正常显示！';
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
        url: '/admin/HmCounselor/freeze',
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

