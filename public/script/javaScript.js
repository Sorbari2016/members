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
