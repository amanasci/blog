const themeInit = `(function(){try{var e=document.documentElement;var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}e.setAttribute('data-theme',t);e.style.colorScheme=t;}catch(_){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInit }} />;
}
