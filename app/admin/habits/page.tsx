"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PlusCircle,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Frequency =
  | { type: "Daily" }
  | { type: "Weekly"; times: number }
  | { type: "Custom Days"; days: string[] }
  | { type: "Monthly"; day: number }
  | { type: "One-Time" }
  | { type: "Specific Interval"; days: number };

type Habit = {
  id: number;
  name: string;
  status: "Active" | "Inactive";
  frequency: Frequency;
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MyHabits() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Drink Water",
      status: "Active",
      frequency: { type: "Daily" },
    },
    {
      id: 2,
      name: "Exercise",
      status: "Active",
      frequency: { type: "Weekly", times: 3 },
    },
    {
      id: 3,
      name: "Read Book",
      status: "Inactive",
      frequency: {
        type: "Custom Days",
        days: ["Monday", "Wednesday", "Friday"],
      },
    },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [newFrequency, setNewFrequency] = useState<Frequency>({
    type: "Daily",
  });
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const addHabit = () => {
    if (newHabit.trim() !== "") {
      const newHabitFrequency =
        newFrequency.type === "Custom Days"
          ? { ...newFrequency, days: [] }
          : newFrequency;
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: newHabit,
          status: "Active",
          frequency: newHabitFrequency,
        },
      ]);
      setNewHabit("");
      setNewFrequency({ type: "Daily" });
    }
  };

  const updateHabit = () => {
    if (editingHabit) {
      setHabits(
        habits.map((h) => (h.id === editingHabit.id ? editingHabit : h))
      );
      setEditingHabit(null);
    }
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const renderFrequencyInput = (
    frequency: Frequency,
    setFrequency: (f: Frequency) => void
  ) => {
    switch (frequency.type) {
      case "Weekly":
        return (
          <Input
            type="number"
            min="1"
            max="7"
            value={frequency.times}
            onChange={(e) =>
              setFrequency({ ...frequency, times: parseInt(e.target.value) })
            }
            className="w-20"
          />
        );
      case "Custom Days":
        return (
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={day}
                  checked={frequency.days.includes(day)}
                  onCheckedChange={(checked) => {
                    const newDays = checked
                      ? [...frequency.days, day]
                      : frequency.days.filter((d) => d !== day);
                    setFrequency({ ...frequency, days: newDays });
                  }}
                />
                <label htmlFor={day}>{day.slice(0, 3)}</label>
              </div>
            ))}
          </div>
        );
      case "Monthly":
        return (
          <Input
            type="number"
            min="1"
            max="31"
            value={frequency.day}
            onChange={(e) =>
              setFrequency({ ...frequency, day: parseInt(e.target.value) })
            }
            className="w-20"
          />
        );
      case "Specific Interval":
        return (
          <Input
            type="number"
            min="1"
            value={frequency.days}
            onChange={(e) =>
              setFrequency({ ...frequency, days: parseInt(e.target.value) })
            }
            className="w-20"
          />
        );
      default:
        return null;
    }
  };

  const formatFrequency = (frequency: Frequency) => {
    switch (frequency.type) {
      case "Daily":
        return "Daily";
      case "Weekly":
        return `${frequency.times} times a week`;
      case "Custom Days":
        return frequency.days.join(", ");
      case "Monthly":
        return `Monthly on day ${frequency.day}`;
      case "One-Time":
        return "One-Time";
      case "Specific Interval":
        return `Every ${frequency.days} days`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          My Habits
        </h1>
      </header>

      <div className="mb-8 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Habit</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Habit Name
                </Label>
                <Input
                  id="name"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="frequency" className="text-right">
                  Frequency
                </Label>
                <Select
                  onValueChange={(value) => {
                    switch (value) {
                      case "Weekly":
                        setNewFrequency({ type: "Weekly", times: 1 });
                        break;
                      case "Custom Days":
                        setNewFrequency({ type: "Custom Days", days: [] });
                        break;
                      case "Monthly":
                        setNewFrequency({ type: "Monthly", day: 1 });
                        break;
                      case "Specific Interval":
                        setNewFrequency({ type: "Specific Interval", days: 1 });
                        break;
                      default:
                        setNewFrequency({
                          type: value as "Daily" | "One-Time",
                        });
                    }
                  }}
                  defaultValue={newFrequency.type}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Custom Days">Custom Days</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="One-Time">One-Time</SelectItem>
                    <SelectItem value="Specific Interval">
                      Specific Interval
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                  {renderFrequencyInput(newFrequency, setNewFrequency)}
                </div>
              </div>
            </div>
            <Button onClick={addHabit}>Add Habit</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="font-bold">Habit Name</TableHead>
            <TableHead className="font-bold">Frequency</TableHead>
            <TableHead className="text-right font-bold">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habits.map((habit) => (
            <TableRow key={habit.id}>
              <TableCell className="font-medium">{habit.name}</TableCell>
              <TableCell>{formatFrequency(habit.frequency)}</TableCell>
              <TableCell className="text-right">
                {habit.status === "Active" ? (
                  <span className="text-green-500 flex items-center justify-end">
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Active
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center justify-end">
                    <XCircle className="mr-1 h-4 w-4" /> Inactive
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Habit</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Habit Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingHabit?.name || ""}
                          onChange={(e) =>
                            setEditingHabit({
                              ...editingHabit!,
                              name: e.target.value,
                            })
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-frequency" className="text-right">
                          Frequency
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setEditingHabit({
                              ...editingHabit!,
                              frequency: { type: value } as Frequency,
                            })
                          }
                          defaultValue={editingHabit?.frequency.type}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Custom Days">
                              Custom Days
                            </SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="One-Time">One-Time</SelectItem>
                            <SelectItem value="Specific Interval">
                              Specific Interval
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-start-2 col-span-3">
                          {editingHabit &&
                            renderFrequencyInput(editingHabit.frequency, (f) =>
                              setEditingHabit({ ...editingHabit, frequency: f })
                            )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-status" className="text-right">
                          Status
                        </Label>
                        <Switch
                          id="edit-status"
                          checked={editingHabit?.status === "Active"}
                          onCheckedChange={(checked) =>
                            setEditingHabit({
                              ...editingHabit!,
                              status: checked ? "Active" : "Inactive",
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button onClick={updateHabit}>Update Habit</Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteHabit(habit.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <footer className="mt-8 text-center text-muted-foreground">
        <p>Stay on track! Keep adding new habits to build your routine!</p>
      </footer>
    </div>
  );
}
