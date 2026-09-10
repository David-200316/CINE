FROM tomcat:9.0-jdk17-openjdk

RUN rm -rf /usr/local/tomcat/webapps/ROOT/*

COPY cartelera.jsp /usr/local/tomcat/webapps/ROOT/index.jsp
COPY css/ /usr/local/tomcat/webapps/ROOT/css/
COPY js/ /usr/local/tomcat/webapps/ROOT/js/
COPY img/ /usr/local/tomcat/webapps/ROOT/img/

EXPOSE 8080

CMD ["catalina.sh", "run"]