import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      // console.log(courseId)
      const userId = user._id;
      const courseData = await getFullDetailsOfCourse(courseId)
      // console.log("Course Data here... ", courseData)
      dispatch(setCourseSectionData(courseData._doc.courseContent))
      dispatch(setEntireCourseData(courseData._doc))

      const studentsEnrolled = courseData._doc.studentsEnrolled;
      const student = studentsEnrolled.find(student => student._id.toString() === userId);
      // console.log("printing Student", student)
      if (student) {
        const courseProgress = student.courseProgress;
        const progressEntry = courseProgress.find(progress => progress.courseID.toString() === courseData._doc._id.toString());

        if (progressEntry) {
          console.log("printing progressEntry", progressEntry);
          dispatch(setCompletedLectures(progressEntry.completedVideos));
        } else {
          console.warn("No progress entry found for this course.");
          dispatch(setCompletedLectures([])); 
        }
      } else {
        console.warn("User is not enrolled in this course.");
        dispatch(setCompletedLectures([]));
      }

      let lectures = 0
      courseData?._doc?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      console.log(lectures)
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}