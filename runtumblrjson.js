
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
            h += '<div id="'+(j.posts[i].id||'')+'" class="posts '+(j.posts[i].type||'')+' '+(j.posts[i].format||'')+'">';


            h += '<div class="feed-header">';
            if(j.posts[i].type == 'regular'){
                h += '<div class="h2title">';
                if(j.posts[i]['regular-title']){
                    h += '<div class="postpertitle">'+j.posts[i]['regular-title']+'</div>';
                }
                if(j.posts[i]['url-with-slug']&&j.posts[i]['regular-title']){
                    h += '<div class="postperlink"><a class="postpertitle" href="'+j.posts[i]['url-with-slug']+'" target="_top"><span>'+j.posts[i]['regular-title']+'</span></a></div>';
                }
                h += '</div>';
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


            h += '<div class="feed-body">';
            if(j.posts[i].type == 'regular'){
                h += '<div class="body-text">';
                if(j.posts[i]['regular-body']){
                    h += j.posts[i]['regular-body'];
                }
                h += '</div>';
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



            h += '<div class="feed-footer">';

            h += '<div class="fp-info">';
            h += '<span class="fp-action">';
            if(j.posts[i].url&&j.posts[i]['url-with-slug']){
                h += '<a class="fp-link" rel="'+j.posts[i].url+'" href="'+j.posts[i]['url-with-slug']+'" target="_top"><span>'+'View Post!'+'</span></a>';
            }
            if(j.posts[i].url&&j.posts[i]['url-with-slug']&&j.posts[i].slug&&j.posts[i].id&&j.posts[i]['reblog-key']){
                h += '<span class="fp-separator"> | </span>';
            }
            if(j.posts[i].slug&&j.posts[i].id&&j.posts[i]['reblog-key']){
                h += '<a class="fp-reblog" rel="'+j.posts[i].slug+'" href="https://www.tumblr.com/reblog/'+j.posts[i].id+'/'+j.posts[i]['reblog-key']+'" target="_top"><span>Reblog+Comment!</span></a>';
            }
            h += '</span>';
            h += '</div>';

            h += '<div class="fp-reference">';
            h += '<span class="fp-mobile"><span class="fp-subject">Published by Mobile/Email: </span><span class="fp-result">'+(j.posts[i].mobile?'Yes':'No')+'</span></span>';
            h += '<span class="fp-separator"> | </span>';
            h += '<span class="fp-bookmarklet"><span class="fp-subject">Bookmarklet: </span><span class="fp-result">'+(j.posts[i].bookmarklet?'Yes':'No')+'</span></span>';
            h += '<span class="fp-separator"> | </span>';
            h += '<span class="fp-feeditem"><span class="fp-subject">Feed-item: </span><span class="fp-result">'+(j.posts[i]['feed-item']||'NIL')+'</span></span>';
            h += '<span class="fp-separator"> | </span>';
            h += '<span class="fp-fromfeedid"><span class="fp-subject">Feed-id: </span><span class="fp-result">'+(j.posts[i]['from-feed-id']||'NIL')+'</span></span>';
            h += '</span>';
            h += '</div>';

            h += '<div class="fp-label">';
            h += '<span class="fp-subject">Category: </span>';
            h += '<span class="fp-result">';
            tempTags = j.posts[i].tags;
            if(tempTags){
                if(tempTags instanceof Array){
                    if(tempTags.length>0){
                        for(var n=0;n<tempTags.length;n++){
                            if(tempTags[n]){
                                if(n>0) h += '<span class="fp-separator"> / </span>';
                                h += '<a href="'+((tagPage=='')?'/tagged/':(tagPage+'?lb='))+encodeURIComponent(tempTags[n])+'"><span>'+tempTags[n]+'</span></a>';
                            }
                        }
                    }
                }
            }; tempTags = null;
            h += '</span>';
            h += '</div>';

            h += '<div class="fp-moment">';
            h += '<div class="fp-mm1">';
            h += '<span class="fp-subject">Post Moment: </span>';
            h += '<span class="fp-gmt-date"><span class="fp-result">'+(j.posts[i]['date-gmt']||'')+'</span></span>';
            h += '<span class="fp-separator"> | </span>';
            h += '<span class="fp-date"><span class="fp-result">'+(j.posts[i].date||'')+'</span></span>';
            h += '</div>';
            h += '<div class="fp-mm2">';
            sTime = new Date(parseInt(j.posts[i]['unix-timestamp']||0)*1000);
            h += dtf.replace(/\[_year_\]/gi,sTime.getFullYear()).replace(/\[_month_\]/gi,mth[sTime.getMonth()]).replace(/\[_day1_\]/gi,sTime.getDate()).replace(/\[_day2_\]/gi,('0'+sTime.getDate()).slice(-2)).replace(/\[_weekday_\]/gi,wdy[sTime.getDay()]);
            h += '<span class="fp-separator"> | </span>';
            h += tmf.replace(/\[_hour_\]/gi,sTime.getHours()).replace(/\[_minute_\]/gi,('0'+sTime.getMinutes()).slice(-2)).replace(/\[_second_\]/gi,('0'+sTime.getSeconds()).slice(-2));
            h += '</div>';
            h += '</div>';

            h += '</div>';



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
