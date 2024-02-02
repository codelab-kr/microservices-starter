#!/bin/sh

# Get the list of services that have been modified
commits=($(git diff-tree --no-commit-id --name-only -r HEAD))
services=("api" "history" "payments" "posts" "users" "storage" "videos")
result=()

for commit in "${commits[@]}"; do
   directory=$(dirname "$commit");
   filename=$(basename "$commit" .yaml);
   for service in "${services[@]}"; do
      if [[ $directory == *"${service}"* ]] || [[ $filename == $service ]]; then
         result+=($service)
      fi
   done
done

svc=($(echo "${result[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))
echo ${svc[@]}

