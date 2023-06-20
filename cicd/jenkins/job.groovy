def auth_repo = 'git@github.com:Magisterka-Maurycy/auth.git'
def dsa_repo = 'git@github.com:Magisterka-Maurycy/dsa.git'
def math_repo = 'git@github.com:Magisterka-Maurycy/math.git'
def mba_repo = 'git@github.com:Magisterka-Maurycy/mba.git'

pipelineJob('Auth') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/auth')
    }
    parameters {
        booleanParam('DEPLOY', false)
        booleanParam('OWASP', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials('Maurycy_ssh')
                        url(auth_repo)
                    }
                    extensions {
                        localBranch('develop')
                    }
                }
            }
        }
    }
}

pipelineJob('DSA') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/dsa')
    }
    parameters {
        booleanParam('DEPLOY', false)
        booleanParam('OWASP', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials('Maurycy_ssh')
                        url(dsa_repo)
                    }
                    extensions {
                        localBranch('develop')
                    }
                }
            }
        }
    }
}

pipelineJob('Math') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/math')
    }
    parameters {
        booleanParam('DEPLOY', false)
        booleanParam('OWASP', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials('Maurycy_ssh')
                        url(math_repo)
                    }
                    extensions {
                        localBranch('develop')
                    }
                }
            }
        }
    }
}

pipelineJob('MBA') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/mba')
    }
    parameters {
        booleanParam('DEPLOY', false)
        booleanParam('OWASP', false)
    }
    definition {
        cpsScm {
            scm {
                git {
                    remote {
                        credentials('Maurycy_ssh')
                        url(mba_repo)
                    }
                    extensions {
                        localBranch('develop')
                    }
                }
            }
        }
    }
}

multiJob('ALL') {
    steps {
        phase('Auth') {
            phaseJob('Auth')
        }
        phase('DSA') {
            phaseJob('DSA')
        }
        phase('Math') {
            phaseJob('Math')
        }
        phase('MBA') {
            phaseJob('MBA')
        }
    }
}
