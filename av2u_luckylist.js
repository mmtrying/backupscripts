
//Random Post Widget setting
var rdmpwPageSetting = {
  blog_domain_url: 'http://av-2u.blogspot.com',
  list_item_class_name: 'text notpage',
  list_item_container_class_name: 'post-wrapper',
  start_index: 1,
  post_limit: 2,
  show_thumbnail: false,
  show_title: false,
  show_postcontent: true,
  show_postdate: false,
  show_comments: false,
  show_more: false,
  show_more_text: 'More &#187;',
  show_separator: false,
  show_category: false,
  post_textlength: 99999,
  post_order: 'random'
}

var $randomStaticPageIndex=1, $randomStaticPageArray=null, $randomStaticPageTotal=0;

function randompagepostwidget(json){
  var $pv = document.getElementById('staticpost');
  var $pg = document.getElementById('staticfooter');
  if($pv){
    runJsonInScript(json,rdmpwPageSetting,'',parseInt(json.feed.openSearch$startIndex.$t)||0,$pv);
    if($pg&&$randomStaticPageTotal<=$randomStaticPageIndex){
      $pg.innerHTML='<center><span style="background:#333"> -- 介紹完畢 -- </span></center>';
    } else if($pg){
      $pg.innerHTML='<a href="javascript:initialrandompagepost()"> &#9660; 載入更多介紹 &#9660; </a>';
    }
  }
}

function initialrandompagepost(json){
  if(!($randomStaticPageArray instanceof Array)){
    $randomStaticPageTotal = parseInt(json.feed.openSearch$totalResults.$t)||0;
    $randomStaticPageArray=[];
    for(var rpi = 0; rpi<=$randomStaticPageTotal-1; rpi++){
      $randomStaticPageArray[rpi] = rpi+1;
    };$randomStaticPageArray.sort(function (){return Math.random()-0.5;});
    var postnumber = Math.min($randomStaticPageTotal,rdmpwPageSetting.post_limit+$randomStaticPageIndex-1);
    for(var pni = $randomStaticPageIndex-1; pni < postnumber; pni++){
      document.write('<script type=\"text/javascript\" src=\"'+rdmpwPageSetting.blog_domain_url+'/feeds/posts/default?orderby=published&alt=json-in-script&max-results=1&start-index='+$randomStaticPageArray[pni]+'&callback=randompagepostwidget"><\/script>');
      $randomStaticPageIndex += 1;
    }
  } else {
    var $pv = document.getElementById('staticpost');
    if($pv){
      var $pg = document.getElementById('staticfooter');
      if($pg){ $pg.innerHTML='<center><img src="http://farm6.staticflickr.com/5484/14074227287_46821de445_o.gif"/></center>'; }
    }
    var $s=[];
    var postnumber = Math.min($randomStaticPageTotal,rdmpwPageSetting.post_limit+$randomStaticPageIndex-1);
    for(var pni = $randomStaticPageIndex-1; pni < postnumber; pni++){
      $s[pni]=document.createElement('script');
      document.body.appendChild($s[pni]);
      $s[pni].type='text/javascript';
      $s[pni].src=rdmpwPageSetting.blog_domain_url+'/feeds/posts/default?orderby=published&alt=json-in-script&max-results=1&start-index='+$randomStaticPageArray[pni]+'&callback=randompagepostwidget';
      $randomStaticPageIndex += 1;
    }
  }
}

(function(){
document.write('<script type=\"text/javascript\" src=\"'+rdmpwPageSetting.blog_domain_url+'/feeds/posts/default?alt=json-in-script&max-results=0&callback=initialrandompagepost"><\/script>');
})();
