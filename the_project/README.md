## Todo app

Install NATS into k3d (default namespace)

Install ArgoCD into k3d (argocd namespace)

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create volumen folder

### Create namespaces

Run `kubectl create namespace project-staging` to create staging namespace

Run `kubectl create namespace project-prod` to create production namespace

### Create secrets

Run `kubectl create secret generic todo-secret -n project-staging --from-literal=EXTERNAL_WEBHOOK_URL=""` to create staging secrets

Run `kubectl create secret generic todo-secret -n project-prod --from-literal=EXTERNAL_WEBHOOK_URL=https://discord.com/api/webhooks/XXXXX` to create production secrets

### Create ArgoCD apps

Run `kubectl apply -f overlays/staging/application.yaml` to create ArgoCD staging app

Run `kubectl apply -f overlays/prod/application.yaml` to create ArgoCD production app

Run `kubectl port-forward svc/argocd-server -n argocd 8080:80` to publish ArgoCD UI on port 8080

Now visit `http://localhost:8080` to see apps
