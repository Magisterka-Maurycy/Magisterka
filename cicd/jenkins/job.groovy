def auth_repo = 'git@github.com:Magisterka-Maurycy/auth.git'
def dsa_repo = 'git@github.com:Magisterka-Maurycy/dsa.git'
def math_repo = 'git@github.com:Magisterka-Maurycy/math.git'
def mba_repo = 'git@github.com:Magisterka-Maurycy/mba.git'

pipelineJob('Auth') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/auth')
        pipelineTriggers{
            triggers{
                pollSCM{
                    scmpoll_spec('H/20 * * * *')
                }
            }
        }
    }
    parameters{
        booleanParam('DEPLOY', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials("Maurycy_ssh")
                        url(auth_repo)
                    }
                }

            }
        }
    }
}

pipelineJob('DSA') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/dsa')
        pipelineTriggers{
            triggers{
                pollSCM{
                    scmpoll_spec('H/20 * * * *')
                }
            }
        }
    }
    parameters{
        booleanParam('DEPLOY', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials("Maurycy_ssh")
                        url(dsa_repo)
                    }
                }

            }
        }
    }
}

pipelineJob('Math') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/math')
        pipelineTriggers{
            triggers{
                pollSCM{
                    scmpoll_spec('H/20 * * * *')
                }
            }
        }
    }
    parameters{
        booleanParam('DEPLOY', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials("Maurycy_ssh")
                        url(math_repo)
                    }
                }

            }
        }
    }
}

pipelineJob('MBA') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/mba')
        pipelineTriggers{
            triggers{
                pollSCM{
                    scmpoll_spec('H/20 * * * *')
                }
            }
        }
    }
    parameters{
        booleanParam('DEPLOY', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials("Maurycy_ssh")
                        url(mba_repo)
                    }
                }

            }
        }
    }
}

multiJob('ALL') {
    steps {
        phase('Auth'){
            phaseJob('Auth')
        }
        phase('DSA'){
            phaseJob('DSA')
        }
        phase('Math'){
            phaseJob('Math')
        }
        phase('MBA'){
            phaseJob('MBA')
        }
    }
}
