import { InputArea } from "@/components/InputField";
import { MessagesList } from "@/components/MessageList";
import { MessageSquare } from "lucide-react";

const page = () => {
  

  return (
    <section className="flex flex-col h-dvh bg-white/80">
      <div className="p-6 border-b bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Text Processor
          </h1>
        </div>
      </div>
      <MessagesList
      />
      <InputArea
      />
    </section>
  );
};

export default page;
