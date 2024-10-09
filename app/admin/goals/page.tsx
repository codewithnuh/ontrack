"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Goal = {
  id: number;
  name: string;
  progress: number;
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: "Drink Water Daily", progress: 80 },
    { id: 2, name: "Read 5 Books This Month", progress: 60 },
    { id: 3, name: "Exercise 3 Times a Week", progress: 40 },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      const newGoalObj = { id: Date.now(), name: newGoal, progress: 0 };
      setGoals([...goals, newGoalObj]);
      setNewGoal("");
      toast({
        title: "Goal Added",
        description: `${newGoal} has been added to your goals.`,
      });
    }
  };

  const updateGoal = () => {
    if (editingGoal) {
      setGoals(goals.map((g) => (g.id === editingGoal.id ? editingGoal : g)));
      setEditingGoal(null);
      toast({
        title: "Goal Updated",
        description: `${editingGoal.name} has been updated.`,
      });
    }
  };

  const deleteGoal = (id: number) => {
    const goalToDelete = goals.find((g) => g.id === id);
    setGoals(goals.filter((g) => g.id !== id));
    toast({
      title: "Goal Deleted",
      description: `${goalToDelete?.name} has been removed from your goals.`,
      variant: "destructive",
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent p-2 border-b-2 border-primary inline-block">
          Goals
        </h1>
      </header>

      <div className="mb-8 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Goal Name
                </Label>
                <Input
                  id="name"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addGoal}>Add Goal</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal Name</TableHead>
                <TableHead className="text-right">Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.map((goal, index) => (
                <TableRow
                  key={goal.id}
                  className={index % 2 === 0 ? "bg-muted" : ""}
                >
                  <TableCell className="font-medium">{goal.name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <Progress
                        value={goal.progress}
                        className="w-[60%] mr-2"
                        indicatorClassName={getProgressColor(goal.progress)}
                      />
                      <span>{goal.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="mr-2">
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Goal</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Goal Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={editingGoal?.name || ""}
                              onChange={(e) =>
                                setEditingGoal({
                                  ...editingGoal!,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="edit-progress"
                              className="text-right"
                            >
                              Progress
                            </Label>
                            <Input
                              id="edit-progress"
                              type="number"
                              min="0"
                              max="100"
                              value={editingGoal?.progress || 0}
                              onChange={(e) =>
                                setEditingGoal({
                                  ...editingGoal!,
                                  progress: parseInt(e.target.value),
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <Button onClick={updateGoal}>Update Goal</Button>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
