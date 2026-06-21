import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Topicplace from "../../components/Topicplace";


function Notes() {


  const { userdata } = useSelector(
    (state) => state.user
  );


  const credits = userdata?.credits || 0;


  const navigate = useNavigate();



  return (

    <div className="
      min-h-screen
      bg-white
    ">


      {/* Floating Navbar */}

      <motion.div

        initial={{
          opacity:0,
          y:-20
        }}

        animate={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:0.7
        }}


        className="
          relative
          z-20

          mx-3
          md:mx-6

          mt-4
          md:mt-6

          rounded-2xl

          bg-gradient-to-br
          from-black/90
          via-black/80
          to-black/90

          backdrop-blur-2xl

          border
          border-white/10

          shadow-[0_22px_55px_rgba(0,0,0,0.75)]

          flex
          items-center
          justify-between

          px-4
          md:px-8

          py-3
          md:py-4
        "

      >



        {/* LOGO */}

        <motion.div

          whileHover={{
            scale:1.05
          }}

          onClick={() => navigate("/")}

          className="
            flex
            items-center
            gap-2
            md:gap-3
            cursor-pointer
          "

        >


          <div
            className="
              h-9
              w-9
              md:h-10
              md:w-10

              rounded-full

              bg-white/10

              flex
              items-center
              justify-center

              text-lg
              md:text-xl
            "
          >

            🤖

          </div>




          <span
            className="
              hidden
              sm:block

              text-lg
              md:text-xl

              font-semibold

              text-white
            "
          >

            ExamNotes

            <span className="text-gray-400">
              AI
            </span>


          </span>


        </motion.div>







        {/* RIGHT BUTTONS */}

        <div
          className="
            flex
            items-center
            gap-2
            md:gap-3
          "
        >



          {/* Credits */}


          <motion.button

            whileHover={{
              scale:1.05
            }}

            whileTap={{
              scale:0.95
            }}

            className="
              flex
              items-center
              gap-1
              md:gap-2

              bg-white/10

              text-white

              px-3
              md:px-5

              py-2

              rounded-full

              text-sm

              border
              border-white/10
            "

          >

            <span>
              💎
            </span>


            <span>
              {credits}
            </span>


          </motion.button>








          {/* Your Notes Button */}


          <motion.button

            whileHover={{
              scale:1.05
            }}

            whileTap={{
              scale:0.95
            }}

            onClick={() => navigate("/notes")}


            className="
              flex
              items-center
              gap-1
              md:gap-2

              bg-white/10

              text-white

              px-3
              md:px-5

              py-2

              rounded-full

              text-sm

              border
              border-white/10
            "

          >


            <span>
              📚
            </span>


            <span
              className="
                hidden
                sm:block
              "
            >
              Your Notes
            </span>


          </motion.button>



        </div>



      </motion.div>






      {/* Topic Input Section */}

      <Topicplace />



    </div>

  )

}


export default Notes;