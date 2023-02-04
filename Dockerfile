FROM golang:1.20-bullseye

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY server/go.mod server/go.sum ./
RUN go mod download && go mod verify

COPY server .
RUN go build -v -o /usr/local/bin/app

CMD ["app"]
