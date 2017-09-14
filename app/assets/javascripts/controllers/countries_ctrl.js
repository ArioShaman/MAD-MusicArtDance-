app.controller('CountriesCtrl', ['Country', 'action','$timeout','$scope','Auth', function (Country, action,$timeout, $scope,Auth) {
    var ctrl = this;
    action('index', function(){
      //Да я знаю, что функционал писать в контроллере это плохо,
      //но еще отдельно использовать фабрику мне не по душе
      //Где же тогда концепция единого кода?

      $scope.countries = Country.query();


      $scope.selectCont = "Not choosing";
      $scope.selectIs = false;
      var map = AmCharts.makeChart("mapdiv", {
        "type": "map",
        "theme":"black",


        dataProvider: {
          map: "worldLow",
          getAreasFromMap: true,

        },

        areasSettings: {
          autoZoom: true,
          selectedColor: "#2B1328",
          color: "#BF03BF",
          outlineColor:"000000"
        },
        listeners: [ {
        "event": "clickMapObject",
          "method": function( event ) {
            $scope.$apply(function() {
              $scope.selectCont = event.mapObject.title;
              $scope.selectIs = true;
            });
          }
        }],

        smallMap: {}
      });

      
      clickL = false;
      $('.l-slide-btn').click(function(){
        $(".in-left").toggleClass('open');
        clickL = !clickL;

        $('.my-container').css('width','calc(100% - ' + ($('.in-left').width() + 15) +'px)');
      });
      
      $( "#slider" ).slider({
        value : 2017,
        min : 1964,
        max : 2017,
        step : 1,
        create: function( event, ui ) {
          val = $( "#slider" ).slider("value");//При создании слайдера, получаем его значение в перемен. val
            $( "#contentSlider" ).html( val );//Заполняем этим значением элемент с id contentSlider
            $scope.selYear = val;
          },
          slide: function( event, ui ) {
            $( "#contentSlider" ).html( ui.value );//При изменении значения ползунка заполняем элемент с id contentSlider
            $scope.$apply(function() {
              $scope.selYear = ui.value;
            });
          }
          //побаловаться со стилями а то выглядит калично
      });

      $scope.click = false;

      $scope.clicker = function(){
        $scope.click = !$scope.click;
        if($scope.click == true){
          //console.log($('.m-hidden'));
        };
        $('.hid').toggleClass('hidden');
        $('.pause').toggleClass('un-pause');
      };
      $scope.song = new Audio();
      $scope.sing;
      $scope.pauseBtn = false;

      $scope.play = function(url,singName){
        var dur;
        if($scope.sing != singName){
          $scope.song.pause();
          //$scope.song = $scope.$apply.song;
          $scope.song.src = url;//лучше чем создавать новое аудио я придумал ток менять ссылку на песню, не баг, а фича
          $scope.sing = singName;
          $scope.$evalAsync(function() {
              $scope.song.src = url;
            },$scope.song);
          
          //Если ты изменишь что-то в этом коде, небеса обрушатся на твою голову!
          $scope.song.addEventListener('loadedmetadata', function() {
            $scope.song.play();
            $timeout(10);
            //Когда я писал эту функцию,чтобы работала без бага. 
            //Только Бог и я понимали, что онa означает. 
            //Теперь понимает только Бог.
          });
          $scope.pauseBtn = true;
        }else{
        
          $scope.song.play();
          $scope.pauseBtn = true;
        };
        
      };
      ctrl.curTime;
      $scope.song.addEventListener('timeupdate', function() {
        $scope.$apply(function() {
          ctrl.curTime = Math.round($scope.song.currentTime);
        });
      });
      $scope.pause = function(url){
        $scope.song.pause();
        $scope.pauseBtn = false;
      };

      ctrl.line;
      $scope.linebar = function(item){
        $scope.song.currentTime = ctrl.curTime;
      };

      $scope.repeat = function(){
        $scope.song.loop = !$scope.song.loop
        if($scope.song.loop == true){
          $('.repeat-btn').toggleClass('repeat-active');
        }
      };
      $scope.mute = function(){
        $scope.song.muted = !$scope.song.muted;
        if($scope.song.muted = true){
          $('.mute-btn').toggleClass('mute-active');
        }
      };
      $scope.showTime = function(time){
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        if(seconds < 10){
          var strSec = '0'+seconds;
        }else{
          var strSec = seconds;
        };
        if(minutes < 10){
          var strMin = '0'+minutes;
        }else{
          var strMin = minutes;
        };
        var string = ''+strMin+':'+strSec+'';
        return string;
      }
      //var v = document.getElementsByTagName("video")[0];
    });

    // Вызовется для паттерна '/posts/:id'
    action('show', function (params){
      ctrl.country = Country.get({id: params.id});
    });

    // Только для '/posts/new'
    action('new', function(){
      ctrl.country = Country.new();
      // Присваивание каллбека создания, который будет вызван автоматически при сабмите формы. См. ниже.
      ctrl.save = Country.create;
    });

    action('edit', function (params){
      ctrl.country = Country.edit({id: params.id});
      ctrl.save = Country.update;
    })

    action(['edit', 'new'], function(){
      //
    })

    action(['index', 'edit', 'show'], function () {
      ctrl.destroy = function (country) {
        Country.destroy({id: country.id}, function () {
          ctrl.countries = _.select(ctrl.countries, function (_country) {
            return _country.id != country.id
          })
        })
      }
    })

    action('some_method', function(){
      //
    })

  }])