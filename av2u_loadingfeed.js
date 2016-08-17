var numberFeedPerPage = 80;

//add '<script type="text/javascript" src="/api/read/json?start=1&num=0"></script>' before this script
var $json = tumblr_api_read;

//unknown item
var $feeds = $json?(typeof $json.tumblelog=='undefined'?null:($json.tumblelog.feeds||null)):null;
if($feeds){
  if($feeds.length>0){
    var $tempfeeds = '';
    for(var $rIdx=0;$rIdx<$feeds.length;$rIdx++){
      if($rIdx>0) $tempfeeds += ', ';
      $tempfeeds += $feeds[$rIdx]||'';
    }; $feeds = $tempfeeds; $tempfeeds = null;
  } else {
    $feeds='';
  }
}

//Site Info
var $title = $json?(typeof $json.tumblelog=='undefined'?null:($json.tumblelog.title||null)):null;
var $description = $json?(typeof $json.tumblelog=='undefined'?null:($json.tumblelog.description||null)):null;
var $name = $json?(typeof $json.tumblelog=='undefined'?null:($json.tumblelog.name||null)):null;
var $timezone = $json?(typeof $json.tumblelog=='undefined'?null:($json.tumblelog.timezone||null)):null;
var $domain = $json?(typeof $json.tumblelog=='undefined'?null:($json.tumblelog.cname||null)):null;

//Post Info
var $indexbegin = $json?parseInt($json['posts-start']||0):null;
var $totalpost = $json?parseInt($json['posts-total']||0):null;
var $blogtype = $json?($json['posts-type']||false):null;


(function(){
  var dc = document, iThis = parseInt(getparameter('page')||0)||0;
  var n = parseInt(numberFeedPerPage||0)||0, sT = Math.ceil(n/50);
  for(var i=1;i<=sT;i++){
    dc.write('<script type="text/javascript" src="/api/read/json?start='+(iThis?((iThis*50)-49):1)+'&num='+(n?(n-((i-1)*50)):50)+'"></script>');
    dc.write('<script type="text/javascript">runTumblrJson(tumblr_api_read,av2u_feedSetting);</script>');
  }
})();
