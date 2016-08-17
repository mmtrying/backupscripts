var numberFeedPerPage = 80;
(function(){
  var iThis = parseInt(getparameter('page')||0)||0;
  var sT = Math.ceil((parseInt(numberFeedPerPage||0)||0)/50);
  var n = parseInt(numberFeedPerPage||0)||0;
  for(var i=1;i<=sT;i++){
    document.write('<script type="text/javascript" src="/api/read/json?start='+(iThis?((iThis*50)-49):1)+'&num='+(n?(n-((i-1)*50)):50)+'"></script>');
    runTumblrJson(tumblr_api_read,av2u_feedSetting);
  }
})();
