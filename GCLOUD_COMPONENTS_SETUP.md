# GOOGLE CLOUD SDK COMPONENTS INSTALLATION
## eSIM Myanmar Platform - GCP Integration
### Date: December 28, 2025

---

## GCLOUD COMPONENTS INSTALLATION

### Install Required Components
```bash
gcloud components install alpha beta skaffold minikube kubectl gke-gcloud-auth-plugin
```

### Component Details
- **alpha**: Alpha release commands
- **beta**: Beta release commands  
- **skaffold**: Kubernetes development workflow
- **minikube**: Local Kubernetes cluster
- **kubectl**: Kubernetes command-line tool
- **gke-gcloud-auth-plugin**: GKE authentication plugin

---

## INSTALLATION STATUS

### Check Current Components
```bash
gcloud components list
```

### Update Components
```bash
gcloud components update
```

### Verify Installation
```bash
# Check kubectl
kubectl version --client

# Check skaffold
skaffold version

# Check minikube
minikube version

# Check GKE auth plugin
gcloud container clusters get-credentials --help
```

---

## KUBERNETES SETUP

### Initialize Minikube
```bash
minikube start --driver=docker
minikube status
```

### Configure kubectl
```bash
kubectl config current-context
kubectl cluster-info
```

### GKE Cluster Setup
```bash
# Create GKE cluster
gcloud container clusters create esim-myanmar-cluster \
  --zone=us-central1-a \
  --num-nodes=3 \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5

# Get credentials
gcloud container clusters get-credentials esim-myanmar-cluster --zone=us-central1-a
```

---

## SKAFFOLD CONFIGURATION

### skaffold.yaml
```yaml
apiVersion: skaffold/v4beta6
kind: Config
metadata:
  name: esim-myanmar
build:
  artifacts:
  - image: esim-backend
    context: backend
    docker:
      dockerfile: Dockerfile
  - image: esim-frontend
    context: frontend
    docker:
      dockerfile: Dockerfile
deploy:
  kubectl:
    manifests:
    - k8s/*.yaml
```

### Kubernetes Manifests
```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: esim-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: esim-backend
  template:
    metadata:
      labels:
        app: esim-backend
    spec:
      containers:
      - name: backend
        image: esim-backend
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          value: "postgresql://..."
        - name: SUPABASE_URL
          value: "https://ksctoosqlpemoptcaxdr.supabase.co"
```

---

## DEPLOYMENT COMMANDS

### Skaffold Development
```bash
# Start development mode
skaffold dev

# Build and deploy
skaffold run

# Delete deployment
skaffold delete
```

### Direct kubectl Commands
```bash
# Apply manifests
kubectl apply -f k8s/

# Get pods
kubectl get pods

# Get services
kubectl get services

# View logs
kubectl logs -f deployment/esim-backend
```

---

## GCP PROJECT SETUP

### Initialize GCP Project
```bash
# Set project
gcloud config set project esim-myanmar-project

# Enable APIs
gcloud services enable container.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Container Registry
```bash
# Configure Docker
gcloud auth configure-docker

# Build and push image
docker build -t gcr.io/esim-myanmar-project/esim-backend ./backend
docker push gcr.io/esim-myanmar-project/esim-backend
```

---

## MONITORING SETUP

### Enable Monitoring
```bash
# Enable monitoring API
gcloud services enable monitoring.googleapis.com

# Install monitoring agent
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/master/resources/node-agent-ds.yaml
```

### Logging
```bash
# Enable logging API
gcloud services enable logging.googleapis.com

# View logs
gcloud logging read "resource.type=k8s_container"
```

---

## TROUBLESHOOTING

### Common Issues
```bash
# If gcloud not found
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# If components fail to install
gcloud components update
gcloud components install --quiet alpha beta skaffold minikube kubectl gke-gcloud-auth-plugin

# If kubectl not working
gcloud container clusters get-credentials esim-myanmar-cluster --zone=us-central1-a

# If minikube fails
minikube delete
minikube start --driver=docker --memory=4096 --cpus=2
```

### Authentication Issues
```bash
# Re-authenticate
gcloud auth login
gcloud auth application-default login

# Check auth status
gcloud auth list
```

---

## DEVELOPMENT WORKFLOW

### Local Development
```bash
# Start minikube
minikube start

# Start skaffold dev mode
skaffold dev --port-forward

# Access application
kubectl port-forward service/esim-frontend 3000:3000
kubectl port-forward service/esim-backend 8000:8000
```

### Production Deployment
```bash
# Build for production
skaffold build --tag=latest

# Deploy to GKE
skaffold deploy --images=gcr.io/esim-myanmar-project/esim-backend:latest
```

---

## CONFIGURATION FILES

### .gcloudignore
```
node_modules/
.git/
.env
*.log
build/
dist/
```

### Dockerfile (Backend)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]
```

### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ENVIRONMENT VARIABLES

### Kubernetes Secrets
```bash
# Create secrets
kubectl create secret generic esim-secrets \
  --from-literal=database-url="postgresql://..." \
  --from-literal=supabase-key="sb_publishable_..."

# Use in deployment
env:
- name: DATABASE_URL
  valueFrom:
    secretKeyRef:
      name: esim-secrets
      key: database-url
```

---

**STATUS: GOOGLE CLOUD SDK COMPONENTS READY**

All GCP components installed and configured for Kubernetes development and deployment.

---

Date: December 28, 2025
Components: alpha, beta, skaffold, minikube, kubectl, gke-gcloud-auth-plugin
Status: INSTALLED AND CONFIGURED