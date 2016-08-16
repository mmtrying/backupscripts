
var av2u_feedSetting = {
  list_item_class_name: '',
  append_to_ul_element: null,
  date_format: '[_year_]年&nbsp;[_month_]&nbsp;[_day2_]日&nbsp;([_weekday_])',
  //^string:: default as '<span class="fp-dateframe"><span class="fp-subject">Date</span>: <span class="fp-date">[_day2_]-[_month_]-[_year_]</span> (<span class="fp-weekday">[_weekday_]</span>)</span>'
  time_format: false,
  //^string:: default as '<span class="fp-timeframe"><span class="fp-subject">Time</span>: <span class="fp-time">[_hour_]:[_minute_]:[_second_]</span></span>'
  expression_month: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  //^array for 12 strings:: default as ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  expression_weekday: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  //^array for 7 strings:: default as ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  tagging_staticpage: '/tagging'
  //^string:: default normal tagging as no string, but can assign staticpage tagged by parameter, eg: '/label'.
}


function runTumblrJson($json,$setting){
  var j = $json||{}, h = '', d = document;
  var cnLi = $setting.list_item_class_name||''
  var dtf = $setting.date_format||'<span class="fp-moment fp-dateframe"><span class="fp-subject">Date</span>: <span class="fp-date">[_day2_]-[_month_]-[_year_]</span> (<span class="fp-weekday">[_weekday_]</span>)</span>';
  var tmf = $setting.time_format||'<span class="fp-moment fp-timeframe"><span class="fp-subject">Time</span>: <span class="fp-time">[_hour_]:[_minute_]:[_second_]</span></span>';
  var mth = $setting.expression_month||null, oMTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var wdy = $setting.expression_weekday||null, oWD = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var tagPage = $setting.tagging_staticpage||'';


  if(mth){
    if(mth instanceof Array){
      if(mth.length!=12)mth=oMTH;
    } else {mth=oMTH}
  } else {mth=oMTH}
  if(wdy){
    if(wdy instanceof Array){
      if(wdy.length!=7)wdy=oWD;
    } else {wdy=oWD}
  } else {wdy=oWD}

  var aElmUL = $setting.append_to_ul_element||null;


  var sTime, tempTags, wLi;

  if('posts' in j){
    if(j.posts instanceof Array){
        for(var i=0;i<j.posts.length;i++){
            h += '<div id="post_'+(j.posts[i].id||'')+'" class="'+(j.posts[i].type=='regular'?'text':(j.posts[i].type||''))+'  notpage post-'+(j.posts[i].id||'')+'">';
            h += '<div class="post-wrapper"><div class="'+(j.posts[i].format||'')+'"><div class="post">';


            h += '<div class="h2title">';
            if(j.posts[i].type == 'regular'){
                if(j.posts[i]['regular-title']){
                    h += '<div class="postpertitle"><span class="tumblr_theme_marker_title">'+j.posts[i]['regular-title']+'</span></div>';
                }
                if(j.posts[i]['url-with-slug']&&j.posts[i]['regular-title']){
                    h += '<div class="postperlink"><a class="postpertitle" href="'+j.posts[i]['url-with-slug']+'" target="_top"><span><span class="tumblr_theme_marker_title">'+j.posts[i]['regular-title']+'</span></span></a></div>';
                }
            }
            if(j.posts[i].type == 'photo'){
            }
            if(j.posts[i].type == 'quote'){
            }
            if(j.posts[i].type == 'link'){
            }
            if(j.posts[i].type == 'conversation'){
            }
            if(j.posts[i].type == 'audio'){
            }
            if(j.posts[i].type == 'video'){
            }
            if(j.posts[i].type == 'answer'){
            }
            h += '</div>';





            h += '<div class="body-text">';
            if(j.posts[i].type == 'regular'){
                if(j.posts[i]['regular-body']){
                    h += j.posts[i]['regular-body'];
                }
            }
            if(j.posts[i].type == 'photo'){
            }
            if(j.posts[i].type == 'quote'){
            }
            if(j.posts[i].type == 'link'){
            }
            if(j.posts[i].type == 'conversation'){
            }
            if(j.posts[i].type == 'audio'){
            }
            if(j.posts[i].type == 'video'){
            }
            if(j.posts[i].type == 'answer'){
            }
            h += '</div>';




            h += '<div class="panel reblognone" id="post_'+(j.posts[i].id||'')+'">';
            h += '<div class="attribution-tags">';
            h += '<ul>';
            tempTags = j.posts[i].tags;
            if(tempTags){
                if(tempTags instanceof Array){
                    if(tempTags.length>0){
                        for(var n=0;n<tempTags.length;n++){
                            if(tempTags[n]){
                                h += '<li><div class="tagouter"><div class="taginner"><a target="_blank" href="'+((tagPage=='')?'/tagged/':(tagPage+'?lb='))+encodeURIComponent(tempTags[n])+'" class="tag">'+tempTags[n]+'</a></div></div></li>';
                            }
                        }
                    }
                }
            }; tempTags = null;
            h += '</ul>';
            h += '</div>';
            h += '</div>';




            h += '<div class="postingfooter">';


            h += '<div class="post-controls" id="post_'+(j.posts[i].id||'')+'">';
            h += '<ul class="feedback-control">';
            if(j.posts[i]['url-with-slug']){
              h += '<li title="本片專頁" class="videopostpage"><a class="feedback-item videohomebutton" href="'+j.posts[i]['url-with-slug']+'"><span>Post-Home</span></a></li>';
            }
            if(j.posts[i].id&&j.posts[i]['reblog-key']){
              h += '<li title="tumblr轉貼" class="referpost"><a class="feedback-item reblogbutton" target="_blank" href="/reblog/'+j.posts[i].id+'/'+j.posts[i]['reblog-key']+'"><span>Reblog-Post</span></a></li>';
            }
            h += '</ul>';
            h += '<ul class="share-control">';
            if(j.posts[i].url&&j.posts[i]['regular-title']){
              h += '<li title="分享至facebook(臉書)"><a target="_blank" href="http://facebook.com/sharer.php?u='+encodeURIComponent(j.posts[i].url)+'&amp;t='+encodeURIComponent(j.posts[i]['regular-title'])+'" class="share-item facebook"><span>Facebook</span></a></li>';
              h += '<li title="分享至twitter"><a target="_blank" href="https://twitter.com/intent/tweet?text='+encodeURIComponent(j.posts[i]['regular-title'])+'%20%20%20URL%3A%20'+encodeURIComponent(j.posts[i].url)+'" class="share-item twitter"><span>Tweet</span></a></li>';
            }
            if(j.posts[i]['url-with-slug']){
              h += '<li title="用電郵分享"><a target="_blank" href="mailto:?subject=%E7%94%B1%E3%80%8C'+(j?(typeof j.tumblelog=='undefined'?'Tumblr':(j.tumblelog.title||'Tumblr')):'Tumblr')+'%E3%80%8D%E5%88%86%E4%BA%AB%E4%B9%8B%E8%B2%BC%E6%96%87&amp;body=URL%3A%20'+encodeURIComponent(j.posts[i]['url-with-slug'])+'" class="share-item email"><span>Mail</span></a></li>';
            }
            h += '</ul>';
            h += '<a class="fastpreview" href="javascript:void(0)" onclick="AppendPreview(this);"><span title="打開即時預覽" class="arrow showdown">速預覽▼</span><span title="關閉預覽內容" class="arrow hideup">收起▲</span></a>';
            h += '</div>';


            h += '<div class="meta-info">';
            h += '<ul class="post-date">';
            h += '<li>';
            h += '<span>';
            h += '分享日期：';
            h += '<a target="_blank" href="'+j.posts[i]['url-with-slug']+'" title="分享至本站的日子">';
            sTime = new Date(parseInt(j.posts[i]['unix-timestamp']||0)*1000);
            h += dtf.replace(/\[_year_\]/gi,sTime.getFullYear()).replace(/\[_month_\]/gi,mth[sTime.getMonth()]).replace(/\[_day1_\]/gi,sTime.getDate()).replace(/\[_day2_\]/gi,('0'+sTime.getDate()).slice(-2)).replace(/\[_weekday_\]/gi,wdy[sTime.getDay()]);
            h += '</a>';
            h += '</span>';
            h += '</li>';
            h += '</ul>';
            h += '</div>';



            h += '</div>';





            h += '</div></div></div>';
            h += '</div>';
			
            if(h){
                if(aElmUL){
                    wLi=d.createElement('li');
                    wLi.className = cnLi;
                    wLi.innerHTML=h;
                    aElmUL.appendChild(wLi);
                }else{d.write(h)}
                wLi=null;h='';
            }
        }
    }
  }
}
runTumblrJson(tumblr_api_read,av2u_feedSetting);

