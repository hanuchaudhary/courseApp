"use client";

import React from "react";
import axios, { AxiosError } from "axios";
import { Edit, Star, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@/types/courseType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import EditCourse from "./EditCourse";
import { useCourses } from "@/hooks/useCreateCourse";

const CreatedCourses = () => {
  const { courses, isLoading} = useCourses();

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {isLoading ? (
          Array(6)
            .fill(null)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course.id} {...course} />)
        ) : (
          <p className="font font-semibold italic">No course found...</p>
        )}
      </div>
    </div>
  );
};

function CourseCard(course: Course) {
  const { toast } = useToast();
  const handleDeleteCourse = async () => {
    try {
      const response = await axios.post(`/api/delete-course/${course.id}`);
      if (response.status === 200) {
        toast({
          title: "Deleted",
          description: "Course Deleted succesfully",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: "Error",
        description: axiosError.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="relative overflow-hidden flex flex-col h-full">
      <div className="aspect-video h-full w-full z-10 absolute overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={course.thumbnail!}
          alt={course.title!}
        />
      </div>
      <div className="z-50 flex flex-col bg-black/90">
        {" "}
        <CardHeader>
          <CardTitle className="capitalize text-xl line-clamp-1">
            {course.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="text-lg font-semibold">Price : ₹{course.price}</div>
          <div className="createdAt">
            {new Date(course.createdAt!).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </CardContent>
        <CardFooter className="flex gap-1">
          <Button className="font-semibold" variant={"link"} size={"sm"}>
            {/* editCourse component */}
            <EditCourse
              duration={course.duration!}
              id={course.id!}
              price={course.price!}
              title={course.title!}
            />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size={"sm"}
                className="font-semibold"
              >
                <Trash2 />
                Delete Course
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this Course?
                </AlertDialogTitle>
                <AlertDialogDescription>{course.title}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteCourse}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </div>
    </Card>
  );
}

const SkeletonCard = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  </Card>
);

export default CreatedCourses;
