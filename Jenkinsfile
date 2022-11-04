pipeline{
    agent  { 
	stages {
		stage ('Build') {
			steps {
					sh 'docker compose build -pull'
				}

				}
			}
		}
			
		stage ('Dependency Check') {
		    steps {
				echo 'Testing..'
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




