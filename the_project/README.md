## Todo app

Run `kubectl create namespace project` to create a namespace

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create volumen folder

Deploy with `kubectl apply -k . -n project`

Now visit `http://localhost:<published_port>`
