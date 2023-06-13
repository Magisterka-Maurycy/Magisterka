docker buildx create --use
docker buildx build --push --platform linux/amd64,linux/arm64 -f ./Dockerfile -t quay.io/maurycy_krzeminski/keycloak .
