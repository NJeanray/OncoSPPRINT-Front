#!/bin/bash

set -x

TARGET_ENVIRONMENT=$1
TARGET_SERVER_IP=$2

curl --header "Private-Token: $GITLAB_TOKEN" "https://git.oncodesign.com/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/-/jobs/artifacts/develop/download?job=build_dev" -o build.zip
unzip build.zip
ls build/

cat docker-compose.yml| sed -e "s/:develop/:$CI_COMMIT_REF_SLUG/" > front.yml

TARGET_SERVER_KEY="OCSP_"$TARGET_ENVIRONMENT"_SSH_KEY_BASE64"
TARGET_SERVER_KEY=$(eval "echo \$${TARGET_SERVER_KEY}")

echo $TARGET_SERVER_KEY | base64 -d > .ssh_key
chmod 600 .ssh_key

docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
docker-compose -f front.yml build
docker-compose -f front.yml push

scp -i .ssh_key -o StrictHostKeyChecking=no front.yml oncospprint_user@$TARGET_SERVER_IP:front.yml
ssh -i .ssh_key -o StrictHostKeyChecking=no oncospprint_user@$TARGET_SERVER_IP "docker-compose -f front.yml pull"
ssh -i .ssh_key -o StrictHostKeyChecking=no oncospprint_user@$TARGET_SERVER_IP "docker-compose -f front.yml stop"
ssh -i .ssh_key -o StrictHostKeyChecking=no oncospprint_user@$TARGET_SERVER_IP "docker-compose -f front.yml up -d"

