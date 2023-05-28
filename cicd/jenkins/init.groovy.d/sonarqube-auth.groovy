#!/usr/bin/env groovy
import com.cloudbees.jenkins.plugins.sshcredentials.impl.*
import com.cloudbees.plugins.credentials.*
import com.cloudbees.plugins.credentials.common.*
import com.cloudbees.plugins.credentials.domains.*
import com.cloudbees.plugins.credentials.impl.*
import groovy.json.JsonSlurper
import hudson.plugins.sonar.SonarInstallation
import hudson.plugins.sonar.SonarRunnerInstallation
import hudson.plugins.sonar.SonarRunnerInstaller
import hudson.plugins.sonar.model.TriggersConfig
import hudson.tools.InstallSourceProperty
import hudson.util.Secret
import jenkins.model.*
import org.jenkinsci.plugins.plaincredentials.impl.*
import org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl

import java.util.logging.Level
import java.util.logging.Logger

final def LOG = Logger.getLogger("LABS")

def disableSonar = System.getenv("DISABLE_SONAR")
if(disableSonar != null && disableSonar.toUpperCase() == "TRUE") {
    LOG.log(Level.INFO, 'Skipping SonarQube configuration')
    return
}

LOG.log(Level.INFO, 'Configuring SonarQube')
def sonarConfig = Jenkins.instance.getDescriptor('hudson.plugins.sonar.SonarGlobalConfiguration')

def sonarHost = System.getenv("SONARQUBE_URL")
if (sonarHost == null) {
    //default
    sonarHost = "http://sonarqube:9000"
}

def tokenName = 'Jenkins'

// Make a POST request to delete any existing admin tokens named "Jenkins"
LOG.log(Level.INFO, 'Delete existing SonarQube Jenkins token')
def revokeToken = new URL("${sonarHost}/api/user_tokens/revoke").openConnection()
def message = "name=Jenkins&login=admin"
revokeToken.setRequestMethod("POST")
revokeToken.setDoOutput(true)
revokeToken.setRequestProperty("Accept", "application/json")
def authString = "admin:admin".bytes.encodeBase64().toString()
revokeToken.setRequestProperty("Authorization", "Basic ${authString}")
revokeToken.getOutputStream().write(message.getBytes("UTF-8"))

// Create a new admin token named "Jenkins" and capture the value
LOG.log(Level.INFO, 'Generate new auth token for SonarQube/Jenkins integration')
def generateToken = new URL("${sonarHost}/api/user_tokens/generate").openConnection()
message = "name=${tokenName}&login=admin"
generateToken.setRequestMethod("POST")
generateToken.setDoOutput(true)
generateToken.setRequestProperty("Content-Type", "application/x-www-form-urlencoded")
generateToken.setRequestProperty("Authorization", "Basic ${authString}")
generateToken.getOutputStream().write(message.getBytes("UTF-8"))
rc = generateToken.getResponseCode()

if (rc == 200) {
    LOG.log(Level.INFO, 'Successfully generated SonarQube auth token')
    def jsonBody = generateToken.getInputStream().getText()
    def jsonParser = new JsonSlurper()
    def data = jsonParser.parseText(jsonBody)
    def token = data.token


    LOG.log(Level.INFO, 'Create Credential for Sonar')
    global_domain = Domain.global()
    provider = Jenkins.instance.getExtensionList('com.cloudbees.plugins.credentials.SystemCredentialsProvider')[0]
    credentials_store = provider.getStore()
    sonarqubeSecretText = new StringCredentialsImpl(
            CredentialsScope.GLOBAL,
            'sonarqube-authentication-token',
            'SonarQube authentication token',
            Secret.fromString(token)
    )
    credentials_store.addCredentials(global_domain, sonarqubeSecretText)
    provider.save()


    LOG.log(Level.INFO, 'Add the SonarQube server config to Jenkins')
    SonarInstallation sonarInst = new SonarInstallation(
            /* String name */ "SonarQube",
            /* String serverUrl */ sonarHost,
            /*String credentialsId*/ "sonarqube-authentication-token",
            // does not create new secret for credential id
            /* Secret serverAuthenticationToken*/ Secret.fromString(""),
            /*String webhookSecretId*/ "",
            /*String mojoVersion*/ "",
            /*String additionalProperties*/ "",
            /* String additionalAnalysisProperties */ "",
            /*TriggersConfig triggers*/ new TriggersConfig()
    )
    sonarConfig.setInstallations(sonarInst)
    sonarConfig.setBuildWrapperEnabled(true)
    sonarConfig.save()

    LOG.log(Level.INFO, 'SonarQube configuration complete')
} else {
    LOG.log(Level.INFO, "Request failed: ${rc}")
    LOG.log(Level.INFO, generateToken.getErrorStream().getText())
}