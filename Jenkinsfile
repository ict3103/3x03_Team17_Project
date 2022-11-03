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
		
	}
}
}
