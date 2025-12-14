# Serverless

Create a k3d cluster

```
k3d cluster create knative \
  --image rancher/k3s:v1.32.1-k3s1 \
  --agents 2 \
  --port 8082:30080@agent:0 \
  --port 8081:80@loadbalancer \
  --k3s-arg "--disable=traefik@server:0"
```

Run `kubectl config use-context k3d-knative` to set context to new cluster

Install Knative Serving

```
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.20.0/serving-crds.yaml
kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.20.0/serving-core.yaml
```

Run `kubectl apply -f https://github.com/knative-extensions/net-kourier/releases/download/knative-v1.20.0/kourier.yaml` to install kourier networking layer

Configure Knative Serving to use Kourier

```
kubectl patch configmap/config-network \
  --namespace knative-serving \
  --type merge \
  --patch '{"data":{"ingress-class":"kourier.ingress.networking.knative.dev"}}'
```

Run `kubectl apply -f https://github.com/knative/serving/releases/download/knative-v1.20.0/serving-default-domain.yaml` to configures Knative Serving to use sslip.io as the default DNS suffix.

Run `kubectl get pods -n knative-serving` to verify installation (All pods should be in Running state)

Run `kubectl apply -f hello.yaml` to deploy a knative service

Run `kubectl get ksvc` to see url knative service

Run `curl -H "Host: <url_knative_service>" http://localhost:8081` to see service response
