pipeline {

    agent any

    stages {
        stage ('Dependency Check') {
		    steps {
		        dependencyCheck additionalArguments: 'scan="/var/jenkins_home/workspace/3x03_Team17_Project" --format HTML --format XML --disableYarnAudit --disableAssembly', odcInstallation: 'Default'
		    }
			post {
            	success {
        			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
			}


	options {
			// running job to be aborted automatically if a new run is started.
			disableConcurrentBuilds(abortPrevious: true)
  	}

	stages {
		stage ('Build') {
			steps {
				dir("/var/jenkins_home/workspace/3x03_Team17_Project/client"){
					sh 'npm install'
				}
				dir ("/var/jenkins_home/workspace/3x03_Team17_Project/server"){
					sh 'python app.py'
				}
			}
		}
		
		}
	}
}