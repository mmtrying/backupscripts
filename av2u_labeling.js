var numberFeedPerPage = 80;


var thisPageLabel = '';
(function(){
  var d = document, u = decodeURIComponent(d.URL);
  var a = (location||window.location).pathname;
  if(a.indexOf('/label')==0){
    if(u.indexOf('/label?=')!=-1){
      thisPageLabel = u.split('/label?=')[1];
      if(u.indexOf('&')!=-1) thisPageLabel = thisPageLabel.split('&')[0];
    }
  }
})();


//add '<script type="text/javascript" src="/api/read/json?start=1&num=0"></script>' before this script
var $json = tumblr_api_read;
var $totalpost = $json?parseInt($json['posts-total']||0):0;

(function(){
  if(thisPageLabel==''){
      dc.write('<div class="nolabel">Sorry! There is none of post found for the tag.</div>');
  }
  var dc = document, iThis = parseInt(getparameter('page')||1)||1;
  var n = parseInt(numberFeedPerPage||0)||0
  var r = $totalpost-(n*(iThis-1)), sT = Math.ceil(r/50);
  if(r>0){
    for(var i=1;i<=sT;i++){
      dc.write('<script type="text/javascript" src="/api/read/json?start='+(((iThis-1)*$totalpost)+((i-1)*50)+1)+'&num='+((r>i*50)?50:(r-((i-1)*50)))+(thisPageLabel?('&tagged='+thisPageLabel):'')+'"></script>');
      dc.write('<script type="text/javascript">runTumblrJson(tumblr_api_read,av2u_feedSetting);</script>');
    }
  } else {
    dc.write('<div>Sorry! No more page is existed. Please report to us for any problems.</div>');
  }
})();
