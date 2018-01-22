$(function(){

})

// 修改
function modif(id)
{
    window.location.href = '/admin/HmLeaseManner/add?id='+id;
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
        url: '/admin/HmLeaseManner/del',
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

