export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="w-full scroll-mt-20 py-2 bg-simple-background">
      <div className="mx-auto">
        <p className="type-h4 text-center">
          © {currentYear} Kuba Walczak
        </p>
      </div>
    </footer>
  )
}
