set -ex

DEFAULT_BASE_IMAGE="node:10.15"

if [ -z $BASE_IMAGE ]; then
  echo "WARNING: BASE_IMAGE is not defined.  Defaulting to $DEFAULT_BASE_IMAGE"
  BASE_IMAGE="$DEFAULT_BASE_IMAGE"
else
  echo "INFO: Building ontop of BASE_IMAGE $BASE_IMAGE"
fi

if [ -z $BUILD_NUMBER ]; then
  echo "ERROR: BUILD_NUMBER is not defined."
  exit 1
else
  echo "INFO: BUILD_NUMBER is $BUILD_NUMBER"
fi

if [ -z $DOCKER_REPO ]; then
  echo "ERROR: DOCKER_REPO is not defined."
  exit 1
else
  echo "INFO: Pushing to destination repo $DOCKER_REPO"
fi

npm install
docker build --build-arg BASE_IMAGE=$BASE_IMAGE -t "hello-nodejs" .
docker tag "hello-nodejs" "$DOCKER_REPO:$BUILD_NUMBER"
docker tag "hello-nodejs" "$DOCKER_REPO:latest"
docker push "$DOCKER_REPO:$BUILD_NUMBER"
docker push "$DOCKER_REPO:latest"
