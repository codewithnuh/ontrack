"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus } from "lucide-react";

const data = [
  { name: "Mon", completed: 2 },
  { name: "Tue", completed: 3 },
  { name: "Wed", completed: 1 },
  { name: "Thu", completed: 4 },
  { name: "Fri", completed: 3 },
  { name: "Sat", completed: 2 },
  { name: "Sun", completed: 5 },
];

const habits = [
  { name: "Habit 1", status: "completed" },
  { name: "Habit 2", status: "in-progress" },
  { name: "Habit 3", status: "not-started" },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Habits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streaks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Daily Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {habits.map((habit) => (
              <Button
                key={habit.name}
                variant="outline"
                className={`
                  ${
                    habit.status === "completed"
                      ? "bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800"
                      : ""
                  }
                  ${
                    habit.status === "in-progress"
                      ? "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 dark:hover:bg-yellow-800"
                      : ""
                  }
                  ${
                    habit.status === "not-started"
                      ? "bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-800"
                      : ""
                  }
                  text-white font-semibold
                `}
              >
                {habit.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Progress Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "0.375rem",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="completed" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Habit
        </Button>
      </div>
    </div>
  );
}
