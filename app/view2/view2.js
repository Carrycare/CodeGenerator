'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$scope","$location",function($scope,$location) {
    $scope.init=function(){
      layui.use(['form', 'layedit', 'laydate'], function(){
        var element=layui.element;
        var form = layui.form
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate;

        //日期
        laydate.render({
          elem: '#date'
        });
        laydate.render({
          elem: '#date1'
        });

        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');

        //自定义验证规则
        form.verify({
          title: function(value){
            if(value.length < 5){
              return '标题至少得5个字符啊';
            }
          }
          ,pass: [/(.+){6,12}$/, '密码必须6到12位']
          ,content: function(value){
            layedit.sync(editIndex);
          }
        });

        //监听指定开关
        form.on('switch(switchTest)', function(data){
          layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
            offset: '6px'
          });
          layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
        });

        //监听提交
        form.on('submit(demo1)', function(data){
          layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
          })
          return false;
        });

        element.render();
        form.render();
        laydate.render();
      });
    }

    $scope.toView1= function () {
      $location.path("/view1");
    }
}]);