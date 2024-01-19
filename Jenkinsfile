node {
    def app

     stage('Clone repository') {
         checkout scm
     }

     stage('Build image') {
         app = docker.build("ap-seoul-1.ocir.io/cnqphqevfxnp/storage")
     }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

     stage('Push image') {
         docker.withRegistry('https://ap-seoul-1.ocir.io', 'ocir-seoul') {
         // docker.withRegistry('https://register.hub.docker.com', 'docker-hub') {   
             app.push("${env.BUILD_NUMBER}")
         }
     }

     stage('Trigger ManifestUpdate') { 
        echo "triggering update-manifest job"
        build job: 'update-manifest', parameters: [
            string(name: 'STAGE', value: 'test'),
            string(name: 'MAJOR', value: '0'),
            string(name: 'MINOR', value: env.BUILD_NUMBER),
            string(name: 'SERVICE', value: 'storage')
        ]
     }
}