pipeline {
agent any
stages {
    stage('Test') {
      steps {
          echo 'Hello from Dev branch'
            sh 'echo "Testing Phase"'
            sh 'echo "Building the repository"'        
      }
  }
    stage('Build') {
    steps {
        sh 'docker-compose -f docker-compose.yml up --build'
		sh 'echo "Building Docker container.."'
    }
    }
  }
  }
  stage('Deploy') {
  steps {
    echo "Deploying the application, please wait..."
  dir('Backend')
{
    script
    {
        docker.build("Dockerfile", "-f ./server/Dockerfile .")
		sh 'echo "Building Python container"'
    }
}
 parallel
 dir ('frontend')
 {
    script
	{
		docker.build("Dockerfile", "-f ./client/Dockerfile .")
		sh 'echo "Building React container"'
  }
 }
  post {
    always {
      echo 'The pipeline completed'
      //junit allowEmptyResults: true, testResults:'**/test_reports/*.xml'
    }
    success {
      echo "Flask Application Up and running!!"
    }
    failure {
      echo 'Build stage failed'
      error('Stopping early…')
    }
  }   
}
}