import React, { useEffect, useState } from "react";
import "../../assets/css/detail_of_course.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import RatingDetail from "../../components/user.components/Detail_Of_Course/RatingStatus.tsx";
import CommentDetail from "../../components/user.components/Detail_Of_Course/CommentDetail.tsx";
import PaginationSection from "../../components/user.components/Homepage/PaginationSection.tsx";
import CourseCardComponent from "../../components/user.components/CourseCardComponent.tsx";
import { fetchDataCourseById } from "../../apiService/Course.service.ts";
import { useLocation } from "react-router-dom";
import { Rate } from "antd";
const coursesRelated = [
  {
    id: "course_001",
    name: "Introduction to Programming Introduction to Programming Introduction to Programming Introduction to Programming",
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOci7zs9k4X9pUqo5q0M8XzVK-swsnNj_0g&s",

    platform: "Online",
    rating: 4.5,
    studentNumber: 120,
    level: "Beginner",
  },
  {
    id: "course_002",
    name: "Advanced JavaScript",
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOci7zs9k4X9pUqo5q0M8XzVK-swsnNj_0g&s",
    platform: "Udemy",
    rating: 4.8,
    studentNumber: 85,
    level: "Advanced",
  },
  {
    id: "course_003",
    name: "Data Science Basics",
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOci7zs9k4X9pUqo5q0M8XzVK-swsnNj_0g&s",

    platform: "Offline",

    rating: 4.7,
    studentNumber: 200,
    level: "Intermediate",
  },
  {
    id: "course_004",
    name: "Machine Learning",
    thumbnailUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOci7zs9k4X9pUqo5q0M8XzVK-swsnNj_0g&s",

    platform: "Online",

    rating: 4.9,
    studentNumber: 150,
    level: "Advanced",
  },
];
interface CategoryType {
  id: string;
  name: string;
}
interface CourseType {
  id: string;
  name: string;
  thumbnailUrl: string;
  platform: string;
  createdDate: string;
  level: string;
  categories: CategoryType[];
  link: string;
  teacherName: string;
  status: string;
}
const Detail_Of_Course: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [courseData, setCourseData] = useState<CourseType>();
  const options = [
    "1 Star Rating",
    "2 Star Rating",
    "3 Star Rating",
    "4 Star Rating",
    "5 Star Rating",
    "All",
  ];
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const onPageNumberClick = (newPageNumber: number) => {
    setCurrentPage(newPageNumber);
  };

  const getDataDetailCourse = async (id: string | null) => {
    const result = await fetchDataCourseById(id);
    if (result && result.data) {
      setCourseData(result.data);
    }
  };
  useEffect(() => {
    getDataDetailCourse(id);
  }, [id]);

  function convertDate(dateString: string) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  function truncateText(text: string, maxLines: number) {
    if (!text || text.length <= maxLines * 15) {
      // Text is short enough, no need to truncate
      return text;
    }

    const words = text.split(" ");
    let truncatedText = "";
    for (let i = 0; i < words.length; i++) {
      truncatedText += words[i] + " ";
      if (truncatedText.trim().split(/\r?\n/).length > maxLines) {
        return truncatedText.trim() + "...";
      }
    }

    // If all words fit, truncate at character limit
    return truncatedText.trim().slice(0, maxLines * 15) + "...";
  }

  return (
    <>
      {courseData ? (
        <div>
          <div className="w-full h-[280px] bg-[#333333]">
            <div className="max-w-[1536px] mx-auto pl-[10%] pr-[5%] pt-[30px] flex justify-center items-start">
              <div className="w-[70%] p-[10px]">
                <div className="flex flex-col gap-[10px] h-[260px]">
                  <h1
                    className="text-white text-[1.7rem] font-[700] leading-tight"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal",
                    }}
                  >
                    {courseData?.name}
                  </h1>

                  <div>
                    <span className="text-white text-[1.2rem] font-[500]">
                      Course link:{" "}
                    </span>

                    <a
                      href={courseData?.link}
                      className="text-[#4285f4] underline text-[1.2rem] font-[500]"
                      target="_blank"
                    >
                      {courseData?.link}
                    </a>
                  </div>
                  <div>
                    <div className="text-white text-[1.2rem] font-[500]">
                      Teacher name:
                    </div>
                    <div className="text-white text-[1.1rem] font-[400]">
                      {courseData?.teacherName}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-[1.2rem] font-[500]">Course Rating</div>
                  <div className="mt-[10px] flex justify-center items-center gap-[20px]">
                    <div className="border border-[#ccc] w-[20%] h-full flex flex-col justify-center items-center p-[10px_15px]">
                      <div className="text-[2rem] font-[600] mb-[15px]">
                        4.8
                      </div>
                      <div className="mb-[5px]">
                        <Rate
                          disabled
                          defaultValue={4.8}
                          allowHalf
                          style={{ fontSize: "16px", color: "purple" }}
                        />
                      </div>
                      <div className="text-[0.8rem] font-[500]">
                        Course Rating
                      </div>
                    </div>
                    <div className="w-[70%] h-full p-[10px]">
                      <RatingDetail
                        rating={5}
                        label="5 Star Rating"
                        percentage={75}
                      />
                      <RatingDetail
                        rating={4}
                        label="4 Star Rating"
                        percentage={21}
                      />
                      <RatingDetail
                        rating={3}
                        label="3 Star Rating"
                        percentage={3}
                      />
                      <RatingDetail
                        rating={2}
                        label="2 Star Rating"
                        percentage={1}
                      />
                      <RatingDetail
                        rating={1}
                        label="1 Star Rating"
                        percentage={0.5}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-[20px]">
                    <div className="text-[1.2rem] font-[600]">
                      MGMies FeedBack
                    </div>
                    <div className="w-[160px]">
                      <Dropdown
                        options={options}
                        value={options[0]}
                        placeholder="Select an option"
                      />
                    </div>
                  </div>
                  <div className="pt-[10px] flex flex-col gap-[10px]">
                    <CommentDetail
                      avaUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0WlXghDvWabW8nUqRhu__QHkmWEsZx2PbQ&s"
                      rating={5}
                      username="Guy Hawkins"
                      comment="I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.
                    I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako."
                    />
                    <hr />
                    <CommentDetail
                      avaUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0WlXghDvWabW8nUqRhu__QHkmWEsZx2PbQ&s"
                      rating={5}
                      username="Guy Hawkins"
                      comment="I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako."
                    />
                    <hr />
                    <CommentDetail
                      avaUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0WlXghDvWabW8nUqRhu__QHkmWEsZx2PbQ&s"
                      rating={5}
                      username="Guy Hawkins"
                      comment="I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako."
                    />
                  </div>
                </div>
                <div className="w-full h-[50px] flex justify-center items-center mt-[20px]">
                  <PaginationSection
                    totalItems={45}
                    currentPage={currentPage}
                    itemPerPage={5}
                    setCurrentPage={onPageNumberClick}
                  />
                </div>
              </div>
              <div className="w-[30%]">
                <div
                  className="relative w-full h-[200px]"
                  style={{ zIndex: "10" }}
                >
                  <img
                    src={courseData?.thumbnailUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col p-[10px] gap-[5px] bg-white border border-[#bdbdbd]">
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-[5px]">
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M12 6.75V12H17.25"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      Created Date
                    </div>
                    <div>{convertDate(courseData?.createdDate)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-[5px]">
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 20V10"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18 20V4"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 20V16"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      Course Level
                    </div>
                    <div>{courseData?.level}</div>
                  </div>
                  <div className="flex justify-between gap-[20px]">
                    <div className="flex justify-center gap-[5px]">
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34315 18.6569 4 17 4C15.3431 4 14 5.34315 14 7C14 8.65685 15.3431 10 17 10Z"
                            stroke="#858585"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 20C8.65685 20 10 18.6569 10 17C10 15.3431 8.65685 14 7 14C5.34315 14 4 15.3431 4 17C4 18.6569 5.34315 20 7 20Z"
                            stroke="#858585"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14 14H20V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H15C14.7348 20 14.4804 19.8946 14.2929 19.7071C14.1054 19.5196 14 19.2652 14 19V14ZM4 4H10V9C10 9.26522 9.89464 9.51957 9.70711 9.70711C9.51957 9.89464 9.26522 10 9 10H5C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V4Z"
                            stroke="#858585"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      Category
                    </div>
                    <div
                      className="text-right"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        maxWidth: "60%",
                      }}
                    >
                      {truncateText(
                        courseData?.categories
                          ?.map((item) => item.name)
                          .join(`, `),
                        3
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-[5px]">
                      <div>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.25003 15C10.9424 15 13.125 12.8174 13.125 10.125C13.125 7.43261 10.9424 5.25 8.25003 5.25C5.55764 5.25 3.37503 7.43261 3.37503 10.125C3.37503 12.8174 5.55764 15 8.25003 15Z"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                          />
                          <path
                            d="M14.5699 5.43149C15.2404 5.24257 15.9436 5.19953 16.6322 5.30528C17.3207 5.41102 17.9786 5.66309 18.5616 6.0445C19.1445 6.42592 19.6389 6.92782 20.0115 7.51641C20.3842 8.105 20.6263 8.76661 20.7217 9.45667C20.8171 10.1467 20.7635 10.8492 20.5646 11.5168C20.3656 12.1844 20.0259 12.8017 19.5683 13.3269C19.1107 13.8522 18.5459 14.2733 17.9118 14.5619C17.2778 14.8505 16.5893 14.9998 15.8927 14.9999"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.49963 18.5059C2.26101 17.4229 3.27178 16.539 4.44662 15.9288C5.62145 15.3186 6.92586 15.0001 8.24971 15C9.57356 14.9999 10.878 15.3184 12.0529 15.9285C13.2278 16.5386 14.2386 17.4225 15.0001 18.5054"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.8926 15C17.2166 14.999 18.5213 15.3171 19.6963 15.9273C20.8713 16.5375 21.8819 17.4218 22.6427 18.5054"
                            stroke="#A1A5B3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      Enrolled
                    </div>
                    <div>500</div>
                  </div>
                  <hr />
                  <div className="p-[5px_10px_0_10px]">
                    <button
                      className="w-full h-[40px] border border-[#ccc] font-medium text-purple-600"
                      style={{ color: "purple" }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="max-w-[1536px] mx-auto pl-[10%] pr-[5%] pt-[20px]">
              <div className="flex justify-between items-center w-full">
                <div className="text-[1.4rem] font-semibold">
                  Related Courses
                </div>
                <div className="flex items-center gap-[5px] cursor-pointer">
                  <div
                    className="text-purple-600 font-medium"
                    style={{ color: "purple" }}
                  >
                    View all
                  </div>
                  <div className="text-purple-600">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 12H20.25"
                        stroke="#861FA2"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.5 5.25L20.25 12L13.5 18.75"
                        stroke="#861FA2"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full flex-wrap pb-[80px]">
                <div className="previosBtn w-[50px] h-[50px] border border-[#ccc] rounded-full flex justify-center items-center cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 9 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.28782 15.9999L9.00037 14.1199L3.43761 7.99988L9.00036 1.87988L7.28781 -0.000121921L0.000365512 7.99988L7.28782 15.9999Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="itemCourseRelated flex justify-around items-center gap-[5px] flex-row py-[10px] w-[90%]">
                  {coursesRelated &&
                    coursesRelated.map((item) => {
                      return <CourseCardComponent course={item} />;
                    })}
                </div>
                <div className="nextBtn w-[50px] h-[50px] border border-[#ccc] rounded-full flex justify-center items-center cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.11256 0.00012207L0.400009 1.88012L5.96276 8.00012L0.400009 14.1201L2.11256 16.0001L9.40001 8.00012L2.11256 0.00012207Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Detail_Of_Course;
