// Illustrative contributions for the historic personal-best lineup.
// Captain scores already include the multiplier; player-page summaries are separate.
const entries = [
  {playerIndex:0, baseScore:24.8, captain:true},
  {playerIndex:1, baseScore:32.4},
  {playerIndex:2, baseScore:28.6},
  {playerIndex:3, baseScore:24.1},
  {playerIndex:4, baseScore:20.5}
].map(pick => {
  const captain = Boolean(pick.captain), multiplier = captain ? 1.5 : 1;
  return {...pick, captain, multiplier, score:Number((pick.baseScore * multiplier).toFixed(1))};
});
export const bestPicks = {
  entries,
  average:96.4,
  total:Number(entries.reduce((total, pick) => total + pick.score, 0).toFixed(1))
};
