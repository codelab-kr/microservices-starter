FROM jenkins/agent:latest-jdk17
USER root
RUN apt-get update -y && apt-get clean && rm -rf /var/lib/apt/lists/*
# RUN apt-get update && apt-get install -y lsb-release python3-pip pipx
USER jenkins
