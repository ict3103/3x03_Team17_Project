pipeline {

    agent any

    stages {
        stage ('Dependency Check') {
		    steps {
		        dependencyCheck additionalArguments: 'scan="/var/jenkins_home/workspace/ICT3x03-Team02-ST-dev" --format HTML --format XML --disableYarnAudit --disableAssembly', odcInstallation: 'Default'
		    }
			post {
            	success {
        			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
			}
        }
    }
}

