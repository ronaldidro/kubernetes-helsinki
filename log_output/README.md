## Log output app

Create a cluster in GKE

Run `kubectl create namespace exercises` to create a namespace

Deploy with `kubectl apply -f manifests`

Deploy the ping-pong app too

See IP address whit `kubectl get gateway exercises-gateway -n exercises --watch`

Now visit `http://<ip-address>`
