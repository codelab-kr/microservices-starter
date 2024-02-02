#!/bin/sh

last_commit=$(git rev-parse HEAD)
git checkout $1
git cherry-pick $last_commit
git push origin $1
