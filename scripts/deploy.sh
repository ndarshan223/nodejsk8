set -x

if [ -z $BUILD_NUMBER ]; then
  echo "ERROR: BUILD_NUMBER is not defined."
  exit 1
fi
if [ -z $DOCKER_REPO ]; then
  echo "ERROR: DOCKER_REPO is not defined."
  exit 1
fi

cat k8s/deployment.tmpl.yaml | sed "s,{{DOCKER_REPO}},$DOCKER_REPO,g" \
                             | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" > deployment.yaml
cat k8s/service.tmpl.yaml | sed "s/{{BUILD_NUMBER}}/$BUILD_NUMBER/g" > service.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
