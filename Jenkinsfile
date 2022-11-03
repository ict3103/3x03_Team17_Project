pipeline {

    agent any

    stages {
        stage('OWASP Dependency-Check') {
            steps {
                echo 'Testing...'
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
                
                sh """
                // 
				'ok'
                """
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'

                sh """
                 //   
                 //   
                    'ok'
                 //   
                """
            }
        }

        stage('CopyTestResult') {
            steps {
                echo 'Copy...'

                sh """
                    // 
                    'ok'
                """
            }
        }
    }

    post {
        success {
            dependencyCheckPublisher pattern: 'dependency-check-report.xml'

            junit '**/result.xml'
        }
    }
}