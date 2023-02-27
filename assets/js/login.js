$(function () {

    // 点击去注册链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })


    // 点击去登陆链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 自定义校验规则 通过form.verify函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到的是确认密码内容
            // 还需要拿到密码框的内容
            // 然后进行一次相等的判断
            // 如果判断框失败，则return一个提示消息就可以
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1阻止默认的提交行为
        e.preventDefault();
        // var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        // 2、发起Ajax的post请求
        $.post('/api/reguser', $(this).serialize(), function (res) { //#form_reg [name=password]中间一定要有空格
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟人的点击行为
            $('#link_login').click();
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获得表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功!')
                // 在登陆成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转成功
                location.href = 'index.html'

            }
        })
    })


})





