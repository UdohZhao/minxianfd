$(function(){

// fileinput控件
$("#avatar-1").fileinput({
    theme: 'fa',
    language: 'zh',
    overwriteInitial: true,
    maxFileSize: 1500,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<i class="fa fa-folder-open"></i>',
    removeIcon: '<i class="fa fa-remove"></i>',
    removeTitle: '重新选择头像',
    elErrorContainer: '#kv-avatar-errors-1',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/static/assets/default/uploads/default_avatar_male.jpg" alt="你的头像">',
    layoutTemplates: {main2: '{preview} {remove} {browse}'},
    allowedFileExtensions: ["jpg", "jpeg", "png", "gif"]
});


// 验证表单
$('#HmCounselorForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        head_portrait: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {
                    message: "<span style='color:red;'>请上传头像！</span>"
                }
            }
        },
        cname: {
            validators: {
                notEmpty: {
                    message: '姓名不能为空！'
                }
            }
        },
        telephone: {
            validators: {
                notEmpty: {
                    message: '电话号码不能为空！'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {
    // Prevent form submission
    e.preventDefault();

    // Ajax
    $("#HmCounselorForm").ajaxSubmit({
        dataType: 'json',
        success: function (res)
        {
            // if
            if (res.status == 0)
            {
                swal('成功提示',res.msg,'success');
                setTimeout("window.location='/admin/HmCounselor/index'",2000);
            }
            else
            {
                swal('错误提示',res.msg,'error');
            }
        },
        error: function (e)
        {
            console.log(e);
        }
    });

});


})

// 删除头像
function delAvatar(id,head_portrait)
{
    swal({
      title: '确定删除吗？',
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
            url: '/admin/HmCounselor/delAvatar?id='+id,
            data: {head_portrait:head_portrait},
            dataType: 'JSON',
            success: function(res)
            {
                // if
                if (res.status == 0)
                {
                    swal('成功提示',res.msg,'success');
                    setTimeout("window.location.reload();",2000);
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

