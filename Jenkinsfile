pipeline {
agent any
stages {
    stage('Test') {
      steps {
          echo 'Hello from Dev branch'
            sh 'echo "Testing Phase"'
            sh 'echo "Building the repository"'
			sh 'echo "Installing Requirements.txt"'
			sh 'pip install -r requirements.txt'
			sh 'echo "Requirements met, thanks"'
			echo 'Test completed, thanks'
        
      }
  }

    stage('Build') {
    steps {
        sh 'docker-compose -f containers/docker-compose.yml up --build'
		sh 'echo "Building Docker container.."'
    }
    }
  }
  }
  stage('Deploy') {
  steps {
    echo "Deploying the application, please wait..."
  }
  post {
    always {
      echo 'The pipeline completed'
      junit allowEmptyResults: true, testResults:'**/test_reports/*.xml'
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