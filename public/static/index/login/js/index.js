$(function(){

$('#loginForm').bootstrapValidator({
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
                },
                /*remote: {
                    url: 'remote.php',
                    message: 'The username is not available'
                },*/
                regexp: {
                    regexp: /^[a-zA-Z0-9_\.]+$/,
                    message: '用户名只能由字母，数字，点和下划线组成！'
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: '密码不能为空！'
                }
            }
        },
        code: {
            validators: {
                notEmpty: {
                    message: '验证码不能为空！'
                },
                remote: {
                    url: '/admin/Login/captcha',
                    message: '验证码错误！',
                    delay :  2000,
                    type: 'POST'
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
    }, 'json');
});


})

