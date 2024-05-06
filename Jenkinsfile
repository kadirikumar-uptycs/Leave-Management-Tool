pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/kadirikumar-uptycs/Leave-Management-Tool', branch: 'master', changelog: true)
      }
    }

    stage('Log') {
      steps {
        sh 'ls -al'
      }
    }

    stage('Production Build') {
      parallel {
        stage('Production Build') {
          steps {
            echo 'Build Started'
          }
        }

        stage('Build') {
          steps {
            sh 'npm install --force'
            sh 'npm run build'
            sh 'sudo docker build -t mohankumar1729/cx-tools:leave-management-tool .'
          }
        }

      }
    }

    stage('Login to DockerHub') {
      environment {
        DOCKER_USERNAME = 'mohankumar1729'
        DOCKER_PASSWORD = 'XCf!YFnHM7v@5b4fX'
      }
      steps {
        sh 'sudo docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
      }
    }

    stage('List Images') {
      steps {
        sh 'sudo docker images | grep cxtools'
      }
    }

    stage('Push Images') {
      steps {
        sh 'sudo docker push mohankumar1729/cx-tools:leave-management-tool'
      }
    }

    stage('Completed') {
      steps {
        echo 'Done!!!'
      }
    }

  }
}