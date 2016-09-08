'use strict';

var _formatTime = require('./common/format-time');

var _main = require('./main');

//动态区域
function setDynamicHTML(opt) {
  return '<div class="title-content">' + '<img class="title-img" src="../images/a0.jpg">' + '<p class="title-name">' + opt.name + '</p>' + '<p class="title-time">' + opt.time + '</p>' + '<p class="title-text">' + opt.text + '</p>' + '</div>';
}

//首页

_main.myApp.controller('indexCtrl', function ($scope, server) {
  var $hideLi = $('.perfect-nav .hide-li');
  var $perfectPills = $('.perfect-pills');
  var tag = true;
  $hideLi.on('click', function (e) {
    if (tag) {
      $perfectPills.show();
      tag = false;
    } else {
      $perfectPills.hide();
      tag = true;
    }
  });
  server.post('/getDynamic', {}, function (err, result) {
    if (!err) {
      $.each(result.result, function (i, r) {
        var opts = {
          name: r.username,
          time: (0, _formatTime.formatDate)(r.creationDate),
          text: r.dynamic_text
        };
        $('.dynamic-eare').append(setDynamicHTML(opts));
      });
    }
  });
});

//发表动态

_main.myApp.controller('dynamicCtrl', function ($scope, server) {
  $scope.comment = function (e) {
    server.post("/comment", {
      'username': _username,
      'content': $scope.myDynamic,
      'date': new Date().getTime()
    }, function (err, data) {
      if (!err) {
        $('.dynamic-eare').empty();
        server.post('/getDynamic', {}, function (err, result) {
          if (!err) {
            $.each(result.result, function (i, r) {
              var opts = {
                name: r.username,
                time: (0, _formatTime.formatDate)(r.creationDate),
                text: r.dynamic_text
              };
              $('.dynamic-eare').append(setDynamicHTML(opts));
            });
          }
        });
      }
    });
  };
});