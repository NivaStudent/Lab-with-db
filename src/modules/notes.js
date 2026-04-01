let notes = JSON.parse(localStorage.getItem("notes")) || [];

export function addNote(text) {
  notes.push({ id: Date.now(), text });
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function getNotes() {
  return notes;
}