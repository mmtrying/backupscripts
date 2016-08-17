var numberFeedPerPage = 80;

//add '<script type="text/javascript" src="/api/read/json?start=1&num=0"></script>' before this script
var $json = tumblr_api_read;
var $totalpost = $json?parseInt($json['posts-total']||0):0;


(function(){
  var dc = document, iThis = parseInt(getparameter('page')||1)||1;
  var n = parseInt(numberFeedPerPage||0)||0
  var r = $totalpost-(n*(iThis-1)), sT = Math.ceil(r/50);
  if(r>0){
    for(var i=1;i<=sT;i++){
      dc.write('<script type="text/javascript" src="/api/read/json?start='+(((iThis-1)*$totalpost)+((i-1)*50)+1)+'&num='+((r>i*50)?50:(r-((i-1)*50)))+'"></script>');
      dc.write('<script type="text/javascript">runTumblrJson(tumblr_api_read,av2u_feedSetting);</script>');
    }
  } else {
    dc.write('<div>Sorry! No more page is existed. Please report to us for any problems.</div>');
  }
})();
