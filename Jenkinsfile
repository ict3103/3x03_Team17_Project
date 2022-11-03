pipeline {
    agent any
	stages {
	stage ('Dependency Check') {
		    steps {
				echo 'Testing..'
		        dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
		    }
			post {
            	success {
					echo 'Generating the report..'
        			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    			}
			}
		
		}
	}
}


