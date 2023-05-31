# Magisterka

* CICD - jenkins, sonarqube docker compose to use for CI and deployments of Container Images 
* k8s - old kubernetes deployment with k3d
* k8s-argo - new kubernetes deployment with k3d using argocd with gitops repo
* sampleApp - sample app written in svelte using k8s-argo deployment to present usage of project
* apps:
  * auth - service responsible for authentication
  * dsa - service responsible for documents storing and access
  * math - service responsible for doing math equations and statistics
  * mba - service responsible for mongodb base acess 