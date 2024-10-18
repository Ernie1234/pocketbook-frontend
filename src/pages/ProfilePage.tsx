import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Layout from "@/components/Layout";
import { useAuthStore } from "@/store/authStore";
import { profileFormSchema } from "@/utils/schema";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CloudCog } from "lucide-react";
import Nav from "@/components/nav/Nav";

export default function ProfilePage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [changeModalStore, setChangeModalStore] = useState(false);

  const { user } = useAuthStore();
  if (!user) return null;
  const isPending = true;

  const firstName = user?.name.split(" ")[0] || "";
  const lastName = user?.name.split(" ")[1] || "";
  const email = user?.email || "";
  const image = user?.image || "";

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email,
    },
  });

  // Extract the last segment
  const lastSegment = pathname.split("/").filter(Boolean).pop(); // Filter to remove empty segments

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
  }

  return (
    <Layout>
      <Nav header="Profile" />
      <main className="flex flex-col bg-gray-100 p-4 w-full min-h-dvh overflow-scroll no-scrollbar">
        <div className="flex flex-col border-gray-300 bg-white border rounded-xl overflow-hidden">
          <div className="flex justify-between items-center w-full transition-all duration-500">
            <p
              className={cn(
                "flex justify-center items-center p-4 w-full hover:cursor-pointer",
                lastSegment === "profile"
                  ? "rounded-none bg-white"
                  : "bg-gray-200 rounded-br-2xl"
              )}
              onClick={() => navigate("/dashboard/setting/profile")}
            >
              Profile
            </p>
            <p
              className={cn(
                "flex justify-center items-center p-4 w-full hover:cursor-pointer"
              )}
              onClick={() => navigate("/dashboard/setting/notification")}
            >
              Notification
            </p>
            <p
              className={cn(
                "flex justify-center items-center p-4 w-full hover:cursor-pointer"
              )}
              onClick={() => navigate("/dashboard/setting/preference")}
            >
              Preference
            </p>
          </div>
          <div className="bg-white p-4">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="gap-8 space-y-8 grid grid-cols-1 md:grid-cols-3"
                >
                  <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
                    <div className="flex gap-4 w-full">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isPending}
                                placeholder="first name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isPending}
                                placeholder="last name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email" disabled {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col">
                      <p className="mb-3 text-xs">
                        Please note that changing your password will log you out
                        of your current session. If you want to keep your
                        account secure, consider using a strong, unique password
                        and enabling two-factor authentication. Learn more about
                        our security measures and privacy policy.{" "}
                        <Link
                          to="/auth/security"
                          className="text-green-500 hover:text-green-600"
                        >
                          Learn more
                        </Link>
                      </p>
                      <div className="max-w-min">
                        <Button
                          type="button"
                          size="lg"
                          onClick={() => setChangeModalStore(true)}
                          className="bg-green-50 hover:bg-green-600 text-green-700 hover:text-white transition-all duration-500"
                        >
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex justify-center col-span-1">
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt="Profile Image"
                          className="border-2 border-white rounded-full w-2/3 h-full"
                        />
                        <div className="right-28 bottom-4 absolute bg-red-400 w-8 h-8"></div>
                      </>
                    ) : (
                      //   <Avatar className="border-gray-100 border w-2/3 h-full">
                      //     <AvatarImage
                      //       src={image || ""}
                      //       alt={firstName}
                      //       className="object-center object-cover"
                      //     />
                      //   </Avatar>
                      <div className="flex justify-center items-center border-2 border-gray-300 bg-white rounded-full w-2/3 h-2/3">
                        <CloudCog className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-4 col-span-1 md:col-span-2">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="px-12 text-green-600 hover:text-green-500 transition-all duration-500"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="lg"
                      className="bg-green-700 hover:bg-green-600 px-12 transition-all duration-500"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Saving Changes" : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
