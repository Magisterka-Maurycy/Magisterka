FROM jenkins/inbound-agent:latest-jdk17

USER root
RUN groupadd docker
RUN usermod -aG docker jenkins

RUN touch /var/run/docker.sock
RUN chmod 777 /var/run/docker.sock

RUN apt-get update \
    && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
RUN apt-get update  -qq \
    && apt-get install docker-ce -y
RUN usermod -aG docker jenkins
RUN apt-get clean
USER jenkins
RUN newgrp docker
# set default user attributes
ENV JENKINS_UID=1000
ENV JENKINS_GID=1000

#TODO: Attempted to read Testcontainers configuration file at file:/root/.testcontainers.properties but the file was not found. Exception message: FileNotFoundException: /root/.testcontainers.properties (No such file or directory)