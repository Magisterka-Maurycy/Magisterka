FROM registry.access.redhat.com/ubi9 AS ubi-micro-build
RUN mkdir -p /mnt/rootfs && \
    dnf install --installroot /mnt/rootfs curl --setopt install_weak_deps=false --nodocs -y && \
    dnf --installroot /mnt/rootfs clean all

FROM quay.io/keycloak/keycloak:21.1.1

COPY --from=ubi-micro-build /mnt/rootfs /

ADD ./realm.json /opt/keycloak/data/import/realm.json
RUN /opt/keycloak/bin/kc.sh import --file=/opt/keycloak/data/import/realm.json

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin
#TODO: fix certs and disable http
ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized"]
