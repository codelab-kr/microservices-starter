node {
    def image

//    stage('Check Docker installation') {
//       sh 'docker --version || echo "Docker is not installed"'
//    }

   stage('Clone repository') {
      checkout scm
   }

   stage('Build-Docker-Image') {
        container('dind') {
            script {
                image = docker.build("ap-seoul-1.ocir.io/cnqphqevfxnp/test-storage", "--target development .")
            }
            // sh 'docker build -t ap-seoul-1.ocir.io/cnqphqevfxnp/test-storage:latest --target development .'
        }
    }

    //  stage('Build image') {
    //      app = docker.build("ap-seoul-1.ocir.io/cnqphqevfxnp/test-storage", "--target development .")
    //  }

    stage('Test image') {
        image.inside {
            sh 'echo "Tests passed"'
        }
    }

     stage('Push image') { 
        container('dind') {
            script {
                docker.withRegistry('https://ap-seoul-1.ocir.io', 'ocir-seoul') {
                image.push("0.${env.BUILD_NUMBER}")
                image.push("latest")
                }
            }
            // sh 'docker push ap-seoul-1.ocir.io/cnqphqevfxnp/test-storage:latest'
         // docker.withRegistry('https://register.hub.docker.com', 'docker-hub') {   
         }
     }

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
