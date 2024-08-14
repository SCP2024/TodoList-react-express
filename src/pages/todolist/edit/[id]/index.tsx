import { getTodoListDetail } from "@/api/todolist";
import TodoForm from "@/components/TodoForm";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function TodoEdit() {
  const router = useRouter();
  const [data, setData] = useState ();
  useEffect(() => {
    const fetch = async () => {

        const {query = {}} = router
      const { id } = query
      if (id) {
        const res = await getTodoListDetail(id as string);
        setData(res.data);
      }
    }
    fetch();
   }, [router]);

  return <TodoForm title="事项编辑" data={data} />;
}
