"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "@/types/courseType";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import ReviewCourse from "./ReviewCourse";
import Link from "next/link";

const PurchasedCourseCard = ({ course }: { course: Course }) => {
  const courseTitle = course.course.title
  return (
    <Card className="overflow-hidden flex flex-col h-full bg-stone-100 dark:bg-stone-950/50">
      <div className="aspect-video relative overflow-hidden">
        <Image
          className="object-cover transition-transform hover:scale-105"
          src={course.course.thumbnail!}
          alt={course.course.title!}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="p-3">
        <CardTitle className="capitalize text-lg line-clamp-1">
          {course.course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {course.course.tags.split(",").map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="select-none capitalize text-xs px-1 py-0"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="lg:p-3 p-2 grid grid-cols-1 md:grid-cols-2 gap-1">
        <Link
          href={{
            pathname: `/classes/${course.course.id}`,
            query: { courseTitle },
          }}
        >
          <Button className="w-full" size="sm">
            Open Classes
          </Button>
        </Link>
        <ReviewCourse courseId={course.course.id as string} />
      </CardFooter>
    </Card>
  );
};

export default PurchasedCourseCard;
