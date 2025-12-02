## Todo app

Create a cluster in GKE

Run `kubectl create namespace project` to create a namespace

Deploy with `kubectl apply -k .`

See IP address whit `kubectl get gateway project-gateway -n project --watch`

Now visit `http://<ip-address>`

## Database Options: StatefulSet (Postgres in Kubernetes) vs Cloud SQL (DBaaS)

This section compares two alternatives for handling data persistence in the project:

1. Running Postgres inside the Kubernetes cluster using a StatefulSet with PersistentVolumeClaims (PVC).
2. Using Google Cloud SQL as a managed Database as a Service (DBaaS).

Both options are valid but differ significantly in cost, maintenance, configuration requirements, and backup management.

### 1. Postgres in Kubernetes (StatefulSet + PVC)

#### Description

The database runs inside the GKE cluster as a StatefulSet. Data is stored in a PersistentVolume provisioned through a PersistentVolumeClaim.

#### Pros

- Full control over the Postgres server configuration.
- No additional DBaaS costs; only storage and compute (node usage) are charged.
- Useful for understanding how Kubernetes handles persistent storage.

#### Cons

- Requires manual management of updates, security, and general maintenance.
- Backups must be implemented manually using scripts, CronJobs, or external tools.
- High availability and scalability require more complex configurations.
- Higher operational risk if volumes or StatefulSet settings are misconfigured.

#### Required Work

- Create and maintain the StatefulSet, Service, and PVC.
- Manually define backup and restore procedures.
- Ensure adequate storage and monitor the database pod.

#### Costs

- Typically lower than a managed database.
- Costs include the PersistentVolume and the resources used by the Postgres pod.

### 2. Cloud SQL (DBaaS)

#### Description

A managed PostgreSQL instance provided by Google Cloud, where the infrastructure and database engine are handled by the provider.

#### Pros

- Reduced maintenance; updates and security patches are applied automatically.
- Built-in automated backups and easy restoration through the Google Cloud console.
- Simple vertical scaling of storage, CPU, and memory.
- Optional built-in high availability.

#### Cons

- More expensive compared to running Postgres inside the cluster.
- Less control over advanced database engine configurations.
- Requires additional setup for connecting Kubernetes to Cloud SQL, such as Cloud SQL Proxy or private connections.

#### Required Work

- Create the instance in Cloud SQL.
- Configure access, users, and networking.
- Set up communication between GKE and Cloud SQL.

#### Costs

- Higher than using a StatefulSet.
- Charges apply for the instance, storage, and I/O operations.

### 3. General Comparison

| Feature                | StatefulSet + PVC | Cloud SQL       |
| ---------------------- | ----------------- | --------------- |
| Initial setup effort   | Medium            | Low             |
| Ongoing maintenance    | High              | Low             |
| Backups                | Manual            | Automatic       |
| Restore process        | Manual            | Simple          |
| Scalability            | Limited           | Easy            |
| High availability      | Complex           | Built-in option |
| Control over DB engine | Full              | Partial         |
| Cost                   | Low               | Medium/High     |

#### 4. Conclusion

Running Postgres inside the cluster provides greater control and lower costs but requires full responsibility for maintenance, security, and backups.  
Cloud SQL, while more expensive, offers a more stable and automated solution with native support for backups and scalability.

The choice depends on the project needs:

- For educational purposes or small environments, a StatefulSet may be sufficient.
- For more reliable deployments with minimal operational overhead, Cloud SQL is the better option.
