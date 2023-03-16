#!/bin/bash

set -x

TARGET_ENVIRONMENT=$1
TARGET_ENVIRONMENT_URL=$2

curl --header "Private-Token: $GITLAB_TOKEN" "https://git.oncodesign.com/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/-/jobs/artifacts/develop/download?job=build_dev" -o build.zip
unzip build.zip
ls build/

echo "Deploying $CI_COMMIT_REF_SLUG to kubernetes namespace branch-$TARGET_ENVIRONMENT"
echo "Target URL: $TARGET_ENVIRONMENT_URL"

curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.12.2/bin/linux/amd64/kubectl && chmod +x ./kubectl && mv kubectl /usr/local/bin/
curl -Lo get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get && chmod +x get_helm.sh && ./get_helm.sh --version v2.9.1
KUBECONFIG_FILE_BASE64="KUBECONFIG_FILE_BASE64_$TARGET_ENVIRONMENT"

echo "Loading base64 file stored in $KUBECONFIG_FILE_BASE64 env variable"
echo ${!KUBECONFIG_FILE_BASE64} | base64 -d > /tmp/kubeconfig
export KUBECONFIG=/tmp/kubeconfig

helm init --client-only
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && chmod +x skaffold && mv skaffold /usr/local/bin/
docker login -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY
# docker build -t registry.oncodesign.com/oncospprint/oncospprint-front:$TARGET_ENVIRONMENT .
# docker push registry.oncodesign.com/oncospprint/oncospprint-front:$TARGET_ENVIRONMENT

kubectl create namespace branch-$TARGET_ENVIRONMENT || true
kubectl create secret docker-registry gitlab-registry-front --docker-server=$CI_REGISTRY --docker-username=$DOCKER_REGISTRY_LOGIN --docker-password=$DOCKER_REGISTRY_PASSWORD --docker-email=a@b.com -n branch-$TARGET_ENVIRONMENT || true

echo -e $CERTIFICATE_TLS_CRT | base64 -d > tls.crt
echo -e $CERTIFICATE_TLS_KEY | base64 -d > tls.key
kubectl create secret generic traefik-cert --from-file=tls.crt --from-file=tls.key -n branch-$TARGET_ENVIRONMENT || true


#cat helm-values-file-tpl.yaml | sed -e "s/VERSION_TPL/$CI_COMMIT_REF_SLUG/g" | sed -e "s/URL_TPL/$TARGET_ENVIRONMENT_URL/g" | sed -e "s/ENVIRONMENT_TPL/$TARGET_ENVIRONMENT/g"  > helm-values-file.yaml
echo "front_host: $TARGET_ENVIRONMENT_URL" > helm-values-file.yaml
echo "Running skaffold"
skaffold run -n branch-$TARGET_ENVIRONMENT
echo "ALL RiGHT! You can now visit $TARGET_ENVIRONMENT_URL"
curl -X POST -H 'Content-type: application/json' --data "{\"text\": \"$TARGET_ENVIRONMENT deployed to https://$TARGET_ENVIRONMENT_URL version $CI_COMMIT_REF_SLUG\"}" $MATTERMOST_WEBHOOK
# curl -sL https://sentry.io/get-cli/ | bash
# export SENTRY_PROJECT="react"
# sentry-cli --auth-token $SENTRY_TOKEN releases --org oncospprint new $CI_COMMIT_REF_SLUG