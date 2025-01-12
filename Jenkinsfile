pipeline {
    agent any
    parameters {
        string(name: 'EXECUTOR', defaultValue: 'usuario_default', description: 'Nombre propietario de la pipeline')
        string(name: 'MOTIU', defaultValue: 'Motivo por defecto', description: 'Why?')
        string(name: 'CHAT_ID', defaultValue: '123456', description: 'Chat ID Telegram')
    }

    stages {

        
        stage('Install Dependencies') {
            steps {
                script {
                    if (!fileExists('node_modules')) {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    def lintResult = bat(script: 'npx eslint . --fix', returnStdout: true)
                    
                    echo "Resultados del Linter: ${lintResult}"

                    if (lintResult.contains("error")) {
                        currentBuild.result = 'FAILURE'
                        error("Errores en el Linter")
                    }
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
