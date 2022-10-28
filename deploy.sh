#!/usr/bin/env bash

# halt if any error occurs
set -e

APP_AWS_REGION=$1
APP_AWS_ACCOUNT_ID=$2
APP_HELM_TAG=$3
APP_REST_API_PROVIDER=$4

echo APP_AWS_REGION=$APP_AWS_REGION
echo APP_AWS_ACCOUNT_ID=$APP_AWS_ACCOUNT_ID
echo APP_HELM_TAG=$APP_HELM_TAG
echo APP_REST_API_PROVIDER=$APP_REST_API_PROVIDER

echo "Helm uninstall old version..."
helm uninstall pm-tool-ui

echo "Sleep 10s..."
sleep 10

echo "Login aws...."

aws ecr get-login-password --region $APP_AWS_REGION | helm registry login --username AWS --password-stdin $APP_AWS_ACCOUNT_ID.dkr.ecr.$APP_AWS_REGION.amazonaws.com

echo "Helm install new version..."
helm install --set REACT_APP_REST_API_PROVIDER=$APP_REST_API_PROVIDER --debug pm-tool-ui oci://$APP_AWS_ACCOUNT_ID.dkr.ecr.$APP_AWS_REGION.amazonaws.com/pm-tool-ui --version $APP_HELM_TAG

echo "Check helm install success..."
helm list

echo "Sleep 100s..."
sleep 100

echo "End build"
