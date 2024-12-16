import "./globals.css";

export default function RootLayout({children}){

    return(
        <>
        <html lang="en">
          <body className="w-screen h-screen overflow-x-hidden">
          {children}
          </body>
        </html>
        </>

    )
}