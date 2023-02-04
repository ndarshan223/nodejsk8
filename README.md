You can specify the source of the Node base image to use as the base image.
This is useful if, for example, you need to use a base image from your local
repository.  If the argument is omitted, it will default to using node:10.15
from Docker Hub.

````
docker build --build-arg BASE_IMAGE=repo.com/dirname/node:version -t hello_nodejs .
docker run -d -p 8080:8080 hello_nodejs
````

Better yet, use the build and deploy scripts, which are designed to be run
from your CI/CD tool (i.e. Jenkins, Bamboo, etc).  The scripts require that
a BUILD_NUMBER env variable be set and will honor a DOCKER_REPO env variable.
