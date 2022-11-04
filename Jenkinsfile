pipeline{
    agent any 
	stages {
		stage ('Build') {
			steps {
					sh 'docker compose -f docker-compose.yml up -d'
				}

				}
		stage ('Dependency Check') {
		    steps {
				echo 'Testing......'
		        //dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
		    }
			post {
            	success {
				echo 'Generating the report..'
        		//dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
			}
		
		}
		
}
}


