// The profile export uses the same type hierarchy and flat panels as the game.
// Coordinates are export pixels; preview and download use this one renderer.
export async function buildProfileShareCard(profile, {loadImage, getClubBadge}) {
  const story = profile.format === 'story';
  const width = 1080, height = story ? 1920 : 1080;
  const layoutHeight = story ? 1456 : 1080;
  const offset = (height - layoutHeight) / 2;
  const clubPath = getClubBadge(profile.club);
  const [logo, cover, avatar, division, club] = await Promise.all([
    loadImage('/assets/wordmark.png'),
    loadImage('/assets/endgame-cover-v1.png'),
    loadImage('/assets/endgame-avatar.png'),
    loadImage('/assets/division.webp'),
    clubPath ? loadImage(clubPath) : Promise.resolve(null),
    document.fonts.load('600 64px Inter'),
    document.fonts.load('500 32px "DM Mono"'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const colour = {canvas:'#080a0f',surface:'#111118',panel:'#18181f',line:'#232b34',text:'#eff1f2',muted:'#7a8085'};
  const panel = (x,y,w,h,r,fill) => {
    ctx.fillStyle=fill;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
  };
  const text = (value,x,y,size=32,weight=400,fill=colour.text,align='left',family='Inter') => {
    ctx.fillStyle=fill;ctx.textAlign=align;ctx.font=`${weight} ${size}px "${family}"`;ctx.fillText(value,x,y);
  };
  const fittedText = (value,x,y,maxWidth,size,weight=400,fill=colour.text) => {
    ctx.font=`${weight} ${size}px Inter`;
    while(ctx.measureText(value).width>maxWidth && size>28){size-=2;ctx.font=`${weight} ${size}px Inter`;}
    text(value,x,y,size,weight,fill);
  };
  const shortText = (value,maxWidth,size=30) => {
    ctx.font=`400 ${size}px Inter`;
    const characters=Array.from(value);
    if(ctx.measureText(value).width<=maxWidth)return value;
    while(characters.length && ctx.measureText(characters.join('')+'…').width>maxWidth)characters.pop();
    return characters.join('')+'…';
  };
  const rule = (y) => {ctx.strokeStyle=colour.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(64,y);ctx.lineTo(1016,y);ctx.stroke();};
  const imageCover = (img,x,y,w,h,r,verticalPosition=.32) => {
    const scale=Math.max(w/img.width,h/img.height),sw=w/scale,sh=h/scale;
    const sx=(img.width-sw)*.75,sy=(img.height-sh)*verticalPosition;
    ctx.save();ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.clip();
    ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);ctx.restore();
  };

  ctx.fillStyle=colour.canvas;ctx.fillRect(0,0,width,height);
  ctx.save();ctx.translate(0,offset);
  panel(32,32,1016,layoutHeight-64,28,colour.surface);
  ctx.drawImage(logo,64,56,184,184*logo.height/logo.width);
  text('MANAGER PROFILE',1016,88,28,500,colour.muted,'right','DM Mono');
  rule(128);

  const coverHeight=story?384:272,coverBottom=152+coverHeight;
  imageCover(cover,64,152,952,coverHeight,16);
  // Avatar overlaps the cover edge, leaving the name and metadata on a solid surface.
  const avatarX=172,avatarY=coverBottom+16;
  ctx.fillStyle=colour.surface;ctx.beginPath();ctx.arc(avatarX,avatarY,92,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(avatarX,avatarY,84,0,Math.PI*2);ctx.clip();
  ctx.drawImage(avatar,avatarX-84,avatarY-84,168,168);ctx.restore();
  fittedText(profile.name,280,coverBottom+56,712,64,600);
  const handle='@'+profile.name.toLowerCase().replace(/\s/g,'');
  text(shortText(handle,712,30),280,coverBottom+102,30,400,colour.muted);

  const detailsY=coverBottom+128;
  if(club)ctx.drawImage(club,64,detailsY+12,56,56);
  else {
    ctx.fillStyle=colour.text;ctx.beginPath();ctx.arc(92,detailsY+40,22,0,Math.PI*2);ctx.fill();
    text(Array.from(profile.club)[0]?.toUpperCase()||'F',92,detailsY+49,26,600,colour.surface,'center');
  }
  text('SUPPORTED CLUB',132,detailsY+23,24,500,colour.muted,'left','DM Mono');
  text(shortText(profile.club,500,32),132,detailsY+65,32,500);
  panel(696,detailsY+16,320,52,26,colour.panel);
  ctx.drawImage(division,714,detailsY+25,29,34);
  text('Diamond division',756,detailsY+51,28,500);

  const statY=coverBottom+224,statHeight=240,gap=24;
  const stats=[
    {label:'SEASON RANK',rank:'#128',managers:'of 6,400',period:'2026/27'},
    {label:'BEST RANK',rank:'#84',managers:'of 5,200',period:'2025/26'},
  ];
  stats.forEach((stat,index)=>{
    const x=story?64:64+index*488,y=story?statY+index*(statHeight+gap):statY,w=story?952:464;
    panel(x,y,w,statHeight,24,colour.panel);
    text(stat.label,x+32,y+52,30,500,colour.muted,'left','DM Mono');
    text(stat.rank,x+32,y+154,88,500);
    if(story){
      text(stat.managers,x+w-32,y+150,32,400,colour.muted,'right');
      text(stat.period+' season',x+w-32,y+206,30,400,colour.muted,'right');
    }else text(stat.managers+' · '+stat.period,x+32,y+208,28,400,colour.muted);
  });
  const statBottom=statY+(story?statHeight*2+gap:statHeight);
  rule(statBottom+64);
  text('sport.fun',64,statBottom+112,28,500);
  text('CONCEPT · SAMPLE DATA',1016,statBottom+112,28,500,colour.muted,'right','DM Mono');
  ctx.restore();
  return canvas;
}
