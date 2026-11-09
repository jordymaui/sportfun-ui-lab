// Achievement composition shared by the on-screen preview and PNG download.
// Values are the same illustrative season, record and participation data as the profile.
export async function buildProfileShareCard(profile, {loadImage, getClubBadge}) {
  const story = profile.format === 'story';
  const width = 1080, height = story ? 1920 : 1080;
  const layoutHeight = story ? 1632 : 1080;
  const clubPath = getClubBadge(profile.club);
  const [logo, cover, avatar, diamond, record, milestone, club] = await Promise.all([
    loadImage('/assets/wordmark.png'),
    loadImage('/assets/endgame-cover-v1.png'),
    loadImage('/assets/endgame-avatar.png'),
    loadImage('/assets/diamond-achievement.png'),
    loadImage('/assets/world-best-achievement.png'),
    loadImage('/assets/tournament-milestone.png'),
    clubPath ? loadImage(clubPath) : Promise.resolve(null),
    document.fonts.load('600 64px Inter'),
    document.fonts.load('500 32px "DM Mono"'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const colour = {canvas:'#080a0f',surface:'#111118',panel:'#18181f',line:'#232b34',text:'#eff1f2',muted:'#8c9399',ice:'#bdeeff',gold:'#f0dfad',green:'#00c62d'};
  const panel = (x,y,w,h,r,fill=colour.panel,stroke) => {
    ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
  };
  const text = (value,x,y,size=32,weight=400,fill=colour.text,align='left',family='Inter') => {
    ctx.fillStyle=fill;ctx.textAlign=align;ctx.font=`${weight} ${size}px "${family}"`;ctx.fillText(value,x,y);
  };
  const shortText = (value,maxWidth,size=30,weight=400) => {
    ctx.font=`${weight} ${size}px Inter`;
    const characters=Array.from(value);
    if(ctx.measureText(value).width<=maxWidth)return value;
    while(characters.length && ctx.measureText(characters.join('')+'…').width>maxWidth)characters.pop();
    return characters.join('')+'…';
  };
  const fittedText = (value,x,y,maxWidth,size,weight=400,fill=colour.text) => {
    ctx.font=`${weight} ${size}px Inter`;
    while(ctx.measureText(value).width>maxWidth && size>28){size-=2;ctx.font=`${weight} ${size}px Inter`;}
    text(shortText(value,maxWidth,size,weight),x,y,size,weight,fill);
  };
  const rule = y => {ctx.strokeStyle=colour.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(64,y);ctx.lineTo(1016,y);ctx.stroke();};
  const imageCover = (img,x,y,w,h,r) => {
    const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;
    ctx.save();ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.clip();
    ctx.drawImage(img,(img.width-sw)*.75,(img.height-sh)*.32,sw,sh,x,y,w,h);ctx.restore();
  };
  const badge = (img,x,y,size,glow) => {
    ctx.save();ctx.shadowColor=glow;ctx.shadowBlur=22;ctx.drawImage(img,x,y,size,size);ctx.restore();
  };
  const trend = (x,y,w,h) => {
    const points=[[0,.92],[.16,.72],[.31,.79],[.46,.49],[.60,.57],[.75,.24],[.89,.31],[1,0]];
    ctx.strokeStyle=colour.green;ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();
    points.forEach(([px,py],i)=>i?ctx.lineTo(x+px*w,y+py*h):ctx.moveTo(x+px*w,y+py*h));ctx.stroke();
    ctx.fillStyle=colour.green;ctx.beginPath();ctx.arc(x+w,y,4,0,Math.PI*2);ctx.fill();
  };

  ctx.fillStyle=colour.canvas;ctx.fillRect(0,0,width,height);
  ctx.save();ctx.translate(0,(height-layoutHeight)/2);
  panel(32,32,1016,layoutHeight-64,28,colour.surface);
  ctx.drawImage(logo,64,56,184,184*logo.height/logo.width);
  text('MANAGER PROFILE',1016,88,28,500,colour.muted,'right','DM Mono');
  rule(128);

  const coverHeight=story?320:216,coverBottom=152+coverHeight;
  imageCover(cover,64,152,952,coverHeight,16);
  const avatarX=story?164:148,avatarY=coverBottom+(story?8:0),avatarRadius=story?84:72;
  ctx.fillStyle=colour.surface;ctx.beginPath();ctx.arc(avatarX,avatarY,avatarRadius+8,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(avatarX,avatarY,avatarRadius,0,Math.PI*2);ctx.clip();
  ctx.drawImage(avatar,avatarX-avatarRadius,avatarY-avatarRadius,avatarRadius*2,avatarRadius*2);ctx.restore();
  const nameX=story?284:248,nameY=story?528:416,nameWidth=story?496:536;
  fittedText(profile.name,nameX,nameY,nameWidth,story?64:56,600);
  const handle='@'+profile.name.toLowerCase().replace(/\s/g,'');
  text(shortText(handle,nameWidth,28),nameX,nameY+40,28,400,colour.muted);

  // The earned crest is the visual anchor, separate from the supported-club badge.
  const diamondSize=story?220:160,diamondX=story?796:820,diamondY=story?392:300;
  ctx.fillStyle=colour.surface;ctx.beginPath();ctx.arc(diamondX+diamondSize/2,diamondY+diamondSize/2,diamondSize/2+12,0,Math.PI*2);ctx.fill();
  badge(diamond,diamondX,diamondY,diamondSize,'#7ddaff44');
  const diamondLabelY=story?646:486;
  text('EARNED DIVISION',diamondX+diamondSize/2,diamondLabelY,story?22:20,500,colour.muted,'center','DM Mono');
  text('Diamond',diamondX+diamondSize/2,diamondLabelY+(story?44:35),story?40:34,600,colour.ice,'center');

  const clubY=story?614:474;
  if(club)ctx.drawImage(club,64,clubY,40,40);
  else {
    ctx.fillStyle=colour.text;ctx.beginPath();ctx.arc(84,clubY+20,18,0,Math.PI*2);ctx.fill();
    text(Array.from(profile.club)[0]?.toUpperCase()||'F',84,clubY+28,22,600,colour.surface,'center');
  }
  text('SUPPORTED CLUB',120,clubY+8,22,500,colour.muted,'left','DM Mono');
  text(shortText(profile.club,620,30,500),120,clubY+46,30,500);

  const season={x:64,y:story?720:544,w:story?952:464,h:story?256:252};
  panel(season.x,season.y,season.w,season.h,24,'#111b19','#24563a');
  text('SEASON RANK',96,season.y+(story?48:40),story?28:26,500,colour.muted,'left','DM Mono');
  text('#128',96,season.y+(story?148:122),story?96:76,500);
  if(story){
    text('↑ 12 places',384,season.y+146,28,500,colour.green);
    trend(760,season.y+62,216,64);
    text('of 6,400 · 2026/27',96,season.y+200,28,400,colour.muted);
    text('Top 2% worldwide',984,season.y+200,30,500,colour.ice,'right');
    panel(96,season.y+228,888,6,3,colour.line);panel(96,season.y+228,870,6,3,colour.green);
  }else{
    trend(390,season.y+71,100,46);
    text('Top 2% worldwide',96,season.y+162,28,500,colour.ice);
    text('of 6,400 · 2026/27',96,season.y+200,26,400,colour.muted);
    text('↑ 12 places',96,season.y+234,24,500,colour.green);
  }

  const best={x:story?64:552,y:story?996:544,w:story?952:464,h:story?280:252};
  panel(best.x,best.y,best.w,best.h,24,'#1c1a16','#625534');
  text('ALL-TIME BEST',best.x+32,best.y+(story?48:40),story?28:26,500,colour.muted,'left','DM Mono');
  text('#84',best.x+32,best.y+(story?154:122),story?100:76,500,colour.gold);
  if(story){
    text('Worldwide',328,best.y+150,28,500,colour.gold);
    text('12 Oct 2025',96,best.y+218,30,400,colour.text);
    text('2025/26 season',96,best.y+254,26,400,colour.muted);
    badge(record,772,best.y+40,212,'#fdb91322');
  }else{
    text('Worldwide',584,best.y+162,28,500,colour.gold);
    text('12 Oct 2025',584,best.y+200,26,400,colour.text);
    text('2025/26 season',584,best.y+234,24,400,colour.muted);
    badge(record,856,best.y+68,128,'#fdb91322');
  }

  // A horizontal milestone ribbon gives participation its own achievement treatment.
  const ribbonY=story?1296:816;
  panel(64,ribbonY,952,story?192:120,24,'#151d23','#304650');
  badge(milestone,80,ribbonY+(story?16:8),story?160:104,'#6ec8e62a');
  text('24',story?272:208,ribbonY+(story?120:79),story?88:64,500);
  const ribbonTextX=story?424:320;
  text('TOURNAMENTS PLAYED',ribbonTextX,ribbonY+(story?54:40),story?28:26,500,colour.muted,'left','DM Mono');
  text('Top 5% of users',ribbonTextX,ribbonY+(story?106:82),story?32:28,500,colour.ice);
  if(story)text('For tournament participation',424,ribbonY+152,26,400,colour.muted);
  else {
    for(let i=0;i<24;i++)panel(772+(i%12)*18,ribbonY+40+Math.floor(i/12)*23,12,12,3,i%6===5?colour.ice:'#7193a4');
  }

  const footerRule=story?1520:968,footerY=story?1572:1008;
  rule(footerRule);
  text('sport.fun',64,footerY,26,500);
  text('CONCEPT · SAMPLE DATA',1016,footerY,24,500,colour.muted,'right','DM Mono');
  ctx.restore();
  return canvas;
}
