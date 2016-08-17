var numberFeedPerPage = 80;
(function(){
  var dc = document, iThis = parseInt(getparameter('page')||0)||0;
  var n = parseInt(numberFeedPerPage||0)||0, sT = Math.ceil(n/50);
  for(var i=1;i<=sT;i++){
    dc.write('<script type="text/javascript" src="/api/read/json?start='+(iThis?((iThis*50)-49):1)+'&num='+(n?(n-((i-1)*50)):50)+'"></script>');
    dc.write('<script type="text/javascript">runTumblrJson(tumblr_api_read,av2u_feedSetting);</script>');
  }
})();
