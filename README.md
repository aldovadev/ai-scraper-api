# AI Scraper API

This project is a Node.js-based API that scrapes product listings from eBay and processes the extracted data using OpenAI. It uses Puppeteer to fetch product details and an AI model to analyze the listings.

## 📌 Features

- Scrapes product titles, prices, and description from eBay search results.
- Uses OpenAI to analyze and categorize the extracted data.
- Provides a simple REST API endpoint for easy access.

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/aldovadev/ai-scraper-api.git
cd ebay-scraper-api
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file in the project root and add your OpenAI API key:

```sh
OPENROUTER_API_KEY=..
AI_MODEL=...
```

- For API Key you can access openrouter website at https://openrouter.ai and generate new key.
- for AI model recomendation is using "deepseek/deepseek-chat".

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
GET /api/scraper?query=<search_term>$pgn=<pagination>&desc<description_state>
```

### **Example GET Request:**

```sh
curl "http://localhost:8800/scrape?query=nike&pgn=1&desc=false"
```

### **Example Response:**

```json
{
  "products": [
    {
      "title": "NIKE R1 Limited Edition",
      "price": "IDR 1,999,000.00",
      "description": "The best NIKE Shoes."
    }
  ]
}
```

### **Example Stream Request:**

```sh
curl "http://localhost:8800/scrape/stream?query=nike&pgn=1&desc=false"
```

### **Example Response:**

```json
{
  "loading": "1%",
  "products": [
    {
      "title": "NIKE R1 Limited Edition",
      "price": "IDR 1,999,000.00",
      "description": "The best NIKE Shoes."
    }
  ]
}
```

---

## 🛠️ Project Structure

```
/ai-scraper-api
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
- **Openrouter API** - AI-based data analysis
- **dotenv** - Environment variable management
