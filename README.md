# eBay Scraper API

This project is a Node.js-based API that scrapes product listings from eBay and processes the extracted data using OpenAI. It uses Puppeteer to fetch product details and an AI model to analyze the listings.

## 📌 Features

- Scrapes product titles, prices, and description from eBay search results.
- Uses OpenAI to analyze and categorize the extracted data.
- Provides a simple REST API endpoint for easy access.

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/your-username/ebay-scraper-api.git
cd ebay-scraper-api
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file in the project root and add your OpenAI API key:

```sh
OPENROUTER_API_KEY=your-openai-api-key
AI_MODEL=your-ai-model
```

### 4️⃣ **Run the Server**

```sh
node server.js
```

Or with **nodemon** (for development):

```sh
npm run dev
```

---

## 📡 API Usage

### **Endpoint:**

```http
GET /api/scraper?query=<search_term>$pgn=<pagination>
```

### **Example Request:**

```sh
curl "http://localhost:8800/scrape?query=nike&pgn=1"
```

### **Example Response:**

```json
{
  "query": "nike",
  "results": [
    {
      "title": "NIKE R1 Limited Edition",
      "price": "IDR 1,999.00",
      "description": "High-end MacBook Pro with M1 chip."
    }
  ]
}
```

---

## 🛠️ Project Structure

```
/ebay-scraper-api
│── /src
│   │── /routes
│   │── /controllers
│   │── /services
│   │── /utils
│── server.js
│── package.json
│── .env
│── README.md
```

---

## 📌 Dependencies

- **Express.js** - API framework
- **Puppeteer** - Web scraping
- **Deepseek API** - AI-based data analysis
- **dotenv** - Environment variable management
