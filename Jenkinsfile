pipeline{
    agent any 
	stages {
		stage ('Build and Deploy') {
			steps {
					echo 'Deploying React and Flask Containers..'
					sh 'docker compose -f docker-compose.yml up -d'
				}

				}
		stage ('Dependency Check') {
		    steps {
				echo 'Starting OWASP Dependency Check..'
		        dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
		    }
			post {
            	success {
				echo 'Generating the report..'
        		dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
		stage ('Automation Testing') {
			steps{
					echo 'Starting automated testing..'
				script{
					docker.image("flask")
					sh "docker exec -t ${c.id} python test.py"
					
						}
					}
				}
			}
		}
	}
}

