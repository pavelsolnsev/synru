const abTestPageRoute = 'priemnaya_komissiya';
const targetName = 'target_name=ab_priemnaya_komissiya';

export default function getAbTestActionParams(baseParams: { param: string }[], routePath: string) {
  if (routePath.includes(abTestPageRoute)) {
    return [...baseParams, { param: targetName }, { param: 'alias=priemnaya_komissiya' }];
  }

  return baseParams;
}
