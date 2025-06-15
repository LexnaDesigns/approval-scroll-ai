
import React, { useState } from "react";
import { Calendar as CalendarIcon, Truck, ClipboardList, PhoneCall, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CalendarEventModal from "@/components/CalendarEventModal";

const EVENT_TYPES = [
  {
    value: "delivery",
    label: "Deliveries",
    icon: Truck,
    color: "bg-blue-100 text-blue-700 border-blue-400",
    button: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
    outline: "border-blue-400"
  },
  {
    value: "task",
    label: "Tasks",
    icon: ClipboardList,
    color: "bg-green-100 text-green-700 border-green-400",
    button: "bg-green-600 text-white hover:bg-green-700 border-green-600",
    outline: "border-green-400"
  },
  {
    value: "call",
    label: "Calls",
    icon: PhoneCall,
    color: "bg-purple-100 text-purple-700 border-purple-400",
    button: "bg-purple-600 text-white hover:bg-purple-700 border-purple-600",
    outline: "border-purple-400"
  }
];

const VIEW_TYPES = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" }
];

export default function CalendarPage() {
  const [activeEventType, setActiveEventType] = useState("delivery");
  const [activeView, setActiveView] = useState("month");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100/40 via-white to-purple-100/40 flex flex-col items-center px-0 md:px-6 py-6">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-3">
          <div className="flex flex-row gap-2">
            {EVENT_TYPES.map((type) => (
              <Button
                key={type.value}
                variant="outline"
                className={cn(
                  "px-6 py-2 font-semibold flex items-center gap-2 rounded-xl border-2 shadow-sm",
                  activeEventType === type.value
                    ? type.button + " scale-105"
                    : "bg-white " + type.outline + " text-gray-900 hover:bg-gray-100",
                  "transition-all focus-visible:ring-2 ring-blue-300"
                )}
                onClick={() => setActiveEventType(type.value)}
              >
                <type.icon className="mr-2" size={20} />
                <span>{type.label}</span>
              </Button>
            ))}
          </div>
          <div className="flex flex-row gap-2">
            {VIEW_TYPES.map((view) => (
              <Button
                key={view.value}
                variant={activeView === view.value ? "default" : "outline"}
                className={cn(
                  "px-5 py-2 rounded-xl font-semibold text-base shadow-sm",
                  activeView === view.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-900 border-2 border-blue-100 hover:bg-blue-100"
                )}
                onClick={() => setActiveView(view.value)}
              >
                {view.label}
              </Button>
            ))}
            <Button className="ml-4 flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white drop-shadow-lg transition-all"
              onClick={() => setAddModalOpen(true)}>
              <Plus size={18} className="mr-1" />
              Add Event
            </Button>
          </div>
        </div>
        {/* Fun Calendar */}
        <div className="relative rounded-3xl overflow-x-auto shadow-xl border-0 bg-white/60 p-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn(
              "p-3 pointer-events-auto rounded-3xl mt-6 shadow-xl border-0 bg-gradient-to-b from-blue-50/80 to-white",
              "calendar-fun grid"
            )}
            modifiersClassNames={{
              today: "bg-blue-600 text-white rounded-full font-bold shadow",
              selected: "border-2 border-blue-500",
            }}
            showOutsideDays
          />
        </div>
      </div>
      {/* Add Event Modal */}
      <CalendarEventModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        initialEventType={activeEventType}
        selectedDate={selectedDate}
      />
    </div>
  );
}
