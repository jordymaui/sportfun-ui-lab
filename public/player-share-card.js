// Export pixels follow the profile card's spacing and the game's flat panels.
// Preview and PNG download use this renderer for the selected player.
export async function buildPlayerShareCard(profile, player, {loadImage, getClubBadge}) {
  const story = profile.format === 'story';
  const width = 1080, height = story ? 1920 : 1080;
  const layoutHeight = story ? 1456 : 1080;
  const clubPath = getClubBadge(player.team);
  const [logo, shirt, avatar, club] = await Promise.all([
    loadImage('/assets/wordmark.png'),
    loadImage(`/assets/shirt-${player.shirt}.webp`),
    loadImage('/assets/endgame-avatar.png'),
    clubPath ? loadImage(clubPath) : Promise.resolve(null),
    document.fonts.load('600 56px Inter'),
    document.fonts.load('500 32px "DM Mono"'),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const colour = {canvas:'#080a0f',surface:'#111118',panel:'#18181f',line:'#232b34',text:'#eff1f2',muted:'#7a8085',positive:'#00c62d',negative:'#ff4e00'};
  const panel = (x,y,w,h,r,fill=colour.panel) => {
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
  const rule = y => {ctx.strokeStyle=colour.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(64,y);ctx.lineTo(1016,y);ctx.stroke();};

  ctx.fillStyle=colour.canvas;ctx.fillRect(0,0,width,height);
  ctx.save();ctx.translate(0,(height-layoutHeight)/2);
  panel(32,32,1016,layoutHeight-64,28,colour.surface);
  ctx.drawImage(logo,64,56,184,184*logo.height/logo.width);
  text('PLAYER SPOTLIGHT',1016,88,28,500,colour.muted,'right','DM Mono');
  rule(128);

  const identityHeight=story?472:360,identityCenter=160+identityHeight/2;
  panel(64,160,952,identityHeight,24);
  ctx.fillStyle=colour.surface;ctx.beginPath();ctx.arc(224,identityCenter,136,0,Math.PI*2);ctx.fill();
  const shirtHeight=232,shirtWidth=shirtHeight*shirt.width/shirt.height;
  ctx.drawImage(shirt,224-shirtWidth/2,identityCenter-shirtHeight/2,shirtWidth,shirtHeight);
  text(String(player.number),224,identityCenter-22,48,600,player.shirt===2?colour.surface:colour.text,'center');
  text('FOOTBALL',400,identityCenter-72,26,500,colour.muted,'left','DM Mono');
  fittedText(player.name,400,identityCenter-8,584,56,600);
  if(club)ctx.drawImage(club,400,identityCenter+24,40,40);
  const teamX=club?452:400;
  fittedText(`${player.team} · ${player.position}`,teamX,identityCenter+55,984-teamX,32,400,colour.muted);

  const statY=160+identityHeight+32,statHeight=240,gap=24;
  const numericChange=Number.parseFloat(player.change.replace('−','-'));
  const changeColour=numericChange>0?colour.positive:numericChange<0?colour.negative:colour.text;
  const stats=[
    {label:'PERFORMANCE',value:player.points,context:'Last tournament',colour:colour.text},
    {label:'24H CHANGE',value:player.change,context:'Share price',colour:changeColour},
  ];
  stats.forEach((stat,index)=>{
    const x=story?64:64+index*488,y=story?statY+index*(statHeight+gap):statY,w=story?952:464;
    panel(x,y,w,statHeight,24);
    text(stat.label,x+32,y+52,30,500,colour.muted,'left','DM Mono');
    fittedText(stat.value,x+32,y+154,w-64,88,500,stat.colour);
    text(stat.context,story?x+w-32:x+32,y+208,28,400,colour.muted,story?'right':'left');
  });

  const statBottom=statY+(story?statHeight*2+gap:statHeight);
  const attributionY=statBottom+40;
  ctx.save();ctx.beginPath();ctx.arc(100,attributionY+40,36,0,Math.PI*2);ctx.clip();
  ctx.drawImage(avatar,64,attributionY+4,72,72);ctx.restore();
  text('SHARED BY',152,attributionY+24,24,500,colour.muted,'left','DM Mono');
  fittedText(profile.name,152,attributionY+66,570,32,500);
  text('Tournament 10',1016,attributionY+50,28,400,colour.muted,'right');
  rule(statBottom+160);
  text('sport.fun',64,statBottom+208,28,500);
  text('CONCEPT · SAMPLE DATA',1016,statBottom+208,28,500,colour.muted,'right','DM Mono');
  ctx.restore();
  return canvas;
}
