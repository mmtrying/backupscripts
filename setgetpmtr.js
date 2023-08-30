function getparameter(pmtr,sptr1,sptr2,cUrl){
  var u = (cUrl||document.URL), s1 = (sptr1||'?'), s2 = (sptr2===''?'':(sptr2||'#'));
  var k = (pmtr||'').replace(/(^\s+|\s+$)/g,'')+'='; if(!k) return '';
  var uP = u.split(s1)[1]; if(!uP) return '';
  if(s2) uP = uP.split(s2)[0];
  var nP = uP.replace(/(^\s+|\s+$)/g,'');
  if(nP){
      var i = -1;
      if(nP.indexOf('&'+k)>=0){
          i = nP.indexOf('&'+k) + k.length +1;
      } else if(nP.indexOf(k)===0){
          i = k.length;
      }
      if(i>=0){
        return nP.substr(i).split('&')[0].replace(/(^\s+|\s+$)/g,'');
      } else { return ''; }
  } else { return ''; }
}
function setparameter(pmtr,nValue,sptr1,sptr2,cUrl){
  var u = (cUrl||document.URL), s1 = (sptr1||'?'), s2 = (sptr2===''?'':(sptr2||'#'));
  var v = nValue||'', k = (pmtr||'').replace(/(^\s+|\s+$)/g,'')+'=';
  if(!k||!v) return u;
  var uP = u.split(s1)[1]||'';
  if(uP&&s2) uP = uP.split(s2)[0];
  var nP = uP.replace(/(^\s+|\s+$)/g,'');
  var  nnP, sP;
  if(nP.indexOf(k)===0){
      sP = nP.split(k);
      nnP = k + v + ((sP[1]||'').indexOf('&')==-1?'':sP[1].substr(sP[1].indexOf('&')));
  } else if(nP.indexOf('&'+k)!=-1){
      sP = nP.split('&'+k);
      nnP = (sP[0]||'') + '&' + k + v + ((sP[1]||'').indexOf('&')==-1?'':sP[1].substr(sP[1].indexOf('&')));
  } else if(uP){
      nnP = (nP?(nP+'&'+k+v):(k+v));
  } else {
      if(s2) sP = u.split(s2);
      nnP = (s2?(u.split(s2)[0]||''):u)+  sptr1 + (nP?(nP+'&'+k+v):(k+v)) + (s2?(s1==s2?'':(s2+(u.split(s2)[1]||''))):'');
  }
  return uP?u.replace(uP,nnP):nnP;
}
