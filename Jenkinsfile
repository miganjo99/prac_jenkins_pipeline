pipeline {
    agent any

    stages {
        stage('info') {
            steps {
                script {
                    def executor = input(
                        message: 'Intro nombre:',
                        parameters: [string(name: 'Executor', description: 'Nombre propietario de la pipeline')]
                    )

                    def motiu = input(
                        message: 'Intro execucio:',
                        parameters: [string(name: 'Motiu', description: 'why?')]
                    )

                    def chatID = input(
                        message: 'Intro Chat ID de Telegram:',
                        parameters: [string(name: 'Chat ID', description: 'Chat ID Telegram')]
                    )

                    echo "Executor: ${executor}"
                    echo "Motiu: ${motiu}"
                    echo "Chat ID: ${chatID}"

                    env.EXECUTOR = executor
                    env.MOTIU = motiu
                    env.CHAT_ID = chatID
                }
            }
        }
    }
}
