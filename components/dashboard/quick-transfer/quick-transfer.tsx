"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

import { QuickTransferSkeleton } from "@/components/skeletons/quick-transfer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchContacts } from "@/lib/features/contacts-slice";
import { createTransfer } from "@/lib/features/transactions-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  contactId: z.number().min(1, "Contact is required"),
});

export default function QuickTransfer() {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading, error } = useSelector(
    (state: RootState) => state.contacts
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      contactId: -1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const contact = contacts.find(
        (contact) => contact.id === values.contactId
      );
      const description = `Transfer to ${contact?.name || "Unknown"}`;
      await dispatch(
        createTransfer({
          amount: Number(values.amount),
          description: description,
          category: "Transfer",
        })
      ).unwrap();
      toast.success(`${description} is successfully sent`);
    } catch (e) {
      toast.error("Failed to send transfer");
    }
  }

  if (loading) {
    return <QuickTransferSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            toast.error(
              [errors.amount?.message, errors.contactId?.message]
                .filter(Boolean)
                .map((message, index) =>
                  message && index > 0 ? message.toLowerCase() : message
                )
                .join(", ")
            );
          })}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="contactId"
            render={() => (
              <div>
                <FormControl>
                  <div className="flex space-x-3 overflow-x-auto animate-fadeIn">
                    {contacts.map((contact) => {
                      return (
                        <div
                          key={contact.id}
                          onClick={() => form.setValue("contactId", contact.id)}
                          className="flex-shrink-0 animate-slideUp"
                        >
                          <div
                            className={cn(
                              "flex flex-col items-center space-y-2 cursor-pointer px-4 w-16 box-content rounded-3xl transition-all text-center",
                              form.watch("contactId") === contact.id
                                ? "font-bold"
                                : "font-medium"
                            )}
                          >
                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                              <AvatarImage
                                src={contact.avatar}
                                alt={contact.name}
                              />
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <p className="line-clamp-2">{contact.name}</p>
                            <p className="text-xs pt-2 text-slate-500">
                              {contact.role}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="relative flex items-center gap-6">
                  <FormLabel className="text-slate-500 whitespace-nowrap">
                    Write amount
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="525.50" className="pr-24" />
                  </FormControl>
                  <div className="flex h-full absolute right-0 top-0 w-24 animate-slideUpFade">
                    <Button
                      type="submit"
                      className="h-full w-full rounded-3xl"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send"}
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
