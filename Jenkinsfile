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
                        bat 'npm install eslint eslint-plugin-react --save-dev'
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Linter') {
            steps {
                script {
                    def lintResult = sh(script: '''

                        npx eslint . --fix
                    
                    ''', returnStdout: true)
                    
                    echo "Resultados del Linter: ${lintResult}"

                    if (lintResult.contains("error")) {
                        currentBuild.result = 'FAILURE'
                        error("Errores en el Linter")
                    } else if (lintResult.contains("warning")) {
                        echo "Advertencias en el Linter: ${lintResult}"
                    }
                }
            }
        }



        stage('Test') {
            steps {
                script {
                    def testResult = bat(script: '''
                        npm run test -- --coverage
                    ''', returnStdout: true)

                    echo "Resultados del Test: ${testResult}"

                    if (testResult.contains("Test suite failed")) {
                        currentBuild.result = 'FAILURE'
                        error("Errores en los tests")
                    }
                }
            }
        }


         stage('Build') {
            steps {
                script {
                    def buildResult = bat(script: 'npm run build', returnStdout: true)

                    echo "Resultado del Build: ${buildResult}"

                    if (buildResult.contains("ERROR")) {
                        currentBuild.result = 'FAILURE'
                        error("El build ha fallado")
                    }
                }
            }
        }


        stage('Update_Readme') {
            steps {
                script {
                    def testResult = currentBuild.result == 'SUCCESS' ? 'success' : 'failure'

                    bat(script: "node jenkinsScripts/updateReadme.js ${testResult}", returnStdout: true)
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
