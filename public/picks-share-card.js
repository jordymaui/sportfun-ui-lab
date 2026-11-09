import { bestPicks } from './picks-data.js';

// The same weighted historic contributions power the profile and this export.
export async function buildPicksShareCard(profile, players, {loadImage}) {
  const story = profile.format === 'story';
  const width = 1080, height = story ? 1920 : 1080;
  const layoutHeight = story ? 1632 : 1080;
  const [logo, avatar, diamond, shirts] = await Promise.all([
    loadImage('/assets/wordmark.png'),
    loadImage('/assets/endgame-avatar.png'),
    loadImage('/assets/diamond-achievement.png'),
    Promise.all(bestPicks.entries.map(entry => loadImage(`/assets/shirt-${players[entry.playerIndex].shirt}.webp`))),
    document.fonts.load('600 64px Inter'),
    document.fonts.load('500 32px "DM Mono"'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext('2d');
  const colour={canvas:'#080a0f',surface:'#111118',panel:'#18181f',line:'#232b34',text:'#eff1f2',muted:'#8c9399',green:'#00c62d',teal:'#00e2c4'};
  const panel=(x,y,w,h,r,fill=colour.panel,stroke)=>{
    ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
  };
  const text=(value,x,y,size=28,weight=400,fill=colour.text,align='left',family='Inter')=>{
    ctx.font=`${weight} ${size}px "${family}"`;ctx.fillStyle=fill;ctx.textAlign=align;ctx.fillText(String(value),x,y);
  };
  const fitted=(value,x,y,maxWidth,size,weight=500,fill=colour.text,align='left')=>{
    const letters=Array.from(String(value));
    ctx.font=`${weight} ${size}px Inter`;
    while(ctx.measureText(letters.join('')).width>maxWidth&&size>22){size-=2;ctx.font=`${weight} ${size}px Inter`;}
    if(ctx.measureText(letters.join('')).width>maxWidth){
      while(letters.length&&ctx.measureText(letters.join('')+'…').width>maxWidth)letters.pop();
      letters.push('…');
    }
    text(letters.join(''),x,y,size,weight,fill,align);
  };
  const rule=y=>{ctx.strokeStyle=colour.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(64,y);ctx.lineTo(1016,y);ctx.stroke();};
  const score=value=>Number(value).toFixed(1);
  const advantage=Math.round((bestPicks.total/bestPicks.average-1)*100);

  ctx.fillStyle=colour.canvas;ctx.fillRect(0,0,width,height);
  ctx.save();ctx.translate(0,(height-layoutHeight)/2);
  panel(32,32,1016,layoutHeight-64,28,colour.surface);
  ctx.drawImage(logo,64,56,184,184*logo.height/logo.width);
  text('BEST PICKS',1016,88,28,500,colour.muted,'right','DM Mono');
  rule(128);

  ctx.save();ctx.beginPath();ctx.arc(104,196,40,0,Math.PI*2);ctx.clip();ctx.drawImage(avatar,64,156,80,80);ctx.restore();
  fitted(profile.name,164,193,550,40,600);
  text('12 Oct 2025 · Tournament 10',164,232,24,400,colour.muted);
  ctx.drawImage(diamond,940,158,76,76);
  text('DIAMOND',920,190,24,500,'#bdeeff','right','DM Mono');
  text('DIVISION',920,224,22,500,colour.muted,'right','DM Mono');

  const resultY=270,resultHeight=story?256:180;
  panel(64,resultY,952,resultHeight,24,'#111b19','#24563a');
  text('PERSONAL BEST',96,resultY+42,26,500,'#bde4ce','left','DM Mono');
  const totalBaseline=resultY+(story?166:128);
  text(score(bestPicks.total),96,totalBaseline,story?112:88,500);
  text('PTS',story?440:370,totalBaseline,26,500,colour.muted);
  text('DIAMOND AVERAGE',984,resultY+42,26,500,colour.muted,'right','DM Mono');
  text(score(bestPicks.average),984,totalBaseline,story?80:64,500,'#c1c8c4','right');
  text(`↑ ${advantage}% above average`,984,resultY+resultHeight-22,24,500,colour.green,'right');
  if(story)text('Your five picks · captain bonus included',96,resultY+resultHeight-22,24,400,colour.muted);

  text('THE FIVE THAT DID IT',64,story?566:490,26,500,colour.muted,'left','DM Mono');
  const drawPick=(entry,index,x,y,w,h)=>{
    const player=players[entry.playerIndex],shirt=shirts[index];
    const accent=entry.captain?colour.teal:colour.green;
    panel(x,y,w,h,18,entry.captain?'#112823':colour.panel,entry.captain?'#05b4a4':'#2b3239');
    const pillWidth=story?104:82,pillHeight=story?42:34,pillX=x+w-pillWidth-12,pillY=y+12;
    ctx.save();
    if(entry.captain){ctx.shadowColor='#00e2c455';ctx.shadowBlur=14;}
    panel(pillX,pillY,pillWidth,pillHeight,pillHeight/2,entry.captain?colour.teal:colour.panel,entry.captain?colour.teal:'#484c4f');
    ctx.restore();
    text(score(entry.score),pillX+pillWidth/2,pillY+(story?32:26),story?32:26,600,entry.captain?'#052821':accent,'center');
    if(entry.captain){
      const boostWidth=story?52:42,boostHeight=story?20:17;
      panel(pillX+pillWidth-boostWidth+1,pillY+pillHeight-1,boostWidth,boostHeight,8,'#071313',colour.teal);
      text(`${entry.multiplier}×`,pillX+pillWidth-boostWidth/2+1,pillY+pillHeight+boostHeight-5,story?15:13,600,'#b7fff4','center');
    }

    const shirtHeight=story?190:144,shirtWidth=shirtHeight*shirt.width/shirt.height,shirtY=y+70;
    ctx.drawImage(shirt,x+(w-shirtWidth)/2,shirtY,shirtWidth,shirtHeight);
    text(player.number,x+w/2,shirtY+shirtHeight*.41,story?40:28,600,player.shirt===2?colour.surface:colour.text,'center');
    if(entry.captain){
      const markerWidth=story?42:34,markerHeight=story?36:30;
      ctx.save();ctx.translate(x+(story?50:27),shirtY+12);ctx.rotate(-12*Math.PI/180);
      ctx.shadowColor='#03ffcc55';ctx.shadowBlur=12;
      panel(-markerWidth/2,-markerHeight/2,markerWidth,markerHeight,5,colour.teal);
      ctx.shadowBlur=0;text('C',0,story?10:8,story?27:23,700,'#07352e','center');ctx.restore();
    }
    fitted(story?player.name:player.short,x+w/2,y+h-54,w-24,story?30:24,500,colour.text,'center');
    text(player.position,x+w/2,y+h-22,story?24:22,500,colour.muted,'center','DM Mono');
  };

  bestPicks.entries.forEach((entry,index)=>{
    if(story){
      const row=index<3?0:1,column=row?index-3:index;
      drawPick(entry,index,(row?228:64)+column*328,590+row*368,296,344);
    }else drawPick(entry,index,64+index*193.6,514,177.6,306);
  });

  const comparisonY=story?1340:854;
  text('Your picks',64,comparisonY,24,400,colour.muted);
  text(score(bestPicks.total),1016,comparisonY,24,500,colour.text,'right');
  panel(64,comparisonY+14,952,6,3,colour.green);
  text('Diamond average',64,comparisonY+48,24,400,colour.muted);
  text(score(bestPicks.average),1016,comparisonY+48,24,400,colour.muted,'right');
  panel(64,comparisonY+62,952*Math.min(1,bestPicks.average/bestPicks.total),6,3,'#484c4f');
  if(!story)text('Captain’s 1.5× bonus included',64,944,22,400,colour.muted);
  rule(story?1520:968);
  text('sport.fun',64,story?1572:1008,26,500);
  text('CONCEPT · SAMPLE DATA',1016,story?1572:1008,24,500,colour.muted,'right','DM Mono');
  ctx.restore();
  return canvas;
}
