## Todo app

Create a cluster in GKE

Run `kubectl create namespace project` to create a namespace

Deploy with `kubectl apply -k .`

See IP address whit `kubectl get gateway project-gateway -n project --watch`

Now visit `http://<ip-address>`
