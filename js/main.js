Cesium.BingMapsApi.defaultKey =
  "ArucOjRQCPXY7qrklhKLCkWG2M8JVDdSM8-1YcfjjJDDFHpNqwCiiTXo76-Sgjy4";
  var viewer = new Cesium.Viewer('cesiumContainer',{
    animation:false,       //是否显示动画控件
    homeButton:true,       //是否显示home键
    //geocoder:false,         //是否显示地名查找控件        如果设置为true，则无法查询
    baseLayerPicker:false, //是否显示图层选择控件
    timeline:false,        //是否显示时间线控件
    fullscreenButton:true, //是否全屏显示
    scene3DOnly:true,     //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    infoBox:true,         //是否显示点击要素之后显示的信息
    sceneModePicker:false,  //是否显示投影方式控件  三维/二维
    navigationInstructionsInitiallyVisible:false,
    navigationHelpButton:false,     //是否显示帮助信息控件
    selectionIndicator:false        //是否显示指示器组件
});  
viewer.imageryLayers.removeAll();    
/* //SuperMap的POI服务来替代    中文检索          高德和谷歌检索收费，这里采用supermap没有什么意义
var geocoder = viewer.geocoder.viewModel;
geocoder._searchCommand=Cesium.createCommand(function(){
  if (geocoder.isSearchInProgress){cancelGeocode(geocoder);}
  else {geocoder(geocoder);}
});  */
    //添加cesium地形图层
var terrainLayer = new Cesium.CesiumTerrainProvider({
  url: "https://www.supermapol.com/iserver/services/3D-stk_terrain/rest/realspace/datas/info/data/path/", // 默认立体地表
    // 请求照明
   // requestVertexNormals: true,
    // 请求水波纹效果
   // requestWaterMask: true
  });
viewer.terrainProvider = terrainLayer;


var GoogleMap = new Cesium.ImageryLayer(new Cesium.UrlTemplateImageryProvider({
  url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"    //谷歌影像  	
        }));
viewer.imageryLayers.add(GoogleMap);   


viewer._cesiumWidget._creditContainer.style.display = "none";  //	去除版权信息
/*viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({   //调用影响中文注记服务
  url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
  layer: "tdtAnnoLayer",
  style: "default",
  format: "image/jpeg",
  tileMatrixSetID: "GoogleMapsCompatible",
  show: false
}));*/
debugger;

//加载gltf格式数据到cesium   
var scene=viewer.scene;     
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(  
      Cesium.Cartesian3.fromDegrees(110.62898254394531, 40.02804946899414, 1210.0));        //gltf数据加载位置
var model = scene.primitives.add(Cesium.Model.fromGltf({  
   url : 'modeldata/daedata.gltf',        //如果为bgltf则为.bgltf     
   modelMatrix : modelMatrix,  
   scale : 3.0     //放大倍数
 }));     
viewer.camera.flyTo({  
    destination : Cesium.Cartesian3.fromDegrees(110.62898254394531, 40.02804946899414, 6000.0)     //相机飞入点
}); 