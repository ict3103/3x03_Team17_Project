pipeline {


    agent any
	stages {
		stage ('Build') {
			steps {
				git 'var/jenkins_home/JenkinsDependencyCheckTest'
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


