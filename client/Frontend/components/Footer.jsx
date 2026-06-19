function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-8
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-5
      ">
        {/* Logo */}
        <h2 className="
          text-xl
          font-bold
        ">
          MindScribe AI
        </h2>
        {/* Links */}
        <div className="
          flex
          gap-6
          text-sm
          text-gray-400
        ">

          <a 
            href="#"
            className="hover:text-white transition"
          >
            Exam Notes
          </a>
         
          <a 
            href="#"
            className="hover:text-white transition"
          >
            History
          </a>
         
        </div>
      </div>
      {/* Copyright */}
      <div className="
        text-center
        text-xs
        text-gray-500
        pb-5
      ">
        © 2026 MindScribe AI. All rights reserved.
      </div>


    </footer>
  )
}

export default Footer;