app.controller('CountriesCtrl', ['Country', 'action','$scope', function (Country, action, $scope) {
    var ctrl = this;
    action('index', function(){
      $scope.countries = Country.query();
      console.log($scope.countries);
      
      $scope.selectCont;
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
            console.log(event.mapObject.title);
            $scope.$apply(function() {
              $scope.selectCont = event.mapObject.title;
              $scope.selectIs = true;
            });
          }
        }],

        smallMap: {}
      });


      $('#mapdiv').click(function(event){
        console.log($scope.selectCont);
      });

      
      clickL = false;
      $('.l-slide-btn').click(function(){
        $(".in-left").toggleClass('open');
        clickL = !clickL;

        $('.my-container').css('width','calc(100% - ' + ($('.in-left').width() + 15) +'px)');
      });
      
      $( "#slider" ).slider({
        value : 2017,//Значение, которое будет выставлено слайдеру при загрузке
        min : 1964,//Минимально возможное значение на ползунке
        max : 2017,//Максимально возможное значение на ползунке
        step : 1,//Шаг, с которым будет двигаться ползунок
        create: function( event, ui ) {
          val = $( "#slider" ).slider("value");//При создании слайдера, получаем его значение в перемен. val
            $( "#contentSlider" ).html( val );//Заполняем этим значением элемент с id contentSlider
          },
          slide: function( event, ui ) {
              $( "#contentSlider" ).html( ui.value );//При изменении значения ползунка заполняем элемент с id contentSlider
          }
      });

      $scope.click = false;

      $scope.clicker = function(){
        $scope.click = !$scope.click;
        if($scope.click == true){
          console.log($('.m-hidden'));
        };
        $('.hid').toggleClass('hidden');
        $('.pause').toggleClass('un-pause');
        console.log('click');
      };
      $scope.song = new Audio();
      var sing;
      $scope.pauseBtn = false;

      $scope.play = function(url,singName){
        console.log(singName);
        if(sing != singName){
          $scope.song.src = url;
          $scope.song.controls = true
          $scope.song.play();
          sing = singName;
          //$scope.song.addEventListener('loadedmetadata', function() {
            //console.log("Playing " + $scope.song.src + ", for: " + $scope.song.duration + "seconds.");
            //$scope.long.dur = $scope.song.duration;
            //console.log($scope.song.duration);
          //});
          //$('#show').attr('max') = $scope.song.duration;
        }else{
          $scope.song.play();
        };
        console.log($scope.song.duration);
        console.log('play');
        $scope.pauseBtn = true;
      };

      $scope.pause = function(url){
        console.log($scope.song.duration);
        console.log('pause');
        $scope.song.pause();
        $scope.pauseBtn = false;
        console.log($scope.song.duration);
      };

      ctrl.line;
      $scope.linebar = function(item){
        //console.log(ctrl.line);
        //console.log($('#show').attr('max'));
        };
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

    /action('some_method', function(){
      //
    })

  }])