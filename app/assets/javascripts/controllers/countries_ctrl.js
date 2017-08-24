app.controller('CountriesCtrl', ['Country', 'action','$scope', function (Country, action, $scope) {
    var ctrl = this;
    // Код отработает только для  '/posts'
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
      /*$( "#slider2" ).slider({
        value : 1,
        min : 0,
        max : 10,
        step : 1,
        create: function( event, ui ) {
          val = $( "#slider2" ).slider("value");//При создании слайдера, получаем его значение в перемен. val
            consile.log( val );//Заполняем этим значением элемент с id contentSlider
          },
          slide: function( event, ui ) {
              console.log( ui.value );//При изменении значения ползунка заполняем элемент с id contentSlider
          }
      });*/
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
      $scope.song;
      console.log(typeof($scope.song));
      var sing;
      $scope.play = function(url,singName){
        console.log(singName);
        if(sing != singName){
          $scope.song = new Audio(url);
          console.log('false');
          $scope.song.play();
          sing = singName;
        }else{
          console.log('true');
          $scope.song.play();
        }
        
      };

      $scope.pause = function(url){
        console.log('pause');
        $scope.song.pause();
      };

      play = $('#play');
      pause = $('#pause');
      close = $('#close');
      //song = new Audio('http://ol3.mp3party.net/online/2596/2596384.mp3');
      //duration = song.duration;
      //song.type= 'audio/mpeg';
      //song.src= 'http://ol3.mp3party.net/online/2596/2596384.mp3';
      //song.play()
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

    // Для паттерна '/posts/:id/edit'
    action('edit', function (params){
      ctrl.country = Country.edit({id: params.id});
      // Аналогичное присваивание для каллбека обновления
      ctrl.save = Country.update;
    })

    // Общий код. Вызовется для двух методов edit и new.
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

    // Так же внутри ресурса routes.rb можно создать свой кастомный метод. Вызовется для: '/posts/some_method'
    action('some_method', function(){
      //
    })

    // etc
  }])