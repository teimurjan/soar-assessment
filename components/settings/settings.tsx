"use client";

import React, { useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import EditProfileForm from "@/components/settings/edit-profile-form/edit-profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/features/user-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface SettingsProps {
  className?: string;
}

export default function Settings({ className }: SettingsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  return (
    <div className={cn("w-full", className)}>
      <Card>
        <CardContent>
          <Tabs defaultValue="edit-profile" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="edit-profile">
                <motion.div
                  key="edit-profile"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {loading && (
                    <div className="h-96 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                  )}
                  {user && !loading && !error && <EditProfileForm user={user} />}
                </motion.div>
              </TabsContent>

              <TabsContent value="preferences">
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card>
                    <CardContent>
                      <h2 className="text-lg font-medium">Preferences</h2>
                      <p className="text-sm text-slate-500">
                        Manage your preferences here.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="security">
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card>
                    <CardContent>
                      <h2 className="text-lg font-medium">Security</h2>
                      <p className="text-sm text-slate-500">
                        Manage your security settings here.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
