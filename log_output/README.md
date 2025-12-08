## Log output app

Install ArgoCD into k3d

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create a directory

Run `kubectl create namespace exercises` to create a namespace

Run `kubectl port-forward svc/argocd-server -n argocd 8080:80` to publish ArgoCD UI on port 8080

Deploy the ping-pong app

Configure app in the ArgoCD Dashboard (http://localhost:8080) and Sync

Now visit `http://localhost:<published_port>`
