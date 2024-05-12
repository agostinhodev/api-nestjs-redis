FROM redis:latest AS development

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/local/etc/redis /var/log/redis
RUN chown -R redis:redis /usr/local/etc/redis /var/log/redis
RUN chmod -R 755 /usr/local/etc/redis /var/log/redis

COPY redis.conf /usr/local/etc/redis/redis.conf

USER redis

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]

EXPOSE 6379
