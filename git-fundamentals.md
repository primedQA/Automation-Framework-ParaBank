# Git Fundamentals — Reference Guide

Quick answer to the question that started this: **no, `main` and `origin` are not the same kind of thing.**

- `main` is a **branch name** — a specific line of history, wherever it lives (locally or on GitHub).
- `origin` is a **nickname for a remote location** — specifically, a nickname for the URL of your GitHub repository. It doesn't refer to any one branch; it refers to the whole remote repo.

So when you see `origin/main` together, that means "the `main` branch, as it exists on the remote called `origin`" — as opposed to plain `main`, which means "the `main` branch, as it exists on my own laptop." They can (temporarily) be different from each other, which is the whole reason `push` and `pull` exist.

Everything below builds toward that idea. Read top to bottom once, then come back and ask about anything specific.

---

## 1. The core mental model: two separate copies

Picture two separate physical copies of the same notebook:

- One lives in your backpack. This is your **local repository** — the code sitting on your actual laptop, in your project folder.
- One lives in a shared office filing cabinet. This is your **remote repository** — the copy sitting on GitHub's servers.

These are genuinely two separate things. Writing a new page in your backpack notebook does nothing to the office copy until you deliberately walk over and photocopy the new pages in. Nothing syncs automatically — you have to run a command to move things from one copy to the other, in either direction.

## 2. What "origin" actually is

`origin` is just a saved nickname for "the URL of the office filing cabinet." When you cloned or connected this project to GitHub, git saved that connection under the name `origin` so you don't have to type the full GitHub URL every time. You could technically rename it, or even have multiple remotes with different nicknames (rare, but possible) — but for a solo project, `origin` = "my GitHub repo," full stop.

`origin` is not a branch. It's not a place where commits "live" in the way a branch does — it's the address of the whole remote repository, which itself contains many branches (`main`, `ci/checkout-node`, etc.), each with their own copy on both sides.

## 3. What a branch is (and why `main` isn't special mechanically)

A branch is a named line of history — a sequence of commits (saved checkpoints of your code). `main` is not magic; it's just the conventional name teams agree to treat as "the official, trusted line." `ci/checkout-node` was a branch too, just a temporary scratch one.

Every branch can exist in two places at once: a local version (in your backpack) and a remote version (in the office cabinet) — and, as covered above, they can drift out of sync until you push or pull.

## 4. Push and pull

- **`git push`** — takes commits that exist on your **local** branch but not yet on the matching **remote** branch, and copies them up to GitHub. Direction: laptop → GitHub.
- **`git pull`** — takes commits that exist on the **remote** branch but not yet on your **local** branch, and folds them into your current local branch. Direction: GitHub → laptop.

This is exactly what tripped you up earlier: merging a PR on GitHub only changes GitHub's copy of `main`. Your laptop's `main` doesn't know that happened until you run `git pull` — which is why `git checkout main` followed by `git pull` was necessary after every merge.

(There's a more precise command, `git fetch`, which only downloads what's new *without* folding it into your current branch — `pull` is really "fetch, then merge" combined into one step. Not something you need to act on differently right now, just good to know the name exists.)

## 5. Checkout

- **`git checkout <branch>`** — switch your working directory to reflect a different, *already-existing* branch. Nothing new is created.
- **`git checkout -b <branch>`** — create a brand-new branch, starting as a copy of wherever you currently are, and switch to it immediately. The error you hit earlier ("a branch named ... already exists") happens when you use `-b` on a branch name that's already there — in that case you just want plain `git checkout <branch>` instead.

## 6. Merge, squash, and rebase — three ways to combine branches

All three answer the same question — "fold branch A's commits into branch B" — but they leave different-looking history behind. This is the part that felt like "a lot at once," so take these one at a time.

**Merge** — keeps every individual commit from your branch exactly as it was, and adds one new "merge commit" on top that ties the two histories together. History shows the real, messy sequence of everything you actually did, including any back-and-forth or typo-fix commits. This is what `gh pr merge --merge` did for you.

**Squash** — takes *all* the commits on your branch and flattens them into a single new commit on the target branch, as if you'd made all those changes in one shot. Useful when your branch has a bunch of noisy, in-progress commits ("wip", "fix typo", "actually fix typo") that aren't meaningful individually — squashing hides that mess and leaves one clean commit in `main`'s history.

**Rebase** — replays your branch's commits one by one, on top of the current tip of the target branch, as if you'd started your work from the most up-to-date point instead of wherever you actually branched off. No merge commit gets added; history ends up looking like a single straight line, as though everything happened in order with no branching at all. This one has more sharp edges (rewriting commit history can cause real problems if others are also working off that branch) — not something to reach for yet.

For a solo project at your current stage, plain **merge** (what you've been doing) is the safest default, and squash is a nice option once you're comfortable, for cleaning up messy branches before they land in `main`.

## 7. Pull Request (PR) — a GitHub feature, not a core git concept

Everything above (`branch`, `commit`, `push`, `pull`, `merge`) is part of git itself, and would exist even without GitHub. A **Pull Request** is GitHub's own feature layered on top: it's a request to merge one branch into another, with a UI for reviewing the diff, running CI checks against it, and requiring approval before the merge is allowed to happen. Opening a PR doesn't move any code by itself — it's a checkpoint that sits in front of the merge.

---

## 8. Worked example — mapping your actual recent history to these terms

Here's literally what you did a little while ago, translated line by line:

1. `git checkout -b ci/checkout-node` — created a new local branch, starting from wherever `main` was at the time.
2. Edited `playwright.yml`, then `git add` + `git commit` — saved a checkpoint (commit) on that local branch only. At this point, GitHub (`origin`) has never heard of this commit.
3. `git push -u origin ci/checkout-node` — copied that branch, and its commit, up to GitHub for the first time. The `-u` also tells your local branch "remember that your matching remote branch is `origin/ci/checkout-node`," so future plain `git push` commands know where to go without you specifying it again.
4. Opened a PR on GitHub — a request to merge `ci/checkout-node` into `main`, which also triggered your CI workflow to run and check it.
5. `gh pr merge --merge` — told GitHub to fold `ci/checkout-node`'s commits into `origin`'s copy of `main`, using a merge commit. Your laptop's `main` still doesn't know this happened yet.
6. `git checkout main` — switched your local working directory to your local `main` branch (still the old, stale version).
7. `git pull` — fetched the new merge commit from `origin/main` and folded it into your local `main`, finally bringing your laptop's copy up to date with GitHub's.

That's the entire loop, every time: branch → commit locally → push → PR → merge (remote-side) → pull (to catch your local copy up).

---

Ask me about anything in here — a specific term, a specific step, or how a piece of this maps to something else you've run into.
