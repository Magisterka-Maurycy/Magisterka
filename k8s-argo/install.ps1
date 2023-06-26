# nginx-ingress install
helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

#argocd install
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

## Waiting for argocd not needed currently
#kubectl rollout status deployment/argocd-redis -n argocd
#kubectl rollout status deployment/argocd-applicationset-controller -n argocd
#kubectl rollout status deployment/argocd-notifications-controller -n argocd
#kubectl rollout status deployment/argocd-dex-server -n argocd
#kubectl rollout status deployment/argocd-repo-server -n argocd
#kubectl rollout status deployment/argocd-server -n argocd

kubectl apply -f ./argo-ingress.yaml

kubectl create namespace prometheus

# Currently mongodb is created with kubectl not argocd
kubectl apply -f ..\k8s\mba\mongodb\

# Repo added to argocd
kubectl create secret generic private-repo-creds --from-literal=type=git --from-literal=url=git@github.com:Magisterka-Maurycy/GitOps.git --from-file=sshPrivateKey=../cicd/secrets/jenkins --namespace=argocd
kubectl label secret private-repo-creds --namespace=argocd argocd.argoproj.io/secret-type=repository

kubectl apply -f ./argo

# Argocd password:
# kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d