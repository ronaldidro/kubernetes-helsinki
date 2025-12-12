
## Istio setup and deploy sample app

Create a k3d cluster using ambient mode

`k3d cluster create ambient --api-port 6550 -p '9080:80@loadbalancer' -p '9443:443@loadbalancer' --agents 2 --k3s-arg '--disable=traefik@server:*'`

Set context to new cluster

`kubectl config use-context k3d-ambient`

Install Istio CLI

```
curl -L https://istio.io/downloadIstio | sh -
cd istio-1.28.1
export PATH=$PWD/bin:$PATH
```

Verify installation

`istioctl version`

Instalar Istio in ambient mode

`istioctl install --set profile=ambient --set values.global.platform=k3d --skip-confirmation`

Verify Istio pods

`kubectl get pods -n istio-system`

Labeled namespace to enable ambient mode

`kubectl label namespace default istio.io/dataplane-mode=ambient`

Deploy sample app

```
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo.yaml

kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo-versions.yaml
```

See product page pod name

`kubectl get pods | grep productpage`

Forward to product page app

`kubectl port-forward <product_page_pod> 8080:9080`

Now visit `http://localhost:8080`

Cleanup

```
kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo.yaml

kubectl delete -f https://raw.githubusercontent.com/istio/istio/release-1.28/samples/bookinfo/platform/kube/bookinfo-versions.yaml

istioctl uninstall --purge -y

k3d cluster delete ambient
```