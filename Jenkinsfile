pipeline {
  agent any
  environment{
    	DOCKERHUB_CREDENTIALS=credentials('ticiano-dockerhub')
  }
  tools {
     nodejs 'recent node'
  }
  options {
    timeout(time: 5, unit: 'MINUTES')
  }
  stages {
    
    stage('Build') {
      steps{
        echo "actually building at branch ${env.GIT_BRANCH}" 
        echo "actually building ${env.BUILD_ID}" 
      }
    }
  
    stage('Build image') {
      steps {
            script{              
              sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
              // sh 'docker 2>/dev/null 1>&2 rmi ms1:1.0 | true'
              sh "docker build --build-arg BUILD=${env.BUILD_ID} -t ms1:1.0-build${env.BUILD_ID} ."
            }
      }
    }
    stage('Push image to Docker Hub'){
        steps{
                sh "docker tag ms1:1.0-build${env.BUILD_ID} $DOCKERHUB_CREDENTIALS_USR/ms1:1.0-build${env.BUILD_ID} ";
                sh "docker push $DOCKERHUB_CREDENTIALS_USR/ms1:1.0-build${env.BUILD_ID} "
        }
    }
    
    stage('deploy as stable(main)?') {
      steps {
        script{
          if(env.GIT_BRANCH == 'origin/main'){
            echo "Deploying as testing";
            sh "echo \$BUILD_ID | cat deployments/prod/ms1-deployment-template.yaml | envsubst > deployments/prod/ms1-deployment-buildNumber.yaml  "            
            sh 'kubectl get pods -n prod'
            sh 'kubectl delete deployment -n prod --ignore-not-found=true ms1-prod '
            sh 'kubectl replace -f deployments/prod/ms1-service.yaml'
            sh 'kubectl apply -f deployments/prod/ms1-ingress.yaml'
            sh 'kubectl delete --ignore-not-found=true -f deployments/prod/ms1-deployment-buildNumber.yaml'
            sh 'kubectl apply -f deployments/prod/ms1-deployment-buildNumber.yaml'
            echo 'Get pods after delete'
            sh 'kubectl get pods -n prod'
            sh 'chmod +x deployments/waiting-for-running.sh'
            sh "./deployments/waiting-for-running.sh ${env.BUILD_ID} prod"
          }
        }
      }
    }


  }
}