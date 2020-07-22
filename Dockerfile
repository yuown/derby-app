FROM java:openjdk-8-jdk-alpine

WORKDIR /usr

COPY /target/spring-boot-derby-1.0.jar ./spring-boot-derby-1.0.jar

EXPOSE 8888

CMD java -jar /usr/spring-boot-derby-1.0.jar
