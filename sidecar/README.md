## Wikipedia app

Create a k3d cluster and install istio with ambient mode

Run `kubectl config use-context <cluster_name>` to set context to new cluster

Run `kubectl label namespace exercises istio.io/dataplane-mode=ambient` to enable istio in namespace

Deploy with `kubectl apply -f deployment.yaml`

Run `kubectl port-forward deployment/wikipedia-dep 8080:80 -n exercises` to forward app

Now visit `http://localhost:8080`

See sidecar logs with `kubectl logs -f deployment/wikipedia-dep -c sidecar-random-wikipedia -n exercises`
