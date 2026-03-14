import { Router, Request, Response } from "express";
import { Notes, Links } from "../models/notes.js";
import { authMiddleware } from "../middlewares/auth.js";
import { generateRandom } from "../utils/util.js";
const router = Router();

router.get("/", (req, res) => {
  // dashboard
  return res.json({
    msg: "welcome to a server written in typescript",
  });
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  // getNotesById
  try {
    const id = req.params.id;

    const note = await Notes.findById({
      id,
    });

    return res.json({
      msg: note,
    });
  } catch (error) {
    return res.json({
      msg: "item not found",
      err: error,
    });
  }
});

router.post(
  "/create-note",
  authMiddleware,
  async (req: Request, res: Response) => {
    // create notes
    try {
      const { title, content } = req.body;

      await Notes.create({
        title: title,
        content: content,
      });

      return res.json({
        msg: "success",
      });
    } catch (error) {
      return res.json({
        err: error,
      });
    }
  },
);

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  // deleteNotesById
  try {
    const id = req.params.id;

    const note = await Notes.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        msg: "Note not found",
      });
    }

    return res.json({
      msg: "Note deleted successfully",
      deletedNote: note,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error deleting note",
      error,
    });
  }
});

router.post("/api/share", authMiddleware, async (req, res) => {
  // generate and store sharable link -> seperate for every user
  const share = req.body.share;
  const userId = req.body.userId;

  const existingLink = await Links.findOne({
    userId: userId,
  })

  if (existingLink) {
    res.json({
      msg: "Link already exists",
      link: existingLink,
    });

    return;
  }
  const hash = generateRandom(userId);
  if (share) {
    // generate a sharable link
    await Links.create({
      userId: userId,
      hash: hash,
    });
  } else {
    await Links.deleteOne({
      userId: userId,
      hash: hash,
    });
  }

  return res.json({
    msg: "sharable link generated",
  });
});

router.get('/api/share/:hash', async (req, res) => {
  const hash = req.params.hash;

  const link = await Links.findOne({ hash });

  if (!link) {
    return res.status(404).json({
      msg: "Link not found",
    });
  }

  // get content
  const content = await Notes.findOne({
    userId: link.userId
  });

  return res.json({
    msg: "Link found",
    link,
    content,
  });
});

export default router;
