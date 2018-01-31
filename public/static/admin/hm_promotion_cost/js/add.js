$(function(){

$('#HmPromotionCostForm').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        day: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {
                    message: '推广天数不能为空！'
                },
                digits: {
                    message: '该值只能包含数字！'
                }
            }
        },
        cost: {
            message: 'The username is not valid',
            validators: {
                notEmpty: {
                    message: '对应费用不能为空！'
                },
                regexp: {
                    regexp: /^\d+(\.\d+)?$/,
                    message: '该值只能包含整数或者小数！'
                }
            }
        },
        sort: {
            validators: {
                notEmpty: {
                    message: '排序不能为空！'
                },
                digits: {
                    message: '该值只能包含数字！'
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
    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: $form.serialize(),
      dataType: 'JSON',
      success: function (result) {
        // if
        if (result.status == 0)
        {
            swal("成功提示", result.msg,"success");
            setTimeout("window.location='/admin/HmPromotionCost/index'",2000);
        }
        else
        {
            swal("错误提示", result.msg,"error");
        }
      },
      error: function (e) {
        console.info(e);
      }
    });
});


})

