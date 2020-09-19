const router = require("express").Router();

const Note = require("../models/Note");

const { isAuthenticated } = require("../helpers/auth");

router.get("/notes/add", isAuthenticated, (req, res, next) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", isAuthenticated, async (req, res, next) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor inserte un titulo" });
  }
  if (!description) {
    errors.push({ text: "Por favor inserte una descripcion" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", { errors, title, description });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Nota agregada con éxito!");
    res.redirect("/notes");
  }
});

router.get("/notes", isAuthenticated, async (req, res, next) => {
  await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .then((documentos) => {
      const contexto = {
        notes: documentos.map((documento) => {
          return {
            title: documento.title,
            description: documento.description,
            _id: documento._id,
          };
        }),
      };
      res.render("notes/all-notes", { notes: contexto.notes });
    });
});
router.get("/notes/edit/:id", isAuthenticated, async (req, res, next) => {
  await Note.findById(req.params.id).then((note) => {
    console.log(note);
    const contexto = {
      note: {
        title: note.title,
        description: note.description,
        _id: note._id,
      },
    };
    res.render("notes/edit-note", { note: contexto.note });
  });
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res, next) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Nota guardada con éxito!");
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", isAuthenticated, async (req, res, next) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota borrada con éxito!");
  res.redirect("/notes");
});

module.exports = router;
