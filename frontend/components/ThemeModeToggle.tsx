"use client";

import {useState, useEffect} from "react";


export function ModeToggle() {
	const [isDark, setIsDark] = useState(false);  

	// On component mount, check the user's preference from localStorage or system  
	useEffect(() => {  
	  const storedTheme = localStorage.getItem('theme');  
  
	  if (storedTheme === 'dark') {  
		document.documentElement.classList.add('dark');  
		setIsDark(true);  
	  } else if (storedTheme === 'light') {  
		document.documentElement.classList.remove('dark');  
		setIsDark(false);  
	  } else {  
		// If no preference, use system setting  
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {  
		  document.documentElement.classList.add('dark');  
		  setIsDark(true);  
		}  
	  }  
	}, []);  
  
	const toggleDarkMode = () => {  
	  if (isDark) {  
		document.documentElement.classList.remove('dark');  
		localStorage.setItem('theme', 'light');  
		setIsDark(false);  
	  } else {  
		document.documentElement.classList.add('dark');  
		localStorage.setItem('theme', 'dark');  
		setIsDark(true);  
	  }  
	};  
  
	return (  
	  <button  
		onClick={toggleDarkMode}  
		className="rounded focus:outline-none"  
		aria-label="Toggle Dark Mode"  
	  >  
		{isDark ? (  
		  // Sun Icon for Light Mode  
		<svg  
  			xmlns="http://www.w3.org/2000/svg"  
  			className="h-6 w-6 text-yellow-400"  
  			viewBox="0 0 24 24"  
  			fill="none"  
  			stroke="currentColor"  
  			strokeWidth="2"  
  			strokeLinecap="round"  
  			strokeLinejoin="round"  
		>  
  			<circle cx="12" cy="12" r="5" /> 
  			<line x1="12" y1="1" x2="12" y2="3" /> 
  			<line x1="12" y1="21" x2="12" y2="23" /> 
  			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /> 
  			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
  			<line x1="1" y1="12" x2="3" y2="12" /> 
  			<line x1="21" y1="12" x2="23" y2="12" /> 
 			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /> 
 			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /> 
		</svg>  
		) : (  
		  // Moon Icon for Dark Mode  
		  <svg  
			xmlns="http://www.w3.org/2000/svg"  
			className="h-6 w-6 text-gray-800 dark:text-gray-200"  
			fill="none"  
			viewBox="0 0 24 24"  
			stroke="currentColor"  
		  >  
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />  
		  </svg>  
		)}  
	  </button>  
	);  
}
