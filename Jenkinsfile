pipeline {

    agent any

    stages {
        stage('OWASP Dependency-Check') {
            steps {
				echo 'Hello from Dev branch'
				sh 'echo "Testing Phase"'
				sh 'echo "Building the repository"'    
                echo 'Testing...'
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
                
                sh """
					docker-compose up --build
                """
				echo 'Docker container built'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'

                sh """


                    
                   
                """
            }
        }

        stage('CopyTestResult') {
            steps {
                echo 'Copy...'

                sh """
                   
				   
                """
            }
        }
    }

    post {
        success {
            //dependencyCheckPublisher pattern: 'dependency-check-report.xml'

            //junit '**/result.xml'
        }
		failure {
		
			echo 'Build stage failed'
			error('Stopping early…')
    }
}