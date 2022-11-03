pipeline {
	agent {
	docker {
	services:
	  react:
		image: react
		build: ./client #build the docker file inside the client directory
		ports:
		 - "3000:3000"
	  flask:
		image: flask
		build: ./server #build the docker file inside the server directory
		ports:
		  - "5000:5000"
	}
}
	options {
		
    	disableConcurrentBuilds(abortPrevious: true)
  	}
	stages {
		stage ('Build') {
			steps {
				dir("/var/jenkins_home/workspace/3x03_Team17_Project/client/"){
					sh 'npm install'
				}
				dir ("/var/jenkins_home/workspace/3x03_Team17_Project/server/"){
					sh 'pip3 install -r requirements.txt'
				}
			}
		}
				stage ('OWASP Dependency Check') {
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
