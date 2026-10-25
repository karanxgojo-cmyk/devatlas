import { Article } from '@/types/content';

export const BEGINNER_ARTICLES: Article[] = [
  // ---------------------------------------------------------------------------
  // WEB DEVELOPMENT TRACK (Beginner Foundations)
  // ---------------------------------------------------------------------------
  {
    slug: 'how-the-web-works-dns-http',
    title: 'How the Web Works: DNS, HTTP Requests, and Browser Rendering',
    summary: 'A beginner-friendly architectural walkthrough of what happens when you type a URL into a browser address bar. Learn DNS lookups, TCP handshakes, HTTP methods, and DOM creation.',
    category: 'web-dev',
    categoryName: 'Web Development',
    tags: ['Web Fundamentals', 'DNS', 'HTTP', 'Browsers', 'Beginner'],
    author: {
      name: 'Sofia Chen',
      role: 'Frontend Infrastructure Lead',
      avatar: '/images/authors/sofia.svg',
      bio: 'Advocate for accessible web education, web standards, and developer productivity.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-10',
    updatedAt: '2026-04-15',
    readingTime: '8 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: true,
    prerequisites: [
      {
        title: 'Basic Computer Literacy',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web',
        description: 'Using a web browser, understanding URLs, and basic file management.',
      },
    ],
    relatedArticleSlugs: [
      'html-css-foundations-semantic-layouts',
      'browser-rendering-pipeline-core-web-vitals',
    ],
    headings: [
      { id: 'the-client-server-analogy', text: 'The Client-Server Analogy: The Restaurant Model', level: 2 },
      { id: 'step-1-dns-resolution', text: 'Step 1: Domain Name System (DNS) Resolution', level: 2 },
      { id: 'step-2-tcp-ip-and-tls-handshake', text: 'Step 2: TCP/IP Connection & TLS Security Handshake', level: 2 },
      { id: 'step-3-the-http-request-response-cycle', text: 'Step 3: The HTTP Request/Response Cycle', level: 2 },
      { id: 'step-4-how-browsers-parse-and-render', text: 'Step 4: How Browsers Parse HTML and Render Pixels', level: 2 },
      { id: 'common-beginner-mistakes', text: 'Common Beginner Mistakes to Avoid', level: 2 },
      { id: 'hands-on-exercise', text: 'Hands-On Practice Exercise', level: 2 },
    ],
    content: `
## The Client-Server Analogy: The Restaurant Model

When you sit at a restaurant, you (the **client**) look at a menu and make an order. The waiter takes your request to the kitchen (the **server**). The chef prepares your dish and the waiter brings it back to your table.

The World Wide Web operates on this exact client-server architecture:
- **Client**: Your device and web browser (Chrome, Safari, Firefox).
- **Server**: A computer permanently connected to the internet that stores HTML files, databases, and assets.
- **Protocol (HTTP/HTTPS)**: The standard language both parties speak to understand requests and responses.

---

## Step 1: Domain Name System (DNS) Resolution

Humans remember words like \`devatlas.engineering\`, but computers communicate using numerical **IP addresses** (such as \`198.51.100.42\`).

When you press Enter on a URL:
1. **Browser Cache Check**: The browser first checks if it recently looked up this domain.
2. **OS & Router Cache**: If not found, it queries your operating system and local Wi-Fi router.
3. **Recursive DNS Resolver**: Your ISP’s DNS resolver queries Root Servers, then TLD (.engineering) servers, and finally the domain’s Authoritative Name Server.
4. **Resolution**: The authoritative server responds with the exact IP address.

\`\`\`bash
# You can test DNS resolution in your terminal right now:
nslookup devatlas.engineering
# Output: Address: 198.51.100.42
\`\`\`

---

## Step 2: TCP/IP Connection & TLS Security Handshake

Once your browser has the server's IP address, it establishes a reliable communication channel via the **Transmission Control Protocol (TCP)**:
- **SYN**: Client asks to open a connection.
- **SYN-ACK**: Server acknowledges and agrees.
- **ACK**: Client confirms receipt.

For encrypted **HTTPS** traffic, a cryptographic **TLS handshake** immediately follows to verify the server's identity and negotiate symmetric session encryption keys.

---

## Step 3: The HTTP Request/Response Cycle

The browser then constructs an HTTP GET request message:

\`\`\`http
GET / HTTP/1.1
Host: devatlas.engineering
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml
Accept-Encoding: gzip, br
\`\`\`

The server processes the request and responds with an HTTP status code and document body:
- **200 OK**: Request succeeded, content attached.
- **301 Moved Permanently**: URL redirect.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: Bug on the backend server.

---

## Step 4: How Browsers Parse HTML and Render Pixels

Receiving raw bytes is only half the battle. Your browser must transform text into visual graphics:
1. **HTML Parsing & Tokenization**: Converts characters \`<div>\` into DOM (Document Object Model) nodes.
2. **CSSOM Construction**: Parses CSS rules to compute styling hierarchies.
3. **Render Tree**: Combines DOM and CSSOM, ignoring hidden elements (\`display: none\`).
4. **Layout (Reflow)**: Calculates geometric coordinates for every bounding box.
5. **Paint & Compositing**: Fills pixels on screen and sends drawing layers to your GPU.

---

## Common Beginner Mistakes to Avoid

1. **Assuming domain names and web hosting are the same thing**: A domain name is merely an address book record (DNS pointer); web hosting is the physical or cloud server holding your actual code.
2. **Ignoring HTTP Status Codes**: Always inspect Network tabs in Chrome DevTools to verify if requests are returning 200, 304, or 404.
3. **Thinking HTTPS hides the website you visit**: HTTPS encrypts the URL path and payload, but your network provider can still see the root domain name via SNI (Server Name Indication).

---

## Hands-On Practice Exercise

Open Chrome or Firefox DevTools on any website:
1. Press \`F12\` or right-click and choose **Inspect**.
2. Click the **Network** tab and check **Disable cache**.
3. Reload the page and observe the very first document row:
   - What is the HTTP Status?
   - Look at the **Headers** tab: What is the remote IP address?
   - Look at the **Timing** tab: How many milliseconds did the initial DNS lookup take?
`,
  },
  {
    slug: 'html-css-foundations-semantic-layouts',
    title: 'HTML5 Semantic Markup & Modern CSS Foundations: Flexbox & Grid',
    summary: 'Master foundational web layout design. Learn semantic HTML tags that boost accessibility and SEO, followed by practical Flexbox and CSS Grid layouts with real code exercises.',
    category: 'web-dev',
    categoryName: 'Web Development',
    tags: ['HTML5', 'CSS', 'Flexbox', 'CSS Grid', 'Beginner'],
    author: {
      name: 'Elena Rostova',
      role: 'Staff Frontend Architect',
      avatar: '/images/authors/elena.svg',
      bio: 'Specializes in high-scale web applications, compiler optimizations, and modern React performance patterns.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-12',
    updatedAt: '2026-04-16',
    readingTime: '9 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: true,
    prerequisites: [
      {
        title: 'How the Web Works',
        url: '/articles/how-the-web-works-dns-http',
        description: 'Understanding client-server communication and browser parsing.',
      },
    ],
    relatedArticleSlugs: [
      'how-the-web-works-dns-http',
      'modern-css-container-queries-has',
    ],
    headings: [
      { id: 'why-semantic-html-matters', text: 'Why Semantic HTML Matters', level: 2 },
      { id: 'essential-semantic-tags', text: 'Essential Semantic Elements You Must Know', level: 2 },
      { id: 'css-box-model-demystified', text: 'The CSS Box Model Demystified', level: 2 },
      { id: 'flexbox-1-dimensional-flow', text: 'Flexbox: 1-Dimensional Alignment', level: 2 },
      { id: 'css-grid-2-dimensional-systems', text: 'CSS Grid: 2-Dimensional Layout Systems', level: 2 },
      { id: 'common-mistakes-and-anti-patterns', text: 'Common Mistakes and Anti-Patterns', level: 2 },
      { id: 'practical-exercise-build-a-card', text: 'Practical Exercise: Build a Responsive Card', level: 2 },
    ],
    content: `
## Why Semantic HTML Matters

A browser can render a website constructed entirely of \`<div>\` and \`<span>\` elements. However, doing so creates an inaccessible, unreadable document.

Semantic HTML means using elements that clearly describe their meaning to both the browser and the developer:
- **Accessibility**: Screen readers rely on semantic landmarks (\`<main>\`, \`<nav>\`, \`<article>\`) so visually impaired users can jump directly to primary content.
- **SEO (Search Engine Optimization)**: Search engines penalize confusing tag hierarchies. An \`<h1>\` tells Google the page's definitive subject.
- **Maintainability**: Clean semantic markup makes large codebases vastly easier to inspect and refactor.

---

## Essential Semantic Elements You Must Know

\`\`\`html
<!-- Proper Semantic Page Skeleton -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Engineering Portal</title>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/">Home</a>
      <a href="/explore">Explore</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Understanding CSS Layouts</h1>
      <p>Semantic structures form the backbone of modern web design.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 DevAtlas. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

---

## The CSS Box Model Demystified

Every visual element on a web page is enclosed within a rectangular box consisting of four concentric layers:
1. **Content**: The text or image itself.
2. **Padding**: Transparent clearance immediately surrounding the content.
3. **Border**: The frame bounding the padding.
4. **Margin**: Transparent space separating this element from neighboring elements.

\`\`\`css
/* MANDATORY CSS RESET: Eliminates layout calculation surprises */
*, *::before, *::after {
  box-sizing: border-box; /* Includes padding and border in element width */
  margin: 0;
  padding: 0;
}
\`\`\`

---

## Flexbox: 1-Dimensional Alignment

Use Flexbox when laying items out in a single row or single column (such as navigation bars, button groups, and toolbar rows).

\`\`\`css
.nav-container {
  display: flex;
  justify-content: space-between; /* Horizontal distribution */
  align-items: center;             /* Vertical centering */
  gap: 1.5rem;                    /* Clean spacing between items */
}
\`\`\`

---

## CSS Grid: 2-Dimensional Layout Systems

Use CSS Grid when coordinating items across both columns **and** rows simultaneously (such as article dashboards and product card catalogs).

\`\`\`css
.card-grid {
  display: grid;
  /* Auto-responsive grid that wraps without writing media queries */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
\`\`\`

---

## Common Mistakes and Anti-Patterns

1. **"Div Soup"**: Wrapping every element in three nested divs when a single semantic \`<article>\` or \`<section>\` suffices.
2. **Forgetting \`box-sizing: border-box\`**: Without this, setting \`width: 100%\` and adding \`padding: 20px\` creates horizontal scrollbar overflows.
3. **Using Margin to Center Containers**: Use \`margin-inline: auto\` with a \`max-width\` instead of manual percentage guesses.

---

## Practical Exercise: Build a Responsive Card

\`\`\`html
<article class="product-card">
  <div class="badge">Beginner</div>
  <h2>HTML &amp; CSS Foundations</h2>
  <p>Learn core layout principles from the ground up.</p>
  <button type="button">Start Learning &rarr;</button>
</article>

<style>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  max-width: 320px;
}

.badge {
  align-self: flex-start;
  padding: 0.25rem 0.75rem;
  background-color: #e0f2fe;
  color: #0369a1;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;
}
</style>
\`\`\`
`,
  },
  {
    slug: 'javascript-fundamentals-dom-async',
    title: 'Modern JavaScript (ES6+): Primitives, DOM Manipulation & Async/Await',
    summary: 'The essential guide to modern JavaScript for engineering students. Deconstruct closures, arrow functions, DOM event handling, fetch API requests, and asynchronous Promises.',
    category: 'web-dev',
    categoryName: 'Web Development',
    tags: ['JavaScript', 'ES6', 'DOM', 'Promises', 'Async', 'Beginner'],
    author: {
      name: 'Sofia Chen',
      role: 'Frontend Infrastructure Lead',
      avatar: '/images/authors/sofia.svg',
      bio: 'Advocate for accessible web education, web standards, and developer productivity.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-14',
    updatedAt: '2026-04-17',
    readingTime: '10 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: false,
    prerequisites: [
      {
        title: 'HTML & CSS Foundations',
        url: '/articles/html-css-foundations-semantic-layouts',
        description: 'Basic understanding of DOM elements and CSS classes.',
      },
    ],
    relatedArticleSlugs: [
      'html-css-foundations-semantic-layouts',
      'nextjs-15-react-19-architecture',
    ],
    headings: [
      { id: 'let-const-and-modern-primitives', text: 'Let, Const, and Modern Primitives', level: 2 },
      { id: 'arrow-functions-and-array-methods', text: 'Arrow Functions and Essential Array Methods', level: 2 },
      { id: 'dom-traversal-and-event-listeners', text: 'DOM Traversal and Event Listeners', level: 2 },
      { id: 'understanding-the-single-threaded-event-loop', text: 'Understanding the Single-Threaded Event Loop', level: 2 },
      { id: 'promises-and-async-await-in-practice', text: 'Promises and Async/Await in Practice', level: 2 },
      { id: 'common-javascript-pitfalls', text: 'Common JavaScript Pitfalls', level: 2 },
      { id: 'hands-on-exercise-async-fetcher', text: 'Hands-On Exercise: API Data Fetcher', level: 2 },
    ],
    content: `
## Let, Const, and Modern Primitives

In modern JavaScript (ES6+), **never use \`var\`**. It has confusing function-scoping behavior and hoists unexpectedly:
- **\`const\`**: Default choice. Creates block-scoped references that cannot be reassigned.
- **\`let\`**: Use only when values will legitimately change over time (such as loop counters or state flags).

\`\`\`javascript
const platformName = 'DevAtlas';
let activeLessonCount = 12;

activeLessonCount += 1; // Valid with 'let'
// platformName = 'NewApp'; // TypeError: Assignment to constant variable
\`\`\`

---

## Arrow Functions and Essential Array Methods

Modern frontend code emphasizes declarative array transformations using pure methods:

\`\`\`javascript
const lessons = [
  { id: 1, title: 'HTML', minutes: 15 },
  { id: 2, title: 'CSS', minutes: 20 },
  { id: 3, title: 'JS', minutes: 30 }
];

// 1. Filter: extract subset matching condition
const longLessons = lessons.filter(l => l.minutes >= 20);

// 2. Map: transform data structure
const titles = lessons.map(l => l.title); // ['HTML', 'CSS', 'JS']

// 3. Reduce: accumulate a single summary value
const totalTime = lessons.reduce((acc, curr) => acc + curr.minutes, 0); // 65
\`\`\`

---

## DOM Traversal and Event Listeners

The Document Object Model (DOM) is an object-oriented representation of the HTML document:

\`\`\`javascript
// Select elements safely
const toggleButton = document.querySelector('#theme-toggle');
const rootElement = document.documentElement;

// Attach click listener without blocking execution
toggleButton.addEventListener('click', () => {
  rootElement.classList.toggle('dark');
  const isDark = rootElement.classList.contains('dark');
  toggleButton.setAttribute('aria-pressed', String(isDark));
});
\`\`\`

---

## Understanding the Single-Threaded Event Loop

JavaScript executes on a **single call stack**. If you run an infinite \`while(true)\` loop, your browser tab freezes entirely.

To handle slow operations (such as network requests or disk reads) without freezing UI rendering, JavaScript delegates work to the browser Web APIs and processes results via the **Microtask Queue** and **Macrotask Event Loop**.

---

## Promises and Async/Await in Practice

A **Promise** represents a future value that is currently pending, resolved, or rejected:

\`\`\`javascript
async function fetchCurriculum(topicSlug) {
  try {
    const response = await fetch(\`https://api.devatlas.engineering/curriculums/\${topicSlug}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to load curriculum:', err.message);
    return []; // Return safe fallback
  }
}
\`\`\`

---

## Common JavaScript Pitfalls

1. **Mutating State Directly**: Mutating arrays with \`push\` instead of creating clean copies with \`[...array, newItem]\` causes rendering bugs in modern React.
2. **Missing \`await\`**: Calling an async function without \`await\` returns a \`[Promise object]\`, not the resolved data payload.
3. **Equality Confusions**: Always use strict equality \`===\` instead of loose equality \`==\` to prevent type coercion traps (e.g. \`0 == ''\` is true, but \`0 === ''\` is false).
`,
  },

  // ---------------------------------------------------------------------------
  // AI & MACHINE LEARNING TRACK (Beginner Foundations)
  // ---------------------------------------------------------------------------
  {
    slug: 'python-programming-for-ai-engineers',
    title: 'Python for AI & Machine Learning: From Syntax to Data Structures',
    summary: 'The foundational Python programming guide designed specifically for AI engineers. Learn list comprehensions, object-oriented concepts, virtual environments, and exception handling.',
    category: 'ai-ml',
    categoryName: 'AI and Machine Learning',
    tags: ['Python', 'AI Foundations', 'OOP', 'Pip', 'Beginner'],
    author: {
      name: 'Amina Nour',
      role: 'Machine Learning Research Engineer',
      avatar: '/images/authors/amina.svg',
      bio: 'Focuses on feature stores, transformer architectures, and low-latency LLM serving.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-11',
    updatedAt: '2026-04-16',
    readingTime: '9 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: true,
    prerequisites: [
      {
        title: 'Basic Logic & Programming Foundations',
        url: '/articles/programming-fundamentals-binary-memory',
        description: 'Variables, loops, and conditional statements.',
      },
    ],
    relatedArticleSlugs: [
      'mathematics-and-statistics-for-ml',
      'production-ml-pipelines-feature-stores',
    ],
    headings: [
      { id: 'why-python-rules-machine-learning', text: 'Why Python Rules Machine Learning', level: 2 },
      { id: 'essential-data-structures-lists-dicts-sets', text: 'Essential Data Structures: Lists, Dicts, and Sets', level: 2 },
      { id: 'pythonic-list-and-dict-comprehensions', text: 'Pythonic List and Dict Comprehensions', level: 2 },
      { id: 'object-oriented-programming-for-model-classes', text: 'Object-Oriented Programming for Model Classes', level: 2 },
      { id: 'virtual-environments-and-dependency-hygiene', text: 'Virtual Environments and Dependency Hygiene', level: 2 },
      { id: 'common-python-pitfalls', text: 'Common Python Pitfalls in ML Code', level: 2 },
      { id: 'hands-on-exercise-data-cleaner', text: 'Hands-On Exercise: Clean Raw Data with Python', level: 2 },
    ],
    content: `
## Why Python Rules Machine Learning

Python is the lingua franca of artificial intelligence not because its raw interpreter is fast, but because its clean syntax wraps high-performance C and C++ linear algebra libraries (like BLAS, LAPACK, and CUDA).

You write clean, readable Python code, while underlying hardware executes at native GPU speeds.

---

## Essential Data Structures: Lists, Dicts, and Sets

\`\`\`python
# 1. Lists: ordered, mutable collections
epochs_loss = [0.82, 0.65, 0.43, 0.28]
epochs_loss.append(0.19)

# 2. Dictionaries: key-value hash maps (O(1) average lookup)
model_hyperparameters = {
    "learning_rate": 0.001,
    "batch_size": 64,
    "optimizer": "AdamW"
}

# 3. Sets: unique elements only (great for deduplicating tokens)
vocab = set(["encoder", "decoder", "attention", "encoder"])
print(len(vocab))  # Output: 3
\`\`\`

---

## Pythonic List and Dict Comprehensions

Avoid clunky multi-line \`for\` loops when creating new data sequences:

\`\`\`python
raw_readings = [12.4, -999.0, 15.8, -999.0, 18.2]

# Clean outliers in a single clean Pythonic comprehension:
cleaned_readings = [val for val in raw_readings if val != -999.0]
# [12.4, 15.8, 18.2]
\`\`\`

---

## Object-Oriented Programming for Model Classes

In modern PyTorch and Scikit-Learn, models are written as cohesive Python classes:

\`\`\`python
class SimpleDataset:
    def __init__(self, data, labels):
        self.data = data
        self.labels = labels

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return {"features": self.data[idx], "target": self.labels[idx]}
\`\`\`

---

## Virtual Environments and Dependency Hygiene

Never install packages into your computer's global Python installation. Always create an isolated project environment:

\`\`\`bash
# Create local virtual environment
python -m venv .venv

# Activate on Linux/macOS
source .venv/bin/activate
# Or on Windows PowerShell:
.venv\\Scripts\\Activate.ps1

# Install curated libraries safely
pip install numpy pandas torch
\`\`\`
`,
  },
  {
    slug: 'mathematics-and-statistics-for-ml',
    title: 'Mathematics & Statistics for Machine Learning: Vectors, Matrices & Probability',
    summary: 'A visual, intuitive breakdown of the core math behind machine learning. Learn dot products, matrix multiplication, derivative gradients, and Bayesian probability without intimidation.',
    category: 'ai-ml',
    categoryName: 'AI and Machine Learning',
    tags: ['Linear Algebra', 'Calculus', 'Probability', 'Math', 'Beginner'],
    author: {
      name: 'Amina Nour',
      role: 'Machine Learning Research Engineer',
      avatar: '/images/authors/amina.svg',
      bio: 'Focuses on feature stores, transformer architectures, and low-latency LLM serving.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-13',
    updatedAt: '2026-04-17',
    readingTime: '11 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: true,
    prerequisites: [
      {
        title: 'Python for AI Engineers',
        url: '/articles/python-programming-for-ai-engineers',
        description: 'Basic Python syntax and list manipulation.',
      },
    ],
    relatedArticleSlugs: [
      'python-programming-for-ai-engineers',
      'understanding-transformers-attention-mechanisms',
    ],
    headings: [
      { id: 'vectors-the-atomic-units-of-ai', text: 'Vectors: The Atomic Units of AI', level: 2 },
      { id: 'the-dot-product-measuring-alignment', text: 'The Dot Product: Measuring Geometric Similarity', level: 2 },
      { id: 'matrices-as-spatial-transformations', text: 'Matrices as Spatial Linear Transformations', level: 2 },
      { id: 'derivatives-and-gradient-descent', text: 'Derivatives and Gradient Descent: How Models Learn', level: 2 },
      { id: 'probability-and-bayesian-thinking', text: 'Probability Distributions and Bayesian Thinking', level: 2 },
      { id: 'common-math-misconceptions', text: 'Common Math Misconceptions in Machine Learning', level: 2 },
    ],
    content: `
## Vectors: The Atomic Units of AI

In computer science, a vector is simply a 1-dimensional array of numbers. In machine learning, a vector represents a **point in high-dimensional space**.

For example, a house can be represented as a 3-dimensional vector:
\`\`\`python
# [Square Footage, Bedrooms, Bathrooms]
house_vector = [2100, 3, 2]
\`\`\`

Similarly, words and semantic concepts in Large Language Models are mapped to dense vector embeddings with 1,536 or 4,096 dimensions.

---

## The Dot Product: Measuring Geometric Similarity

The **dot product** is the single most important mathematical operation in modern AI:

$$\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^n a_i b_i = \\|\\mathbf{a}\\| \\|\\mathbf{b}\\| \\cos(\\theta)$$

- If two vectors point in the exact same direction, their dot product is maximized.
- If they are perpendicular (orthogonal), their dot product is zero.
- **Why it matters**: Transformer Self-Attention, Vector Search (HNSW), and recommendation engines all use dot products to compute similarity scores between tokens and documents!

---

## Derivatives and Gradient Descent: How Models Learn

When an AI model makes a prediction, it compares its guess with the ground truth using a **Loss Function** (e.g. Mean Squared Error).

The **derivative** (slope) tells us which direction is "uphill" or "downhill". By calculating the derivative with respect to each model parameter (the **gradient**), the optimizer nudges the weights downhill to minimize error:

$$w_{\\text{new}} = w_{\\text{old}} - \\alpha \\cdot \\nabla L$$

where $\\alpha$ is your **learning rate**.
`,
  },

  // ---------------------------------------------------------------------------
  // COMPUTER SCIENCE TRACK (Beginner Foundations)
  // ---------------------------------------------------------------------------
  {
    slug: 'programming-fundamentals-binary-memory',
    title: 'Computer Architecture & Programming Fundamentals: Binary, CPU & RAM',
    summary: 'Deconstruct how computers actually execute code. Explore binary logic gates, CPU registers, stack vs heap memory management, and how high-level code compiles to machine instructions.',
    category: 'computer-science',
    categoryName: 'Computer Science',
    tags: ['Computer Architecture', 'Binary', 'Memory', 'CPU', 'Beginner'],
    author: {
      name: 'Marcus Vance',
      role: 'Principal Systems Architect',
      avatar: '/images/authors/marcus.svg',
      bio: 'Kernel engineer, distributed systems veteran, and author of database storage engine internals.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-10',
    updatedAt: '2026-04-15',
    readingTime: '10 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: true,
    prerequisites: [
      {
        title: 'Basic Mathematics',
        url: 'https://github.com/ossu/computer-science',
        description: 'Familiarity with basic arithmetic and logic.',
      },
    ],
    relatedArticleSlugs: [
      'data-structures-arrays-linked-lists-trees',
      'os-internals-virtual-memory-context-switching',
    ],
    headings: [
      { id: 'the-binary-foundation-transistors-and-bits', text: 'The Binary Foundation: Transistors and Bits', level: 2 },
      { id: 'cpu-architecture-registers-alu-and-clocks', text: 'CPU Architecture: Registers, ALU, and Clock Cycles', level: 2 },
      { id: 'memory-hierarchy-registers-l1l2l3-ram-and-ssd', text: 'The Memory Hierarchy: From CPU Cache to NVMe SSD', level: 2 },
      { id: 'stack-vs-heap-memory-demystified', text: 'Stack vs Heap Memory Demystified', level: 2 },
      { id: 'how-code-compiles-to-machine-instructions', text: 'How High-Level Code Compiles to Machine Instructions', level: 2 },
      { id: 'common-beginner-memory-mistakes', text: 'Common Memory Mistakes to Watch For', level: 2 },
    ],
    content: `
## The Binary Foundation: Transistors and Bits

At its core, a modern processor is billions of microscopic electrical switches called **transistors**.
- Switch is ON (conducts current): Represents \`1\`.
- Switch is OFF (blocks current): Represents \`0\`.

A single 0 or 1 is a **bit**. Group 8 bits together and you have a **byte**, which can represent $2^8 = 256$ distinct values (0 to 255).

---

## The Memory Hierarchy: From CPU Cache to NVMe SSD

Accessing data is not uniformly fast. Computer hardware organizes memory into a strict hierarchy:
1. **CPU Registers**: ~0.5 nanoseconds (holding currently executed numbers).
2. **L1 / L2 / L3 Caches**: 1 to 10 nanoseconds (fast on-die SRAM).
3. **Main RAM**: ~60 to 100 nanoseconds (DRAM chips on the motherboard).
4. **NVMe SSD**: ~50 to 150 microseconds (flash storage).
5. **Network / Cloud**: ~10 to 100 milliseconds.

\`\`\`
Speed Comparison:
If a CPU register access took 1 second...
RAM access would take ~3 minutes.
Reading from an SSD would take ~1.5 days!
\`\`\`

---

## Stack vs Heap Memory Demystified

When your program runs, its allocated operating system memory is divided into two primary zones:

### The Stack (Fast, Automatic, Structured)
- Stores local primitive variables and function call frames.
- Operates on a Last-In, First-Out (LIFO) discipline.
- When a function exits, its entire stack frame is instantly freed by moving the CPU stack pointer.

### The Heap (Dynamic, Flexible, Managed)
- Used for dynamically sized objects, large strings, and long-lived data structures.
- Requires explicit manual deallocation (in C/Rust) or automated Garbage Collection (in JS, Python, Go).
- Fragmented allocations can introduce cache misses and overhead.
`,
  },
  {
    slug: 'data-structures-arrays-linked-lists-trees',
    title: 'Core Data Structures: Arrays, Linked Lists, Hash Maps & Binary Trees',
    summary: 'The comprehensive guide to fundamental computer science data structures. Understand memory layouts, sequential arrays, node pointer chains, hash collisions, and recursive tree traversals.',
    category: 'computer-science',
    categoryName: 'Computer Science',
    tags: ['Data Structures', 'Arrays', 'Linked Lists', 'Hash Maps', 'Trees', 'Beginner'],
    author: {
      name: 'Marcus Vance',
      role: 'Principal Systems Architect',
      avatar: '/images/authors/marcus.svg',
      bio: 'Kernel engineer, distributed systems veteran, and author of database storage engine internals.',
      github: 'https://github.com',
    },
    publishedAt: '2026-04-12',
    updatedAt: '2026-04-17',
    readingTime: '11 min read',
    difficulty: 'Beginner',
    views: 0,
    featured: true,
    prerequisites: [
      {
        title: 'Programming Fundamentals & Memory',
        url: '/articles/programming-fundamentals-binary-memory',
        description: 'Understanding pointers, stack, and heap memory.',
      },
    ],
    relatedArticleSlugs: [
      'programming-fundamentals-binary-memory',
      'database-indexing-btrees-lsm-trees',
    ],
    headings: [
      { id: 'why-data-structures-dictate-performance', text: 'Why Data Structures Dictate Performance', level: 2 },
      { id: 'arrays-contiguous-memory-and-instant-indexing', text: 'Arrays: Contiguous Memory and Instant Indexing', level: 2 },
      { id: 'linked-lists-dynamic-pointer-chains', text: 'Linked Lists: Dynamic Pointer Chains', level: 2 },
      { id: 'hash-maps-constant-time-key-value-lookups', text: 'Hash Maps: Constant Time Key-Value Lookups', level: 2 },
      { id: 'binary-search-trees-hierarchical-order', text: 'Binary Search Trees: Hierarchical Organization', level: 2 },
      { id: 'tradeoff-matrix', text: 'Data Structure Trade-off Matrix', level: 2 },
    ],
    content: `
## Why Data Structures Dictate Performance

A data structure is a specialized format for organizing, processing, retrieving, and storing data. 

Choosing the wrong structure can cause an application that works fine on 10 items to slow down to minutes on 10,000 items.

---

## Arrays: Contiguous Memory and Instant Indexing

An array stores elements in a **contiguous block of memory addresses**:
- **Lookup by Index**: $O(1)$ constant time! Because memory addresses are sequential, computing the location of index $i$ requires simple math:
  $$\\text{Address} = \\text{Base Address} + i \\times \\text{Element Size}$$
- **Insertion / Deletion at Start**: $O(n)$ linear time! Every subsequent element must be shifted forward or backward.

---

## Linked Lists: Dynamic Pointer Chains

Unlike arrays, a linked list allocates elements (nodes) scattered arbitrarily across heap memory. Each node holds its data and a pointer to the next node:

\`\`\`typescript
interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}
\`\`\`

- **Advantage**: Insertion at the head is $O(1)$ without reallocating arrays.
- **Disadvantage**: Finding item at index 500 requires walking 500 pointers sequentially ($O(n)$ traversal), and CPU cache misses are frequent.

---

## Hash Maps: Constant Time Key-Value Lookups

A Hash Map uses a mathematical **Hash Function** to convert arbitrary keys (like \`"username"\`) into array indices:
- **Average Lookup**: $O(1)$
- **Collision Resolution**: Handled via Chaining (linked lists in bucket slots) or Open Addressing.
`,
  },
];
