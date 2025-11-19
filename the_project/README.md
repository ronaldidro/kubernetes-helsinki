## Todo app

Run `kubectl create namespace project` to create a namespace

Deploy app with `kubectl apply -f todo-app/manifests`

Deploy backend with `kubectl apply -f todo-backend/manifests`

Create volumes and ingress with `kubectl apply -f manifests`

Now visit `http://localhost:<published_port>`
