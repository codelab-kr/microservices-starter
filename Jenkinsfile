node('docker') {
    def app

   stage('Check Docker installation') {
      sh 'docker --version || echo "Docker is not installed"'
   }

   stage('Clone repository') {
      checkout scm
   }

//    stage('Build-Docker-Image') {
//         container('dind') {
//             sh 'docker build -t ap-seoul-1.ocir.io/cnqphqevfxnp/test-storage:latest --target development .'
//         }
//     }

     stage('Build image') {
         app = docker.build("ap-seoul-1.ocir.io/cnqphqevfxnp/test-storage", "--target development .")
     }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    //  stage('Push image') { 
    //      dind.withRegistry('https://ap-seoul-1.ocir.io', 'ocir-seoul') {
    //      // docker.withRegistry('https://register.hub.docker.com', 'docker-hub') {   
    //          app.push("0.${env.BUILD_NUMBER}")
    //      }
    //  }

   //   stage('Trigger ManifestUpdate') { 
   //      echo "triggering update-manifest job"
   //      build job: 'update-manifest', parameters: [
   //          string(name: 'STAGE', value: 'test'),
   //          string(name: 'MAJOR', value: '0'),
   //          string(name: 'MINOR', value: env.BUILD_NUMBER),
   //          string(name: 'SERVICE', value: 'storage')
   //      ]
   //   }
}
