"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2, Upload, X } from "lucide-react";
import EditUserDetails from "./EditUserDetails";
import ChangePassword from "./ChangePassword";
import AccountManage from "../AccountManage";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useProfileStore } from "@/store/ProfileStore/profileStore";

export default function ProfileCard() {
  const { data: session } = useSession();
  const { user, fetchProfile } = useProfileStore();
  useEffect(()=>{
    fetchProfile()
  },[fetchProfile])
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!previewImage) return;

    setIsUploading(true);
    const formData = new FormData();
    const blob = await fetch(previewImage).then((r) => r.blob());
    formData.append("avatar", blob, "avatar.jpg");

    try {
      await axios.post("/api/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({
        title: "Success",
        description: "Avatar updated successfully",
        variant: "success",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setPreviewImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const cancelPreview = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="w-full flex justify-between flex-col bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg">
        <div>
          <CardHeader className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="w-32 h-32 shadow-lg transition-transform duration-300 group-hover:scale-105">
                {previewImage ? (
                  <AvatarImage src={previewImage} className="object-cover" alt="Preview" />
                ) : (
                  <>
                    <AvatarImage
                      src={user?.image || undefined}
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold uppercase">
                      {session?.user.fullName?.[0] || "?"}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <Input
                ref={fileInputRef}
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
                disabled={isUploading}
              />
            </div>
            <div className="text-center">
              <CardTitle className="capitalize text-2xl mb-2">
                {session?.user.fullName}
              </CardTitle>
              <CardDescription className="text-base">
                {session?.user.email}
              </CardDescription>
              <Badge className="mt-2 capitalize text-sm px-3 py-1">
                {session?.user.role}
              </Badge>
            </div>
          </CardHeader>
          {previewImage && (
            <div className="flex justify-center space-x-2 my-4">
              <Button
                variant="default"
                onClick={handleAvatarUpload}
                disabled={isUploading}
                className="transition-all duration-300 hover:scale-105"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Save New Avatar"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={cancelPreview}
                className="transition-all duration-300 hover:scale-105"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        <CardContent className="space-y-6">
          <CardDescription className="text-center italic">
            {user?.bio || "No bio provided"}
          </CardDescription>
          <div className="md:space-y-4 space-y-2">
            <div className="flex items-center gap-2">
              <EditUserDetails />
              <ChangePassword />
            </div>
            <AccountManage />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
