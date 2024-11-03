console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Step 3: Dynamic Navigation Menu
let pages = [
  { url: './', title: 'Home' },
  { url: 'projects', title: 'Projects' },
  { url: 'contact', title: 'Contact' },
  { url: 'https://docs.google.com/document/d/1MvO_SPaArLqPTd3fcjVUf6nAVo75bHhgX67YEaoC2dY/view', title: 'Resume', external: true },
  { url: 'https://github.com/allison-conrey', title: 'GitHub', external: true }
];

// Create a new <nav> element and prepend it to the body
let nav = document.createElement('nav');
document.body.prepend(nav);

// Add links to the <nav> element dynamically
for (let p of pages) {
  let url = p.url;
  let title = p.title;
  
  // Adjust the URL if we're not on the home page
  if (!p.external) {
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  }

  // Create a new <a> element for each page
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);

  // Add target="_blank" for external links
  if (p.external) {
    a.target = "_blank";
  }

  // Highlight the current page
  a.classList.toggle('current', a.host === location.host && a.pathname === location.pathname);
}

// Step 4: Dark Mode Switch

// Add a dark mode switcher to the top of the page
document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>`
);

// Get the select element for theme switching
const select = document.querySelector('.color-scheme select');

// Event listener to change theme based on user selection
select.addEventListener('input', function (event) {
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value; // Save the user's preference
});

// Load and apply the user's theme preference on page load
if ('colorScheme' in localStorage) {
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  select.value = localStorage.colorScheme; // Update the select value to reflect the saved preference
}
// Get the reference to the form
const form = document.querySelector('#contact-form');

// Add submit event listener to the form
form?.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const data = new FormData(form); // Gather form data

  // Extract subject and message values
  const subject = encodeURIComponent(data.get('subject'));
  let message = encodeURIComponent(data.get('message'));

  // Handle line breaks in the message by converting '\n' to '%0D%0A'
  message = message.replace(/%0A/g, '%0D%0A');

  // Build the mailto URL with subject and message
  const mailtoUrl = `mailto:anconrey@gmail.com?subject=${subject}&body=${message}`;

  // Open the mailto URL to launch the email client with pre-filled fields
  location.href = mailtoUrl;
});
