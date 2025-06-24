import express, { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken, AuthenticatedRequest } from "../middlewares/verifyToken";

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/tasks - Create a task
router.post(
  "/",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, deadline, category } = req.body;
    const userId = req.user?.userId;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    try {
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          deadline: deadline ? new Date(deadline) : undefined,
          category,
          userId,
        },
      });

      res.status(201).json({ message: "Task created", task: newTask });
    } catch (err) {
      console.error("Error creating task:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// ✅ GET /api/tasks - Fetch tasks for authenticated user
router.get(
  "/",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    try {
      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({ tasks });
    } catch (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);
// ✅ PUT /api/tasks/:id - Update task title, description, deadline, category, or status
router.put(
  "/:id",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { title, description, deadline, category, status } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    try {
      const task = await prisma.task.findUnique({
        where: { id },
      });

      if (!task || task.userId !== userId) {
        return res
          .status(404)
          .json({ error: "Task not found or unauthorized" });
      }

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(deadline && { deadline: new Date(deadline) }),
          ...(category && { category }),
          ...(status && { status }),
        },
      });

      res.status(200).json({ message: "Task updated", task: updatedTask });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: "Failed to update task" });
    }
  }
);

// DELETE /api/tasks/:id - Delete task
router.delete(
  "/:id",
  verifyToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.task.delete({ where: { id } });
      res.json({ message: "Task deleted" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Failed to delete task" });
    }
  }
);

export default router;
