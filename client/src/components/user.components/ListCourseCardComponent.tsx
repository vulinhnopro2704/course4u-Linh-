import { CourseType } from '../../App'
import { SkeletonLoader } from './CourseCardComponent'
import React from "react";
// import CourseCardComponent from './CourseCardComponent'

const CourseCardComponent = React.lazy(() => import('./CourseCardComponent'))

type PropsType = {
    ListCourse: CourseType[]
    isLoading: boolean
}

export default function ListCourseCardComponent(props: PropsType) {
    if (props.isLoading) {
        return <div className='grid gap-4 text-black 2xl:grid-cols-4 md:grid-cols-2 xl:grid-cols-3 scree auto-rows-auto'>
            {Array.from({ length: 8 }).map((_, index) => <SkeletonLoader key={index} />)}
        </div>
    }
    return (
        <div className='grid gap-4 text-black 2xl:grid-cols-4 md:grid-cols-2 xl:grid-cols-3 scree auto-rows-auto'>
            {props.ListCourse.map((course) => {
                return (
                    <CourseCardComponent course={course} key={course.id} />
                )
            })}
        </div>
    )
}