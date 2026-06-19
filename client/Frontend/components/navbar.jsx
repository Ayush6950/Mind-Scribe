import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"
import axios from "axios"
import { serverUrl } from "../src/App"
import { useNavigate } from "react-router-dom"
function Navbar() {
  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const { userdata } = useSelector(
    (state) => state.user
  )
  const credits = userdata?.credits || 0
  const username =
    userdata?.name || "User"
  const profileLetter =
    username.slice(0, 1).toUpperCase()
  const [showCredits, setShowCredits] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
    } catch (error) {
      console.error("Logout Error:", error)
    }
  }
  return (

    <motion.div


      initial={{
        opacity:0,
        y:-15
      }}


      animate={{
        opacity:1,
        y:0
      }}


      transition={{
        duration:0.7
      }}


      className="
      relative z-20
      mx-6 mt-6
      rounded-2xl
      bg-gradient-to-br
      from-black/90
      via-black/80
      to-black/90
      backdrop-blur-2xl
      border border-white/10
      shadow-[0_22px_55px_rgba(0,0,0,0.75)]
      flex items-center
      justify-between
      px-8 py-4
      "

    >



      {/* LOGO */}


      <div className="
      flex items-center gap-3
      ">


        <div
          className="
          h-9 w-9
          rounded-full
          bg-white/10
          flex items-center justify-center
          text-white
          "
        >

          🤖

        </div>



        <span
          className="
          text-lg
          hidden md:block
          font-semibold
          text-white
          "
        >

          ExamNotes

          <span className="text-gray-400">
            AI
          </span>

        </span>


      </div>







      {/* RIGHT SECTION */}


      <div
        className="
        flex items-center
        gap-6
        relative
        "
      >




        {/* CREDITS */}


        <div className="relative">


          <motion.button


            onClick={() =>setShowCredits(!showCredits) 
            }


            whileHover={{
              scale:1.07
            }}


            whileTap={{
              scale:0.97
            }}


            className="
            flex items-center
            gap-2
            px-4 py-2
            rounded-full
            bg-white/10
            border border-white/20
            text-white
            text-sm
            shadow-md
            cursor-pointer
            "

          >


            <span className="text-xl">
              💎
            </span>


            <span>
              {credits}
            </span>


          </motion.button>







          <AnimatePresence>


          {

            showCredits &&


            <motion.div


              initial={{
                opacity:0,
                y:-10,
                scale:0.95
              }}


              animate={{
                opacity:1,
                y:10,
                scale:1
              }}


              exit={{
                opacity:0,
                y:-10,
                scale:0.95
              }}


              transition={{
                duration:0.2
              }}



              className="
              absolute
              right-0
              mt-4
              w-64
              rounded-2xl
              bg-black/90
              backdrop-blur-xl
              border border-white/10
              shadow-[0_25px_60px_rgba(0,0,0,0.7)]
              p-4
              text-white
              "

            >


              <h4 className="
              font-semibold
              mb-2
              ">

                Buy Credits

              </h4>



              <p
                className="
                text-sm
                text-gray-300
                mb-4
                "
              >

                Use credits to generate AI notes,
                diagrams and PDFs.

              </p>
              <button
               onClick={() => {
                 setShowCredits(!showCredits);
                   navigate("/pricing");
                }}

                className="
                w-full
                py-2
                rounded-lg
                bg-gradient-to-br
                from-white
                to-gray-200
                text-black
                font-semibold
                "
              >
                Buy More Credits
              </button>



            </motion.div>


          }


          </AnimatePresence>



        </div>









        {/* PROFILE */}


        <div className="relative">


          <motion.button


            onClick={() =>
             {setShowProfile(!showProfile)}
            }


            whileHover={{
              scale:1.07
            }}


            whileTap={{
              scale:0.97
            }}


            className="
            h-11
            w-11
            rounded-full
            bg-white/10
            border border-white/20
            text-white
            font-semibold
            flex items-center justify-center
            "

          >


            {profileLetter}


          </motion.button>







          <AnimatePresence>


          {

            showProfile &&


            <motion.div


              initial={{
                opacity:0,
                y:-10,
                scale:0.95
              }}


              animate={{
                opacity:1,
                y:10,
                scale:1
              }}


              exit={{
                opacity:0,
                y:-10,
                scale:0.95
              }}


              transition={{
                duration:0.2
              }}


              className="
              absolute
              right-0
              mt-4
              w-60
              rounded-2xl
              bg-black/90
              backdrop-blur-xl
              border border-white/10
              shadow-[0_25px_60px_rgba(0,0,0,0.7)]
              p-4
              text-white
              "

            >



              <div className="
              flex items-center gap-3
              ">


                <div
                className="
                h-12 w-12
                rounded-full
                bg-white/10
                flex items-center justify-center
                text-xl
                font-bold
                "
                >

                  {profileLetter}

                </div>




                <div>

                  <h4 className="font-semibold">

                    {username}

                  </h4>


                  <p className="
                  text-sm
                  text-gray-400
                  ">

                    {userdata?.email || "No Email"}

                  </p>


                </div>


              </div>





              <button
                onClick={handleLogout}
                className="
                mt-4
                w-full
                py-2
                rounded-lg
                bg-white
                text-black
                font-semibold
                "

              >

                Logout

              </button>



              <button
                onClick={()=>{navigate("/history")}}
                className="
                mt-4
                w-full
                py-2
                rounded-lg
                bg-white
                text-black
                font-semibold
                "

              >

                History

              </button>


            </motion.div>


          }


          </AnimatePresence>




        </div>



      </div>




    </motion.div>


  )

}


export default Navbar