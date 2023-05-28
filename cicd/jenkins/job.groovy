def auth_repo = 'git@github.com:Magisterka-Maurycy/auth.git'
def dsa_repo = 'git@github.com:Magisterka-Maurycy/dsa.git'
def math_repo = 'git@github.com:Magisterka-Maurycy/math.git'
def mba_repo = 'git@github.com:Magisterka-Maurycy/mba.git'

pipelineJob('Auth') {
    properties {
        githubProjectUrl('https://github.com/Magisterka-Maurycy/auth')
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
