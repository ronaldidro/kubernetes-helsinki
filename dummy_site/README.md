## DummySite

Deploy with `kubectl apply -f manifests`

Run `kubectl port-forward svc/dummysite-example 8080:80` to forward service

Now visit `http://localhost:8080` to see the site

Run `kubectl logs -l app=dummysite-controller` to see logs
