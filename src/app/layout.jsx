
import { Raleway, Imprima, Chakra_Petch } from "next/font/google";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./globals.css";
import 'aos/dist/aos.css';



// custom components
import NavBar from "./components/ui/NavBar";
import Sidebar from "./components/ui/Sidebar";


// custom fonts
const Raleway_f = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: '--font-primary'
})

const Imprima_f = Imprima({
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-secondary'
})

const Chakra_Petch_f = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: '--font-tertiary'
})

// every page has these things :(
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Imprima_f.variable} ${Raleway_f.variable} ${Chakra_Petch_f.variable} bg-black antialiased dark md:ml-24`}>
        
        <Sidebar />
        {children} 
        </body>
    </html>
  );
}
