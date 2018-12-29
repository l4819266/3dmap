$(function () {
  $("#baselayerContainer div").click(function () {
    $(this).addClass("selected").siblings().removeClass("selected");
    var baseType = $(this).attr("data-type");
    MapViewer.switchBaseLayer(baseType);
  });
});