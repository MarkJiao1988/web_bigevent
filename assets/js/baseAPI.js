// 注意每次调用$.get()或$.post()或$.ajax()会先调用这个函数$.ajaxPrefilter()
// 这个函数会拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

})