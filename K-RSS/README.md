# RSSHub Deployment

This is a Docker Compose setup for running RSSHub locally.

## Prerequisites

- Docker
- Docker Compose

### Installing Docker and Docker Compose

#### Windows
1. Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
2. Follow the installation instructions
3. Docker Compose is included with Docker Desktop for Windows

#### macOS
1. Download and install [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
2. Follow the installation instructions
3. Docker Compose is included with Docker Desktop for Mac

#### Linux
1. Install Docker:
   ```
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```
2. Install Docker Compose:
   ```
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

## Deployment

1. Make sure Docker and Docker Compose are installed on your system.
2. Navigate to this directory:
   ```
   cd K-RSS
   ```
3. Start the services:
   ```
   docker-compose up -d
   ```
4. RSSHub will be available at http://localhost:1200

## Troubleshooting

### Common Issues

1. **Connection Errors**: If you're experiencing connection errors, check if you need to configure a proxy in the `docker-compose.yml` file. Uncomment and configure the `PROXY_URI` environment variable.

2. **Port Conflicts**: If port 1200 is already in use, change the port mapping in the `docker-compose.yml` file.

3. **Socket Proxy Error**: If you see errors related to socket proxy, make sure you don't have any proxy settings that might interfere with the connection.

4. **Docker not found**: If you get "command not found" errors, make sure Docker is properly installed and added to your PATH.

## Usage

1. Install the RSSHub Radar browser extension
2. Configure the extension to use your local RSSHub instance (http://localhost:1200)
3. Visit websites and use the extension to generate RSS feeds

## More Information

For more details about RSSHub, visit the [official documentation](https://docs.rsshub.app/). 