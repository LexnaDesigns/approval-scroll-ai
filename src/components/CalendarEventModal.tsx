
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Truck, ClipboardList, PhoneCall } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { cn } from "@/lib/utils";

const EVENT_TYPES = [
  {
    value: "delivery",
    label: "Delivery",
    icon: Truck,
    color: "border-blue-400 text-blue-600",
    outline: "border-blue-400"
  },
  {
    value: "task",
    label: "Task",
    icon: ClipboardList,
    color: "border-green-400 text-green-600",
    outline: "border-green-400"
  },
  {
    value: "call",
    label: "Call",
    icon: PhoneCall,
    color: "border-purple-400 text-purple-600",
    outline: "border-purple-400"
  }
];

// Simple fuzzy search for filtering clients
function filterClients(clients, search) {
  const s = (search || "").toLowerCase();
  return clients.filter(
    (c) =>
      c.name.toLowerCase().includes(s) ||
      c.email.toLowerCase().includes(s) ||
      (c.phone || "").toLowerCase().includes(s)
  );
}

export default function CalendarEventModal({
  open,
  onOpenChange,
  initialEventType,
  selectedDate
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialEventType?: string;
  selectedDate?: Date;
}) {
  const { clients } = useClients();
  const [eventType, setEventType] = useState(initialEventType || "delivery");
  const [title, setTitle] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [clientId, setClientId] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);

  useEffect(() => {
    setEventType(initialEventType || "delivery");
  }, [initialEventType, open]);

  useEffect(() => {
    setFilteredClients(filterClients(clients, clientSearch));
  }, [clients, clientSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally would submit to backend
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black mb-2">Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold text-gray-900 mb-2 block">Event Type</label>
            <div className="flex gap-4 mb-2">
              {EVENT_TYPES.map((type) => (
                <button
                  type="button"
                  key={type.value}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center rounded-2xl border-2 py-3 transition-all bg-white cursor-pointer shadow-sm focus:outline-none",
                    eventType === type.value
                      ? `${type.color} bg-opacity-10 border-4 scale-105 shadow`
                      : "border-gray-200 hover:bg-gray-50"
                  )}
                  onClick={() => setEventType(type.value)}
                >
                  <type.icon className={cn("mb-1", eventType === type.value ? "" : "opacity-60")} size={30} />
                  <span
                    className={cn(
                      "font-semibold text-base",
                      eventType === type.value
                        ? type.color
                        : "text-gray-600"
                    )}
                  >
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-semibold text-gray-900 mb-1 block" htmlFor="event-title">Title</label>
            <input
              id="event-title"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:border-blue-400 font-normal text-lg placeholder:text-gray-400"
              type="text"
              placeholder="What's this event about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-900 mb-1 block" htmlFor="client-name">Client Name</label>
            <div className="relative">
              <input
                id="client-name"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:border-blue-400 font-normal text-lg placeholder:text-gray-400"
                type="text"
                placeholder="Search client..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                autoComplete="off"
              />
              {clientSearch && filteredClients.length > 0 && (
                <div className="absolute z-20 mt-1 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-36 overflow-auto">
                  {filteredClients.map((client) => (
                    <button
                      type="button"
                      key={client.id}
                      className={cn(
                        "block w-full text-left px-4 py-2 hover:bg-blue-50 rounded-xl transition",
                        clientId === client.id ? "bg-blue-100 font-semibold" : ""
                      )}
                      onClick={() => {
                        setClientId(client.id);
                        setClientSearch(client.name);
                      }}
                    >
                      {client.name} <span className="text-gray-400 text-xs ml-2">@{client.email}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {clientId && (
              <div className="mt-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm flex items-center gap-2">
                <span>Selected:</span>
                <span className="font-semibold">{clients.find(c => c.id === clientId)?.name}</span>
                <Button size="sm" variant="ghost" type="button" className="ml-2 px-2 text-xs" onClick={() => { setClientId(""); setClientSearch(""); }}>Clear</Button>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2">Add Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
