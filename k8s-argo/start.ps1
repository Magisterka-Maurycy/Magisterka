# k3d dns fix enabled to resolve dns hostnames in local network
# export K3D_FIX_DNS=1
$Env:K3D_FIX_DNS=1
k3d cluster delete newcluster
k3d cluster create newcluster --api-port 127.0.0.1:6443 -p 80:80@loadbalancer -p 443:443@loadbalancer

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

#helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
#helm repo update

#kubectl create -f https://raw.githubusercontent.com/keycloak/keycloak-quickstarts/latest/kubernetes-examples/keycloak.yaml

#helm install --namespace prometheus -f ./prometheus/values.yaml prom-stack prometheus-community/kube-prometheus-stack --create-namespace --wait

#kubectl apply -f .\log\

#kubectl apply -f .\dsa\elastic\
#kubectl apply -f .\dsa\minio\

#kubectl apply -f .\mba\mongodb\


#helm repo remove prometheus-community
