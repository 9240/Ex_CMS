$(function(){
  //导航选中
  var nav = ["/",'news','product','partner','investor','corporateCulture','about']
  if(location.pathname.length == 1){
    $(".navbar .navbar-nav li").eq(0).css("border-bottom","3px solid #0303ec")
  }else{
    console.log(location.pathname.split('/')[1])
    $(".navbar .navbar-nav li").eq(nav.indexOf(location.pathname.split('/')[1])).css("border-bottom","3px solid #0303ec")
  }
  //内容高度不够时的处理
  function winSize(){
    if($(window).height()>($("body > .container-fluid").first().height()+$("body > .bg-muted").height()+$("body > .bg-footer").height())){
      $("body > .bg-muted").height($(window).height()-$("body > .container-fluid").first().height()-$("body > .bg-footer").height()-16)
    }
  }
  winSize()
  $(window).resize(function () {
    winSize()
  });
  // $(".nav-item").hover(function () {
  //     // over
  //     $(this).css("border-bottom","3px solid #0303ec")
  //   }, function () {
  //     // out
  //     console.log($(this)[0])
  //     console.log($(".navbar .navbar-nav li")[nav.indexOf(location.pathname.split('/')[1])])
  //     if($(".navbar .navbar-nav li")[nav.indexOf(location.pathname.split('/')[1])] == undefined){
  //       $(this).css("border-bottom","3px solid #fff")
  //     }else if($(this)[0] !== $(".navbar .navbar-nav li")[nav.indexOf(location.pathname.split('/')[1])]){
  //       $(this).css("border-bottom","3px solid #fff")
  //     }
  //   }
  // );
})


