# Michelle Vance Portfolio - Live on michelletrendsetter.com

Professional portfolio website for Michelle Vance - Creative Developer, AI Engineer & Marketing Strategist at Trendsetters Group.

🌟 **Live Site**: [michelletrendsetter.com](https://michelletrendsetter.com)  
🔗 **GitHub**: [github.com/IloveChanel/michelle-vance-portfolio](https://github.com/IloveChanel/michelle-vance-portfolio)

## 🚀 Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **Interactive Animations** - CSS3 animations, flip cards, and smooth transitions
- **Performance Optimized** - Fast loading with optimized assets
- **SEO Ready** - Meta tags, semantic HTML, and structured data
- **Modern CSS** - Custom properties, Grid, Flexbox, and advanced animations
- **Professional Sections** - Portfolio, achievements, testimonials, and contact

## 📱 Mobile Responsiveness

The site includes comprehensive mobile optimizations:
- **Modern Breakpoints**: 480px, 768px, 1024px, 1400px
- **Touch-Friendly**: 44px minimum touch targets
- **Mobile Navigation**: Hamburger menu with smooth animations
- **Optimized Typography**: Responsive font sizes and line heights
- **Flexible Layouts**: Grid systems that adapt to screen size

## 🌐 Vercel Deployment

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (v14 or higher)
2. Install Vercel CLI: `npm install -g vercel`
3. Create a [Vercel account](https://vercel.com)

### Quick Deployment

1. **Clone or download the project**
   ```bash
   cd "My profolio"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Alternative: GitHub Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/IloveChanel/michelle-vance-portfolio.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-deploy on every push

### Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain (e.g., `michellevance.com`)
4. Follow DNS configuration instructions

## 🛠️ Local Development

```bash
# Start local development server
npm run dev

# Or use Python directly
python -m http.server 8001 --directory public
```

Visit `http://localhost:8001` to view the site locally.

## 📁 Project Structure

```
My profolio/
├── public/
│   ├── index.html          # Main portfolio page
│   ├── about.html          # About page
│   ├── gallery.html        # Gallery page
│   ├── styles.css          # Main stylesheet
│   ├── script.js           # JavaScript functionality
│   └── images/             # Image assets
├── vercel.json             # Vercel deployment config
├── package.json            # Project dependencies
└── README.md               # This file
```

## ⚡ Performance Features

- **Optimized Images**: WebP format with fallbacks
- **Minified Assets**: Compressed CSS and JavaScript
- **CDN Delivery**: Static assets served via Vercel Edge Network
- **Caching Headers**: Optimized cache control for static assets
- **Security Headers**: XSS protection, content sniffing prevention

## 🎨 Customization

### Colors
Main colors are defined in CSS custom properties:
```css
:root {
  --primary-color: #ff006e;
  --secondary-color: #8338ec;
  --accent-color: #ffbe0b;
}
```

### Fonts
Using Google Fonts:
- **Inter**: Primary font family
- **Space Grotesk**: Accent font for headings

### Adding Content
- **Portfolio Items**: Edit the projects section in `index.html`
- **Achievements**: Update the achievements grid
- **Contact Info**: Modify contact section with your details

## 📧 Contact

**Michelle Vance**
- Email: michelletrendsetters@gmail.com
- Phone: 248.321.9121
- Location: Remote Services Worldwide

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️, bold creativity, and cutting-edge technology by Michelle Vance.