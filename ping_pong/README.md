## Ping pong serverless app

Create a k3d cluster and install knative

Run `kubectl create namespace exercises` to create a namespace

Deploy postgres and serverless app

```
kubectl apply -f manifests/statefulset.yaml
kubectl apply -f manifests/serverless.yaml
```

Run `kubectl get ksvc -n exercises` to see url service

Run `curl -H "Host: <url_knative_service>" http://localhost:<load_balancer_cluster_port>` to see root service response

Run `curl -H "Host: <url_knative_service>" http://localhost:<load_balancer_cluster_port>/pingpong` to see ping pong service response
