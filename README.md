# Portfolio Website

A simple, elegant portfolio website inspired by Clarissa Michard's design, featuring smooth GSAP animations and a clean, minimalist aesthetic.

## Features

- Clean, minimalist design
- Smooth GSAP animations
- "Change the mood" feature with GIF animations
- Responsive design for all devices
- Portfolio section with project showcases
- Contact section

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone this repository or download the files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Website

To start the development server:

```bash
npm start
```

This will start a local server at http://localhost:3000 (or another port if 3000 is in use).

## Customization

### Personal Information

Edit the `index.html` file to update:
- Your name
- Email address
- Social media links
- About me text
- Project information

### Styling

The website's styles are in `css/style.css`. You can modify:
- Colors (look for the `:root` section with CSS variables)
- Fonts
- Spacing
- Layout

### Animations

Animations are controlled by GSAP in the `js/main.js` file. You can:
- Adjust animation timing
- Change animation effects
- Add new animations

### Adding Projects

To add new projects, duplicate the project item structure in the HTML:

```html
<div class="project-item">
    <div class="project-image">
        <img src="assets/your-project-image.jpg" alt="Project Title">
    </div>
    <div class="project-info">
        <h3>Project Title</h3>
        <p>Project Category</p>
    </div>
</div>
```

### Adding Mood GIFs

1. Add your GIF files to the `assets/` directory
2. Update the HTML structure in the "about" section
3. Update the JavaScript in `main.js` if you add more than the default number of moods

## Technologies Used

- HTML5
- CSS3
- JavaScript
- GSAP (GreenSock Animation Platform)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by [Clarissa Michard's website](https://clarissemichard.com/)
- GSAP for animations
- Serve for the development server
