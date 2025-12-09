## Todo app

Install NATS into k3d (default namespace)

Install ArgoCD into k3d (argocd namespace)

Run `kubectl create namespace project` to create a namespace

namespace project-staging
namespace project-production

deploy argo apps

kubectl apply -f overlays/staging/application.yaml
kubectl apply -f overlays/prod/application.yaml

Run `kubectl create secret generic todo-secret -n project --from-literal=EXTERNAL_WEBHOOK_URL=https://discord.com/api/webhooks/XXXXX` to create secrets

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create volumen folder

Run `kubectl port-forward svc/argocd-server -n argocd 8080:80` to publish ArgoCD UI on port 8080

Configure app in the ArgoCD Dashboard (http://localhost:8080) and Sync

Now visit `http://localhost:<published_port>`

Create or update a todo and see messages into U. Helsinki Discord Server (fullstack_webhook channel)
