$(function(){


})

// 查看详情
function viewDetails(id)
{
    window.open('/admin/HmLandlordRent/viewDetails?id='+id);
}

// flag
function flag(id,type)
{
    // status
    var title = '';
    var text = '';
    if (type == 1)
    {
        title = '确认展示吗？';
        text = '确认后将在小程序展示！';
    }
    else
    {
        title = '确认隐藏吗？';
        text = '确认后小程序将无法展示！';
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
        type: 'POST',
        url: '/admin/HmLandlordRent/flag?id='+id,
        data: {type:type},
        dataType: 'JSON',
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


