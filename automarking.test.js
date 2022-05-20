const fs = require('fs');
const simpleGit = require('simple-git');

const git = simpleGit();

describe('Created 3 files', () => {
  test.each(
    ['first.txt', 'second.txt', 'third.txt']
  )("Has file: '%s'", (filename) => {
    expect(fs.existsSync(filename)).toBe(true);
  });
});

test('Created a branch', async () => {
  let numBranchesCreated = 0;
  const result = await git.branch('-r');
  for (const remoteBranch in result.branches) {
    if (!remoteBranch.startsWith('remotes/origin')) {
      continue;
    }

    const shortBranchName = remoteBranch.replace('remotes/origin/', '');
    if (!['master', 'marking', 'solution', 'submission'].includes(shortBranchName)) {
      ++numBranchesCreated;
      console.log('Detected Branch:', shortBranchName);
    }
  }
  expect(numBranchesCreated).toBeGreaterThanOrEqual(1);
});

test('Merged a branch', async () => {
  const mergedCommits = await git.log({ '--merges': true });
  expect(mergedCommits.total).toBeGreaterThanOrEqual(2);
  console.log('Merged commits:', mergedCommits);
});