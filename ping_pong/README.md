## Ping pong app

Create a cluster in GKE

Run `kubectl create namespace exercises` to create a namespace

Deploy with `kubectl apply -f manifests`

See external IP whit `kubectl get svc -n exercises --watch`

Now visit `http://<external-ip>/pings`
