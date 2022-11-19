## Dev

- [Dev](#dev)
- [Clone](#clone)
- [Install](#install)
- [Ex env/DEV.env](#ex-envdevenv)
- [Structures](#structures)
- [Run](#run)
- [Docker](#docker)
- [Build](#build)
- [Circle CI/CD](#circle-cicd)
- [Helm and k8s](#helm-and-k8s)

---

## Clone

```sh
$ git clone https://github.com/NguyenPhuocMinh/pm-tool-ui.git
```

## Install

```sh
$ npm install
```

## Ex env/DEV.env

- REACT_APP_REST_API_PROVIDER=http://localhost:8080

## Structures

## Run

- **Start local**

```sh
$ npm start
```

- **Test coverage**

```sh
$ npm run test:coverage
```

- **Check Linter**

```sh
$ npm run lint:check
```

- **Check Prettier**

```sh
$ npm run format:check
```

- **Build**

```sh
$ npm run build
```

## Docker

- **Run build docker images**

```sh
$ docker build -t <username>/pm-tool-ui:<version> .
```

- **Run build docker images**

```sh
$ docker run -d -p 8080:80 <username>/pm-tool-ui:<version>
```

## Build

- **When merge master so remember**:
  - **Step 1** => go to file config.yml in folder .circleci change APP_DOCKER_TAG and APP_HELM_TAG new version
  - **Step 2** => go to file values.yaml in folder /deploy/pm-tool-ui change new version docker tag
  - **Step 3** => go to file Chart.yaml in folder /deploy/pm-tool-ui change new version chart

## Circle CI/CD

- **Environment variables**

  - APP_DEPLOYED_USER
  - APP_HOST_NAME
  - APP_DOCKER_IMAGE
  - APP_REPO_URL
  - APP_SSH_FINGERPRINT

- **Context variables**

  - APP_AWS_ACCESS_KEY
  - APP_AWS_ACCOUNT_ID
  - APP_AWS_REGION
  - APP_AWS_SECRET_KEY
  - APP_DOCKER_PASSWORD
  - APP_DOCKER_USERNAME
  - APP_GITHUB_TOKEN

## Helm and k8s

- Create helm chart

```sh
$ cd helm-charts && helm create pm-tool-ui
```

- Check chart

```sh
$ helm lint ./pm-tool-ui
```

- Template chart

```sh
$ helm template ./pm-tool-ui
```

- Install helm

```sh
$ helm install pm-tool-api ./pm-tool-ui
```

- Alias

```sh
$ alias k="kubectl"
```

- Check pods

```sh
$ k get pods
```

- Expose port k8s

```sh
$ k port-forward svc/pm-tool-ui 3500:3500
```

- Apply ingress

```sh
$ k apply -f new-ingress.yml
```

- Helm package

```sh
$ cd helm-charts && helm package pm-tool-ui
```

- Login AWS ECR

```sh
$ aws ecr create-repository \
    --repository-name <chart-name> \
    --region <region>
```

- Push helm to AWS ECR

```sh
$ helm push pm-tool-ui-<version-tag>.tgz oci://<aws_account_id>.dkr.ecr.<region>.amazonaws.com/
```

- Install helm from AWS ECR

```sh
$ helm install pm-tool-ui oci://<aws_account_id>.dkr.ecr.<region>.amazonaws.com/helm-test-chart --version <version-tag>
```

- Describe Helm chart

```sh
$ aws ecr describe-images \
     --repository-name <chart-name> \
     --region <region>
```

- Mounting Environment Variables in a Kubernetes Deployment
  - Add the following lines to the values.yaml file in your Helm chart
  - Create a new file called secret.yaml and add it to the template folder
  - Edit the env section of your Kubernetes deployment to include the new variables defined in the secret.yaml file
  - Set the environment variables to your desired values. For example, set the USERNAME variable to hello_user:
    ```sh
    $ export USERNAME=hello_user
    ```
  - Apply the variables to the Helm chart by combining them with the helm install command:
    ```sh
    $ helm install --set username=$USERNAME [chart name] [chart path]
    ```
