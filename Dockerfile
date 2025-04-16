# Node.js dockerfile

FROM node:18 AS base

RUN apt-get update && apt-get install -y chromium && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true


WORKDIR /app

COPY node-scraper/package.json ./node-scraper/
WORKDIR /app/node-scraper
RUN npm install
COPY node-scraper/ ./
RUN node scraper.js

# Python dockerfile

FROM python:3.10-slim

WORKDIR /app

# Copy scraped data and Flask server
COPY --from=base /app/node-scraper/data.json ./node-scraper/data.json
COPY python-datascraper/requirements.txt ./python-datascraper/
COPY python-datascraper/server.py ./python-datascraper/

RUN pip install -r python-datascraper/requirements.txt

EXPOSE 5000

CMD ["python", "python-datascraper/server.py"]
