pipeline{
    agent { docker-compose.yml } {
	stages {
		stage ('Build') {
			steps {
				dir("/var/jenkins_home/workspace/ICT3x03/server"){
					sh 'pip3 install -r requirements'
				}
				dir ("/var/jenkins_home/workspace/ICT3x03/client"){
					sh 'npm install'
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
}
}
