FROM alpine:latest

RUN apk add --no-cache curl bash

WORKDIR /usr/src/app

COPY generator.sh .

RUN chmod +x generator.sh

CMD ["./generator.sh"]
