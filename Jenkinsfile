pipeline {
 agent any
 stages {
  stage('Checkout SCM') {
   steps {
    git '/var/jenkins_home/JenkinsDependencyCheckTest'
   }
  }

  stage('OWASP DependencyCheck') {
   steps {
    dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
   }
  }
 } 
 post {
  success {
   dependencyCheckPublisher pattern: 'dependency-check-report.xml'
  }/var/jenkins_home  
 }
}