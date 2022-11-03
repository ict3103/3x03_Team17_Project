pipeline {

    agent any
	stages {
		stage ('Build') {
			steps {
				dir("/var/jenkins_home/workspace/3x03_Team17_Project/client"){
					sh 'npm install'
				}
				dir ("/var/jenkins_home/workspace/3x03_Team17_Project/server"){
					sh 'pip3 install -r requirements.txt'
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


