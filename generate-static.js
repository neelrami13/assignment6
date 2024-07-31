const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Define directories
const viewsDir = path.join(__dirname, 'views');
const buildDir = path.join(__dirname, 'build');

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Register the `equal` helper
handlebars.registerHelper('equal', function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else if (options.inverse) {
      return options.inverse(this);
    }
    return '';
  });
  
  // Register the `eq` helper
  handlebars.registerHelper('eq', function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else if (options.inverse) {
      return options.inverse(this);
    }
    return '';
  });

// Function to load data for each template
const getData = (templateName) => {
  // Define data for each template
  // Adjust this based on your actual data requirements
  const data = {
    'index': { title: 'Home', content: 'Welcome to the Home Page' },
    'students': { title: 'Students', students: [] },
    'courses': { title: 'Courses', courses: [] },
    'updateStudent': { title: 'Update Student', student: {} },
    'updateCourse': { title: 'Update Course', course: {} }
  };

  return data[templateName] || {};
};

// Compile each .hbs file in the views directory
fs.readdirSync(viewsDir).forEach(file => {
  if (path.extname(file) === '.hbs') {
    const templateSource = fs.readFileSync(path.join(viewsDir, file), 'utf8');
    const template = handlebars.compile(templateSource);

    // Generate HTML from the template and data
    const templateName = path.basename(file, '.hbs');
    const data = getData(templateName);
    const result = template(data);

    // Write the compiled HTML to the build directory
    const outputFile = path.join(buildDir, `${templateName}.html`);
    fs.writeFileSync(outputFile, result);
    console.log(`Generated ${outputFile}`);
  }
});
