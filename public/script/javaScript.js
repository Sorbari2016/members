// Create method to handle events
const handleEvent = (elements, type, soundUrl, message) => {
  const group = document.querySelectorAll(elements);

  group.forEach((element) => {
    element.addEventListener(type, (e) => {
      // create audio object
      const audio = new Audio(soundUrl);
      console.log(audio);

      // Attempt to play audio
      audio.play().catch((err) => console.log("Audio play blocked:", err));

      // Small timeout to allow the audio to start playing before blocking UI
      setTimeout(() => {
        const confirmed = confirm(message);

        if (confirmed) {
          const form =
            element.tagName === "FORM" ? element : element.closest("form");

          if (form) form.submit();
        } else if (type === "change" && element.type === "checkbox") {
          // Revert checkbox state if user cancels confirmation
          element.checked = !element.checked;
        }
      }, 250);
    });
  });
};

// Handle checkbox click
handleEvent(
  "input[type='checkbox']",
  "change",
  "/sounds/add-admin.mp3",
  "Make this user an Admin?",
);

// Handle delete button
handleEvent(
  'form[action^="/messages"]',
  "submit",
  "/sounds/delete-message.mp3",
  "Are you sure you want to delete this message?",
);
