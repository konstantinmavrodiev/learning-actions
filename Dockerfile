FROM openjdk:11
EXPOSE 8080
COPY target/*.jar ./test.jar
ENTRYPOINT ["java","-jar","/test.jar"]