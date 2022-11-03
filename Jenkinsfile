pipeline {
    agent any
	stages {
		stage ('Build') {
			steps {
				dir("/var/jenkins_home/workspace/ICT3x03/client"){
					sh 'docker build Dockerfile'
				}
				dir ("/var/jenkins_home/workspace/ICT3x03/server"){
					sh 'docker build Dockerfile'
				}
			}
		}
	stage ('Dependency Check') {
		    steps {
		        dependencyCheck additionalArguments: 'scan="/var/jenkins_home/workspace/ICT3x03" --format HTML --format XML --disableYarnAudit --disableAssembly', odcInstallation: 'Default'
		    }
			post {
            	success {
        			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
			}
		
		}
	}
}


