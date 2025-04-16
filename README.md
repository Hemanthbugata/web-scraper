# 🕷️ Web Scraper (Assignment for ExactSpace ) (Node.js + Python + Docker)

This project demonstrates how to scrape dynamic content from a website using **Puppeteer (Node.js)**, and serve the scraped content using a **Flask (Python)** API. The full stack is containerized using a **multi-stage Docker build** to optimize size and performance.

---

## 📌 Features

- Scrapes content (title, headings, paragraph, image, etc.) from any given URL
- Uses Puppeteer with headless Chromium for dynamic web scraping
- Serves the scraped JSON data via a Flask API
- Built with Docker multi-stage build to keep the final image lean
- Environment variable support for dynamic URLs

---

## 🗂️ Project Structure

![web-scraper architecture](https://github.com/user-attachments/assets/57da0502-86f5-41a8-8fb0-782f254e6de7)


 Setup Instructions (for runnning in local system ) 

  Clone the repo and  Install dependencies

    
      git clone https://github.com/Hemanthbugata/web-scraper.git

      cd node-scraper

      npm install 

      node scraper.js  (scraped data is stored in data.json)

      .env ( include the website URL for web scrapping) 
            SCRAPE_URL = " " 

      cd ../ python-datascraper

      requrirements.txt (Flask==2.2.5)

      pip install requriements.txt

      python server.py (displays the data stored in data.json on localhost)

Now in Root dir 

 After Dockerfile is coded. 

    docker build -t web-scraper . 

    docker run -p 5000:5000 web-scraper (runs on a docker container) 
    

  
