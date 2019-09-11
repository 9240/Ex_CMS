$(function(){
  $("#logout").click(function(){
    document.cookie.split("; ").forEach(item=>{
      document.cookie = item.split("=")[0] + '=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    })
    location.href = '/'
  })
  $("#sideNav a").click(function(){
    $("#content a").hide();
    $(`[name='${$(this).attr("href").split("#")[1]}']`).show()
    $(this).siblings().removeClass("active")
    $(this).addClass("active")
  })
  $("#sideNav a").first().click();
})