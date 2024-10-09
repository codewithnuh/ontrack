"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flame } from "lucide-react";

// Sample data for the chart
const habitData = [
  { name: "Mon", "Drink Water": 1, Exercise: 1, "Read Book": 0 },
  { name: "Tue", "Drink Water": 1, Exercise: 0, "Read Book": 1 },
  { name: "Wed", "Drink Water": 1, Exercise: 1, "Read Book": 1 },
  { name: "Thu", "Drink Water": 1, Exercise: 1, "Read Book": 0 },
  { name: "Fri", "Drink Water": 1, Exercise: 0, "Read Book": 1 },
  { name: "Sat", "Drink Water": 0, Exercise: 1, "Read Book": 1 },
  { name: "Sun", "Drink Water": 1, Exercise: 1, "Read Book": 1 },
];

// Sample data for the longest streaks
const longestStreaks = [{ habit: "learn next js every day", streak: 1 }];

// Sample data for the current streaks
const currentStreaks = [{ habit: "learn next js every day", streak: 1 }];

export default function Progress() {
  const [activeHabit, setActiveHabit] = useState("Drink Water");

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent p-2 border-b-2 border-primary inline-block">
          Progress
        </h1>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Habit Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={habitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Drink Water" fill="#6e67ff" />
                <Bar dataKey="Exercise" fill="#06b6d4" />
                <Bar dataKey="Read Book" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Longest Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Habit</TableHead>
                  <TableHead className="text-right">Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {longestStreaks.map((streak, index) => (
                  <TableRow
                    key={streak.habit}
                    className={index % 2 === 0 ? "bg-muted" : ""}
                  >
                    <TableCell className="font-medium">
                      {streak.habit}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <Flame className="w-5 h-5 text-orange-500 mr-2" />
                        <span>
                          {streak.streak} {streak.streak > 1 ? "days" : "day"}{" "}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Current Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Habit</TableHead>
                  <TableHead className="text-right">Streak</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStreaks.map((streak, index) => (
                  <TableRow
                    key={streak.habit}
                    className={index % 2 === 0 ? "bg-muted" : ""}
                  >
                    <TableCell className="font-medium">
                      {streak.habit}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <Flame className="w-5 h-5 text-orange-500 mr-2" />
                        <span>
                          {streak.streak} {streak.streak > 1 ? "days" : "day"}{" "}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
