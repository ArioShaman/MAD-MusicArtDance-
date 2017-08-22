app.controller('CountriesCtrl', ['Country', 'action','$scope', function (Country, action, $scope) {
    var ctrl = this;
    // Код отработает только для  '/posts'
    action('index', function(){
      ctrl.countries = Country.query();
      //AmCharts.theme = AmCharts.themes.black;
      //console.log(AmCharts.theme);     
      $scope.selectCont;// = "text";
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
            });
            //$scope.selectCont = event.mapObject.title;
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
        if(clickL == false){
          var px2 = 30;
          
        }else{
            var px2 = 15;
            if(clickR == true){
              var px2 = 0;
            }
        };

        $('.my-container').css('width','calc(100% - ' + $('.in-right').width() +'px - '+ $('.in-left').width() +'px - '+px2+'px)');
      });

      clickR = false;
      $('.r-slide-btn').click(function(){
        $(".in-right").toggleClass('open'); 
        clickR = !clickR;
        if(clickR == false){
          var px = 30;
        }else{
          var px = 15;
        }
        
        $('.my-container').css('width','calc(100% - ' + $('.in-right').width() +'px - '+ $('.in-left').width() +'px - '+px+'px)');
        
      });


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