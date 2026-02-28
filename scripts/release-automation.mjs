import { spawnSync } from 'node:child_process';

function parseArgs(argv) {
  const args = {
    message: '',
    push: false,
    cloudflare: 'plan',
    skipChecks: false,
    skipBuild: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const cur = argv[i];
    if (cur === '--message' || cur === '-m') {
      args.message = argv[i + 1] || '';
      i += 1;
    } else if (cur === '--push') {
      args.push = true;
    } else if (cur === '--cloudflare') {
      args.cloudflare = argv[i + 1] || 'plan';
      i += 1;
    } else if (cur === '--no-cloudflare') {
      args.cloudflare = 'none';
    } else if (cur === '--skip-checks') {
      args.skipChecks = true;
    } else if (cur === '--skip-build') {
      args.skipBuild = true;
    }
  }

  if (!['none', 'plan', 'apply'].includes(args.cloudflare)) {
    throw new Error('--cloudflare must be one of: none, plan, apply');
  }

  return args;
}

function run(cmd, cmdArgs, opts = {}) {
  const label = `$ ${[cmd, ...cmdArgs].join(' ')}`;
  console.log(label);
  const result = spawnSync(cmd, cmdArgs, {
    stdio: opts.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    encoding: 'utf8',
    env: process.env,
  });
  if (result.status !== 0) {
    if (opts.capture) {
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
    }
    throw new Error(`Command failed: ${label}`);
  }
  return (result.stdout || '').trim();
}

function preflight() {
  run('git', ['rev-parse', '--is-inside-work-tree']);
  const branch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { capture: true });
  const status = run('git', ['status', '--short', '--branch'], { capture: true });
  const trackedPrivate = run('git', ['ls-files', 'private'], { capture: true });

  console.log('\nPreflight summary');
  console.log(`Branch: ${branch}`);
  console.log(status || '(clean)');

  if (trackedPrivate) {
    throw new Error(
      'Security check failed: files under private/ are tracked by git. Remove them from tracking before shipping.'
    );
  }
}

function assertNoPrivateStaged() {
  const staged = run('git', ['diff', '--cached', '--name-only'], { capture: true });
  if (!staged) return;
  const privateStaged = staged
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean)
    .some((x) => x === 'private' || x.startsWith('private/'));
  if (privateStaged) {
    throw new Error('Security check failed: staged files include private/. Unstage them and retry.');
  }
}

function maybeGitCommitAndPush(args) {
  if (!args.message) {
    console.log('\nNo commit requested (no --message provided).');
    return;
  }

  run('git', ['add', '-A']);
  assertNoPrivateStaged();

  const staged = run('git', ['diff', '--cached', '--name-only'], { capture: true });
  if (!staged) {
    console.log('\nNo staged changes to commit.');
    return;
  }

  run('git', ['commit', '-m', args.message]);
  if (args.push) {
    run('git', ['push']);
  } else {
    console.log('\nCommit created. Push skipped (use --push to push).');
  }
}

function maybeCloudflare(mode) {
  if (mode === 'none') {
    console.log('\nCloudflare sync skipped.');
    return;
  }
  if (mode === 'plan') {
    run('npm', ['run', 'domain:cloudflare:plan']);
    return;
  }
  run('npm', ['run', 'domain:cloudflare:apply']);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  preflight();

  if (!args.skipChecks) run('npm', ['run', 'astro', '--', 'check']);
  if (!args.skipBuild) run('npm', ['run', 'build']);
  maybeCloudflare(args.cloudflare);
  maybeGitCommitAndPush(args);

  console.log('\nShip pipeline completed.');
}

main();
