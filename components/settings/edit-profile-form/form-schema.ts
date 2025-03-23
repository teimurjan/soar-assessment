"use client";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().optional(),
  dateOfBirth: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  avatar: z.instanceof(File).optional(),
});

export type EditProfileFormValues = z.infer<typeof formSchema>;
