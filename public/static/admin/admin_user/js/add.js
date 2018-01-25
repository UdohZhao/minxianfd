$(function(){

$('#AdminUserForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        username: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {
                    message: '用户名不能为空！'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: '用户名必须大于6，小于30个字符！'
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: '密码不能为空！'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: '密码必须大于6，小于30个字符！'
                },
                identical: {
                    field: 'rePassword',
                    message: '两次输入的密码不相符！'
                }
            }
        },
        rePassword: {
            validators: {
                notEmpty: {
                    message: '密码不能为空！'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: '密码必须大于6，小于30个字符！'
                },
                identical: {
                    field: 'password',
                    message: '两次输入的密码不相符！'
                }
            }
        }
    }
}).on('success.form.bv', function(e) {
    // Prevent form submission
    e.preventDefault();

    // Get the form instance
    var $form = $(e.target);

    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');

    // Use Ajax to submit form data
    $.post($form.attr('action'), $form.serialize(), function(result) {
        console.log(result);
        // if
        if (result.status == 0)
        {
            swal("成功提示", result.msg,"success");
            setTimeout("window.location='/admin/AdminUser/index'",2000);
        }
        else
        {
            swal("错误提示", result.msg,"error");
        }
    }, 'json');
});


})

