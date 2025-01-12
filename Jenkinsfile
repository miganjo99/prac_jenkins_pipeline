pipeline {
    agent any
    parameters {
        string(name: 'EXECUTOR', defaultValue: 'usuario_default', description: 'Nombre propietario de la pipeline')
        string(name: 'MOTIU', defaultValue: 'Motivo por defecto', description: 'Why?')
        string(name: 'CHAT_ID', defaultValue: '123456', description: 'Chat ID Telegram')
    }

    stages {

        
        stage('Linter') {
            steps {
                script {
                    sh 'npm install eslint' 
                    sh 'npx eslint . --fix' 
                }
            }
        }

        stage('info') {
            steps {
                script {
                    echo "Executor: ${params.EXECUTOR}"
                    echo "Motiu: ${params.MOTIU}"
                    echo "Chat ID: ${params.CHAT_ID}"

                    env.EXECUTOR = params.EXECUTOR
                    env.MOTIU = params.MOTIU
                    env.CHAT_ID = params.CHAT_ID
                }
            }
        }
    }
}
