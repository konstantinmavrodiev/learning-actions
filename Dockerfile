FROM openjdk:11
EXPOSE 8080
COPY target/External-IP-Checker-1.0.2-jar-with-dependencies.jar test.jar
ENTRYPOINT ["java","-jar","/test.jar"]