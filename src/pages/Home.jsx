import {FaArrowRight} from 'react-icons/fa';
import React from 'react';
import {Link} from 'react-router-dom';
import CTAButton from '../components/core/HomePage/Button';
import HiglightedText from '../components/core/HomePage/HiglightedText';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Banner from '../assets/Images/banner.mp4';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import BecomeInstructor from '../components/core/HomePage/BecomeInstructor';
import ExploreMore from '../components/core/HomePage/ExploreMore';


const Home = ()=>{
    return (
        // Section 1
      <div className='mx-auto flex flex-col items-center text-white justify-center'>
        <div className='mx-auto flex flex-col w-11/12 items-center text-white justify-center'>
          <Link to="/signup">
            <div className='group mt-16 p-1 mx-auto rounded-full bg-zinc-700 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
              <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'><p>Become a instructor</p><FaArrowRight/></div>
            </div>
          </Link>

          <div className='flex font-semibold text-4xl mt-7 text-center'>
            <p className='text-white'>Empower your future with&nbsp;</p>
            <HiglightedText text={"Coding Skills"}/>
          </div>

          <div className='mt-4 w-[45%] text-center text-sm text-richblack-300'>
            <p>With our online course you can learn on your own pace, from anywhere in the world and get access to a wealth resources including hands-onn projects and quizess and personalised feedback instructors.</p>
          </div>

          <div className='flex font-semibold'>
            <CTAButton text="Learn More" color="yellow" link="/login" ></CTAButton>
            <CTAButton text="Book a Demo" color="black" link="/signup"></CTAButton>
          </div>  
        </div>

        <div className='shadow-blue-200 mt-10 mb-16 flex justify-center '>
          <video muted loop autoPlay className='w-1/2 shadow-4xl'>
            <source src={Banner} type='video/mp4'/>
          </video>
        </div>

        {/* CodeBlock -> 1 */}
        <div>
          <CodeBlocks 
            position="lg:flex-row" 
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HiglightedText text={"Coding Potential"} /> &nbsp;with our online courses
              </div>
            }
            subheading={
              "With our online course, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."
            }
            ctabtn1={{
              text: (
                <>
                  <p>Learn More</p>
                  <FaArrowRight />
                </>
              ),
              color: "yellow",
              link: "/login"
            }}
            ctabtn2={{
              text: "Try it Yourself",
              color: "black",
              link: "/signup"
            }}
            codeblock={`<!DOCTYPE html>
<html>
  <head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav>
      <a href="one/">One</a><a href="two/">Two</a>
    </nav>
  </body>
</html>`}
            backgroundGradient="yellow" 
            codeColor="text-yellow-500"
          />
        </div>


        {/* CodeBlock -> 2 */}
        <div className='bg-transparent'>
          <CodeBlocks
          position="lg:flex-row-reverse" 
          heading={
            <div className='text-4xl font-semibold'>
              Start<HiglightedText text={"Coding in seconds"}/>
            </div>
          }
          subheading={"With our online course you can learn on your own pace, from anywhere in the world and be ready for future world to achieve success.Get a road-map and make your way easy and enthusiast."} 
          ctabtn1={{
              text: (
                <>
                  <p>Learn More</p>
                  <FaArrowRight />
                </>
              ),
              color: "yellow",
              link: "/login"
            }}
          ctabtn2={{
            text: "Try it Yourself",color: "black", link:"/signup"
          }}
          codeblock={`<!DOCTYPE html>
  <html>
    <head>
      <title>Example</title><link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <nav>
        <a href="one/">One</a><a href="two/">Two</a>
      </nav>
    </body>
  </html>`}
           backgroundGradient="blue" 
           codeColor="blue"/>
        </div>

        <ExploreMore/>

        <div className='homepage_bg h-[333px] w-[100%] bg-repeat flex justify-center items-center'>
            <div className='flex'>
            <CTAButton text={<><p>View Full Catalog</p><FaArrowRight /></>} color="yellow" link="/" />
              <CTAButton text="Learn More" color="black" link=""/>
            </div>
        </div>

        <div className='flex justify-center mx-auto w-[100%] items-center bg-white p-20 px-40'>
            <div className='font-bold text-4xl text-black m-10 w-[50%]'>
              <p >Get the skills you need for a</p><HiglightedText text="job that is in demand."/>
            </div>
            <div className='flex flex-col text-black w-[50%]'>
              <div><p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p></div>
              <div><CTAButton text="Learn More" color="yellow" link="/signup"/></div>
            </div>
        </div>
        
        <TimelineSection/>

        <LearningLanguageSection/>

        <BecomeInstructor/>

      </div>
    )
}

export default Home;