"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
} from "@/components/ui/alert-dialog";
import {
  LogOut,
  UserMinus,
  BarChart,
  IndianRupee,
  ChartNoAxesCombined,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import CreatedCourses from "@/components/CreatedCourses";
import Link from "next/link";
import CourseStatics from "@/components/CourseStatics";
import AdminEarnings from "@/components/AdminEarnings";

export default function Profile() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/signin" });
  };

  return (
    <div className="container mx-auto gap-4 md:grid grid-cols-3 p-4">
      <Card className="w-full max-w-3xl mb-4 md:mb-0 mx-auto bg-neutral-100 dark:bg-neutral-900">
        <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl overflow-hidden font-bold uppercase shadow-md">
            {session?.user.fullName ? (
              <span>{session.user.fullName[0]}</span>
            ) : (
              <img
                className="w-full h-full object-cover"
                src={session?.user.image!}
                alt="User Avatar"
              />
            )}
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <CardTitle className="capitalize text-2xl sm:text-3xl text-center sm:text-left">
              {session?.user.fullName || session?.user.name}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-center sm:text-left">
              {session?.user.email}
            </CardDescription>
            <Badge className="mt-2 capitalize text-xs sm:text-sm">
              {session?.user.role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto flex items-center justify-center"
                >
                  <UserMinus className="mr-2 h-4 w-4" />
                  Deactivate
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to deactivate your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently
                    deactivate your account and remove your data from our
                    servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive">Deactivate</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full sm:w-auto flex items-center justify-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be signed out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-2 space-y-4">
        {session?.user.role === "admin" && (
          <Card className="bg-neutral-100 dark:bg-neutral-900">
            <CardHeader>
              <CardTitle>User Menu</CardTitle>
              <CardDescription>
                Manage your courses and view dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/create/addcourse">
                <Button className="w-full font-semibold">Add Course</Button>
              </Link>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full font-semibold">
                    <BarChart className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-4xl">
                    <DrawerHeader>
                      <DrawerTitle className="text-2xl">Dashboard</DrawerTitle>
                      <DrawerDescription>
                        Your course statistics and earnings
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="relative overflow-hidden">
                          <CardHeader>
                            <CardTitle className="flex  items-center justify-between">
                              <span className="text-3xl">
                                Course Statistics
                              </span>
                              <div className="absolute md:top-0 top-16 right-0">
                                <ChartNoAxesCombined className="md:h-56 md:w-56  h-36 w-36 text-red-500 text-primary" />
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CourseStatics />
                          </CardContent>
                        </Card>
                        <Card className="relative overflow-hidden">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span className="text-3xl">Earnings</span>
                              <div className="absolute md:top-0 top-16 right-0">
                                <IndianRupee className="md:h-56 md:w-56 h-36 w-36 text-green-500" />
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <AdminEarnings />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center p-4">
                      <DrawerClose>
                        <Button variant="outline" className="w-full">
                          Close
                        </Button>
                      </DrawerClose>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>
        )}

        <Card className="bg-neutral-100 dark:bg-neutral-900">
          <div>
            <CardHeader>
              <CardTitle>
                {session?.user.role !== "admin"
                  ? "User Courses"
                  : "Created Courses"}
              </CardTitle>
              <CardDescription>
                {session?.user.role !== "admin"
                  ? "Manage your courses"
                  : "Manage your created courses"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {session?.user.role !== "admin" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Purchased Courses
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-4xl">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            {" "}
                            Purchased Courses
                          </DrawerTitle>
                          <DrawerDescription>
                            Here are the courses you Purchased.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                          {/* Add saved jobs content here */}
                        </div>
                        <div className="w-full flex items-center justify-center p-4">
                          <DrawerClose>
                            <Button variant="outline" className="w-full">
                              Close
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>

                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Saved Courses
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-4xl">
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            Applied Jobs
                          </DrawerTitle>
                          <DrawerDescription>
                            Here are the courses you saved for later.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar"></div>
                        <div className="w-full flex items-center justify-center p-4">
                          <DrawerClose>
                            <Button variant="outline" className="w-full">
                              Close
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              ) : (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors"
                    >
                      View Created Courses
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full">
                      <DrawerHeader>
                        <DrawerTitle className="text-2xl">
                          Your Created Courses
                        </DrawerTitle>
                      </DrawerHeader>
                      <div className="md:h-[50vh] h-[60vh] px-4 overflow-y-auto">
                        <CreatedCourses />
                      </div>
                      <div className="w-full flex items-center justify-center p-4">
                        <DrawerClose>
                          <Button variant="outline" className="w-full">
                            Close
                          </Button>
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
