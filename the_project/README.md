## Todo app

Run `kubectl create namespace project` to create a namespace

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create volumen folder

Create volumes, ingress, jobs and config with `kubectl apply -f manifests`

Deploy app with `kubectl apply -f todo-app/manifests`

Deploy backend with `kubectl apply -f todo-backend/manifests`

Now visit `http://localhost:<published_port>`
