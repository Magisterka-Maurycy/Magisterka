# k3d dns fix enabled to resolve dns hostnames in local network
# export K3D_FIX_DNS=1
$Env:K3D_FIX_DNS=1

k3d cluster create newcluster --api-port 127.0.0.1:6443 -p 80:80@loadbalancer -p 443:443@loadbalancer --k3s-arg="--disable=traefik@server:0"

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# nginx-ingress install
helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak.yaml

helm install --namespace prometheus -f ./prometheus/values.yaml prom-stack prometheus-community/kube-prometheus-stack --create-namespace --wait

kubectl apply -f .\log\

kubectl apply -f .\dsa\elastic\
kubectl apply -f .\dsa\minio\

kubectl apply -f .\mba\mongodb\


../gradlew.bat clean -p ../
../auth/gradlew.bat build -p ../auth -D'quarkus.profile'=dep-kub
../dsa/gradlew.bat  build -p ../dsa  -D'quarkus.profile'=dep-kub
../math/gradlew.bat build -p ../math -D'quarkus.profile'=dep-kub
../mba/gradlew.bat  build -p ../mba  -D'quarkus.profile'=dep-kub

kubectl autoscale deployment auth --cpu-percent=50 --min=1 --max=3
kubectl autoscale deployment dsa  --cpu-percent=50 --min=1 --max=3
kubectl autoscale deployment math --cpu-percent=50 --min=1 --max=3
kubectl autoscale deployment mba  --cpu-percent=50 --min=1 --max=3

helm repo remove prometheus-community
