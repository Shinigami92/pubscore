export function calculateLicenseScoreModifier(npmPkgData): number {
  let scoreModifier = 0.5;
  if (npmPkgData.license === "MIT") {
    scoreModifier = 1;
  }
  return scoreModifier;
}
