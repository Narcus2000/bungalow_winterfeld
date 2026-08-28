// Belegte Zeiträume hier im Format ["JJJJ-MM-TT", "JJJJ-MM-TT"] eintragen.
const BOOKED_RANGES = [
  ["2026-08-14", "2026-08-19"],
  ["2026-08-26", "2026-08-30"],
  ["2026-09-05", "2026-09-12"],
  ["2026-09-21", "2026-09-25"],
  ["2026-10-09", "2026-10-16"],
];

const monthLabel = document.querySelector("#month-label");
const calendarDays = document.querySelector("#calendar-days");
const previousButton = document.querySelector("#previous-month");
const nextButton = document.querySelector("#next-month");
const today = new Date();
let displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);

function toIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isBooked(isoDate) {
  return BOOKED_RANGES.some(([start, end]) => isoDate >= start && isoDate <= end);
}

function renderCalendar() {
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  const label = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(displayedMonth);
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const numberOfDays = new Date(year, month + 1, 0).getDate();

  monthLabel.textContent = label;
  calendarDays.setAttribute("aria-label", `Belegung für ${label}`);
  calendarDays.replaceChildren();

  for (let index = 0; index < offset; index += 1) {
    const empty = document.createElement("span");
    empty.className = "calendar-empty";
    empty.setAttribute("aria-hidden", "true");
    calendarDays.append(empty);
  }

  for (let day = 1; day <= numberOfDays; day += 1) {
    const date = new Date(year, month, day);
    const booked = isBooked(toIso(date));
    const cell = document.createElement("span");
    cell.className = `calendar-day ${booked ? "booked" : "available"}`;
    cell.setAttribute("role", "gridcell");
    cell.setAttribute("aria-label", `${day}. ${label}: ${booked ? "belegt" : "frei"}`);
    cell.textContent = String(day);
    calendarDays.append(cell);
  }
}

previousButton.addEventListener("click", () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
  renderCalendar();
});

nextButton.addEventListener("click", () => {
  displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
  renderCalendar();
});

const inquiryForm = document.querySelector("#inquiry-form");
const formMessage = document.querySelector("#form-message");

function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.hidden = false;
}

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(inquiryForm);
  const arrival = String(formData.get("arrival"));
  const departure = String(formData.get("departure"));

  if (departure <= arrival) {
    showFormMessage("Das Abreisedatum muss nach dem Anreisedatum liegen.", "error");
    return;
  }

  const overlaps = BOOKED_RANGES.some(([start, end]) => arrival <= end && departure > start);
  if (overlaps) {
    showFormMessage("Dieser Zeitraum überschneidet sich mit einer Beispiel-Belegung. Bitte wähle andere Daten.", "error");
    return;
  }

  showFormMessage("Vielen Dank! Auf der echten Seite würde diese Anfrage jetzt an den Vermieter gesendet.", "success");
  inquiryForm.reset();
});

renderCalendar();
