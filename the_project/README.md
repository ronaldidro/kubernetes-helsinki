## Todo app

Install NATS into k3d (default namespace)

Run `kubectl create namespace project` to create a namespace

Run `kubectl create secret generic todo-secret -n project --from-literal=EXTERNAL_WEBHOOK_URL=https://discord.com/api/webhooks/XXXXX` to create secrets

Run `docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube` to create volumen folder

Deploy with `kubectl apply -k . -n project`

Now visit `http://localhost:<published_port>`

Create or update a todo and see messages into U. Helsinki Discord Server (fullstack_webhook channel)
