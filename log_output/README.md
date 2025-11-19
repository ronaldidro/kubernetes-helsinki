## Log output app

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create a directory

Run `kubectl create namespace exercises` to create a namespace

Deploy with `kubectl apply -f manifests`

Deploy the ping pong app too

Now visit `http://localhost:<published_port>`



