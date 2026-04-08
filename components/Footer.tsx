export default function Footer() {
  const currentYear = new Date().getFullYear()
  const isPhone = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  return (
    <footer id="contact" className="w-full scroll-mt-20 py-2 bg-simple-background">
      <div className="mx-auto">
        {!isPhone && (
          <p className="type-h2 text-center">
            © {currentYear} Kuba Walczak
          </p>
        )}
        {isPhone && (
          <p className="type-h4 text-center">
            © {currentYear} Developed by Kuba Walczak
          </p>
        )}
      </div>
    </footer>
  )
}
