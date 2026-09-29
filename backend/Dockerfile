FROM golang:1.24-alpine AS builder

WORKDIR /app

RUN apk add --no-cache ca-certificates git

COPY go.mod ./
COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -trimpath \
    -ldflags="-s -w -extldflags '-static'" \
    -o server .

FROM alpine:3.20 AS runner

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/server /app/server

USER appuser

EXPOSE 8080

ENV PORT=8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["/app/server"]
