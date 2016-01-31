define("echarts/chart/wordCloud",["require","./base","zrender/shape/Text","../layout/WordCloud","../component/grid","../component/dataRange","../config","../util/ecData","zrender/tool/util","zrender/tool/color","../chart"],function(t){function e(t,e,a,n,s){i.call(this,t,e,a,n,s),this.refresh(n)}var i=t("./base"),a=t("zrender/shape/Text"),n=t("../layout/WordCloud");t("../component/grid"),t("../component/dataRange");var s=t("../config"),h=t("../util/ecData"),o=t("zrender/tool/util"),r=t("zrender/tool/color");return s.wordCloud={zlevel:0,z:2,clickable:!0,center:["50%","50%"],size:["40%","40%"],textRotation:[0,90],textPadding:0,autoSize:{enable:!0,minSize:12},itemStyle:{normal:{textStyle:{fontSize:function(t){return t.value}}}}},e.prototype={type:s.CHART_TYPE_WORDCLOUD,refresh:function(t){t&&(this.option=t,this.series=t.series),this._init()},_init:function(){var t=this.series;this.backupShapeList();for(var e=this.component.legend,i=0;i<t.length;i++)if(t[i].type===s.CHART_TYPE_WORDCLOUD){t[i]=this.reformOption(t[i]);var a=t[i].name||"";if(this.selectedMap[a]=e?e.isSelected(a):!0,!this.selectedMap[a])continue;this.buildMark(i),this._initSerie(t[i])}},_initSerie:function(t){var e=t.itemStyle.normal.textStyle,i=[this.parsePercent(t.size[0],this.zr.getWidth())||200,this.parsePercent(t.size[1],this.zr.getHeight())||200],a=this.parseCenter(this.zr,t.center),s={size:i,wordletype:{autoSizeCal:t.autoSize},center:a,rotate:t.textRotation,padding:t.textPadding,font:e.fontFamily,fontSize:e.fontSize,fontWeight:e.fontWeight,fontStyle:e.fontStyle,text:function(t){return t.name},data:t.data},h=new n(s),o=this;h.end(function(t){o._buildShapes(t)}),h.start()},_buildShapes:function(t){for(var e=t.length,i=0;e>i;i++)this._buildTextShape(t[i],0,i);this.addShapeList()},_buildTextShape:function(t,e,i){var n=this.series,s=n[e],o=s.name||"",l=s.data[i],d=[l,s],p=this.component.legend,c=p?p.getColor(o):this.zr.getColor(e),g=this.deepMerge(d,"itemStyle.normal")||{},u=this.deepMerge(d,"itemStyle.emphasis")||{},_=this.getItemStyleColor(g.color,e,i,l)||c,f=this.getItemStyleColor(u.color,e,i,l)||("string"==typeof _?r.lift(_,-.2):_),y=new a({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!0,style:{x:0,y:0,text:t.text,color:_,textFont:[t.style,t.weight,t.size+"px",t.font].join(" "),textBaseline:"alphabetic",textAlign:"center"},highlightStyle:{brushType:u.borderWidth?"both":"fill",color:f,lineWidth:u.borderWidth||0,strokeColor:u.borderColor},position:[t.x,t.y],rotation:[-t.rotate/180*Math.PI,0,0]});h.pack(y,s,e,l,i,l.name),this.shapeList.push(y)}},o.inherits(e,i),t("../chart").define("wordCloud",e),e}),define("echarts/layout/WordCloud",["require","../layout/WordCloudRectZero","zrender/tool/util"],function(t){function e(t){this._init(t)}var i=t("../layout/WordCloudRectZero"),a=t("zrender/tool/util");return e.prototype={start:function(){function t(){u.totalArea=h,c.autoSizeCal.enable&&u._autoCalTextSize(d,h,n,s,c.autoSizeCal.minSize),p.timer&&clearInterval(p.timer),p.timer=setInterval(e,0),e()}function e(){for(var t,e=+new Date,i=d.length;+new Date-e<p.timeInterval&&++o<i&&p.timer;)t=d[o],t.x=g[0]>>1,t.y=g[1]>>1,u._cloudSprite(t,d,o),t.hasText&&u._place(a,t,l)&&(r.push(t),t.x-=g[0]>>1,t.y-=g[1]>>1);o>=i&&(u.stop(),u._fixTagPosition(r),p.endcallback(r))}var a=null,n=0,s=0,h=0,o=-1,r=[],l=null,d=this.wordsdata,p=this.defaultOption,c=p.wordletype,g=p.size,u=this,_=new i({type:c.type,width:g[0],height:g[1]});return _.calculate(function(e){a=e.initarr,n=e.maxWit,s=e.maxHit,h=e.area,l=e.imgboard,t()},this),this},_fixTagPosition:function(t){for(var e=this.defaultOption.center,i=0,a=t.length;a>i;i++)t[i].x+=e[0],t[i].y+=e[1]},stop:function(){return this.defaultOption.timer&&(clearInterval(this.defaultOption.timer),this.defaultOption.timer=null),this},end:function(t){return t&&(this.defaultOption.endcallback=t),this},_init:function(t){this.defaultOption={},this._initProperty(t),this._initMethod(t),this._initCanvas(),this._initData(t.data)},_initData:function(t){var e=this,i=e.defaultOption;this.wordsdata=t.map(function(t,a){return t.text=i.text.call(e,t,a),t.font=i.font.call(e,t,a),t.style=i.fontStyle.call(e,t,a),t.weight=i.fontWeight.call(e,t,a),t.rotate=i.rotate.call(e,t,a),t.size=~~i.fontSize.call(e,t,a),t.padding=i.padding.call(e,t,a),t}).sort(function(t,e){return e.value-t.value})},_initMethod:function(t){function e(t){return t.name}function i(){return"sans-serif"}function a(){return"normal"}function n(t){return t.value}function s(){return 0}function h(t){return function(){return t[Math.round(Math.random()*(t.length-1))]}}function o(){return 0}function r(t){var e=t[0]/t[1];return function(t){return[e*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function l(t){var e=4,i=e*t[0]/t[1],a=0,n=0;return function(t){var s=0>t?-1:1;switch(Math.sqrt(1+4*s*t)-s&3){case 0:a+=i;break;case 1:n+=e;break;case 2:a-=i;break;default:n-=e}return[a,n]}}function d(t){return"function"==typeof t?t:function(){return t}}var p=this.defaultOption;p.text=t.text?d(t.text):e,p.font=t.font?d(t.font):i,p.fontSize=t.fontSize?d(t.fontSize):n,p.fontStyle=t.fontStyle?d(t.fontStyle):a,p.fontWeight=t.fontWeight?d(t.fontWeight):a,p.rotate=t.rotate?h(t.rotate):s,p.padding=t.padding?d(t.padding):o,p.center=t.center,p.spiral=r,p.endcallback=function(){},p.rectangularSpiral=l,p.archimedeanSpiral=r},_initProperty:function(t){var e=this.defaultOption;e.size=t.size||[256,256],e.wordletype=t.wordletype,e.words=t.words||[],e.timeInterval=1/0,e.timer=null,e.spirals={archimedean:e.archimedeanSpiral,rectangular:e.rectangularSpiral},a.merge(e,{size:[256,256],wordletype:{type:"RECT",areaPresent:.058,autoSizeCal:{enable:!0,minSize:12}}})},_initCanvas:function(){var t,e=Math.PI/180,i=64,a=2048,n=1;"undefined"!=typeof document?(t=document.createElement("canvas"),t.width=1,t.height=1,n=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2),t.width=(i<<5)/n,t.height=a/n):t=new Canvas(i<<5,a);var s=t.getContext("2d");s.fillStyle=s.strokeStyle="red",s.textAlign="center",this.defaultOption.c=s,this.defaultOption.cw=i,this.defaultOption.ch=a,this.defaultOption.ratio=n,this.defaultOption.cloudRadians=e},_cloudSprite:function(t,e,i){if(!t.sprite){var a=this.defaultOption.cw,n=this.defaultOption.ch,s=this.defaultOption.c,h=this.defaultOption.ratio,o=this.defaultOption.cloudRadians;s.clearRect(0,0,(a<<5)/h,n/h);var r=0,l=0,d=0,p=e.length;for(--i;++i<p;){t=e[i],s.save(),s.font=t.style+" "+t.weight+" "+~~((t.size+1)/h)+"px "+t.font;var c=s.measureText(t.text+"m").width*h,g=t.size<<1;if(t.rotate){var u=Math.sin(t.rotate*o),_=Math.cos(t.rotate*o),f=c*_,y=c*u,x=g*_,m=g*u;c=Math.max(Math.abs(f+m),Math.abs(f-m))+31>>5<<5,g=~~Math.max(Math.abs(y+x),Math.abs(y-x))}else c=c+31>>5<<5;if(g>d&&(d=g),r+c>=a<<5&&(r=0,l+=d,d=0),l+g>=n)break;s.translate((r+(c>>1))/h,(l+(g>>1))/h),t.rotate&&s.rotate(t.rotate*o),s.fillText(t.text,0,0),t.padding&&(s.lineWidth=2*t.padding,s.strokeText(t.text,0,0)),s.restore(),t.width=c,t.height=g,t.xoff=r,t.yoff=l,t.x1=c>>1,t.y1=g>>1,t.x0=-t.x1,t.y0=-t.y1,t.hasText=!0,r+=c}for(var S=s.getImageData(0,0,(a<<5)/h,n/h).data,R=[];--i>=0;)if(t=e[i],t.hasText){for(var c=t.width,O=c>>5,g=t.y1-t.y0,v=0;g*O>v;v++)R[v]=0;if(r=t.xoff,null==r)return;l=t.yoff;for(var b=0,z=-1,L=0;g>L;L++){for(var v=0;c>v;v++){var w=O*L+(v>>5),M=S[(l+L)*(a<<5)+(r+v)<<2]?1<<31-v%32:0;R[w]|=M,b|=M}b?z=L:(t.y0++,g--,L--,l++)}t.y1=t.y0+z,t.sprite=R.slice(0,(t.y1-t.y0)*O)}}},_place:function(t,e,i){function a(t,e,i){i>>=5;for(var a,n=t.sprite,s=t.width>>5,h=t.x-(s<<4),o=127&h,r=32-o,l=t.y1-t.y0,d=(t.y+t.y0)*i+(h>>5),p=0;l>p;p++){a=0;for(var c=0;s>=c;c++)if((a<<r|(s>c?(a=n[p*s+c])>>>o:0))&e[d+c])return!0;d+=i}return!1}function n(t,e){return e.row[t.y]&&e.cloumn[t.x]&&t.x>=e.row[t.y].start&&t.x<=e.row[t.y].end&&t.y>=e.cloumn[t.x].start&&t.y<=e.cloumn[t.x].end}for(var s,h,o,r=this.defaultOption.size,l=([{x:0,y:0},{x:r[0],y:r[1]}],e.x),d=e.y,p=Math.sqrt(r[0]*r[0]+r[1]*r[1]),c=this.defaultOption.spiral(r),g=Math.random()<.5?1:-1,u=-g;(s=c(u+=g))&&(h=~~s[0],o=~~s[1],!(Math.min(h,o)>p));)if(e.x=l+h,e.y=d+o,!(e.x+e.x0<0||e.y+e.y0<0||e.x+e.x1>r[0]||e.y+e.y1>r[1])&&!a(e,t,r[0])&&n(e,i)){for(var _,f=e.sprite,y=e.width>>5,x=r[0]>>5,m=e.x-(y<<4),S=127&m,R=32-S,O=e.y1-e.y0,v=(e.y+e.y0)*x+(m>>5),b=0;O>b;b++){_=0;for(var z=0;y>=z;z++)t[v+z]|=_<<R|(y>z?(_=f[b*y+z])>>>S:0);v+=x}return delete e.sprite,!0}return!1},_autoCalTextSize:function(t,e,i,a,n){function s(t){_.clearRect(0,0,(g<<5)/f,u/f),_.save(),_.font=t.style+" "+t.weight+" "+~~((t.size+1)/f)+"px "+t.font;var e=_.measureText(t.text+"m").width*f,h=t.size<<1;e=e+31>>5<<5,_.restore(),t.aw=e,t.ah=h;var o,r,l;if(t.rotate){var d=Math.sin(t.rotate*y),p=Math.cos(t.rotate*y),x=e*p,m=e*d,S=h*p,R=h*d;r=Math.max(Math.abs(x+R),Math.abs(x-R))+31>>5<<5,l=~~Math.max(Math.abs(m+S),Math.abs(m-S))}return t.size<=c||t.rotate&&e*h<=t.area&&i>=r&&a>=l||e*h<=t.area&&i>=e&&a>=h?void(t.area=e*h):(o=t.rotate&&r>i&&l>a?Math.min(i/r,a/l):e>i||h>a?Math.min(i/e,a/h):Math.sqrt(t.area/(t.aw*t.ah)),t.size=~~(o*t.size),t.size<n?void(t.size=n):s(t))}function h(t,e){for(var i=t.length,a=0;i--;)a+=e(t[i]);return a}for(var o,r,l=h(t,function(t){return t.size}),d=t.length,p=.25,c=n,g=this.defaultOption.cw,u=this.defaultOption.ch,_=this.defaultOption.c,f=this.defaultOption.ratio,y=this.defaultOption.cloudRadians;d--;)o=t[d],r=o.size/l,o.areapre=p?p>r?r:p:r,o.area=e*o.areapre,o.totalarea=e,s(o)}},e}),define("echarts/component/dataRange",["require","./base","zrender/shape/Text","zrender/shape/Rectangle","../util/shape/HandlePolygon","../config","zrender/tool/util","zrender/tool/event","zrender/tool/area","zrender/tool/color","../component"],function(t){function e(t,e,a,n,s){i.call(this,t,e,a,n,s);var o=this;o._ondrift=function(t,e){return o.__ondrift(this,t,e)},o._ondragend=function(){return o.__ondragend()},o._dataRangeSelected=function(t){return o.__dataRangeSelected(t)},o._dispatchHoverLink=function(t){return o.__dispatchHoverLink(t)},o._onhoverlink=function(t){return o.__onhoverlink(t)},this._selectedMap={},this._range={},this.refresh(n),e.bind(h.EVENT.HOVER,this._onhoverlink)}var i=t("./base"),a=t("zrender/shape/Text"),n=t("zrender/shape/Rectangle"),s=t("../util/shape/HandlePolygon"),h=t("../config");h.dataRange={zlevel:0,z:4,show:!0,orient:"vertical",x:"left",y:"bottom",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,itemWidth:20,itemHeight:14,precision:0,splitNumber:5,splitList:null,calculable:!1,selectedMode:!0,hoverLink:!0,realtime:!0,color:["#006edd","#e0ffff"],textStyle:{color:"#333"}};var o=t("zrender/tool/util"),r=t("zrender/tool/event"),l=t("zrender/tool/area"),d=t("zrender/tool/color");return e.prototype={type:h.COMPONENT_TYPE_DATARANGE,_textGap:10,_buildShape:function(){if(this._itemGroupLocation=this._getItemGroupLocation(),this._buildBackground(),this._isContinuity()?this._buildGradient():this._buildItem(),this.dataRangeOption.show)for(var t=0,e=this.shapeList.length;e>t;t++)this.zr.addShape(this.shapeList[t]);this._syncShapeFromRange()},_buildItem:function(){var t,e,i,s,h=this._valueTextList,o=h.length,r=this.getFont(this.dataRangeOption.textStyle),d=this._itemGroupLocation.x,p=this._itemGroupLocation.y,c=this.dataRangeOption.itemWidth,g=this.dataRangeOption.itemHeight,u=this.dataRangeOption.itemGap,_=l.getTextHeight("国",r);"vertical"==this.dataRangeOption.orient&&"right"==this.dataRangeOption.x&&(d=this._itemGroupLocation.x+this._itemGroupLocation.width-c);var f=!0;this.dataRangeOption.text&&(f=!1,this.dataRangeOption.text[0]&&(i=this._getTextShape(d,p,this.dataRangeOption.text[0]),"horizontal"==this.dataRangeOption.orient?d+=l.getTextWidth(this.dataRangeOption.text[0],r)+this._textGap:(p+=_+this._textGap,i.style.y+=_/2+this._textGap,i.style.textBaseline="bottom"),this.shapeList.push(new a(i))));for(var y=0;o>y;y++)t=h[y],s=this.getColorByIndex(y),e=this._getItemShape(d,p,c,g,this._selectedMap[y]?s:"#ccc"),e._idx=y,e.onmousemove=this._dispatchHoverLink,this.dataRangeOption.selectedMode&&(e.clickable=!0,e.onclick=this._dataRangeSelected),this.shapeList.push(new n(e)),f&&(i={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:d+c+5,y:p,color:this._selectedMap[y]?this.dataRangeOption.textStyle.color:"#ccc",text:h[y],textFont:r,textBaseline:"top"},highlightStyle:{brushType:"fill"}},"vertical"==this.dataRangeOption.orient&&"right"==this.dataRangeOption.x&&(i.style.x-=c+10,i.style.textAlign="right"),i._idx=y,i.onmousemove=this._dispatchHoverLink,this.dataRangeOption.selectedMode&&(i.clickable=!0,i.onclick=this._dataRangeSelected),this.shapeList.push(new a(i))),"horizontal"==this.dataRangeOption.orient?d+=c+(f?5:0)+(f?l.getTextWidth(t,r):0)+u:p+=g+u;!f&&this.dataRangeOption.text[1]&&("horizontal"==this.dataRangeOption.orient?d=d-u+this._textGap:p=p-u+this._textGap,i=this._getTextShape(d,p,this.dataRangeOption.text[1]),"horizontal"!=this.dataRangeOption.orient&&(i.style.y-=5,i.style.textBaseline="top"),this.shapeList.push(new a(i)))},_buildGradient:function(){var e,i,s=this.getFont(this.dataRangeOption.textStyle),h=this._itemGroupLocation.x,o=this._itemGroupLocation.y,r=this.dataRangeOption.itemWidth,d=this.dataRangeOption.itemHeight,p=l.getTextHeight("国",s),c=10,g=!0;this.dataRangeOption.text&&(g=!1,this.dataRangeOption.text[0]&&(i=this._getTextShape(h,o,this.dataRangeOption.text[0]),"horizontal"==this.dataRangeOption.orient?h+=l.getTextWidth(this.dataRangeOption.text[0],s)+this._textGap:(o+=p+this._textGap,i.style.y+=p/2+this._textGap,i.style.textBaseline="bottom"),this.shapeList.push(new a(i))));for(var u=t("zrender/tool/color"),_=1/(this.dataRangeOption.color.length-1),f=[],y=0,x=this.dataRangeOption.color.length;x>y;y++)f.push([y*_,this.dataRangeOption.color[y]]);"horizontal"==this.dataRangeOption.orient?(e={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:h,y:o,width:r*c,height:d,color:u.getLinearGradient(h,o,h+r*c,o,f)},hoverable:!1},h+=r*c+this._textGap):(e={zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:h,y:o,width:r,height:d*c,color:u.getLinearGradient(h,o,h,o+d*c,f)},hoverable:!1},o+=d*c+this._textGap),this.shapeList.push(new n(e)),this._calculableLocation=e.style,this.dataRangeOption.calculable&&(this._buildFiller(),this._bulidMask(),this._bulidHandle()),this._buildIndicator(),!g&&this.dataRangeOption.text[1]&&(i=this._getTextShape(h,o,this.dataRangeOption.text[1]),this.shapeList.push(new a(i)))},_buildIndicator:function(){var t,e,i=this._calculableLocation.x,a=this._calculableLocation.y,n=this._calculableLocation.width,h=this._calculableLocation.height,o=5;"horizontal"==this.dataRangeOption.orient?"bottom"!=this.dataRangeOption.y?(t=[[i,a+h],[i-o,a+h+o],[i+o,a+h+o]],e="bottom"):(t=[[i,a],[i-o,a-o],[i+o,a-o]],e="top"):"right"!=this.dataRangeOption.x?(t=[[i+n,a],[i+n+o,a-o],[i+n+o,a+o]],e="right"):(t=[[i,a],[i-o,a-o],[i-o,a+o]],e="left"),this._indicatorShape={style:{pointList:t,color:"#fff",__rect:{x:Math.min(t[0][0],t[1][0]),y:Math.min(t[0][1],t[1][1]),width:o*("horizontal"==this.dataRangeOption.orient?2:1),height:o*("horizontal"==this.dataRangeOption.orient?1:2)}},highlightStyle:{brushType:"fill",textPosition:e,textColor:this.dataRangeOption.textStyle.color},hoverable:!1},this._indicatorShape=new s(this._indicatorShape)},_buildFiller:function(){this._fillerShape={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:this._calculableLocation.x,y:this._calculableLocation.y,width:this._calculableLocation.width,height:this._calculableLocation.height,color:"rgba(255,255,255,0)"},highlightStyle:{strokeColor:"rgba(255,255,255,0.5)",lineWidth:1},draggable:!0,ondrift:this._ondrift,ondragend:this._ondragend,onmousemove:this._dispatchHoverLink,_type:"filler"},this._fillerShape=new n(this._fillerShape),this.shapeList.push(this._fillerShape)},_bulidHandle:function(){var t,e,i,a,n,h,o,r,d=this._calculableLocation.x,p=this._calculableLocation.y,c=this._calculableLocation.width,g=this._calculableLocation.height,u=this.getFont(this.dataRangeOption.textStyle),_=l.getTextHeight("国",u),f=Math.max(l.getTextWidth(this._textFormat(this.dataRangeOption.max),u),l.getTextWidth(this._textFormat(this.dataRangeOption.min),u))+2;"horizontal"==this.dataRangeOption.orient?"bottom"!=this.dataRangeOption.y?(t=[[d,p],[d,p+g+_],[d-_,p+g+_],[d-1,p+g],[d-1,p]],e=d-f/2-_,i=p+g+_/2+2,a={x:d-f-_,y:p+g,width:f+_,height:_},n=[[d+c,p],[d+c,p+g+_],[d+c+_,p+g+_],[d+c+1,p+g],[d+c+1,p]],h=d+c+f/2+_,o=i,r={x:d+c,y:p+g,width:f+_,height:_}):(t=[[d,p+g],[d,p-_],[d-_,p-_],[d-1,p],[d-1,p+g]],e=d-f/2-_,i=p-_/2-2,a={x:d-f-_,y:p-_,width:f+_,height:_},n=[[d+c,p+g],[d+c,p-_],[d+c+_,p-_],[d+c+1,p],[d+c+1,p+g]],h=d+c+f/2+_,o=i,r={x:d+c,y:p-_,width:f+_,height:_}):(f+=_,"right"!=this.dataRangeOption.x?(t=[[d,p],[d+c+_,p],[d+c+_,p-_],[d+c,p-1],[d,p-1]],e=d+c+f/2+_/2,i=p-_/2,a={x:d+c,y:p-_,width:f+_,height:_},n=[[d,p+g],[d+c+_,p+g],[d+c+_,p+_+g],[d+c,p+1+g],[d,p+g+1]],h=e,o=p+g+_/2,r={x:d+c,y:p+g,width:f+_,height:_}):(t=[[d+c,p],[d-_,p],[d-_,p-_],[d,p-1],[d+c,p-1]],e=d-f/2-_/2,i=p-_/2,a={x:d-f-_,y:p-_,width:f+_,height:_},n=[[d+c,p+g],[d-_,p+g],[d-_,p+_+g],[d,p+1+g],[d+c,p+g+1]],h=e,o=p+g+_/2,r={x:d-f-_,y:p+g,width:f+_,height:_})),this._startShape={style:{pointList:t,text:this._textFormat(this.dataRangeOption.max),textX:e,textY:i,textFont:u,color:this.getColor(this.dataRangeOption.max),rect:a,x:t[0][0],y:t[0][1],_x:t[0][0],_y:t[0][1]}},this._startShape.highlightStyle={strokeColor:this._startShape.style.color,lineWidth:1},this._endShape={style:{pointList:n,text:this._textFormat(this.dataRangeOption.min),textX:h,textY:o,textFont:u,color:this.getColor(this.dataRangeOption.min),rect:r,x:n[0][0],y:n[0][1],_x:n[0][0],_y:n[0][1]}},this._endShape.highlightStyle={strokeColor:this._endShape.style.color,lineWidth:1},this._startShape.zlevel=this._endShape.zlevel=this.getZlevelBase(),this._startShape.z=this._endShape.z=this.getZBase()+1,this._startShape.draggable=this._endShape.draggable=!0,this._startShape.ondrift=this._endShape.ondrift=this._ondrift,this._startShape.ondragend=this._endShape.ondragend=this._ondragend,this._startShape.style.textColor=this._endShape.style.textColor=this.dataRangeOption.textStyle.color,this._startShape.style.textAlign=this._endShape.style.textAlign="center",this._startShape.style.textPosition=this._endShape.style.textPosition="specific",this._startShape.style.textBaseline=this._endShape.style.textBaseline="middle",this._startShape.style.width=this._endShape.style.width=0,this._startShape.style.height=this._endShape.style.height=0,this._startShape.style.textPosition=this._endShape.style.textPosition="specific",this._startShape=new s(this._startShape),this._endShape=new s(this._endShape),this.shapeList.push(this._startShape),this.shapeList.push(this._endShape)},_bulidMask:function(){var t=this._calculableLocation.x,e=this._calculableLocation.y,i=this._calculableLocation.width,a=this._calculableLocation.height;this._startMask={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:t,y:e,width:"horizontal"==this.dataRangeOption.orient?0:i,height:"horizontal"==this.dataRangeOption.orient?a:0,color:"#ccc"},hoverable:!1},this._endMask={zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:"horizontal"==this.dataRangeOption.orient?t+i:t,y:"horizontal"==this.dataRangeOption.orient?e:e+a,width:"horizontal"==this.dataRangeOption.orient?0:i,height:"horizontal"==this.dataRangeOption.orient?a:0,color:"#ccc"},hoverable:!1},this._startMask=new n(this._startMask),this._endMask=new n(this._endMask),this.shapeList.push(this._startMask),this.shapeList.push(this._endMask)},_buildBackground:function(){var t=this.reformCssArray(this.dataRangeOption.padding);this.shapeList.push(new n({zlevel:this.getZlevelBase(),z:this.getZBase(),hoverable:!1,style:{x:this._itemGroupLocation.x-t[3],y:this._itemGroupLocation.y-t[0],width:this._itemGroupLocation.width+t[3]+t[1],height:this._itemGroupLocation.height+t[0]+t[2],brushType:0===this.dataRangeOption.borderWidth?"fill":"both",color:this.dataRangeOption.backgroundColor,strokeColor:this.dataRangeOption.borderColor,lineWidth:this.dataRangeOption.borderWidth}}))},_getItemGroupLocation:function(){var t=this._valueTextList,e=t.length,i=this.dataRangeOption.itemGap,a=this.dataRangeOption.itemWidth,n=this.dataRangeOption.itemHeight,s=0,h=0,o=this.getFont(this.dataRangeOption.textStyle),r=l.getTextHeight("国",o),d=10;if("horizontal"==this.dataRangeOption.orient){if(this.dataRangeOption.text||this._isContinuity())s=(this._isContinuity()?a*d+i:e*(a+i))+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[0]?l.getTextWidth(this.dataRangeOption.text[0],o)+this._textGap:0)+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[1]?l.getTextWidth(this.dataRangeOption.text[1],o)+this._textGap:0);else{a+=5;for(var p=0;e>p;p++)s+=a+l.getTextWidth(t[p],o)+i}s-=i,h=Math.max(r,n)}else{var c;if(this.dataRangeOption.text||this._isContinuity())h=(this._isContinuity()?n*d+i:e*(n+i))+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[0]?this._textGap+r:0)+(this.dataRangeOption.text&&"undefined"!=typeof this.dataRangeOption.text[1]?this._textGap+r:0),c=Math.max(l.getTextWidth(this.dataRangeOption.text&&this.dataRangeOption.text[0]||"",o),l.getTextWidth(this.dataRangeOption.text&&this.dataRangeOption.text[1]||"",o)),s=Math.max(a,c);else{h=(n+i)*e,a+=5,c=0;for(var p=0;e>p;p++)c=Math.max(c,l.getTextWidth(t[p],o));s=a+c}h-=i}var g,u=this.reformCssArray(this.dataRangeOption.padding),_=this.zr.getWidth();switch(this.dataRangeOption.x){case"center":g=Math.floor((_-s)/2);break;case"left":g=u[3]+this.dataRangeOption.borderWidth;break;case"right":g=_-s-u[1]-this.dataRangeOption.borderWidth;break;default:g=this.parsePercent(this.dataRangeOption.x,_),g=isNaN(g)?0:g}var f,y=this.zr.getHeight();switch(this.dataRangeOption.y){case"top":f=u[0]+this.dataRangeOption.borderWidth;break;case"bottom":f=y-h-u[2]-this.dataRangeOption.borderWidth;break;case"center":f=Math.floor((y-h)/2);break;default:f=this.parsePercent(this.dataRangeOption.y,y),f=isNaN(f)?0:f}if(this.dataRangeOption.calculable){var x=Math.max(l.getTextWidth(this.dataRangeOption.max,o),l.getTextWidth(this.dataRangeOption.min,o))+r;"horizontal"==this.dataRangeOption.orient?(x>g&&(g=x),g+s+x>_&&(g-=x)):(r>f&&(f=r),f+h+r>y&&(f-=r))}return{x:g,y:f,width:s,height:h}},_getTextShape:function(t,e,i){return{zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:"horizontal"==this.dataRangeOption.orient?t:this._itemGroupLocation.x+this._itemGroupLocation.width/2,y:"horizontal"==this.dataRangeOption.orient?this._itemGroupLocation.y+this._itemGroupLocation.height/2:e,color:this.dataRangeOption.textStyle.color,text:i,textFont:this.getFont(this.dataRangeOption.textStyle),textBaseline:"horizontal"==this.dataRangeOption.orient?"middle":"top",textAlign:"horizontal"==this.dataRangeOption.orient?"left":"center"},hoverable:!1}},_getItemShape:function(t,e,i,a,n){return{zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:t,y:e+1,width:i,height:a-2,color:n},highlightStyle:{strokeColor:n,lineWidth:1}}},__ondrift:function(t,e,i){var a=this._calculableLocation.x,n=this._calculableLocation.y,s=this._calculableLocation.width,h=this._calculableLocation.height;return"horizontal"==this.dataRangeOption.orient?t.style.x+e<=a?t.style.x=a:t.style.x+e+t.style.width>=a+s?t.style.x=a+s-t.style.width:t.style.x+=e:t.style.y+i<=n?t.style.y=n:t.style.y+i+t.style.height>=n+h?t.style.y=n+h-t.style.height:t.style.y+=i,"filler"==t._type?this._syncHandleShape():this._syncFillerShape(t),this.dataRangeOption.realtime&&this._dispatchDataRange(),!0},__ondragend:function(){this.isDragend=!0},ondragend:function(t,e){this.isDragend&&t.target&&(e.dragOut=!0,e.dragIn=!0,this.dataRangeOption.realtime||this._dispatchDataRange(),e.needRefresh=!1,this.isDragend=!1)},_syncShapeFromRange:function(){var t=this.dataRangeOption.range||{},e=t.start,i=t.end;if(e>i&&(e=[i,i=e][0]),this._range.end=null!=e?e:null!=this._range.end?this._range.end:0,this._range.start=null!=i?i:null!=this._range.start?this._range.start:100,100!=this._range.start||0!==this._range.end){if("horizontal"==this.dataRangeOption.orient){var a=this._fillerShape.style.width;this._fillerShape.style.x+=a*(100-this._range.start)/100,this._fillerShape.style.width=a*(this._range.start-this._range.end)/100}else{var n=this._fillerShape.style.height;this._fillerShape.style.y+=n*(100-this._range.start)/100,this._fillerShape.style.height=n*(this._range.start-this._range.end)/100}this.zr.modShape(this._fillerShape.id),this._syncHandleShape()}},_syncHandleShape:function(){var t=this._calculableLocation.x,e=this._calculableLocation.y,i=this._calculableLocation.width,a=this._calculableLocation.height;"horizontal"==this.dataRangeOption.orient?(this._startShape.style.x=this._fillerShape.style.x,this._startMask.style.width=this._startShape.style.x-t,this._endShape.style.x=this._fillerShape.style.x+this._fillerShape.style.width,this._endMask.style.x=this._endShape.style.x,this._endMask.style.width=t+i-this._endShape.style.x,this._range.start=Math.ceil(100-(this._startShape.style.x-t)/i*100),this._range.end=Math.floor(100-(this._endShape.style.x-t)/i*100)):(this._startShape.style.y=this._fillerShape.style.y,this._startMask.style.height=this._startShape.style.y-e,this._endShape.style.y=this._fillerShape.style.y+this._fillerShape.style.height,this._endMask.style.y=this._endShape.style.y,this._endMask.style.height=e+a-this._endShape.style.y,this._range.start=Math.ceil(100-(this._startShape.style.y-e)/a*100),this._range.end=Math.floor(100-(this._endShape.style.y-e)/a*100)),this._syncShape()},_syncFillerShape:function(t){var e,i,a=this._calculableLocation.x,n=this._calculableLocation.y,s=this._calculableLocation.width,h=this._calculableLocation.height;"horizontal"==this.dataRangeOption.orient?(e=this._startShape.style.x,i=this._endShape.style.x,t.id==this._startShape.id&&e>=i?(i=e,this._endShape.style.x=e):t.id==this._endShape.id&&e>=i&&(e=i,this._startShape.style.x=e),this._fillerShape.style.x=e,this._fillerShape.style.width=i-e,this._startMask.style.width=e-a,this._endMask.style.x=i,this._endMask.style.width=a+s-i,this._range.start=Math.ceil(100-(e-a)/s*100),this._range.end=Math.floor(100-(i-a)/s*100)):(e=this._startShape.style.y,i=this._endShape.style.y,t.id==this._startShape.id&&e>=i?(i=e,this._endShape.style.y=e):t.id==this._endShape.id&&e>=i&&(e=i,this._startShape.style.y=e),this._fillerShape.style.y=e,this._fillerShape.style.height=i-e,this._startMask.style.height=e-n,this._endMask.style.y=i,this._endMask.style.height=n+h-i,this._range.start=Math.ceil(100-(e-n)/h*100),this._range.end=Math.floor(100-(i-n)/h*100)),this._syncShape()},_syncShape:function(){this._startShape.position=[this._startShape.style.x-this._startShape.style._x,this._startShape.style.y-this._startShape.style._y],this._startShape.style.text=this._textFormat(this._gap*this._range.start+this.dataRangeOption.min),this._startShape.style.color=this._startShape.highlightStyle.strokeColor=this.getColor(this._gap*this._range.start+this.dataRangeOption.min),this._endShape.position=[this._endShape.style.x-this._endShape.style._x,this._endShape.style.y-this._endShape.style._y],this._endShape.style.text=this._textFormat(this._gap*this._range.end+this.dataRangeOption.min),this._endShape.style.color=this._endShape.highlightStyle.strokeColor=this.getColor(this._gap*this._range.end+this.dataRangeOption.min),this.zr.modShape(this._startShape.id),this.zr.modShape(this._endShape.id),this.zr.modShape(this._startMask.id),this.zr.modShape(this._endMask.id),this.zr.modShape(this._fillerShape.id),this.zr.refreshNextFrame()},_dispatchDataRange:function(){this.messageCenter.dispatch(h.EVENT.DATA_RANGE,null,{range:{start:this._range.end,end:this._range.start}},this.myChart)},__dataRangeSelected:function(t){if("single"===this.dataRangeOption.selectedMode)for(var e in this._selectedMap)this._selectedMap[e]=!1;var i=t.target._idx;this._selectedMap[i]=!this._selectedMap[i];var a,n;this._useCustomizedSplit()?(a=this._splitList[i].max,n=this._splitList[i].min):(a=(this._colorList.length-i)*this._gap+this.dataRangeOption.min,n=a-this._gap),this.messageCenter.dispatch(h.EVENT.DATA_RANGE_SELECTED,t.event,{selected:this._selectedMap,target:i,valueMax:a,valueMin:n},this.myChart),this.messageCenter.dispatch(h.EVENT.REFRESH,null,null,this.myChart)},__dispatchHoverLink:function(t){var e,i;if(this.dataRangeOption.calculable){var a,n=this.dataRangeOption.max-this.dataRangeOption.min;a="horizontal"==this.dataRangeOption.orient?(1-(r.getX(t.event)-this._calculableLocation.x)/this._calculableLocation.width)*n:(1-(r.getY(t.event)-this._calculableLocation.y)/this._calculableLocation.height)*n,e=a-.05*n,i=a+.05*n}else if(this._useCustomizedSplit()){var s=t.target._idx;i=this._splitList[s].max,e=this._splitList[s].min}else{var s=t.target._idx;i=(this._colorList.length-s)*this._gap+this.dataRangeOption.min,e=i-this._gap}this.messageCenter.dispatch(h.EVENT.DATA_RANGE_HOVERLINK,t.event,{valueMin:e,valueMax:i},this.myChart)},__onhoverlink:function(t){if(this.dataRangeOption.show&&this.dataRangeOption.hoverLink&&this._indicatorShape&&t&&null!=t.seriesIndex&&null!=t.dataIndex){var e=t.value;if(""===e||isNaN(e))return;e<this.dataRangeOption.min?e=this.dataRangeOption.min:e>this.dataRangeOption.max&&(e=this.dataRangeOption.max),this._indicatorShape.position="horizontal"==this.dataRangeOption.orient?[(this.dataRangeOption.max-e)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._calculableLocation.width,0]:[0,(this.dataRangeOption.max-e)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._calculableLocation.height],this._indicatorShape.style.text=this._textFormat(t.value),this._indicatorShape.style.color=this.getColor(e),this.zr.addHoverShape(this._indicatorShape)}},_textFormat:function(t,e){var i=this.dataRangeOption;if(t!==-Number.MAX_VALUE&&(t=(+t).toFixed(i.precision)),null!=e&&e!==Number.MAX_VALUE&&(e=(+e).toFixed(i.precision)),i.formatter){if("string"==typeof i.formatter)return i.formatter.replace("{value}",t===-Number.MAX_VALUE?"min":t).replace("{value2}",e===Number.MAX_VALUE?"max":e);if("function"==typeof i.formatter)return i.formatter.call(this.myChart,t,e)}return null==e?t:t===-Number.MAX_VALUE?"< "+e:e===Number.MAX_VALUE?"> "+t:t+" - "+e},_isContinuity:function(){var t=this.dataRangeOption;return!(t.splitList?t.splitList.length>0:t.splitNumber>0)||t.calculable},_useCustomizedSplit:function(){var t=this.dataRangeOption;return t.splitList&&t.splitList.length>0},_buildColorList:function(t){if(this._colorList=d.getGradientColors(this.dataRangeOption.color,Math.max((t-this.dataRangeOption.color.length)/(this.dataRangeOption.color.length-1),0)+1),this._colorList.length>t){for(var e=this._colorList.length,i=[this._colorList[0]],a=e/(t-1),n=1;t-1>n;n++)i.push(this._colorList[Math.floor(n*a)]);i.push(this._colorList[e-1]),this._colorList=i}if(this._useCustomizedSplit())for(var s=this._splitList,n=0,e=s.length;e>n;n++)s[n].color&&(this._colorList[n]=s[n].color)},_buildGap:function(t){if(!this._useCustomizedSplit()){var e=this.dataRangeOption.precision;for(this._gap=(this.dataRangeOption.max-this.dataRangeOption.min)/t;this._gap.toFixed(e)-0!=this._gap&&5>e;)e++;this.dataRangeOption.precision=e,this._gap=((this.dataRangeOption.max-this.dataRangeOption.min)/t).toFixed(e)-0}},_buildDataList:function(t){for(var e=this._valueTextList=[],i=this.dataRangeOption,a=this._useCustomizedSplit(),n=0;t>n;n++){this._selectedMap[n]=!0;var s="";if(a){var h=this._splitList[t-1-n];s=null!=h.label?h.label:null!=h.single?this._textFormat(h.single):this._textFormat(h.min,h.max)}else s=this._textFormat(n*this._gap+i.min,(n+1)*this._gap+i.min);e.unshift(s)}},_buildSplitList:function(){if(this._useCustomizedSplit())for(var t=this.dataRangeOption.splitList,e=this._splitList=[],i=0,a=t.length;a>i;i++){var n=t[i];if(!n||null==n.start&&null==n.end)throw new Error("Empty item exists in splitList!");var s={label:n.label,color:n.color};s.min=n.start,s.max=n.end,s.min>s.max&&(s.min=[s.max,s.max=s.min][0]),s.min===s.max&&(s.single=s.max),null==s.min&&(s.min=-Number.MAX_VALUE),null==s.max&&(s.max=Number.MAX_VALUE),e.push(s)
}},refresh:function(t){if(t){this.option=t,this.option.dataRange=this.reformOption(this.option.dataRange);var e=this.dataRangeOption=this.option.dataRange;if(!this._useCustomizedSplit()&&(null==e.min||null==e.max))throw new Error("option.dataRange.min or option.dataRange.max has not been defined.");this.myChart.canvasSupported||(e.realtime=!1);var i=this._isContinuity()?100:this._useCustomizedSplit()?e.splitList.length:e.splitNumber;this._buildSplitList(),this._buildColorList(i),this._buildGap(i),this._buildDataList(i)}this.clear(),this._buildShape()},getColor:function(t){if(isNaN(t))return null;var e;if(this._useCustomizedSplit()){for(var i=this._splitList,a=0,n=i.length;n>a;a++)if(i[a].min<=t&&i[a].max>=t){e=a;break}}else{if(this.dataRangeOption.min==this.dataRangeOption.max)return this._colorList[0];if(t<this.dataRangeOption.min?t=this.dataRangeOption.min:t>this.dataRangeOption.max&&(t=this.dataRangeOption.max),this.dataRangeOption.calculable&&(t-(this._gap*this._range.start+this.dataRangeOption.min)>5e-5||t-(this._gap*this._range.end+this.dataRangeOption.min)<-5e-5))return null;e=this._colorList.length-Math.ceil((t-this.dataRangeOption.min)/(this.dataRangeOption.max-this.dataRangeOption.min)*this._colorList.length),e==this._colorList.length&&e--}return this._selectedMap[e]?this._colorList[e]:null},getColorByIndex:function(t){return t>=this._colorList.length?t=this._colorList.length-1:0>t&&(t=0),this._colorList[t]},onbeforDispose:function(){this.messageCenter.unbind(h.EVENT.HOVER,this._onhoverlink)}},o.inherits(e,i),t("../component").define("dataRange",e),e}),define("echarts/layout/WordCloudRectZero",["require"],function(){function t(t){this.defaultOption={type:"RECT"},this._init(t)}return t.prototype={RECT:"_calculateRect",_init:function(t){this._initOption(t),this._initCanvas()},_initOption:function(t){for(k in t)this.defaultOption[k]=t[k]},_initCanvas:function(){var t=document.createElement("canvas");t.width=1,t.height=1;var e=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2);if(t.width=this.defaultOption.width,t.height=this.defaultOption.height,t.getContext)var i=t.getContext("2d");this.canvas=t,this.ctx=i,this.ratio=e},calculate:function(t,e){var i=this.defaultOption.type,a=this[i];this[a].call(this,t,e)},_calculateReturn:function(t,e,i){e.call(i,t)},_calculateRect:function(t,e){var i={},a=this.defaultOption.width>>5<<5,n=this.defaultOption.height;i.initarr=this._rectZeroArray(a*n),i.area=a*n,i.maxHit=n,i.maxWit=a,i.imgboard=this._rectBoard(a,n),this._calculateReturn(i,t,e)},_rectBoard:function(t,e){for(var i=[],a=0;e>a;a++)i.push({y:a,start:0,end:t});for(var n=[],a=0;t>a;a++)n.push({x:a,start:0,end:e});return{row:i,cloumn:n}},_rectZeroArray:function(t){for(var e=[],i=t,a=-1;++a<i;)e[a]=0;return e}},t}),define("echarts/util/shape/HandlePolygon",["require","zrender/shape/Base","zrender/shape/Polygon","zrender/tool/util"],function(t){function e(t){i.call(this,t)}var i=t("zrender/shape/Base"),a=t("zrender/shape/Polygon"),n=t("zrender/tool/util");return e.prototype={type:"handle-polygon",buildPath:function(t,e){a.prototype.buildPath(t,e)},isCover:function(t,e){var i=this.transformCoordToLocal(t,e);t=i[0],e=i[1];var a=this.style.rect;return t>=a.x&&t<=a.x+a.width&&e>=a.y&&e<=a.y+a.height?!0:!1}},n.inherits(e,i),e});