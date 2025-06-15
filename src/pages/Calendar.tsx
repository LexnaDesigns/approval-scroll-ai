
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center mb-8 space-x-2">
        <CalendarIcon className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
      </div>
      <Calendar />
    </div>
  );
}
