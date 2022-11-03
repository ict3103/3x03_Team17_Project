pipeline {

    agent any
	stages {
		stage ('Build') {
			steps {
				dir("/var/jenkins_home/workspace/3x03_Team17_Project/client"){
					sh 'docker build Dockerfile'
				}
				dir ("/var/jenkins_home/workspace/3x03_Team17_Project/server"){
					sh 'docker build Dockerfile'
				}
			}
		}
	stage ('Dependency Check') {
		    steps {
		        dependencyCheck additionalArguments: 'scan="/var/jenkins_home/workspace/3x03_Team17_Project" --format HTML --format XML --disableYarnAudit --disableAssembly', odcInstallation: 'Default'
		    }
			post {
            	success {
        			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
			}
		
		}
	}
}


