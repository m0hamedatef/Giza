pipeline {
    agent any 

    environment {
        REPO_SERVER = "339712792713.dkr.ecr.us-east-1.amazonaws.com/graduation"
        REPO_NAME_BACKEND = "${REPO_SERVER}:backend"
        REPO_NAME_FRONTEND = "${REPO_SERVER}:frontend"
        IMAGE_VERSION = "${BUILD_NUMBER}"
    }

    stages {

        stage("build image and push to ECR") {
            steps {
                script {
                    echo "building and pushing docker images ..."
                    withCredentials([
                        usernamePassword(credentialsId: 'ecr-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')
                    ]){
                        sh "docker login -u ${USER} -p ${PASS} ${REPO_SERVER}"
                        sh "docker build app/backend/. -t ${REPO_NAME_BACKEND}-${IMAGE_VERSION}"
                        sh "docker push ${REPO_NAME_BACKEND}-${IMAGE_VERSION}"
                        sh "docker build app/frontend/. -t ${REPO_NAME_FRONTEND}-${IMAGE_VERSION}"
                        sh "docker push ${REPO_NAME_FRONTEND}-${IMAGE_VERSION}"
                    }
                }
            }
        }

        stage("change image version") {
            steps {
                script {
                    echo "change image version .."
                    sh "sed -i \"s|image:.*|image: ${REPO_NAME_BACKEND}-${IMAGE_VERSION}|g\" k8s/back.yaml"
                    sh "sed -i \"s|image:.*|image: ${REPO_NAME_FRONTEND}-${IMAGE_VERSION}|g\" k8s/front.yaml"
                }
            }
        }

        stage('Deploy to eks cluster') {
            steps {
                echo 'Deploying to eks cluster ... '
                withCredentials([file(credentialsId:'kube-config', variable:'KUBECONFIG')]){
                    script{
                        sh 'kubectl apply -f k8s'
                    }
                }
            }
        }
    }
}