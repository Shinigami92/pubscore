export async function calculateReadmeScoreModifier(
  npmPkgData
): Promise<number> {
  let scoreModifier = 0.5;

  const distTags = npmPkgData["dist-tags"];
  const latestVersion = distTags.latest;

  const repositoryUrl = npmPkgData.versions[latestVersion].repository.url
    .replace("git+", "")
    .replace(".git", "");
  const gitHead = npmPkgData.versions[latestVersion].gitHead;

  const gitCommitHeadResponse = await fetch(
    `${repositoryUrl}/tree/${gitHead}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  const hasReadme = !!gitCommitHeadResponse.payload.tree.readme;

  if (hasReadme) {
    scoreModifier = 1;
  }

  return scoreModifier;
}
