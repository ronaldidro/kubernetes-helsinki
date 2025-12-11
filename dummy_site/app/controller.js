import {
  AppsV1Api,
  CoreV1Api,
  CustomObjectsApi,
  KubeConfig,
} from "@kubernetes/client-node";

const kc = new KubeConfig();
kc.loadFromDefault();

const core = kc.makeApiClient(CoreV1Api);
const apps = kc.makeApiClient(AppsV1Api);
const custom = kc.makeApiClient(CustomObjectsApi);

const GROUP = "stable.dwk";
const VERSION = "v1";
const PLURAL = "dummysites";
const NAMESPACE = "default";

console.log("DummySite Controller started...");
console.log("Polling DummySite resources every 5 seconds...");

async function poll() {
  try {
    const res = await custom.listNamespacedCustomObject(
      GROUP,
      VERSION,
      NAMESPACE,
      PLURAL
    );

    const items = res.body.items ?? [];

    for (const item of items) {
      const name = item.metadata.name;
      const url = item.spec.website_url;
      await processDummySite(name, url);
    }
  } catch (err) {
    console.error("Error reading DummySites:", err);
  }
}

async function processDummySite(name, url) {
  console.log(`Processing DummySite ${name} from ${url}`);

  const html = await (await fetch(url)).text();

  try {
    await core.createNamespacedConfigMap(NAMESPACE, {
      metadata: { name: `dummysite-${name}` },
      data: { "index.html": html },
    });
    console.log("ConfigMap created");
  } catch {
    console.log("ConfigMap already exists");
  }

  try {
    await apps.createNamespacedDeployment(NAMESPACE, {
      metadata: { name: `dummysite-${name}` },
      spec: {
        replicas: 1,
        selector: { matchLabels: { app: `dummysite-${name}` } },
        template: {
          metadata: { labels: { app: `dummysite-${name}` } },
          spec: {
            containers: [
              {
                name: "nginx",
                image: "nginx:alpine",
                volumeMounts: [
                  { name: "html", mountPath: "/usr/share/nginx/html" },
                ],
              },
            ],
            volumes: [
              { name: "html", configMap: { name: `dummysite-${name}` } },
            ],
          },
        },
      },
    });
    console.log("Deployment created");
  } catch {
    console.log("Deployment already exists");
  }

  try {
    await core.createNamespacedService(NAMESPACE, {
      metadata: { name: `dummysite-${name}` },
      spec: {
        selector: { app: `dummysite-${name}` },
        ports: [{ port: 80, targetPort: 80 }],
      },
    });
    console.log("Service created");
  } catch {
    console.log("Service already exists");
  }
}

setInterval(poll, 5000);
