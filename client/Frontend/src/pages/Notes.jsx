import { motion } from "framer-motion";



const notes = [
  {
    title: "Exam Notes",
    desc: "Generate AI-powered exam notes instantly.",
    icon: "📚",
  },
  {
    title: "Project Notes",
    desc: "Create project documentation with AI.",
    icon: "🚀",
  },
  {
    title: "Diagrams",
    desc: "Convert topics into smart diagrams.",
    icon: "🧠",
  },
  {
    title: "PDF Export",
    desc: "Download your notes as PDF files.",
    icon: "📄",
  },
];


function Notes() {

  return (
    <div className="
      min-h-screen
      bg-white
    ">


      {/* Navbar */}
      <NotesNavbar />



      {/* Main Page */}

      <section className="
        px-6
        md:px-20
        pt-20
      ">


        {/* Heading */}

        <motion.div

          initial={{
            opacity:0,
            y:30
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:0.7
          }}

          className="
            text-center
            max-w-3xl
            mx-auto
          "

        >

          <h1 className="
            text-5xl
            md:text-6xl
            font-bold
            text-black
          ">
            Create Smart
            <br/>
            AI Notes
          </h1>


          <p className="
            mt-5
            text-gray-500
          ">
            Generate exam notes, project documentation,
            diagrams and PDFs using AI.
          </p>


        </motion.div>





        {/* Notes Cards */}

        <div className="
          mt-16
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">


          {
            notes.map((note,index)=>(


              <motion.div

                key={note.title}

                initial={{
                  opacity:0,
                  y:40
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  delay:index*0.1
                }}

                whileHover={{
                  y:-10
                }}

                className="
                  rounded-3xl
                  bg-black
                  text-white
                  p-6
                  shadow-xl
                  cursor-pointer
                "

              >


                <div className="
                  text-4xl
                  mb-5
                ">
                  {note.icon}
                </div>



                <h2 className="
                  text-xl
                  font-semibold
                ">
                  {note.title}
                </h2>



                <p className="
                  mt-3
                  text-sm
                  text-gray-400
                ">
                  {note.desc}
                </p>



                <button className="
                  mt-6
                  bg-white
                  text-black
                  px-5
                  py-2
                  rounded-xl
                  text-sm
                  font-medium
                ">
                  Generate
                </button>


              </motion.div>


            ))
          }


        </div>




        {/* AI Input Section */}

        <motion.div

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          transition={{
            delay:0.8
          }}

          className="
            mt-20
            bg-black
            rounded-3xl
            p-8
            text-white
            text-center
          "

        >

          <h2 className="
            text-3xl
            font-semibold
          ">
            What do you want to learn today?
          </h2>


          <div className="
            mt-6
            flex
            flex-col
            md:flex-row
            gap-4
            justify-center
          ">


            <input
              placeholder="Enter topic..."
              className="
                px-5
                py-3
                rounded-xl
                text-black
                md:w-96
                outline-none
              "
            />


            <button className="
              bg-white
              text-black
              px-8
              py-3
              rounded-xl
              font-medium
            ">
              Generate Notes
            </button>


          </div>


        </motion.div>



      </section>


    </div>
  )
}


export default Notes;