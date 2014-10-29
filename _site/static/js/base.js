(function(){
    $('body').on('click', '.btn', function(e){
        var $self = $(this);
        if($self.attr('href') && ($self.attr('href').indexOf('javascript') === 0 || $self.attr('href').indexOf('#') === 0)) {
            e.preventDefault();
        }
    });


    $('body').on('click', '.nav>li>a', function(e){

        var $self = $(this);
        var $li = $self.parent();
        var $nav = $self.closest('.nav');
        var $current = $nav.find('li.open');
        
        if($self.attr('href').indexOf('javascript') < 0){
            return;
        }
        if(!$li.hasClass('open')) {
            $current.toggleClass('open');
        }
        $li.toggleClass('open');
    });

    $('body').on('click', '.btn-group-switch', function(e){
        var $self = $(this);

        var $input = $self.find('input[type=hidden]');

        var on = $self.hasClass('btn-group-switch-on');
        var removeCls = 'btn-group-switch-off';
        var addCls = 'btn-group-switch-on';
        var value = 1;
        if(on) {
            removeCls = 'btn-group-switch-on';
            addCls = 'btn-group-switch-off';
            value = 0;
        }
        
        $self.removeClass(removeCls);
        $self.addClass(addCls);
        $input.val(value)

        $(document).trigger('switchChange', [$self, value]);
    });

    $(document).on('switchChange', function(evt, switcher, value){
        console.log(switcher, value);
    });


    angular.module('QZ', [])
    .controller('newCtrl', ['$scope', function($scope) {
        $scope.quanzi = {
            name: '',
            avatar: '',
            description: '',
            shortcut: ''
        };
      }])
    .controller('editCtrl', ['$scope', function($scope) {
        $scope.quanzi = window.quanzi;
      }])
    .controller('newArticleController', ['$scope', function($scope) {
        $scope.article = {};
      }])
    .controller('editArticleController', ['$scope', function($scope) {
        $scope.article = window.article;
      }])
    ;
})();