FROM tomcat:9.0-jdk17-openjdk

# Limpiar el ROOT por defecto
RUN rm -rf /usr/local/tomcat/webapps/ROOT/*

# Copiar el archivo principal renombrado a index.jsp
COPY cartelera.jsp /usr/local/tomcat/webapps/ROOT/index.jsp

# Copiar las carpetas de recursos asegurando que existan
COPY css/ /usr/local/tomcat/webapps/ROOT/css/
COPY js/ /usr/local/tomcat/webapps/ROOT/js/
COPY img/ /usr/local/tomcat/webapps/ROOT/img/

EXPOSE 8080

CMD ["catalina.sh", "run"]
