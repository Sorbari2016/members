// Get the checkboxes
const checkboxes = [...document.querySelectorAll("input[type ='checkbox']")];

// Add event listener to the checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", async (e) => {
    e.preventDefault();

    // we will add a sound here...

    // send an alert for confirmation
    const confirmed = confirm("Make this user an Admin?");

    if (confirmed) {
      const makeAdminForm = checkbox.closest("#makeAdminForm");
      makeAdminForm.submit();
    }
  });
});

// Add event listeners to the delete forms
const deleteForms = [...document.querySelectorAll('form[action^="/messages"]')];

deleteForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    // prevent form from submiting
    e.preventDefault();

    // Create a confirmation alert
    const confirmed = confirm("Are you sure you want to delete this message?");

    // Submit form manually, if confirmed
    if (confirmed) {
      form.submit();
    }
  });
});
