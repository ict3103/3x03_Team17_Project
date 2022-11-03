pipeline {
    agent any
	{
	stages {
		stage ('Dependency Check') {
		    steps {
				echo'Testing..'
		        dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
		    }
			post {
            	success {
        			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
					
					junit '**/result.xml'
    			}
			}
		
		}
	}
}


