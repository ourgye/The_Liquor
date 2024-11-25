import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  id: z.string().min(5),
  password: z.string().min(8).max(50),
});

export default function AdminLoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // 화면 네비게이션
    console.log(values);
    navigate("/admin/main");
  }

  return (
    <Form {...form}>
      <h1 className="text-xl font-bold mb-2">관리자 로그인</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>아이디</FormLabel>
              <FormControl>
                <Input placeholder="아이디를 입력해주세요" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="아이디를 입력해주세요"
                  {...field}
                  type="password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Button className="w-full mt-4" type="submit">
            로그인
          </Button>
        </div>
      </form>
    </Form>
  );
}
