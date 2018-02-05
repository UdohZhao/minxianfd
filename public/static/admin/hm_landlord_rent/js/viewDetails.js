$(function(){

})

// 审核
function viewDetailsCheck(id,hm_promotion_id,day,type,status)
{

    var title;
    var text;
    if (status == 2)
    {
        title = '确认审核通过吗？';
        text = '如果用户申请了置顶推广，[起始时间]为当前审核通过时间，[结束时间]为用户购买的天数累加！请给用户备注审核通过原因！';
    }
    else
    {
        title = '确认审核不通过吗？';
        text = '请给用户备注审核未通过原因！';
    }

    // 置顶推广未付款
    if (hm_promotion_id !=0 || type == 0)
    {
        title = '该用户置顶推广类型为[未付款]，确认审核通过吗？'
    }

    // swal
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定',
    }).then(function(){

      // 动态取值
      var msg = $("#msg").val();
      if (msg == false)
      {

        swal('错误提示','审核原因不能为空！','error');

      }
      else
      {

          // Ajax
          $.ajax({
            type: 'POST',
            url: '/admin/HmLandlordRent/viewDetailsCheck?id='+id,
            data: {hm_promotion_id:hm_promotion_id,day:day,status:status,msg:msg},
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

      }

    })
}

