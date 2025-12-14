## Log output app

Create a k3d cluster with name "ambient" and install istio

Run `kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.21/samples/addons/prometheus.yaml` to install prometheus addon

Run `kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.21/samples/addons/kiali.yaml` to install kiali addon

Run `docker exec k3d-ambient-agent-0 mkdir -p /tmp/kube` to create a volume directory

Run `kubectl create namespace exercises` to create a namespace

Run `kubectl label namespace exercises istio.io/dataplane-mode=ambient` to enable istio in namespace

Run `kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.1.0/standard-install.yaml` to install api gateway api into cluster

Deploy with `kubectl apply -k manifests`

Deploy greeter with `kubectl apply -f greeter/manifests`

Deploy the ping-pong app

Run `istioctl dashboard kiali` to access the kiali dashboard

Now visit `http://localhost:<published_port>` or send some traffic with `for i in $(seq 1 100); do curl -sSI -o /dev/null http://localhost:<published_port>; done`
