//Updated Post Widget page setting
var pbhpwPageSetting = {
  blog_domain_url: 'http://av-2u.blogspot.com',
  list_item_class_name: 'text notpage',
  list_item_container_class_name:  'post-wrapper',
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
  post_order: 'published'
}

var $staticPageIndexRecord = [0,0];
var $staticPageListHeight = 0;


function getStaticListingPageIndex(){
    var u = document.URL, iQ = '#staticpageindex-', iL = iQ.length;
    if(u.indexOf('#staticpageindex-')!=-1){
        var v = u.substr(u.lastIndexOf(iQ)+iL), n=0;
        for(var i=0;i<v.length;i++){
            if(isNaN(v.substr(i,1))) break;
            n+=1;
        }
        if(n==0){
            return 1;
        }else{
            return parseInt(v.substr(0,n))||1;
        }
    } else {
        return 1;
    }
}



function createStaticPagePagination(json){
    var $pg = document.getElementById('staticfooter');
    if($pg){
          var totalpage = Math.ceil((parseInt(json.feed.openSearch$totalResults.$t)||0)/pbhpwPageSetting.post_limit);
          var idx = getStaticListingPageIndex();
          var cpData = calculatePage(idx,totalpage,pbhpwPageSetting.post_limit);
          $staticPageIndexRecord[0] = idx;

          var h ='<div id="pagination">';
          h+='<div class="controlpager">';
          h+='<span>';
          if(totalpage>0){
            h+='<span class="infopage">&#31532;'+idx+'&#38913;</span> ';
            if(idx>1){h+='<a class="sidepage" title="&#19978;&#19968;&#38913;" href="#staticpageindex-'+(idx-1)+'" onclick="rssFeedCallBack('+(idx+1)+')">' +pageNaviConf.prevText+'</a>'}
            if(cpData[0]>1){h+='<a class="gotopage" href="#staticpageindex-1" onclick="rssFeedCallBack(1)">1</a>'}
            h+=(cpData[0]>2)?'<span class="pagegap">&hellip;</span>':'';
            for(var pi=cpData[0];pi<=cpData[1];pi++){
              if(pi>0){
                if(pi==idx){
                  h+='<span class="currentpage">'+pi+'</span>';
                }else{ h+='<a class="gotopage" href="#staticpageindex-'+pi+'" onclick="rssFeedCallBack('+pi+')">'+pi+'</a>'; }
              }
            }
            h+=(cpData[1]<totalpage-1)?('<span class="pagegap">&hellip;</span>'):'';
            if(cpData[1]<totalpage){h+='<a class="gotopage" href="#staticpageindex-'+totalpage+'" onclick="rssFeedCallBack('+totalpage+')">'+totalpage+'</a>'}
            if(idx<totalpage){h+='<a class="sidepage" title="&#19979;&#19968;&#38913;" href="#staticpageindex-'+(idx+1)+'" onclick="rssFeedCallBack('+(idx+1)+')">' +pageNaviConf.nextText+'</a>'}
          }
          h+='</span>';
          h+='</div>';
          h+='<div class="directpager"><span><span id="directentrydescription">跳頁:</span><input id="directentrypage" type="text" size="3" onkeypress="return onlyNumber(event||window.event)" onpaste="returnNumber(this)" onfocus="returnNumber(this)" onkeyup="var $v=this.value;if($v!=&quot;&quot;&&($v<=0||$v>'+totalpage+')){this.style.backgroundColor=&quot;red&quot;}else{this.style.backgroundColor=&quot;white&quot;}" value="'+(idx||'?')+'"/><a id="directentrylink" href="javascript:void(0)" onclick="var $d=document; var $v=parseInt(document.getElementById(&quot;directentrypage&quot;).value)||0;if($v!=&quot;&quot;&&$v>0&&$v<='+totalpage+'){this.href=&quot;#staticpageindex-&quot;+$v;rssFeedCallBack($v);}"><input id="directentrybutton" type="reset" value="&#9658;"/></a><span id="directentryremark" title="** 如果按下頁「&#9658;」後沒有轉頁，表示所輸入的頁數無效或已超出了極限。煩請重新輸入，不便之處，敬請原諒！ **">(?)</span></span></div>';
          h+='</div>';
          $pg.innerHTML=h;
          $pg.style.height = 'auto';
    }
}



function rssFeedCallBack(i){
    var dc = document, uList = dc.getElementById('staticpost'); $staticPageIndexRecord[1] = i||1;
    var ThisIdx = $staticPageIndexRecord[0]||1, NextIdx = i||1;
    if(uList) uList.parentNode.id='staticpageindex-'+i;
    if(ThisIdx != NextIdx){
        var $pv = dc.getElementById('staticpost');
        if($pv){
            $pv.style.marginBottom = '0px';
            $pv.style.overflow = 'hidden';

            $staticPageListHeight = $pv.offsetHeight||$pv.clientHeight||0;
            if($staticPageListHeight) $pv.style.height = $staticPageListHeight+'px';

            var $pg = dc.getElementById('staticfooter');
            if($pg){
                var pgH = $pg.offsetHeight||$pg.clientHeight||0;
                if(pgH) $pg.style.height = pgH+'px';
                $pg.innerHTML='';
            }
            while($pv.firstChild) $pv.removeChild($pv.firstChild);
            $pv.style.backgroundPosition = 'center 20px';
        }
        var s=dc.createElement('script');
        dc.body.appendChild(s);
        s.type='text/javascript';
        s.src=pbhpwPageSetting.blog_domain_url+'/feeds/posts/default?orderby='+pbhpwPageSetting.post_order+'&alt=json-in-script&max-results=0&start-index=1&callback=addingstaticpagepost';
    }
}


function staticpagepostwidget(json){
  var $jL = parseInt(json.feed.openSearch$totalResults.$t)||0;
  var $pv = document.getElementById('staticpost');
  if($pv&&$jL>=pbhpwPageSetting.start_index){
    $pv.style.backgroundPosition = 'center -4000px';
    runJsonInScript(json,pbhpwPageSetting,'','',$pv);
    if($staticPageListHeight){
      $pv.style.height= 'auto';
      $pv.style.overflow = 'visible';
      $staticPageListHeight = 0;
    }
    createStaticPagePagination(json);
  }
}

function addingstaticpagepost($fakeJson){
    var $d = document;
    var $s=$d.createElement('script');
    $d.body.appendChild($s);
    $s.type='text/javascript';
    $s.src=pbhpwPageSetting.blog_domain_url+'/feeds/posts/default?orderby='+pbhpwPageSetting.post_order+'&alt=json-in-script&max-results='+pbhpwPageSetting.post_limit+'&start-index='+((pbhpwPageSetting.post_limit*((parseInt($staticPageIndexRecord[1])||1)-1))+pbhpwPageSetting.start_index)+'&callback=staticpagepostwidget';
}


window.onload = function(){
  var d = document, s = d.createElement('script');
  s.type = 'text/javascript';
  s.src = pbhpwPageSetting.blog_domain_url+'/feeds/posts/default?orderby='+pbhpwPageSetting.post_order+'&alt=json-in-script&max-results='+pbhpwPageSetting.post_limit+'&start-index='+((pbhpwPageSetting.post_limit*((parseInt(getStaticListingPageIndex())||1)-1))+pbhpwPageSetting.start_index)+'&callback=staticpagepostwidget';
  d.body.appendChild(s);
}
