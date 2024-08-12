import {
  calculateLicenseScoreModifier,
  calculateReadmeScoreModifier,
} from "./score-modifiers";

async function calculateScore(
  packageName: string,
  packageVersion: string = "latest"
): Promise<number> {
  let score = 1;

  const npmjsPackageResponse = await fetch(
    `https://registry.npmjs.org/${packageName}`
  );

  const npmPkgData = await npmjsPackageResponse.json();

  score *= await calculateReadmeScoreModifier(npmPkgData);
  score *= calculateLicenseScoreModifier(npmPkgData);

  return score;
}

export { calculateScore };
