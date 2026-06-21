import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";


const features = [
  {
    title: "Exam Notes",
    description: "Generate concise, exam-focused notes with AI.",
    icon: "📚",
  },
  {
    title: "Project Notes",
    description: "Create structured documentation for your projects.",
    icon: "🚀",
  },
  {
    title: "Diagrams",
    description: "Turn complex concepts into clear visual diagrams.",
    icon: "🧠",
  },
  {
    title: "PDF Download",
    description: "Export your notes instantly as clean PDFs.",
    icon: "📄",
  },
];


function Home() {

  const navigation = useNavigate();

  return (
    <>

      {/* Navbar */}
      <div className="bg-white">
        <Navbar />
      </div>



      {/* Hero Section */}
      <section className="
        min-h-screen
        bg-white
        flex
        items-center
        px-6
        md:px-20
      ">

        <div className="
          max-w-7xl
          mx-auto
          w-full
          grid
          md:grid-cols-2
          gap-10
          items-center
        ">


          {/* Left Content */}

          <motion.div

            initial={{
              opacity:0,
              x:-50
            }}

            animate={{
              opacity:1,
              x:0
            }}

            transition={{
              duration:0.8
            }}

          >

            <h1 className="
              text-5xl
              md:text-7xl
              font-bold
              leading-tight
              text-black
            ">
              Create Smart
              <br/>
              AI Notes in
              <br/>
              Seconds
            </h1>



            <motion.p

              initial={{
                opacity:0
              }}

              animate={{
                opacity:1
              }}

              transition={{
                delay:0.4
              }}

              className="
                mt-6
                max-w-md
                text-gray-500
                leading-relaxed
              "

            >

              Generate exam-focused notes, project documentation,
              flow diagrams and revision-ready content using AI —
              faster, cleaner and smarter.

            </motion.p>



            <motion.button

              onClick={() => navigation("/notes")}


              whileHover={{
                scale:1.05
              }}

              whileTap={{
                scale:0.95
              }}

              className="
                mt-8
                bg-black
                text-white
                px-8
                py-3
                rounded-xl
                font-medium
              "

            >

              Get Started

            </motion.button>


          </motion.div>





          {/* AI Card */}

          <motion.div

            initial={{
              opacity:0,
              x:50
            }}

            animate={{
              opacity:1,
              x:0
            }}

            transition={{
              duration:0.8
            }}

            className="
              flex
              justify-center
            "

          >


            <motion.div

              animate={{
                y:[0,-15,0]
              }}

              transition={{
                duration:3,
                repeat:Infinity
              }}

              className="
                w-80
                h-80
                rounded-3xl
                bg-black
                flex
                items-center
                justify-center
                text-white
                shadow-2xl
              "

            >

              <div className="text-center">


                <div className="
                  text-6xl
                  mb-5
                ">
                  🤖
                </div>



                <h3 className="
                  text-2xl
                  font-semibold
                ">
                  AI Note Engine
                </h3>



                <p className="
                  text-gray-400
                  text-sm
                  mt-2
                ">
                  Generate smarter notes instantly
                </p>


              </div>


            </motion.div>


          </motion.div>


        </div>


      </section>





      {/* Features Section */}


      <section className="
        bg-black
        text-white
        py-20
        px-6
      ">


        <div className="
          max-w-6xl
          mx-auto
        ">



          <motion.div

            initial={{
              opacity:0,
              y:30
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:0.6
            }}

            className="
              text-center
              mb-12
            "

          >


            <h2 className="
              text-4xl
              md:text-5xl
              font-semibold
            ">

              Everything You Need
              <br/>
              for Smarter Learning

            </h2>



            <p className="
              mt-4
              text-gray-400
              max-w-xl
              mx-auto
            ">

              AI-powered tools designed to create,
              organize and simplify your study workflow.

            </p>


          </motion.div>






          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">


          {
            features.map((feature,index)=>(


              <motion.div

                key={feature.title}


                initial={{
                  opacity:0,
                  y:40
                }}


                whileInView={{
                  opacity:1,
                  y:0
                }}


                transition={{
                  duration:0.5,
                  delay:index*0.1
                }}


                whileHover={{
                  y:-10
                }}


                className="
                  group
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  cursor-pointer
                  hover:bg-white
                  hover:text-black
                  transition-all
                "

              >


                <div className="
                  text-4xl
                  mb-5
                  group-hover:scale-110
                  transition
                ">

                  {feature.icon}

                </div>



                <h3 className="
                  text-xl
                  font-semibold
                  mb-3
                ">

                  {feature.title}

                </h3>




                <p className="
                  text-sm
                  text-gray-400
                  group-hover:text-gray-600
                ">

                  {feature.description}

                </p>


              </motion.div>


            ))
          }


          </div>


        </div>


      </section>



      <Footer/>


    </>
  )
}


export default Home;